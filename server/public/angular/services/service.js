/*  SERVICE.JS
*   Description: Defines a single angular service
*   Use: Registers service with service module and injects to core module 
*/

;(function () {
    "use strict";

    module.exports = angular.module("ServiceModule", [])
        .service("apiSearch", require("./api-search.js"));

}());
