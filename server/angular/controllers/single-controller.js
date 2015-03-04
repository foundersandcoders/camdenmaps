/*******************************
*   SINGLE-CONTROLLER.JS
*
********************************/

;(function () {
    "use strict";

    module.exports = [
            "$location",
            "$stateParams",
            "$scope",
            "apiSearch",
            function ($location, $stateParams, $scope, apiSearch) {

                var uri,
                    marker,
                    service = encodeURIComponent($stateParams.service),
                    noResults = require("../lib/no-results.js"),
                    resetActiveMarker = require("../lib/reset-active-marker.js");
      
                // Ensuring that the service name in the URL is Encoded properly
                $stateParams.service = decodeURI($stateParams.service);

                if ($stateParams.service === "streetworks") {

                    $scope.showDistance = false;

                } else {

                    $scope.showDistance = $stateParams.address ? true : false; 

                }
           
                uri = ($stateParams.address) ? "/services/" + service + "/locations/" + $stateParams.address
                : "/services/" + service; 

                
                //if there is an active marker the list view was accessed
                //by marker click and map already recentred
                function linkResultToMarker() {
                    //links list result with relevant marker
                    marker = "m" + ($scope.results.indexOf($scope.result) + 1);
                    
                    // if single list view loaded from click this marker will already be the active marker
                    if(marker !== $scope.activeMarker) {
                        resetActiveMarker($scope); 
                        $scope.markers[marker].icon.iconUrl = "../img/icons/yellow-marker.png";
                        $scope.update("activeMarker", $scope.markers[marker]);
                        
                        //recentres map on the list result selected
                        $scope.update("centre", {
                            lat: Number($scope.result.Latitude),
                            lng: Number($scope.result.Longitude),
                            zoom: 14
                        });
                    }
                }
                
                //if single view accessed through list it will link to map
                if($scope.results) { 
                    //selects item from results with matching {id}
                    $scope.result = $scope.results.filter(function (result) {
                        return result.display.Name === $stateParams.id;
                    })[0];

                    if($scope.results.indexOf($scope.result) > -1) { 
                        linkResultToMarker(); 
                    } 
                }

                $scope.exit = function exit () {

                    var path    = $scope.address ? "/home/" + $stateParams.service + "/location/" + $scope.address
                                : "/home/" + $stateParams.service + "/search";

                    $location.path(path);
                };



            }
        ];
}());
