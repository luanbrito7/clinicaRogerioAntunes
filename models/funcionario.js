var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var funcionarioSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,        
    },
    password:{
        type: String,
        require: true,
        select: false,
    },
    email:{
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
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