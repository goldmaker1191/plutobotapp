module.exports = {
  appname: process.env.APP_NAME || "plutobot",
  appurl: "https://plutobot.herokuapp.com",
  database: process.env.NODE_ENV
    ? "mongodb://localhost:27017/plutobot"
    : process.env.DB_URL, // production: mongodb://user:pass@ds239117.mlab.com:39117/pluto-new
  port: process.env.PORT || 3000,
  secretKey: "plutobot$",
  host: process.env.HOST || "localhost",
  
  facebook: {
    clientID: process.env.FACEBOOK_ID || "<facebook_id>",
    clientSecret: process.env.FACEBOOK_SECRET || "<facebook_secret_key>",
    profileFields: ["emails", "displayName"],
    callbackURL: "https://localhost/auth/facebook/callback"
  }
};
