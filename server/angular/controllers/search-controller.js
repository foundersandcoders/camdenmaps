/********************************
*   SEARCH-CONTROLLER.JS
*
********************************/

;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$stateParams",
        "$location",
        "apiSearch",
        "markers",
        "markerHandlers",
        "buttonHandlers",
        "menuFind",
        
        function ($scope, $stateParams, $location, apiSearch, markers, markerHandlers, buttonHandlers, menuFind) {

            var noResults,
                resetActiveMarker;

            // Ensuring that the service that displays is decoded
            $scope.service = decodeURI($stateParams.service);

            // Ensuring that the service name in the URL is Encoded
            $stateParams.service = encodeURIComponent($scope.service);

            noResults = require("../lib/no-results.js");
            resetActiveMarker = require("../lib/reset-active-marker");

            //model for title
            $scope.title = "Find your Nearest";
            //model for placeholder
            $scope.placeholder = "Please enter a postcode";
            $scope.icon = "";


            $scope.showAccordion = true;
            $scope.category = menuFind.categoryByService($scope.service);

            //change baseurl depending on whether address-found or address-search 
            $scope.baseUrl = $stateParams.address ?  "/#/home/" + $stateParams.service + 
                "/location/" + $stateParams.address + "/" : "/#/home/" + $stateParams.service + 
                "/search/";

            try {
                //model for image icon
                $scope.icon = menuFind.serviceImg($scope.service);
            } catch (err) {
                // don't break if image couldn't load
                console.log(err);
            } 

            $scope.$on('leafletDirectiveMarker.click', markerHandlers.markerClick($scope));

            $scope.$on('leafletDirectiveMap.click', markerHandlers.mapClick($scope));

            $scope.geolocateUser = function() {
                markers.geolocateUser($scope)();
                resetActiveMarker($scope);
            };
    
            //back button functionality
            $scope.searchAgain = buttonHandlers.searchAgain($scope, "/home/services");
            //back button text
            $scope.backButtonText = "Pick Another Service";

            $scope.toggle = buttonHandlers.toggle($scope);
            
            $scope.returnToCategories = buttonHandlers.searchAgain($scope, "/home/services");
            
            $scope.returnToServices = buttonHandlers.searchAgain($scope, "/home/" + $scope.category.title + "/service");

            $scope.activateListItem = function (resultId) {

                var listItem = $('[id="' + resultId + '"]');
                var allListItems = $('.list-item');
                var displayResult = listItem.find('.display-result');
                var allResults = $('.display-result');

                if (displayResult.hasClass('active')) {
                    listItem.removeClass('display-active-result');
                    allResults.removeClass('active');

                    resetActiveMarker($scope); 
                } else {
                    allListItems.removeClass('display-active-result');
                    allResults.removeClass('active');

                    listItem.toggleClass('display-active-result');
                    displayResult.toggleClass('active');

                    linkResultToMarker(resultId);
                }
            }

            function linkResultToMarker(markerName) {

                var result = $scope.results.filter(function (res) {
                    return res.display.Name === markerName;
                })[0];

                //links list result with relevant marker
                var marker = "m" + ($scope.results.indexOf(result) + 1);
                
                //if single list view loaded from click this marker will already be the active marker
                if(marker !== $scope.activeMarker) {
                    resetActiveMarker($scope); 
                    $scope.markers[marker].icon.iconUrl = "../img/icons/yellow-marker.png";
                    $scope.update("activeMarker", $scope.markers[marker]);
                    
                    //recentres map on the list result selected
                    $scope.update("centre", {
                        lat: Number(result.Latitude),
                        lng: Number(result.Longitude),
                        zoom: $scope.centre.zoom,
                    });
                }
            }
        }
    ];
}());
