/********************************
*   SEARCH-CONTROLLER.JS
*
********************************/

//TODO: Better error handling
//TODO: Must have input validation for address/street name: HOW??? 
//TODO: Add button handlers for 'Search Again' and 'List Results'


;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$stateParams",
        "$location",
        "$http",
        function ($scope, $stateParams, $location, $http) {

            $http.get("/services/" + $stateParams.service)
                .success(function success (services) {
                    console.log('banana');

                    $scope.updateResults(services.Locations.Properties.Property);
                });

            //model for search query
            $scope.address = "";
            //model for error messages
            $scope.error = "";
            //model for service results
            $scope.results = [];
            //model for title
            $scope.service = $stateParams.service;
            //model for icon
            $scope.iconUrl = "";
            
            //return icon url from menu.json
            $http.get("menu.json")
                .success(function success(menu) {
                    $scope.iconUrl = menu.filter(function (item) {
                        return item.text.toLowerCase() === $scope.service;
                    })[0].img;
                });

            //populate results when response is received
            $http.get("/services/" + $stateParams.service)
                .success(function success (services) {
                    $scope.results = services;
                    console.log('make it work');
                });

            //redirects to next state when provided with address
            $scope.search = function search () {
                if ($scope.address) {
                    var path = "/home/" + $stateParams.service + "/location/" + $scope.address;
                    $location.path(path);
                } else {
                    $scope.error = "Please enter an address";
                } 
            };

            $scope.searchAgain = function searchAgain () {
                //TODO: write logic for function
                $location.path("/home");
            };

            $scope.listResults = function listResults () {
                //TODO: write logic for function
                console.log($scope.results);
                // var destination = "/home/"+$scope.service+"/location/"+$scope.address+"/list"; 
            };

        }
    ];
}());
