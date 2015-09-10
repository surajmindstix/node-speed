//
// My Test Controller
//

// Dependencies
var log4js = require('log4js'); 
var path = require('path');
var util = require('util');
var routeDetails = require('../../../framework/ControllerFactory.js');

//Route Map
var routes = routeDetails.routes;
var cache = require("../../../framework/cacheManager.js");





// Logger
var logger = log4js.getLogger('UserController');



// Service Dependencies
var userService = global.app.services.getService("User");
var countryService = global.app.services.getService("Country");


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


//
//API :Add new Country.
function addCountry(req, res, next){

	// Request Trace
	logger.debug("Sign Up: Req UUID: " + req.uuid);
	logger.debug("Sign Up: Device Type" + JSON.stringify(req.device));
	logger.debug("Cookies: " + util.inspect(req.cookies));
	logger.debug("Body: " + util.inspect(req.body));

	// Delegate to Service

	countryService.addCountry(req.body, function cb(result){
		if(result == "success"){
			res.send("Added Successfully");
		}
		else{
			res.send("Error While creating in db");
		}
	});
}

//
//API : Get the country from DB.
function getCountry(req, res, next){

	// Request Trace
	logger.debug("Sign Up: Req UUID: " + req.uuid);
	logger.debug("Sign Up: Device Type" + JSON.stringify(req.device));
	logger.debug("Cookies: " + util.inspect(req.cookies));
	logger.debug("Body: " + util.inspect(req.body));

	
	var originalUri = req.originalUrl;
	var key = routes[originalUri];
	var timeout = key.cache.timeout;
	
	//It will for this request cacheEnable is true or false.
	if(key.cache.cacheEnabled == true){

		// Delegate to Service
		countryService.getCountry(function cb(result){
			cache.setToCache(key, result, timeout, function cb(content){
				logger.debug("Here is the content : "+content);
				if(content == true){
					res.send(result);
				}
				else{

				}
			});
		});
	}
	//If CacheEnabled is false.
	else{
		// Delegate to Service
		countryService.getCountry(function cb(result){
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
