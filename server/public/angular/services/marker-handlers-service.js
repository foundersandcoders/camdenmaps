/*************************************
*   MARKER-HANDLERS.JS
*
*************************************/

;(function () {
    "use strict";

    module.exports = [
    "$location",
    "$stateParams",
        function ($location, $stateParams) {

        var path; 

            this.markerClick = function(s) {
                return function(e, args, scope) {
                scope = scope || s;
                
                // Args will contain the marker name and other relevant information      
                if (args.markerName === "m0") {
                    path = "/home/" + $stateParams.service + "/location/" + scope.address;
                    $location.path(path);
                } 
                //resets any existing highlighted marker 
                if(scope.activeMarker) {
                    scope.activeMarker.icon.iconUrl = "../img/icons/marker-hi.png";
                    scope.update("activeMarker", 0);
                }

                //changes colour of marker selected
                scope.markers[args.markerName].icon.iconUrl = "../img/icons/yellow-marker.png";                    
                //sets active marker so it can be reset when user clicks elsewhere
                scope.activeMarker = scope.markers[args.markerName];
                
                console.log("active marker SEARCH-CONTROLLER", scope.activeMarker);


                //correct path will depend on if it is called from search or location controller
                path    = scope.address ? "/home/" + $stateParams.service + "/location/" + scope.address + "/" + scope.markers[args.markerName].name
                        : "/home/" + $stateParams.service + "/search/" + scope.markers[args.markerName].name;
                
                $location.path(path);

                
                scope.update("centre", {
                    lat: args.leafletEvent.latlng.lat,
                    lng: args.leafletEvent.latlng.lng,
                    zoom: 15
                });
            };
            };

            this.mapClick = function(s) {
                return function(e, args, scope) {
                scope = scope || s;
                
                console.log("args",args);

                if(scope.activeMarker) {
                    scope.activeMarker.icon.iconUrl = "../img/icons/marker-hi.png";
                    scope.update("activeMarker", 0);
                }

                path    = scope.address ? "/home/" + $stateParams.service + "/location/" + scope.address
                        : "/home/" + $stateParams.service + "/search";
                    
                $location.path(path);  
                };
            };

        }
    ];
}());
