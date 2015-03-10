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
                        
                        function activateListItem (resultId) {

                            var listItem = $('[id="' + resultId + '"]');
                            var allListItems = $('.list-item');
                            var displayResult = listItem.find('.display-result');
                            var allResults = $('.display-result');

                            if (displayResult.hasClass('active')) {
                                listItem.removeClass('display-active-result');
                                allResults.removeClass('active');

                                resetActiveMarker(scope);
                            } else {
                                allListItems.removeClass('display-active-result');
                                allResults.removeClass('active');

                                listItem.toggleClass('display-active-result');
                                displayResult.toggleClass('active');

                                //sets active marker so it can be reset when user clicks elsewhere
                                scope.update("activeMarker", scope.markers[args.markerName]);

                                //changes colour of marker selected
                                scope.markers[args.markerName].icon.iconUrl = "../img/icons/yellow-marker.png";
                            }
                            //Todo: scroll top only works on every second click
                            scrollElement.toTop($("#list-results"), listItem); 
                        }
                        activateListItem(scope.markers[args.markerName].name)    
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
