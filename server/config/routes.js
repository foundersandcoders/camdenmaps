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
            config: RoutesConfig.getHome
        },

    //Where's My Nearest Routes *********************
        {
            method: "GET",
            path: "/services/{service}",
            config: RoutesConfig.nearest.services 
    },
    {
        method: "GET",
        path: "/locations/{postcode}",
        config: RoutesConfig.nearest.locations 
    },
    {
        method: "GET",
        path: "/services/{service}/locations/{postcode}",
        config: RoutesConfig.nearest.servicesAndLocations 
    }
];
}());
