var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    User            = require("./models/user"),
    Feedback        = require("./models/feedback"),
    methodOverride  = require("method-override"),
    flash           = require("connect-flash");
    //seedDB          = require("./seeds");

var  indexRoutes        = require("./routes/index"),
     feedbackRoutes     = require("./routes/feedbacks"),
     pacienteRoutes     = require("./routes/user");
var url               = /*process.env.DATABASEURL || <--*/ "mongodb://localhost/clinicaRogerioAntunes"
//console.log(process.env.DATABASEURL);
//console.log(url);
mongoose.connect(url , function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Server successfully!');
    }
});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

//CONFIG DO PASSPORT

app.use(require("express-session")({
    secret: "scrt",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use(indexRoutes);
app.use("/pacientes/:id/feedbacks", feedbackRoutes);
app.use("/pacientes", pacienteRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Clínica Rogério Antunes is started");
});