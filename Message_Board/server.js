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
app.use(bodyParser.urlencoded());

//===========================  EJS  ===========================
// setting our views folder
app.set('views', path.join(__dirname, './views'));
// setting up ejs 
app.set('view engine', 'ejs');
//=========================== ROUTES===========================
// root route to render the index.ejs view
app.get("/", function (req, res) {
    Message.find({}, false, true).populate('_comments').exec(function (err, messages) {
        res.render('index.ejs', { messages: messages });
    });
});
app.post("/message", function (req, res) {
    var newMessage = new Message({ name: req.body.name, message: req.body.message });
    newMessage.save(function (err) {
        if (err) {
            console.log(err);
            res.render('index.ejs', { errors: newMessage.errors });
        } else {
            console.log("success");
            res.redirect('/');
        }
    })
})
app.post("/comment/:id", function (req, res) {
    var message_id = req.params.id;
    Message.findOne({ _id: message_id }, function (err, message) {
        var newComment = new Comment({ name: req.body.name, text: req.body.comment });
        newComment._message = message._id;
        Message.update({ _id: message._id }, { $push: { "_comments": newComment } }, function (err) {

        });
        newComment.save(function (err) {
            if (err) {
                console.log(err);
                res.render('index.ejs', { errors: newComment.errors });
            } else {
                console.log("comment added");
                res.redirect("/");
            }
        });
    });
});

//===========================Mongoose==========================
// Require mongoose
var mongoose = require('mongoose');

// setting server to run on port 3000
//===========================Server Listening==================
app.listen(3000, function () {
    console.log("listening on port 3000!");
})
//setting up db connection through mongoose
mongoose.connect('mongodb://localhost/message_board', function (err, db) {
    if (err) {
        console.log("error here");
        console.log(err);
    }
});
//the order of everything related to mongoose (require --> connect --> Schema --> Model --> route)

//===========================Schema============================
var Schema = mongoose.Schema;
var MessageSchema = new mongoose.Schema({
    name: String,
    message: String,
    _comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});
MessageSchema.path('name').required(true, 'Name cannot be blank');
MessageSchema.path('message').required(true, 'Message cannot be blank');
mongoose.model("Message", MessageSchema);
var Message = mongoose.model("Message");
var CommentSchema = new mongoose.Schema({
    name: String,
    text: String,
    _message: { type: Schema.Types.ObjectId, ref: 'Message' }
});
CommentSchema.path('name').required(true, 'Name cannot be blank');
CommentSchema.path('text').required(true, 'Comment cannot be blank');
mongoose.model("Comment", CommentSchema);
var Comment = mongoose.model("Comment");



