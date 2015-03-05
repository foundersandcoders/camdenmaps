/*************************************
*   BUTTON-HANDLERS.JS
*
*************************************/

;(function () {
    "use strict";

    module.exports = [
        "$location",
        "$stateParams",
        "$timeout",
        "localstorage",
        function ($location, $stateParams, $timeout, localstorage) {

            var current,
                destination,
                resetActiveMarker = require("../lib/reset-active-marker");

            function validateHomePath (destination) {
                if($location.path === "/home") {
                    $location.path(destination);
                    $timeout(function() { 
                        scope.update("markers");
                    }, 1000);
                } else {
                    $location.path(destination); 
                }
            }

            this.searchAgain = function (functionScope, destination) { 

                return function (scope) { 

                    scope = scope || functionScope;             
                    scope.update("results", []);
 
                    scope.update("error", "");
                    scope.update("locationSelected", {});
                    scope.update("centre", {
                            lat: 51.535923,
                            lng: -0.139991,
                            zoom: 13
                    });
                    scope.update("markers", {});

                    // better to have a watch function that triggers when markers changes??
                    validateHomePath(destination);
                };
            };

            this.changeUserLocation = function (functionScope, destination) {
                return function (scope) { 

                    localstorage.del();

                    scope = scope || functionScope;             
                    scope.update("results", []);
 
                    scope.update("error", "");
                    scope.update("locationSelected", {});
                    scope.update("centre", {
                            lat: 51.535923,
                            lng: -0.139991,
                            zoom: 13
                    });
                    scope.update("markers", {});

                    // better to have a watch functiont that triggers when markers changes??
                    validateHomePath(destination);
                };
            };

            this.toggle = function (functionScope) {
                
                return function (scope) {
                    scope = scope || functionScope; 
                    scope.update("error", "");
                    if($location.path().indexOf("/list") > -1) { 
                        return exit(); 
                    } else {
                        return listResults(scope);
                    }
                };

            };
            
            function listResults (scope) {   
                
                scope.update("error", "");

                //clears the active marker
                resetActiveMarker(scope);

                destination = ($stateParams.address) 
                            ? "/home/" + scope.service + "/location/" + scope.address + "/list"
                            :  "/home/" + scope.service + "/search/list";
                $location.path(destination);
            }

            function exit () {   
                //clears the active marker
                current = $location.path();
                destination = current.substring(0, current.indexOf("/list"));
                $location.path(destination);
            }


        }
    ];

})();
