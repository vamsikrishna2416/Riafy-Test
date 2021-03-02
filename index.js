var express = require('express');

var app = express();

var http = require('http').Server(app);
// var http = require('https');

var port = process.env.PORT || 5000;

var config = require("./config");

var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectID;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

const path = require('path');

app.use('/public', express.static(__dirname + '/public'));

var MongoClient = require('mongodb').MongoClient;
var dbURL = config.databaseURL;
var dbName = config.dbName;
var database = config.database;
var db1 = config.db1;


MongoClient.connect(dbURL, function(err, db) {
    //config.databaseObject = db;

	if (err) {
		console.log("ERROR IN CONNECTING TO DB:", err);
	} else {
		config.database = db.db(config.dbName);
		config.db1 = db;
		
		config.database.collection("login").update({
            UserName: "user",
        }, {
            UserName: "user",
	        
			Password: "user",
			
        }, {
            upsert: true
        });
		
		// for(each in json){
			
			
			// config.database.collection("listings").insertOne({"Company Name":each,"Company Short":json[each]}, function(err, result1) {
				// if (err) {
					
					// console.log('error Unable to update');
				// } else {
					// console.log("success")
					
				// }
			// });
		// }
		
	}
});


app.all('/*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods','GET,HEAD,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers','Content-Type,Authorization');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Accept");
		
	next();
	
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});
app.post('/login', function(req, res){
	var uName = req.body.uName;
	var uPass = req.body.uPass;

	config.database.collection("login").find({"UserName":uName,"Password":uPass}).project({"_id":0}).toArray(function(err, result1) {
		if (err) {
			res.send({'error':'Unable to login.'});
		} else {
			if(result1.length>0){
				
				res.send({'success':'Logged in succesfully'});
				
			}else{
				res.send({"invalid":"Incorrect username"});
			}
		}
	});
});

app.get('/getCompanies', function(req, res){
	var companyName =  req.query.companyName;
	var filterJSON = {};
	
	filterJSON["Company Name"] = {'$regex' : companyName, '$options' : 'i'};
	config.database.collection("listings").find(filterJSON).toArray(function(err, result1) {
		if(err){
			res.send({'error':'Unable to get Data.'});
		}else {
			
			res.send({'success':result1});
		}
	});
});

http.listen(port, function(){	
	console.log('listening on *:' + port);
}); 