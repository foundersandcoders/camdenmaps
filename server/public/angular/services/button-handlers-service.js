/*************************************
*   BUTTON-HANDLERS.JS
*
*************************************/

;(function () {
    "use strict";

    module.exports = [
        "$location",
        "$stateParams",
        function ($location, $stateParams) {

            var current,
                destination;

            this.searchAgain = function (s, destination) { 

                return function (scope) { 
                    scope = scope || s;             
                    scope.update("locationSelected", {});
                    scope.update("centre", {
                            lat: 51.535923,
                            lng: -0.139991,
                            zoom: 14
                    });
                    scope.update("markers", {});

                    $location.path(destination); 
                };
            };

            this.toggle = function (s) {
                
                return function (scope) {
                    scope = scope || s;  
                    if($location.path().indexOf("/list") > -1) { 
                        return exit(); 
                    } else {
                        return listResults(scope);
                    }
                };

            };
            
            function listResults (scope) {   
                //clears the active marker
                if(scope.activeMarker) {
                    scope.activeMarker.icon.iconUrl = "../img/icons/marker-hi.png";
                    scope.update("activeMarker", 0);
                }

                destination = ($stateParams.address) 
                            ? "/home/" + $stateParams.service + "/location/" + scope.address + "/list"
                            :  "/home/" + $stateParams.service + "/search/list";
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