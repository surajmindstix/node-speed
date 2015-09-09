//
// My Test Interceptor
//

// Dependencies
var log4js = require('log4js'); 
var routeDetails = require('../../framework/ControllerFactory.js');
var cache = require('../cacheManager.js');


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
// Actual Interception Work
//



function cacheInterception(req, res, next){
	var originalUri = req.originalUrl;
	var key = routes[originalUri];
	if(key.cacheEnabled == true){
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
