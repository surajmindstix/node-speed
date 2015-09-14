//
// NodeSpeed Framework, MIT Licensed.
// @author Roshan Kulkarni, Mindstix Labs
// 
// Redis Factory:
// Establishes Redis-Server Connectivity.
//

// Dependencies
var log4js = require('log4js');
var path = require('path');
var config = require('config');
var fsWalk = require('fs-walk');
var _ = require('underscore');
var redis = require('redis');

// Logger
var logger = log4js.getLogger('CacheFactory');

var redisClient;

//
// Initialize Redis Connectivity.
//

function initialize() {

	// Redis Enanbled?
	var redisConfig = config.get("redis");
	var status = config.get("redis.status");

	// Redis Config Not Found?
	if(_.isEmpty(redisConfig)) {
		logger.info("Redis configuration not specfiied. Skipping Redis connection.");
		return;
	}

	// Redis Connectivity Not Active?
	if(status !== "ACTIVE") {
		logger.info("Redis connectivity disabled. Skipping Redis connection.");
		return;
	}

	// Setup Redis-Server Connection
	var host = config.get("redis.host");
	var port = config.get("redis.port");

	redisClient = redis.createClient(port, host);

	//When redis-server will connected this event will be invoked.
	redisClient.on("connect", function (err) {
	  if (err) {
	        logger.fatal(err);
	        process.exit();
	      }
	  logger.info("Redis connected");
	});


	redisClient.on("error", function (err) {
	  logger.info('Redis error');
	  logger.fatal(err);
	});
}


function setToCache(key,value,timeout, callback){
	logger.debug("Here is the key : "+key);
    redisClient.set(key, value, function(err){
	    if(!err){
	    	setExpiry(key, timeout);
	        callback(true);
	    }
	    else{
	        callback(false);
	    }
	});
};


//Method to get from cache.
function getFromCache(key, callback){
    redisClient.get(key, function(err, result){
      if(err && result == null){
        callback(true, null);
      }
      else{
        callback(false, result);
      }
    });
};


//Method to set expiry time to key.
function setExpiry(key , timeout){
  redisClient.expire(key, timeout);
}


//
// Interface
//
module.exports = {
	initialize: initialize,
	setToCache : setToCache,
	getFromCache : getFromCache
}