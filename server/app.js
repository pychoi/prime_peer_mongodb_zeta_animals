var express = require('express');
var app = express();

var path = require('path');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/animal_assignment');
mongoose.model('Person', new Schema({"name": String, "location": String}, {collection: 'people'}));
var Person = mongoose.model('Person');

app.set('port', process.env.PORT || 5000);

app.get('/data', function(req, res){
    var query = req.query.peopleSearch;

    if(query){
        Person.find({"name": query}, function(err, data){
           if(err){
               console.log("ERROR! : ", err);
           }
            res.send(data);
        });
    } else {
        Person.find({}, function(err, data){
            if(err){
                console.log("ERROR! : ", err);
            }
            res.send(data);
        });
    }

});

app.get('/*', function(req, res){
    var file = req.params[0] || "views/index.html";
    res.sendFile(path.join(__dirname, "./public", file));
});

app.listen(app.get('port'), function(){
    console.log("Listening to port: ", app.get('port'));
});