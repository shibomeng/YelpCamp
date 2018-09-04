var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    // seedDB = require("./seed.js"),
    passport = require("passport"),
    passportLocal = require("passport-local"),
    user = require("./models/user"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose"),
    flash = require("connect-flash");

//Requiring routes
var campgroundRoutes = require("./routes/campground"),
    commentRoutes = require("./routes/comment"),
    authRoutes = require("./routes/index");

// seedDB();
mongoose.connect("mongodb://shibomeng:Meng199776@ds145072.mlab.com:45072/shibo_yelp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require('moment');

/////////////////////
// PASSPORT
/////////////////////
app.use(require("express-session")({
    secret: "dumb",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req, res, next){
    res.locals.user = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/campground", campgroundRoutes);
app.use("/campground/:id/comment", commentRoutes);
app.use(authRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("SEREVER STARTED!!");
});