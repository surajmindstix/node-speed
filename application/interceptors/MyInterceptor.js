//
// My Test Interceptor
//

// Dependencies
var log4js = require('log4js'); 



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

function doit(req, res, next){
	logger.debug("This Interceptor Invoked");
}



// Interface
module.exports = {
	"init": init,
	"doit": doit
}
