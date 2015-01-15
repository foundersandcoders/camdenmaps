/********************************
*   SEARCH-CONTROLLER.JS
*
********************************/

//TODO: Better error handling
//TODO: Must have input validation for address/street name: HOW??? 


;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$stateParams",
        "$location",
        "$http",
        function ($scope, $stateParams, $location, $http) {

            //model for search query
            $scope.address = "";
            //model for error messages
            $scope.error = "";
            //model for title
            $scope.service = $stateParams.service;
            //model for image icon
            $scope.icon = require("../menu.json").filter(function filterImg (item) {
                var name = item.title + item.text;
                return name.toLowerCase() === $stateParams.service.toLowerCase();
            })[0].img;
            
            //populate results when response is received
            $http.get("/services/" + $stateParams.service)
                .success(function success (data) {
                    $scope.updateResults(data.properties);
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
                $location.path("/home/services");
            };

            $scope.listResults = function listResults () {
                var destination = "/home/"+$scope.service+"/search/list"; 
                $location.path(destination);
                
            };

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
        }
    ];
}());
