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
        "$anchorScroll",
        function ($location, $stateParams, $anchorScroll) {

            var path; 
            
            function activateListItem (args, scope, resultId) {

                var listItem = $('[id="' + resultId + '"]');
                var allListItems = $(".list-item");
                var displayResult = listItem.find(".display-result");
                var allResults = $(".display-result");

                if (displayResult.hasClass("active")) {
                    listItem.removeClass("display-active-result");
                    allResults.removeClass("active");

                    resetActiveMarker(scope);
                } else {
                    allListItems.removeClass("display-active-result");
                    allResults.removeClass("active");

                    listItem.toggleClass("display-active-result");
                    displayResult.toggleClass("active");

                    //sets active marker so it can be reset when user clicks elsewhere
                    scope.update("activeMarker", scope.markers[args.markerName]);

                    scope.centre.lat = scope.markers[args.markerName].lat;
                    scope.centre.lng = scope.markers[args.markerName].lng;

                    //changes colour of marker selected
                    scope.markers[args.markerName].icon.iconUrl = "../img/icons/yellow-marker.png";

                    $location.hash(resultId);

                    $anchorScroll();

                }
            }

            this.markerClick = function(functionScope) {
                return function(e, args, scope) {
                    scope = scope || functionScope;

                    //ensuring that the uri is encoded correctly
                    $stateParams.service = decodeURI($stateParams.service);
                    var service = encodeURIComponent($stateParams.service);

                    //resets any existing highlighted marker 
                    resetActiveMarker(scope);                  

                    if(args.markerName !== "m0") {
                        activateListItem(args, scope, scope.markers[args.markerName].name);
                    }
                    

                };
            };

            this.mapClick = function(functionScope) {
                return function(e, args, scope) {

                    scope = scope || functionScope;
                    
                    resetActiveMarker(scope);

                };
            };
        }
    ];
}());
