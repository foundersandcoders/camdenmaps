/*  CONTROLLER.JS
*   Description: Defines a single angular controller
*   Use: Registers controller with controller module and injects to core module 
*/

(function () {
    "use strict";

    var controllerModule = angular.module("ControllerModule", []);
    //controllerModule.controller("ControllerName", require(importedController));

    //register controllers for ui-router
    controllerModule.controller("RootController", require("./controllers/root-controller.js"))
                    .controller("LandingController", require("./controllers/landing-controller.js"))
                    .controller("ServicesController", require("./controllers/services-controller.js"))
                    .controller("SearchController", require("./controllers/search-controller.js"))
                    .controller("LocationController", require("./controllers/location-controller.js"))
                    .controller("ViewListController", require("./controllers/list-controller.js"))
                    .controller("ViewSingleController", require("./controllers/single-controller.js"));

}());
