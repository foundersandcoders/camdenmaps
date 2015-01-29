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

            this.markerClick = function(functionScope) {
                return function(e, args, scope) {
                scope = scope || functionScope;

                $stateParams.service = decodeURI($stateParams.service);
                var service = encodeURIComponent($stateParams.service);
                console.log(service);

                
                // Args will contain the marker name and other relevant information      
                if (args.markerName === "m0") {
                    path = "/home/" + $stateParams.service + "/location/" + scope.address;
                    $location.path(path);
                } else {
                    //resets any existing highlighted marker 
                    if(scope.activeMarker) {
                        scope.activeMarker.icon.iconUrl = "../img/icons/marker-hi.png";
                        scope.update("activeMarker", 0);
                    }

                    //changes colour of marker selected
                    scope.markers[args.markerName].icon.iconUrl = "../img/icons/yellow-marker.png";                    
                    //sets active marker so it can be reset when user clicks elsewhere
                    scope.activeMarker = scope.markers[args.markerName];
                    

                    //correct path will depend on if it is called from search or location controller
                    path    = scope.address ? "/home/" + service + "/location/" + scope.address + "/" + scope.markers[args.markerName].name
                            : "/home/" + service + "/search/" + scope.markers[args.markerName].name;
                    
                    if($location.path() !== path) {
                        $location.path(path);
                    }

                    
                    scope.update("centre", {
                        lat: args.leafletEvent.latlng.lat,
                        lng: args.leafletEvent.latlng.lng,
                        zoom: 15
                    });
                }
                };
            };

            this.mapClick = function(functionScope) {
                return function(e, args, scope) {
                scope = scope || functionScope;
                

                if(scope.activeMarker) {
                    scope.activeMarker.icon.iconUrl = "../img/icons/marker-hi.png";
                    scope.update("activeMarker", 0);
                }

                path    = scope.address ? "/home/" + service + "/location/" + scope.address
                        : "/home/" + service + "/search";
                    
                $location.path(path);  
                };
            };

        }
    ];
}());
