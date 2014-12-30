/*  SERVICE.JS
*   Description: Defines a single angular service
*   Use: Registers service with service module and injects to core module 
*/

(function () {
    "use strict";

    var serviceModule = angular.module("ServiceModule", []);
    serviceModule.service("searchApi", require("api-search.js"));
    //serviceModule.service("ServiceName", require(importedService));

}());
