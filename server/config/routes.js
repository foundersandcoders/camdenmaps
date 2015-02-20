/***********************************************
*   ROUTES.JS
*   Description: Defines the core server routes
*   Use: Imported by server.js
*
************************************************/
//
//  TODOS:
//  Search by streetname
//
//************************************************
(function () {
    "use strict";

    var mapConfig = require("../config/mapConfig.js");
    var convertXml = require("../handlers/convertXml.js");
    var RoutesConfig = require("./routesConfig.js");

    module.exports = function (server){

        server.route([
        /* EXAMPLE ****************************************
        *    { 
        *        method:    ":METHOD STRING", 
        *        path:      ":PATH STRING", 
        *        config:    ":CONFIG OBJECT" 
        *    }
        */
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
    //Find Your  Nearest Routes ***************************
            {
                method: "GET",
                path: "/services/{service}",
                config: RoutesConfig.nearest.services 
            },
            {
                method: "GET",
                path: "/locations/{postcode}",
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
            }
        ]);
    }
}());
