/***********************************************
*   SERVER.JS
*   Description: Initializes and configures server
*   Use: This is where the server starts!
*
************************************************/

//import routes, controllers, plugins, config, and modules
var Hapi = require("hapi");
var Config = require("../server/config/serverConfig.js");
var Routes = require("../server/config/routes.js");

var internals = {};

//server config
var server = new Hapi.Server(Config.server.port, Config.server.host);

//route server
server.route(Routes);

//server start if not testing
if(!module.parent) {
    server.start(function(){
        console.log("Server running on " + Config.server.host + ":" + Config.server.port);
    });
}

//exports server for testing
module.exports = server;
