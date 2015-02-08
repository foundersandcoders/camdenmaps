/*******************************
*   SINGLE-CONTROLLER.JS
*
********************************/

;(function () {
    "use strict";

    module.exports = [
            "$stateParams",
            "$scope",
            "apiSearch",
            function ($stateParams, $scope, apiSearch) {

                var uri,
                    marker;
                
                //selects item from results with matching {id}
                

                if($scope.results) {
                    $scope.result = $scope.results.filter(function (result) {
                        return result.display.Name === $stateParams.id;
                    })[0];

                    $scope.rounding = (Math.floor( (Number($scope.result.Distance) + 0.005) * 100 )) /100;
                }

                
                // Ensuring that the service name in the URL is Encoded properly
                $stateParams.service = decodeURI($stateParams.service);
                var service = encodeURIComponent($stateParams.service);

                $scope.showDistance = $stateParams.address ? true : false; 
           
                uri = ($stateParams.address) ? "/services/" + service + "/locations/" + $stateParams.address
                : "/services/" + service; 


                
                //if there is an active marker the list view was accessed
                //by marker click and map already recentred
                function linkResultToMarker() {                         

                        //links list result with relevant marker
                        marker = "m" + ($scope.results.indexOf($scope.result) + 1);
                        
                        //if single list view loaded from click this marker will already be the active marker
                        if(marker !== $scope.activeMarker) {
                            $scope.markers[marker].icon.iconUrl = "../img/icons/yellow-marker.png";
                            $scope.update("activeMarker", $scope.markers[marker]);
                            
                            //recentres map on the list result selected
                            $scope.update("centre", {
                                lat: Number($scope.result.Latitude),
                                lng: Number($scope.result.Longitude),
                                zoom: 15
                            });
                        }

                    }
                
                //if single view accessed through list it will link to map
                if($scope.results) { 

                    if(!$scope.activeMarker && $scope.results.indexOf($scope.result) > -1) { 
                        linkResultToMarker(); 
                    } 
                }

                if(!$scope.results || typeof $scope.result === undefined ) {
                apiSearch.search(service, $stateParams.address)
                    .success(function success (data) {
                        $scope.updateResults(data.properties);
                        $scope.update("locationSelected", data.location);
                        
                        // selects item from results with matching {id}
                        $scope.result = $scope.results.filter(function (result) {
                            return result.display.Name === $stateParams.id;
                        })[0];

                        $scope.rounding = (Math.floor( (Number($scope.result.Distance) + 0.005) * 100 )) /100;


                        if($stateParams.id) {
                            linkResultToMarker(); 
                        }

                    });

                 }

            }
        ];
}());
