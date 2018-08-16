var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var UserSchema = new Schema({


	username: { type: String, unique: true },

	email: {type: String, unique: true, lowercase: true},

	facebook: String,

	tokens: Array,

	password: String,

	profile: {
		mob: {type: Number, required: true },
		picture: {type: String, default: ''},
		address: {
			address1: String,
			address2: String
		},
		country: String,
		region: String,
		location: String,
		isProfileComplete: {type: Boolean, default: false},
	},

	roles: [],

	address: String,

	// history: [{
	// 	paid: {type: Number, default: 0},
	// 	item: {type: Schema.Types.ObjectId, ref: 'Product'}
	// }],

	verified: {type: Boolean, default: false },

	hash: {type: String, required: false },

	resetPasswordToken: String,

  	resetPasswordExpires: Date,


  	referrer: {type: Schema.Types.ObjectId, ref: 'User', required: false, default: null },

  	createdAt: {type: Date, default: Date.now }

});


UserSchema.virtual('name.full').get(function(){
	return this.profile.firstName + ' ' + this.profile.lastName;
});

/* Hash the password before saving it to the database*/
UserSchema.pre('save', function(next){

	/* this refers to the user passed as argument to the save method in /routes/user*/
	var user = this;
	// console.log(user) to get an idea of what the user object contains : TODO: remove this
	console.log(user);
	/* only hash the password if it has been modified or its new */
	if (!user.isModified('password')) return next();

	// generate the salt
	bcrypt.genSalt(10, function(err, salt){

		/* hash the password using the generated salt */
		bcrypt.hash(user.password, salt, function(err, hash){

			/* if an error has occured we stop hashing */
			if (err) return next(err);

			/* override the cleartext (user entered) passsword with the hashed one */
			user.password = hash;
			/*return a callback */
			next();
		});
	});
});

/*compare database password with user user entered password */
UserSchema.methods.comparePassword = function(userPassword){
	/* this.password refers to the database password,
	userPassword to the password the user entered on the login form*/
	return bcrypt.compareSync(userPassword, this.password);
}

/* add avator incase user does not have a profile picture */
UserSchema.methods.gravatar = function(size){

	if (!this.size) size = 200;

	if (!this.email) return 'https://gravatar.com/avatar/?s' + size + '&d=retro';

	var md5 = crypto.createHash('md5').update(this.email).digest('hex');

	/* return avator to save to database*/
	return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
}

UserSchema.methods.getPicture = function(){
	if(this.profile.picture.match(/https/ig)){
		return this.profile.picture;
	}else{
		return "/uploads/"+this.profile.picture+"";
	}
}
/* compiling our schema into a model object - a class that constructs documents in mongoose */
module.exports = mongoose.model('User', UserSchema);
