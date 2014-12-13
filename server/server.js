/***********************************************
*   SERVER.JS
*   Description: Initializes and configures server
*   Use: This is where the server starts!
*
************************************************/

//import routes, controllers, plugins, config, and modules
var hapi = require("hapi");
var config = require("../server/config/serverConfig.js");
var routes = require("../server/config/routes.js");

var internals = {};

//create server
var server = new hapi.Server();

//add connection
server.connection({
    port: process.env.PORT || config.server.port,
    labels: ["api"]
});

//route server
server.route(routes);

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

//exports server for testing
module.exports = server;
