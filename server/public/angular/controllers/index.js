/******************************************************************************  
*   CONTROLLER/INDEX.JS
*   Description: Defines a single angular controller
*   Use: Registers controller with controller module and injects to core module
*    
*******************************************************************************/

;(function () {
    "use strict";

    angular.module("maps")
        .controller("RootController", require("./root-controller.js"))
        .controller("LandingController", require("./landing-controller.js"))
        .controller("ServicesController", require("./services-controller.js"))
        .controller("SearchController", require("./search-controller.js"))
        .controller("LocationController", require("./location-controller.js"))
        .controller("ViewListController", require("./list-controller.js"))
        .controller("ViewSingleController", require("./single-controller.js"));
}());
