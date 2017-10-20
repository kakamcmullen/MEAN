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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//===========================  EJS  ===========================
// setting our views folder
//app.set('views', path.join(__dirname, './views'));
// setting up ejs 
//app.set('view engine', 'ejs');
// root route to render the index.ejs view
//app.get('/', function(req, res) {
//    res.render("index");
//})

//===========================Mongoose==========================
// Require mongoose
var mongoose = require('mongoose');
//setting up db connection through mongoose
mongoose.connect('mongodb://localhost/people');// tester is the name of our database in mongodb
//the order of everything related to mongoose (require --> connect --> Schema --> Model --> route)
//===========================Schema============================
var PeopleSchema = new mongoose.Schema({
    name: { type: String },
});
//store the Schema under the name 'People'
mongoose.model('People', PeopleSchema);
var People = mongoose.model('People');
// Retrieve the Schema called 'People' and store it to the variable People
//===========================Routes============================

app.get('/', function (req, res) {
    // Then redirect to the root route
    People.find({}, function (err, persons) {
        res.json(persons);
    })

})
app.get('/new/:name', function (req, res) {
    console.log("Person's name requested is:", req.params.name);
    var person = new People({ name: req.params.name });
    person.save(function (err) {
        if (err) {
            console.log("could not add new person to people");
        } else {
            console.log("new person added to people");
            res.redirect('/');
        }
    })
})
app.get('/remove/:id', function (req, res) {
    console.log("person's name requested for deletion is:", req.params.id);
    People.remove({ _id: req.params.id }, function (err) {
        res.redirect("/");
    })
})

app.get('/show/:name', function (req, res) {
    console.log("trying to view one specific user with the name:", re.params.name);
    People.findOne({ name: req.params.name }, function (err, persons) {
        res.json(persons)
    })
})
app.get('/update/:id/:name', function (req, res) {
    console.log("trying to update person's name")
    People.findOne({_id: req.params.id }, function (err, persons) {
        if (persons) {
            persons.name = req.params.name
            persons.save(function (err, persons) {
                if (err) {
                    console.log("could not update person to people");
                } else {
                    console.log("person updated");
                    res.redirect("/");
                }
            })
        } else {
            res.redirect("/")
        }
    })
})
//===========================Server Listening==================
// setting server to run on port 3000
app.listen(3000, function () {
    console.log("listening on port 3000!");
})