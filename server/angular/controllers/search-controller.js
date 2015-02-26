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

            var path,
                destination,
                noResults,
                resetActiveMarker;

            // Ensuring that the service that displays is decoded
            $scope.service = decodeURI($stateParams.service);

            // Ensuring that the service name in the URL is Encoded
            $stateParams.service = encodeURIComponent($scope.service);

            $scope.category = menuFind.categoryByService($scope.service);

            noResults = require("../lib/no-results.js");
            resetActiveMarker = require("../lib/reset-active-marker");

            //model for title
            $scope.title = "Find your Nearest";
            //model for placeholder
            $scope.placeholder = "Please enter a postcode";
            $scope.icon = "";

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

            if( noResults($scope) ) {        

                apiSearch.search($stateParams.service)
                    .success(function success (data) {
                        if(data.hasOwnProperty("error")) {
                            // display error message
                            $scope.updateError(data.message);
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
                        return $scope.updateError(err.message);
                    });

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
            
            $scope.returnToCategories = buttonHandlers.searchAgain($scope, "/home/services")
            $scope.returnToServices = buttonHandlers.searchAgain($scope, "/home/" + $scope.category.title + "/service")


        }
    ];
}());
