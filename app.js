var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Funcionario     = require("./models/funcionario"),
    Feedback        = require("./models/feedback"),
    methodOverride  = require("method-override"),
    Paciente        = require("./models/paciente"),
    flash           = require("connect-flash");
    //seedDB          = require("./seeds");

// var commentRoutes     = require("./routes/comments"),
//    indexRoutes       = require("./routes/index"),
//    campgroundsRoutes = require("./routes/campgrounds");
var url               = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v4"
console.log(process.env.DATABASEURL);
console.log(url);
mongoose.connect(process.env.DATABASEURL);
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
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

// app.use(indexRoutes);
// app.use("/campgrounds/:id/comments", commentRoutes);
// app.use("/campgrounds", campgroundsRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Clínica Rogério Antunes is started");
});