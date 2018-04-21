var Paciente        = require("../models/campground"),
    Feedback        = require("../models/comment"),
    Funcionario     = require("../models/funcionario"),
    middlewareObj   = {};
middlewareObj.checkFuncionarioResponsavel = function(req, res, next){
    if(req.isAuthenticated()){
        Paciente.findById(req.params.id, function(err, foundPaciente){
        if(err || !foundPaciente){
            req.flash("error", "Paciente não encontrado!");
            res.redirect("back");
        } else {
            if(foundPaciente.funcionarioResp.id.equals(req.paciente._id)){
                next();
            } else {
                req.flash("error", "Você não tem permissão para fazer isso!");
                res.redirect("back");
            }
        }
    });
    } else {
        req.flash("error", "Você precisa estar logado para fazer isso!");
        res.redirect("back");
    }
};

middlewareObj.checkFeedbackOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Feedback.findById(req.params.feedback_id, function(err, foundFeedback){
        if(err || !foundFeedback){
            req.flash("error", "Feedback não encontrado");
            res.redirect("back");
        } else {
            if(foundFeedback.funcionario.id.equals(req.funcionario._id)){
                next();
            } else {
                req.flash("error", "Você não tem permissão para fazer isso!");
                res.redirect("back");
            }
        }
    });
    } else {
        req.flash("error", "Você precisa estar logado para fazer isso!");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Você precisa estar logado para fazer isso!");
    res.redirect("/login");
};
module.exports = middlewareObj;