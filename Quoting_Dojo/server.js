//load the express module
//load the path module
//load the body-parser
//load the mongoose module
//load the express-session module (optional)
//load the express-flash module (optional)
//load the bcrypt-as-promised module (optional)
//load the sockets.io module (optional Requires code in 
//(-con't) server.js/index.ejs/index.js, not shown below)
//load the morgan module (optional)
//load the morgan-debugger module, requires morgan (optional)

//==========================Express=============================
// Require the Express Module
var express = require("express");
// invoke var express and store the resulting application in var app
var app = express();
// Require path
var path = require("path");
//require bcrypt
var bcrypt = require('bcrypt-as-promised');

//==========================Express-Session=====================
// Require session
var session = require('express-session');
// Creating session constructor
var sessionStore = new session.MemoryStore;
// setting up session
app.use(session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: true,
    secret: 'secret'
}));

//==========================Express-Flash======================
// Require session
var flash = require('express-flash');
// setting up flash
app.use(flash());

//==========================Static Folder======================
// setting up our static folder
app.use(express.static(path.join(__dirname, "./static")));

//==========================Morgan/Morgan-Debugger=============
// Require Morgan 
var morgan = require('morgan');
// Select type of morgan debugger
 morgan('tiny');
 // Require morgan-debugger
 var morganDebug = require('morgan-debug');
// Setting up morgan-debugger
 app.use(morganDebug("Morgan", 'tiny'));

//==========================Body-Parser========================
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// setting up body-parser
app.use(bodyParser.urlencoded({extended: true}));

//===========================  EJS  ===========================
// setting our views folder
app.set('views', path.join(__dirname, './views'));
// setting up ejs 
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
    res.render("index");
})

//===========================Mongoose==========================
// Require mongoose
var mongoose = require('mongoose');
//setting up db connection through mongoose
mongoose.connect('mongodb://localhost/tester');// tester is the name of our database in mongodb
//the order of everything related to mongoose (require --> connect --> Schema --> Model --> route)

//===========================Routes============================
// post route for adding a user
app.post('/users', function(req, res) {
 console.log("POST DATA", req.body);
 // This is where we would add the user to the database
 // Then redirect to the root route
 res.redirect('/');
})

//===========================Server Listening==================
//we're going to have /routes/index.js handle all of our routing
var route = require('./routes/index.js')(app);
// setting server to run on port 3000
app.listen(3000, function() {
 console.log("listening on port 3000!");
})