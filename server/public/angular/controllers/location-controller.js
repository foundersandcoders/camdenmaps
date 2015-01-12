/******************************
*   LOCATION-CONTROLLER.JS
*
******************************/

//TODO: Add handler for List Results and Search Again buttons

;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$location",
        "$stateParams",
        "$http",
        function ($scope, $location, $stateParams, $http) {
            
            //reloads $scope.results with new data based on address 
            $http.get("/services/" + $stateParams.service + "/locations/" + $stateParams.address)
                .success(function success (data) {
                    $scope.results = data;
                });

            $scope.service = $stateParams.service;
            $scope.address = $stateParams.address;

            $scope.searchAgain = function searchAgain () {
                //TODO: write logic for function
                console.log("searching again");
            }

            $scope.listResults = function listResults () {
                //TODO: write logic for function
                var destination = "/home/"+$scope.service+"/location/"+$scope.address+"/list"; 
                $location.path(destination);
            }
        }
    ];
}());
