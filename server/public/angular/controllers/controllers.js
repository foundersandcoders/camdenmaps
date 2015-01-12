/******************************************************************************  
*   CONTROLLER.JS
*   Description: Defines a single angular controller
*   Use: Registers controller with controller module and injects to core module
*    
*******************************************************************************/

;(function () {
    "use strict";

//      var controllerModule = angular.module("ControllerModule", []);
//      controllerModule.controller("ControllerName", require(importedController));

    module.exports = angular.module("ControllerModule", [])
        .controller("RootController", require("./root-controller.js"))
        .controller("LandingController", require("./landing-controller.js"))
        .controller("ServicesController", require("./services-controller.js"))
        .controller("SearchController", require("./search-controller.js"))
        .controller("LocationController", require("./location-controller.js"))
        .controller("ViewListController", require("./list-controller.js"))
        .controller("ViewSingleController", require("./single-controller.js"));
}());
