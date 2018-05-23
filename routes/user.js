var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Feedback = require("../models/feedback");
var middleware = require("../middleware");


//INDEX - show all pacientes
router.get("/pacientes", middleware.isLoggedIn, middleware.isAdmin, function(req, res){
    // Get all pacientes from DB
    User.find({}, function(err, allUsers){
      if(err){
          console.log(err);
      } else{
          res.render("user/show", {users : allUsers, currentUser:req.user});
      }
    });
});

// //CREATE - add new campground to DB
// router.post("/", middleware.isLoggedIn, function(req, res){
//     // get data from form and add to campgrounds array
//     var price = req.body.price;
//     var name = req.body.name;
//     var image = req.body.image;
//     var desc = req.body.description;
//     var author= {
//         id: req.user._id,
//         username: req.user.username
//     }
//     var newCampground = {name: name, price:price, image: image, description: desc, author:author}
//     // Create a new campground and save to DB
//     Campground.create(newCampground, function(err, newlyCreated){
//         if(err){
//             console.log(err);
//         } else {
//             //redirect back to campgrounds page
//             console.log(newlyCreated);
//             res.redirect("/campgrounds");
//         }
//     });
// });

// //NEW - show form to create new campground
// router.get("/new", middleware.isLoggedIn, function(req, res){
//   res.render("campgrounds/new"); 
// });

// // SHOW - shows more info about one campground
// router.get("/:id", function(req, res){
//     //find the campground with provided ID
//     Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
//         if(err || !foundCampground){
//             req.flash("error", "Campground não encontrado");
//             res.redirect("back");
//         } else {
//             //render show template with that campground
//             res.render("campgrounds/show", {campground: foundCampground});
//         }
//     });
// });
// //EDIT CAMPGROUND
// router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
//     Campground.findById(req.params.id, function(err, found){
//         if(err){
//             res.render("back");
//         } else{
//             res.render("campgrounds/edit", {campground: found});
//         }
//     });
// });
// //UPDATE CAMPGROUND
// router.put("/:id/", middleware.checkCampgroundOwnership, function(req, res){
//   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updated){
//       if(err){
//           res.redirect("/campgrounds");
//       } else {
//           res.redirect("/campgrounds/" + req.params.id);
//       }
//   }); 
// });

// router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
//   Campground.findByIdAndRemove(req.params.id, function(err){
//       if(err){
//           res.redirect("/campgrounds");
//         } else{
//             res.redirect("/campgrounds");
//         }
//   }); 
// });



// module.exports = router;