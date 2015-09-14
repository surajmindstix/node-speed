var log4js = require('log4js'); 
var routeDetails = require('../ControllerFactory.js');
var cache = require('../CacheFactory.js');

//Route Map
var routes = routeDetails.routes;



// Logger
var logger = log4js.getLogger('CacheHandler');



function cacheInterception(req, res, next){
	var originalUri = req.originalUrl;
	var key = routes[originalUri];
	if(req.method == "POST"){
		next();
	}
	else
	{
		//Checks cacheEnabled option.
		if(key == null || key == undefined || key == ""){
			next();
		}
		else{
			if(key.cache.cacheEnabled == true){
				cache.getFromCache(originalUri, function(err ,result){
					if(result == null){
						next();
					}
					else{
						try {
						    res.send(result);
		        		}
		        		catch (error) {
		            		res.send(error)
		        		}
					}
				});
			}
			else{
				next();
			}
		}
	}
}


module.exports = {
	cacheInterception : cacheInterception
}
