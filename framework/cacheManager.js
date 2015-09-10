//
//Dependencies
var log4js = require('log4js'); 
var path = require('path');
var util = require('util');
var redis_client;
var redis = require('redis');
var log4js = require('log4js'); 


var logger = log4js.getLogger('cacheManager');

var redis_client;
var name = "suraj";
//Function to connect to redis server which runs on 6379 port.
function connectClient(port, host){
//redis_client is an instance of redis module.
redis_client = redis.createClient(port, host);

//When redis-server will connected this event will be invoked.
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
function setToCache(key,value,timeout, callback){
    redis_client.set(key, value, function(err){
      if(!err){
        setExpiry(key, timout);
        callback(true);
      }
      else{
        callback(false);
      }
    });
};

//Method to get from cache.
function getFromCache(key, callback){
    redis_client.get(key, function(err, result){
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
  redis_client.expire(key, timeout);
}



//Interface
module.exports = {
  "name" : name,
  "connectClient" : connectClient,
  "setToCache" : setToCache,
  "getFromCache" : getFromCache
}