/************************************************************************************
*   APP.JS
*   Description: Define core angular module
*   Use: Initialize core angular module and register controllers, directives and services.i
*
*************************************************************************************/

;(function () {
    "use strict";

    var angular = require("angular");
    require("angular-touch");
    require("angular-bootstrap");
    require("angular-local-storage");

    angular.module("maps", [
        require("angular-ui-router"),
        "ngTouch",
        "ui.bootstrap",
        "LocalStorageModule",
        "leaflet-directive"
    ])

    .factory("tokenIntercept", [function () {
        var token;
        
        return {
           
            "request": function(config) {
                 if (typeof token !== "undefined") {
                    config.headers["X-Access-Token"] = token;        
                }
                return config;
            },

           "response": function(response) {
                if (response.headers("X-Access-Token")) {
                    token = response.headers("X-Access-Token");     
                }
                return response;
           } 
            
        };
    }])

    .factory('httpq', function($http, $q) {
        return {
            get: function() {
                var deferred = $q.defer();
                $http.get.apply(null, arguments)
                .success(deferred.resolve)
                .error(deferred.resolve);
                return deferred.promise;
            }
        }
    })

    .config( require("./config.js") )

	// Set up the cache for initial resources
	.factory('cacheResources', function($cacheFactory) {
	   return $cacheFactory('cachedResources');
	});

    require("./directives");
    require("./controllers");
    require("./services");


}());

