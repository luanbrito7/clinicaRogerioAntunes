var express     = require("express"),
    router      = express.Router(),
    Paciente  = require("../models/paciente"),
    Feedback     = require("../models/feedback"),
    Funcionario = require("../models/funcionario"),
    middleware  = require("../middleware");

//NEW - show form to create new pacient
router.get("/new", function(req, res){
   res.render("pacientes/new"); 
});

// SHOW - shows more info about a pacient
router.get("/:id", function(req, res){
    //find the pacient with provided ID
    Paciente.findById(req.params.id).populate("feedbacks").exec(function(err, foundPaciente){
        if(err || !foundPaciente){
            req.flash("error", "Paciente não encontrado");
            res.redirect("back");
        } else {
            //render show template with that pacient
            res.render("paciente/show", {paciente: foundPaciente});
        }
    });
});
module.exports = router;