/*******************************
*   SINGLE-CONTROLLER.JS
*
********************************/

;(function () {
    "use strict";

    module.exports = [
            "$stateParams",
            "$scope",
            "$http",
            function ($stateParams, $scope, $http) {

                var uri,
                    marker;

                //TODO: Do some DATA CLEANING so data is standardized before it reaches us

                /*
                //CHECKME: theoretically shouldn't be executed if cache is working correctly.
                //loads results if not previously loaded (i.e navigated to directly by url)
                apiSearch.search($stateParams.service, $stateParams.address)
                    .then(function success (data) {
                        $scope.results = data;
                    });
                */
                
                // Ensuring that the service name in the URL is Encoded
                $stateParams.service = encodeURIComponent($stateParams.service);

                $scope.showDistance = $stateParams.address ? true : false; 
           
                uri = ($stateParams.address) ? "/services/" + $stateParams.service + "/locations/" + $stateParams.address
                : "/services/" + $stateParams.service; 


                
                //if there is an active marker the list view was accessed
                //by marker click and map already recentred
                function linkResultToMarker() {                         
                        console.log("linktoResult in SINGLE-CONTROLLER line 42")

                        //links list result with relevant marker
                        marker = "m" + ($scope.results.indexOf($scope.result) + 1);
                        console.log("marker line 46 single-controller marker", marker);
                        $scope.markers[marker].icon.iconUrl = "../img/icons/yellow-marker.png";
                        $scope.updateActiveMarker($scope.markers[marker]);
                        
                        //recentres map on the list result selected
                        $scope.updateCentre({
                            lat: Number($scope.result.Latitude),
                            lng: Number($scope.result.Longitude),
                            zoom: 15
                        });
                    }
                
                //if single view accessed through list it will link to map
                if($scope.results) { 
                    //selects item from results with matching {id}
                    $scope.result = $scope.results.filter(function (result) {
                        return result.display.Name === $stateParams.id;
                    })[0];
                    if(!$scope.activeMarker && $scope.results.indexOf($scope.result) > -1) { 
                        linkResultToMarker(); 
                    } 
                }

               //this function throws up the error undefined is not a function
                if(!$scope.results || $scope.results.indexOf($scope.result) === -1 ) {
                $http.get(uri)
                    .success(function success (data) {
                        $scope.updateResults(data.properties);
                        $scope.updateLocationSelected(data.location);
                        // selects item from results with matching {id}
                        $scope.result = $scope.results.filter(function (result) {
                            return result.display.Name === $stateParams.id;
                        })[0];

                        if($stateParams.id) {
                            linkResultToMarker(); 
                        }

                    });

                 }

            }
        ];
}());
