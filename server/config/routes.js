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

    var RoutesConfig = require("./routesConfig.js");

    module.exports = [
    /* EXAMPLE **************************************
    *    { 
    *        method:    ":METHOD", 
    *        path:      ":PATH", 
    *        handlers:  ":HANDLERS" 
    *    }
    */
        {
            method: "GET",
            path: "/",
            config: RoutesConfig.getHome,
            cors: true
        },

    //Where's My Nearest Routes *********************
        {
            method: "GET",
            path: "/services/{service}",
            config: RoutesConfig.nearest.services,
            cors: true
        },
        {
            method: "GET",
            path: "/locations/{postcode}",
            config: RoutesConfig.nearest.locations,
            cors: true 
        },
        {
            method: "GET",
            path: "/services/{service}/locations/{postcode}",
            config: RoutesConfig.nearest.servicesAndLocations,
            cors: true
        }
    //Catchall for assets *****************************
        // {
        //     method: "GET",
        //     path: "/{file*}",
        //     config: RoutesConfig.staticFiles
        // }
    ];
}());
