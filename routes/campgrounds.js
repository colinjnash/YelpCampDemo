var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware/');

//INDEX - show all campgrounds
router.get("/", function (req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds, page: 'campgrounds' });
        }
    });
});

//NEW Route
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

//CREATE Route
router.post("/", middleware.isLoggedIn, function (req, res) {
    //Get Data from the form and add to Campground Array
    //Get name and image, make an object, and pass to DB
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = { name: name, image: image, description: desc, author: author };

    //Create a new Campground and save to database
    Campground.create(newCampground, function (err, newCG) {
        if (err) {
            console.log(err)
        }
        else {
            //Redirect to the Campgrounds Page
            console.log(newCG);
            res.redirect("/campgrounds");
        }
    });
});

//SHOW ROUTE

router.get("/:id", function (req, res) {
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        }
        else {
            //Render the campground
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
    //Find the campground with the provided ID
    //Render Show template with that ID;
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        res.render('campgrounds/edit', { campground: foundCampground });
    });
});


//UPDATE CAMPGROUND ROUTE

router.put('/:id', middleware.checkCampgroundOwnership, function (req, res) {
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
        if (err) {
            res.redirect('/campgrounds');
        }
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    //Redirect
});

// DESTROY CAMPGROUND ROUTE

router.delete('/:id', middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/campgrounds");
        }
        else {
            req.flash("success", "Campground Deleted");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;
