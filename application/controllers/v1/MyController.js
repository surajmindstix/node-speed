//
// My Test Controller
//

// Dependencies
var log4js = require('log4js'); 
var path = require('path');
var util = require('util');
var routeDetails = require('../../../framework/ControllerFactory.js');
var routes = routeDetails.routes;
var cache = require("../../cacheManager.js");
/*
var redis_client = redis();*/




// Logger
var logger = log4js.getLogger('UserController');



// Service Dependencies
var userService = global.app.services.getService("User");/*
var countryService = global.app.services.getService("Country");*/


//
// Lifecycle Init Handler
//
function init() {
	logger.debug("V1 Controller Initialization");
}

//
// REST API: Fetch All Users
//
function fetchAllUsers(req, res, next) {

	// Request Trace
	logger.debug("Sign Up: Req UUID: " + req.uuid);
	logger.debug("Sign Up: Device Type" + JSON.stringify(req.device));
	logger.debug("Cookies: " + util.inspect(req.cookies));
	logger.debug("Body: " + util.inspect(req.body));

	// Delegate to Service
	userService.fetchAllUsers(function cb(users){

		// Generate REST Response
		res.json(users);
		return;		

	});

}

//
// Render View: All Users
//
function renderAllUsers(req, res, next) {

	// Request Trace
	logger.debug("Sign Up: Req UUID: " + req.uuid);
	logger.debug("Sign Up: Device Type" + JSON.stringify(req.device));
	logger.debug("Cookies: " + util.inspect(req.cookies));
	logger.debug("Body: " + util.inspect(req.body));

	// Delegate to Service
	userService.fetchAllUsers(function cb(users) {

		// Render view
		res.render("users", {"userList": users});
		return;		

	});

}

function addCountry(req, res, next){
	userService.addCountry(req.body, function cb(result){
		if(result == "success"){
			res.send("Added Successfully");
		}
		else{
			res.send("Error While creating in db");
		}
	});
}

function getCountry(req, res, next){
	var originalUri = req.originalUrl;
	var key = routes[originalUri];
	if(key.cacheEnabled == true){
		userService.getCountry(function cb(result){
			cache.setToCache(key, result, function cb(content){
				logger.debug("Here is the content : "+content);
				if(content == true){
					res.send(result);
				}
				else{

				}
			});
		});
	}
	else{
		userService.getCountry(function cb(result){
			if(result == "error"){
				res.send("Unable to fetch");
			}
			else{
				res.send(result);
			}
		});
	}
}


// Interface
module.exports = {
	"init": init,
	"fetchAllUsers": fetchAllUsers,
	"renderAllUsers": renderAllUsers,
	"addCountry" : addCountry,
	"getCountry" : getCountry
}
