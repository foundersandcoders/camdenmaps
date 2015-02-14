/*************************************
*   MARKER-HANDLERS.JS
*
*************************************/

;(function () {
    "use strict";

    var resetActiveMarker = require("../lib/reset-active-marker.js");


    module.exports = [
    "$location",
    "$stateParams",
        function ($location, $stateParams) {

        var path; 

            this.markerClick = function(functionScope) {
                return function(e, args, scope) {
                    scope = scope || functionScope;

                    //ensuring that the uri is encoded correctly
                    $stateParams.service = decodeURI($stateParams.service);
                    var service = encodeURIComponent($stateParams.service);

                    // Args will contain the marker name and other relevant information      
                    if (args.markerName === "m0") {
                        path = "/home/" + $stateParams.service + "/location/" + scope.address;
                        $location.path(path);
                    } else {
                        //resets any existing highlighted marker 
                        resetActiveMarker(scope);
                        //sets active marker so it can be reset when user clicks elsewhere
                        scope.update("activeMarker", scope.markers[args.markerName]);

                        //changes colour of marker selected
                        scope.markers[args.markerName].icon.iconUrl = "../img/icons/yellow-marker.png";  


                        //correct path will depend on if it is called from search or location controller
                        path    = scope.address ? "/home/" + service + "/location/" + scope.address + "/" + scope.markers[args.markerName].name
                                : "/home/" + service + "/search/" + scope.markers[args.markerName].name;
                        
                        console.log("path", $location.path());

                        if($location.path() !== path) {
                            $location.path(path);
                        }

                        //Make sure that on mobiles, the pin centers near the top of the map
                        // if(window.innerWidth < 360) {
                        //     scope.update("centre", {
                        //         lat: args.leafletEvent.latlng.lat-0.0032,
                        //         lng: args.leafletEvent.latlng.lng,
                        //         zoom: 15
                        //     });
                        // } else if(window.innerWidth < 768) {
                        //     scope.update("centre", {
                        //         lat: args.leafletEvent.latlng.lat-0.004,
                        //         lng: args.leafletEvent.latlng.lng,
                        //         zoom: 15
                        //     });
                        // } else {
                        //     scope.update("centre", {
                        //         lat: args.leafletEvent.latlng.lat,
                        //         lng: args.leafletEvent.latlng.lng,
                        //         zoom: 15
                        //     });
                        // }
                    }
                };
            };

            this.mapClick = function(functionScope) {
                return function(e, args, scope) {
                    scope = scope || functionScope;
                    
                    resetActiveMarker(scope);

                    path    = scope.address ? "/home/" + scope.service + "/location/" + scope.address
                            : "/home/" + scope.service + "/search";
                        
                    $location.path(path);  

                };
            };

        }
    ];
}());
