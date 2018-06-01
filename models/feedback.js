var mongoose = require("mongoose");
var feedbackSchema = mongoose.Schema({
    dia: String,
    mes: String,
    ano: String,
    data: String,
    title: String,
    text: String,
    autor: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
    
});

module.exports = mongoose.model("Feedback", feedbackSchema);