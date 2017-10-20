//===============Express====================
//Require Express
const express = require("express");
//Setup Express
const app = express();
//===============Require Path (not in use)
const path = require("path");
//===============Body-Parser================
//Require Body-Parser
const bodyParser = require("body-parser");
//Setup Body-Parser
app.use(bodyParser.urlencoded({ extended: true }));
//Body-parser process Json Obhect
app.use(bodyParser.json());
//===============Mongoose===================
//Require Mongoose
const mongoose = require("mongoose");
//Setup Mongoose
mongoose.connect("mongodb://localhost/p1956");
//===============Schema=====================
//store the Schema under the name 'P1956'
var P1956Schema = new mongoose.Schema({
    name: { type: String },
});
mongoose.model('P1956', P1956Schema);
// Retrieve the Schema called 'P1956' and store it to the variable P1956
var P1956 = mongoose.model("P1956");
//==============Routes=======================

//Get route to create new objects in P1956
app.get('/new/:name', function(req, res){
    console.log("name of person being added to DB is:", req.params.name);
    var person = new P1956({ name: req.params.name});
    person.save(function(err) {
        if(err){
            console.log("could not add person to DB.");
        } else{
            console.log("new person added to DB");
            res.redirect('/');
        }
    })
})

//Get route to view all objects in P1956
app.get('/', function(req, res){
    P1956.find({}, function(err, persons) {
        if(err){
            console.log("Error, it would appear that no 'persons' object exists in the DB");
        } else {
            console.log("returning persons json-objects from DB to browser")
            res.json(persons)
        }
    })   
})

//Get route to view one object in P1956
app.get('/show/:id', function(req, res){
    P1956.findOne({_id: req.params.id}, function (err, persons){
        if(err){
            console.log("unable to find 'persons' object by that id");
        } else {
            console.log("trying to view 'persons' object on route /show")
            res.json(persons)
        }
    })
})

//Get route to remove one object in P1956
app.get('/remove/:id', function(req, res){
    P1956.remove({_id: req.params.id}, function (err, persons){
        if(err){
            console.log("unable to find 'persons' object by provided id:", req.params.id);
        } else {
            console.log("deleted 'persons' json object by provided id:", req.params.id);
            res.redirect('/')
        }
    })
})

//Get route to update one object in P1956
app.get('/update/:id/:name', function(req,res){
    console.log("trying to grab one 'persons' object to update by id:", req.params.id, "and passing in the new parameters for the 'name' key in the 'persons' object, with the name", req.params.name);
    P1956.findOne({_id: req.params.id}, function (err, persons){
        if (persons) {
            console.log("updating 'persons' json object, returning it to the P1956 DB, and re-rending the root route with the updated information")
            persons.name = req.params.name
            persons.save(function (err, persons) {
                if (err) {
                    console.log("could not update 'persons' json object in P1956 DB");
                } else {
                    console.log("'persons' json object updated in P1956 DB");
                    res.redirect("/");
                }
            })
        } else {
            console.log("unable to update 'persons' object and redirecting to root route.");
            res.redirect("/")
        }
    })
})
//===========================Server Listening==================
// setting server to run on port 3000
app.listen(3000, function () {
    console.log("listening on port 3000!");
})