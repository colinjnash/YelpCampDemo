var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose"),
    passport = require('passport'),
    flash = require('connect-flash'),
    LocalStrategy = require('passport-local'),
    User = require('./models/user'),
    methodOverride = require('method-override');
//Requiring Routes

var commentRoutes = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes = require('./routes/index');


//DEV SERVER
mongoose.connect(process.env.DATABASEURL, { useMongoClient: true });
// DEPLOYMENT SERVER
console.log(process.env.DATABASEURL);
mongoose.connect("mongodb://admin:471582ee@ds121896.mlab.com:21896/nashcamp", { useMongoClient: true });
mongoose.Promise = global.Promise;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(flash());

// PASSPORT CONFIGURATION

app.use(require('express-session')({
    secret: "I really hope I get a job soon",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("The Yelp Camp has started.");
});
