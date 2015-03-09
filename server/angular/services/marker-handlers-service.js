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
        "scrollElement",
        function ($location, $stateParams, scrollElement) {

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

                        $(".leaflet-clickable").click(function() {
                            scrollElement.toTop($("#list-results"), $(".display-active-result"));                      
                        })
                        
                        if($location.path() !== path) {
                            $location.path(path);
                        }
                    };
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
