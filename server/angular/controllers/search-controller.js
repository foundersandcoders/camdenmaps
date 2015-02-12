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
        function ($scope, $stateParams, $location, apiSearch, markers, markerHandlers, buttonHandlers) {

            var path,
                destination,
                noResults = require("../lib/no-results.js"),
                resetActiveMarker = require("../lib/reset-active-marker");

            //model for search query
            $scope.address = "";
            //model for error messages
            $scope.error = "";
            //model for title
            $scope.title = "Find your Nearest";
            //model for placeholder
            $scope.placeholder = "Please enter a postcode";

            // Ensuring that the service that displays is decoded
            $scope.service = decodeURI($stateParams.service);

            // Ensuring that the service name in the URL is Encoded
            $stateParams.service = encodeURIComponent($scope.service);

            try {
                //model for image icon
                $scope.icon = require("../menu.json").filter(function filterImg (item) {
                    var name = item.title + item.text;
                    return name.toLowerCase() === $scope.service.toLowerCase();
                })[0].img;
            } catch (e) {
                // don't break if image couldn't load
                console.log(e);
            } 

            //this will load results on a refresh
            if( noResults($scope) ) {  

                apiSearch.search($stateParams.service)
                        .success(function success (data) {
                            if(data.hasOwnProperty("error")) {
                                // display error message
                                $scope.update("error", data.message);
                                // and redirect back to services menu to try again
                                $location.path("/home/services");
                            }
                            $scope.updateResults(data.properties);
                            //selects item from results with matching {id}
                            $scope.result = $scope.results.filter(function (result) {
                                return result.display.Name === $stateParams.id;
                            })[0];

                            $scope.addMarkers();
                            // $scope.centre = markers.centreCheck($scope)();
                            $scope.centre.zoom = markers.zoomCheck($scope)();
                        })
                        .error(function error(err) {
                            return $scope.update("error", err.message);
                        });

            }

            
            $scope.$on('leafletDirectiveMarker.click', markerHandlers.markerClick($scope));

            $scope.$on('leafletDirectiveMap.click', markerHandlers.mapClick($scope));

            //redirects to next state when provided with address
            $scope.search = function search () {
                if($scope.address) {
                    resetActiveMarker($scope);
                    path = "/home/" + $stateParams.service + "/location/" + $scope.address;
                    //redirects to new path and runs location controller
                    $location.path(path);

                }
            };

            $scope.geolocateUser = function() {
                markers.geolocateUser($scope)();
                resetActiveMarker($scope);
            };

    
            //back button functionality
            $scope.searchAgain = buttonHandlers.searchAgain($scope, "/home/services");
            //back button text
            $scope.backButtonText = "Pick Another Service";

            $scope.toggle = buttonHandlers.toggle($scope);
            
        }
    ];
}());
