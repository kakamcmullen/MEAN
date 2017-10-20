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
app.use(express.static(path.join(__dirname, "./client/static")));

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
app.use(bodyParser.urlencoded({ extended: true }));

//===========================  EJS  ===========================
// setting our views folder
app.set('views', path.join(__dirname, './client/views'));
// setting up ejs 
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function (req, res) {
    res.render("index");
})

//===========================Mongoose==========================
// Require mongoose
require('./server/config/mongoose.js');
//===========================Routes============================

var routes_setter = require('./server/config/routes.js');
// invoke the function stored in routes_setter and pass it the "app" variable
routes_setter(app);
// END OF ROUTING...

//===========================Server Listening==================
// setting server to run on port 3000
app.listen(8000, function () {
    console.log("listening on port 8000!");
})