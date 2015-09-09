//
// User Service Example
// @author Roshan
//

// Dependencies
var log4js = require('log4js'); 
var config = require('config');
var redis = require('redis');

// Logger
var logger = log4js.getLogger('UserService');

// Models
var UserModel = app.db.getModel('User');
var CountryModel = app.db.getModel('Country');

//
// Create New User
//
function createUser() {

	// New User
	var data = {
		fName: 'John',
		lName: 'Doe'
	};
	logger.debug("Creating New User: %s", JSON.stringify(data));

	// Persist a User
	var user = new UserModel(user);
	user.save();
	return user;

}

//
// Fetch All Users
//
function fetchAllUsers(cb) {
	logger.debug("Fetching all users.");
	UserModel.find(function(err, users) {
		logger.debug("User Data: %s", JSON.stringify(users));
		cb(users);
	});
	return true;	
}

function addCountry(req, callback){
	CountryModel.create({"countryName" : req.countryName}, function(err){
		if(err){
			callback(err);
		}
		else{
			callback("success");
		}
	});
}

function getCountry(callback){
	CountryModel.find({}, function(err, result){
		if(!err){
			callback(result);
		}
		else{
			
		}
	});
}

// Interface
module.exports = {
	createUser: createUser,
	fetchAllUsers: fetchAllUsers,
	addCountry : addCountry,
	getCountry : getCountry
}
