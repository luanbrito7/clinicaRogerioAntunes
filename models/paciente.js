var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var pacienteSchema = new mongoose.Schema({
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
    fullName: String,
    condicao: String,
    taxa: String,
    funcionarioResp: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Funcionario"
      },
      username: String
    },
    feedbacks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "feedback"
        }
    ],
});

pacienteSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Paciente", pacienteSchema);