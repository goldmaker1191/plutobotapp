import { Nuxt, Builder } from "nuxt";
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const engine = require("ejs-mate");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo")(session);
const secret = require("./config/secret");
// const sessionStore = new MongoStore({ url: secret.database, autoReconnect: true });
const passport = require("passport");
const path = require("path");
const expressValidator = require("express-validator");

const User = require("./models/user");

const app = express();
const server = require("http").Server(app);



// get routes
const mainRoutes = require("./routes/index");

console.log(process.env.NODE_ENV);
console.log("Database: " + secret.database);
// connect node to mongodb
mongoose.set("debug", true);
mongoose.connect(secret.database, function(err) {
  if (err) {
    console.log("Make sure the database server is running " + err);
  } else {
    console.log("Connected to the database");
  }
});

app.use(express.static(__dirname + "/public"));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: secret.secretKey
    // store: sessionStore
  })
);


// set the view
app.engine("ejs", engine);
app.set("view engine", "ejs");

// make use of our passport module
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  // assign each route the user object
  res.locals.config = secret;
  res.locals.user = req.user;
  next();
});

// make use of the routes
app.use(mainRoutes);

let configNuxt = require("../nuxt.config.js");
configNuxt.dev = !(process.env.NODE_ENV === "production");

// Init Nuxt.js
const nuxt = new Nuxt(configNuxt);

// Build only in dev mode
if (configNuxt.dev) {
  const builder = new Builder(nuxt);
  builder.build();
}

// Give nuxt middleware to express
app.use(nuxt.render);

app.get("/*", function(req, res, next) {
  if (typeof req.cookies["connect.sid"] !== "undefined") {
    console.log(req.cookies["connect.sid"]);
  }
});

// configure the server's listen port and give user feedback
server.listen(secret.port, function(err) {
  if (err) throw err;
  console.log("Go to http://localhost:" + secret.port + " in your browser");
});
