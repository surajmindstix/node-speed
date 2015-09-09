//
// User Service Example
// @author Roshan
//

// Dependencies
var log4js = require('log4js'); 
var config = require('config');
var redis = require('redis');

// Logger
var logger = log4js.getLogger('CountryService');

// Models

var CountryModel = app.db.getModel('Country');



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
	addCountry : addCountry,
	getCountry : getCountry
}
