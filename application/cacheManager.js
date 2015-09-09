var log4js = require('log4js'); 
var path = require('path');
var util = require('util');
var redis_client;
var redis = require('redis');
var log4js = require('log4js'); 


var logger = log4js.getLogger('cacheManager');

var name;
name = "Suraj";

var redis_client;

function connectClient(port, host){
redis_client = redis.createClient(port, host);
redis_client.on("connect", function (err) {
  if (err) {
        logger.fatal(err);
        process.exit();
      }
  logger.info("Redis connected");
});

redis_client.on("error", function (err) {
  logger.info('Redis error');
  logger.fatal(err);
});
}

// Method to save in redis cache
function setToCache(key,value, callback){
  //console.log("Setting value in cache "+value+" with key "+key);
    redis_client.set(key, value, function(err){
      if(!err){
        callback(true);
      }
      else{
        callback(false);
      }
    });
};

function getFromCache(key, callback){
  logger.debug("Setting value in cache with key "+key);
    redis_client.get(key, function(err, result){
      if(err && result == null){
        callback(true, null);
      }
      else{
        callback(false, result);
      }
    });
};


module.exports = {
  "connectClient" : connectClient,
  "name" : name,
  "setToCache" : setToCache,
  "getFromCache" : getFromCache
}