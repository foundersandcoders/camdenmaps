/**********************************************
*   SERVER.JS
*   Description: Initializes and configures server
*   Use: This is where the server starts!
*
************************************************/

var hapi = require("hapi");
var config = require("../server/config/serverConfig.js");
var routes = require("../server/config/routes.js");
var path = require('path');
var ConvertXml = require("./handlers/convertXml.js");
var mapConfig = require("./config/mapConfig.js");

var internals = {};

var server = new hapi.Server();

server.connection({
    state: {
        clearInvalid: true
    },
    port: process.env.PORT || config.server.port,
    labels: ["api"],
    routes: {
        cors: {
            additionalHeaders: ["X-Access-Token"],
            additionalExposedHeaders: ["X-Access-Token"]
        },
        files: {
            relativeTo: path.join(__dirname, 'server')
        },
        state: {
            failAction: "log"
        }
    }
});

routes(server);

require("./lib/getRecyclingCoordinates.js").registerPreHandler(server);
require("./lib/streetnameLookup.js").registerPreHandler(server);

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

module.exports = server;
