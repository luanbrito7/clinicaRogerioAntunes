var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var userSchema = new mongoose.Schema({
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
    isFuncionario: { type : Boolean, default : false},
    isConfirmed: { type :  Boolean , default : false },
    feedbacks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "feedback"
        }
    ],
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);