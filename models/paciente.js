var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var pacienteSchema = new mongoose.Schema({
    username: String,
    password: String,
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