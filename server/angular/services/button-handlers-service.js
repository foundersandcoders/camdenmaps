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
        function ($location, $stateParams, $timeout) {

            var current,
                destination;

            this.searchAgain = function (functionScope, destination) { 

                return function (scope) { 
                    scope = scope || functionScope;             
                    scope.update("results", []);
                    scope.update("locationSelected", {});
                    scope.update("centre", {
                            lat: 51.535923,
                            lng: -0.139991,
                            zoom: 13
                    });
                    scope.update("markers", {});

                    // better to have a watch functiont that triggers when markers changes??
                    if($location.path === "/home") {
                        $location.path(destination);
                        $timeout(function() { scope.update("markers", {}); console.log("timeout"); }, 1000);
                    } else {
                        $location.path(destination); 
                    }
                };
            };

            this.toggle = function (functionScope) {
                
                return function (scope) {
                    scope = scope || functionScope;  
                    if($location.path().indexOf("/list") > -1) { 
                        return exit(); 
                    } else {
                        return listResults(scope);
                    }
                };

            };
            
            function listResults (scope) {   
                
                //Encodes service in url.
                $stateParams.service = decodeURI($stateParams.service);
                var service = encodeURIComponent($stateParams.service);

                //clears the active marker
                if(scope.activeMarker) {
                    scope.activeMarker.icon.iconUrl = "../img/icons/marker-hi.png";
                    scope.update("activeMarker", 0);
                }

                destination = ($stateParams.address) 
                            ? "/home/" + service + "/location/" + scope.address + "/list"
                            :  "/home/" + service + "/search/list";
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