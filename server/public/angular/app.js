/*  APP.JS
*   Description: Define core angular module
*   Use: Initialize core angular module and register controllers, directives and services.
*/

(function () {
    "use strict";
     var app = angular.module("map", ["leaflet-directive"]);

     	app.controller("SimpleMapController", [ '$scope', function($scope) {
	    angular.extend($scope, {
	        defaults: {
	            scrollWheelZoom: false
	        }
	    });
	}]);

	app.controller("CustomParametersController", [ '$scope', function($scope) {
	    var regions = {
        		london: {
		            northEast: {
		                lat: 51.57878,
		                lng: -0.094538
		            },
		            southWest: {
		                lat: 51.510989,
		                lng: -0.218649
		            }
        		}
	       	};

	    $scope.setRegion = function(region) {
	        if (!region) {
	            $scope.maxbounds = {};
	        } else {
	            $scope.maxbounds = regions[region];
	        }
	    };

	    angular.extend($scope, {
	        camden: {
	            lat: 51.535923,
	            lng: -0.139991,
	            zoom: 14
	        },
	        maxbounds: regions.london,
        	defaults: {
            scrollWheelZoom: false
        	}
	        
	    });
	}]);

}());
