//
// My Test Interceptor
//

// Dependencies
var log4js = require('log4js'); 
var routeDetails = require('../../framework/ControllerFactory.js');
var cache = require('../cacheManager.js');

//Route Map
var routes = routeDetails.routes;



// Logger
var logger = log4js.getLogger('MyInterceptor');




//
// Lifecycle Init Handler
//
function init() {
	logger.info("Initialize...");
}


//
//Interceptor for every /v1/country/* request.
//

function cacheInterception(req, res, next){
	var originalUri = req.originalUrl;
	var key = routes[originalUri];

	//Checks cacheEnabled option.
	if(key.cache.cacheEnabled == true){
		cache.getFromCache(key, function(err ,result){
			if(result == null){
				logger.debug("Result is null");
				next();
			}
			else{
				logger.debug("Fetched From Cache");
				res.send(result);
			}
		});
	}
	else{
		next();
	}
}



// Interface
module.exports = {
	"init": init,
	"cacheInterception": cacheInterception
}
