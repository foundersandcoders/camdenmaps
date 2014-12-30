/*  CONTROLLER.JS
*   Description: Defines a single angular controller
*   Use: Registers controller with controller module and injects to core module 
*/

(function () {
    "use strict";
//      var controllerModule = angular.module("ControllerModule", []);
//      controllerModule.controller("ControllerName", require(importedController));
	app.controller("SimpleMapController", [ '$scope', function($scope) {
	    angular.extend($scope, {
	        defaults: {
	            scrollWheelZoom: false
	        }
	    });
	}]);
}());
