/******************************
*   LOCATION-CONTROLLER.JS
*
******************************/

//TODO: Add handler for List Results and Search Again buttons
//Broken results: recyling, connexions... these could be all results with fewer than 8 results becuase of hard coding 8 markers

;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$location",
        "$stateParams",
        "$http",
        function ($scope, $location, $stateParams, $http) {
            
            //model for image icon
            $scope.icon = require("../menu.json").filter(function filterImg (item) {
                var name = item.title + item.text;
                return name.toLowerCase() === $stateParams.service.toLowerCase();
            })[0].img;
            
            //reloads $scope.results with new data based on address 
            $http.get("/services/" + $stateParams.service + "/locations/" + $stateParams.address)
                .success(function success (data) {
                    $scope.updateResults(data.properties);
                    $scope.updateLocationSelected(data.location);
                    $scope.addMarkers();
                    $scope.updateCentre({
                        lat: Number($scope.locationSelected.Latitude),
                        lng: Number($scope.locationSelected.Longitude),
                          zoom: 14
                    });
                });

            $scope.service = $stateParams.service;
            $scope.address = $stateParams.address.toUpperCase();

            // $scope.searchAgain = function searchAgain () {
            //     console.log('search again on location controller');
            //     $scope.updateMarkers({});
            //     $location.path("/home/services");

            // };

            $scope.listResults = function listResults () {       
                var destination = "/home/"+$scope.service+"/location/"+$scope.address+"/list"; 
                $location.path(destination);
            };

            //button to exit list view
            $scope.exit = function exit () {
                var current = $location.path();
                var destination = current.substring(0, current.indexOf("/list"));
                $location.path(destination);
            };

            $scope.toggle = function toggle() {
                if($location.path().indexOf("/list") > -1) { 
                    return $scope.exit(); 
                } else {
                    return $scope.listResults();
                }
            };

            //return icon url from menu.json
            $http.get("menu.json")
                .success(function success(menu) {
                    $scope.iconUrl = menu.filter(function (item) {
                        return item.title === $scope.service;
                    })[0].img;
                });
                
        }
    ];
}());
