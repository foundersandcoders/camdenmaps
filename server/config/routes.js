/***********************************************
*   ROUTES.JS
*   Description: Defines the core server routes
*   Use: Imported by server.js
*
************************************************/

(function () {
    "use strict";

    var RoutesConfig = require("./routesConfig.js");
    var request = require("request");

    module.exports = function (server){

        server.route([
            {
                method: "GET",
                path: "/{param*}",
                config: RoutesConfig.staticFiles
            },
    //Needed for directive templateUrl to work ************
            {
                method: "GET",
                path: "/{directive}",
                config: RoutesConfig.angularDirectiveFiles
            },
            {
                method: "GET",
                path: "/",
                config: RoutesConfig.getHome
            },
    //Streetworks Routes *********************************
            {
                method: "GET",
                path: "/services/streetworks/locations/{postcode}",
                config: RoutesConfig.streetworks
            },
            {
                method: "GET",
                path: "/services/streetworks/locations/lats/{latitude}/lngs/{longitude}",
                config: RoutesConfig.streetworks
            },
    //Find Your  Nearest Routes ***************************
            {
                method: "GET",
                path: "/services/{service}",
                config: RoutesConfig.nearest.services
            },
            {
                method: "GET",
                path: "/services/{service}/locations/{postcode}",
                config: RoutesConfig.nearest.services
            },
            {
                method: "GET",
                path: "/services/{service}/locations/lats/{latitude}/lngs/{longitude}",
                config: RoutesConfig.nearest.services
            },
     //Swagger API Route *********************8*************
            {
                method: "GET",
                path: "/api",
                config: RoutesConfig.apiDocs
            },               

    //Local Information Routes ******************************
            {
                //example uprn (for tests): 5023741
                method: "GET",
                path: "/addresses/{uprn}",
                config: RoutesConfig.local.information
            },
    // Logs
            {
                method: "GET",
                path: "/logs",
                config: RoutesConfig.logging
            },
    // Issue token *****************************************
            {
                method: "GET",
                path: "/auth_token",
                config: RoutesConfig.issueToken
            },
            {
                method: "GET",
                path: "/uprn/{path}",
                handler: function(req, res) {
                    request("http://camdenmaps.herokuapp.com/auth_token", function (err, response, body) {
                            var path = "http://camdenmaps-addresslookup.herokuapp.com/search/" + req.params.path;
                            var opts = {
                                url: path,
                                headers: {
                                    "X-Access-Token": response.headers["x-access-token"]
                                }
                            };
                            request(opts , function(e, h, b) {
                                var firstItem;
                                try {
                                    firstItem = JSON.parse(b)[0];
                                    return res(firstItem.UPRN);
                                } catch (error) {
                                    return res("Not found");
                                }
                            });
                    });
                }
            }
        ]);
    };
}());
