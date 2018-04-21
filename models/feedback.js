var mongoose = require("mongoose");
var feedbackSchema = mongoose.Schema({
    dia: String,
    mes: String,
    ano: String,
    data: String,
    title: String,
    text: String,
    funcionario: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Funcionario"
        },
        username: String
    }
    
});

module.exports = mongoose.model("Feedback", feedbackSchema);