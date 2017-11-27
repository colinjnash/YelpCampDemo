var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
//=============REST ROUTES

router.get("/", function (req, res) {
    res.render("landing");
});


// =================
// AUTH ROUTES
//==================

//show register form

router.get('/register', function (req, res) {
    res.render('register', { page: 'register' });
});

// Handle Signup Logic

router.post('/register', function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render('register', { 'error': err.message });
        }
        passport.authenticate('local')(req, res, function () {
            req.flash('success', 'Welcome to YelpCamp ' + user.username);
            res.redirect('/campgrounds');
        });
    });
});


// Show Login Form

router.get('/login', function (req, res) {
    res.render('login', { page: 'login' });
});

// Handling login logic

router.post('/login', passport.authenticate('local', {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: true

}), function (req, res) {
    res.send("login logic here!");
});

// Logout route

router.get('/logout', function (req, res) {
    req.logout();
    req.flash("success", "Logged You Out");
    res.redirect('/campgrounds');
});

module.exports = router;
