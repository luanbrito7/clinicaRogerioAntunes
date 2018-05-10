var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
// var Funcionario = require("../models/funcionario");
var Feedback = require("../models/feedback");

router.get("/", function(req, res){
    res.render("landing");
});

//registro de paciente
router.get("/register", function(req, res) {
    res.render("register");
});
router.post("/register", function(req, res) {
    var name = req.body.username;
    var pass = req.body.password;
    var secret = req.body.adminCode;
    var nome = req.body.nome;
    var newUser = new User({username: req.body.username, email: req.body.email, fullName: req.body.nome});
    if(req.body.adminCode === 'senhaAdmin' ){
        newUser.isAdmin = true;
    }
    User.register(newUser, pass, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("register");
        } 
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Bem vindo à Clínica " + user.username);
            console.log("Você é um funcionário?" + user.isAdmin);
            res.redirect("/");     
        });
    });
    console.log(nome);
    console.log(name);
    console.log(pass);
    console.log(req.body.email);
    console.log(secret);
})

//show login form
router.get("/login", function(req, res) {
   res.render("login"); 
});

router.post("/login", passport.authenticate("local", {
    successRedirect:"/",
    failureRedirect:"/login"
    
}), function(req, res) {
    
});

//logout rout
router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "Você foi deslogado");
   res.redirect("/");
});

module.exports = router;