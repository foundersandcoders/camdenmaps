/**********************************************
*   SERVER.JS
*   Description: Initializes and configures server
*   Use: This is where the server starts!
*
************************************************/

//import routes, controllers, plugins, config, and modules
var hapi = require("hapi");
var config = require("../server/config/serverConfig.js");
var routes = require("../server/config/routes.js");
var path = require('path');
var ConvertXml = require("./handlers/convertXml.js");
var mapConfig = require("./config/mapConfig.js");

var internals = {};

//create server
var server = new hapi.Server();


//add connection
server.connection({
    port: process.env.PORT || config.server.port,
    labels: ["api"],
    routes: {
        cors: true,
    	files: {
    		relativeTo: path.join(__dirname, 'server')
    	}
    }
});


//route server
routes(server);

//register prehandler extension
require("./lib/streetnameLookup.js")(server);


server.register({
    register: require("good"),
    options: config.logging
}, function(err) {
    if (err) {
        console.log(err);
    } else {
        //server start if not testing
        if(!module.parent) {
            server.start(function(err){
                if (err) {
                    throw err;
                } else {
                    console.log("Server running on " + config.server.host + ":" + config.server.port);
                }
            });
        }
    }
});

console.log(__dirname)

//exports server for testing
module.exports = server;
