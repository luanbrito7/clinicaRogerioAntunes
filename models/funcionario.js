var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var funcionarioSchema = new mongoose.Schema({
    username: String,
    password: String,
    area: String,
    pacientes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Paciente"
        }
    ],
});

funcionarioSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Funcionario", funcionarioSchema);