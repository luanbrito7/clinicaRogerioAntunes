var express = require("express");
var router = express.Router({mergeParams:true});
var User = require("../models/user");
var Feedback = require("../models/feedback");
var middleware = require("../middleware");

router.get("/new", middleware.isLoggedIn, middleware.isAdmin, function(req, res){
    // find user by id
    User.findById(req.params.id, function(err, paciente){
        if(err){
            console.log(err);
        } else {
             res.render("feedbacks/new", {paciente: paciente});
        }
    })
});
router.post("/", middleware.isLoggedIn, middleware.isAdmin, function(req, res){
   //lookup pacient using ID
   User.findById(req.params.id, function(err, paciente){
       if(err){
           console.log(err);
           res.redirect("/pacientes");
       } else {
        Feedback.create(req.body.feedback, function(err, feedback){
           if(err){
               req.flash("error", "Algo deu errado!");
               console.log(err);
           } else {
               //add username && id to the comment
               feedback.autor.id = req.user._id;
               feedback.autor.username = req.user.username;
               feedback.save();
               paciente.feedbacks.push(feedback);
               paciente.save();
               req.flash("success", "Feedback adicionado com sucesso!");
               res.redirect('/pacientes/' + paciente._id);
           }
        });
       }
   });
});
   
module.exports = router;