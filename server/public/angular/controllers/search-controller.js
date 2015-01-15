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
                    $scope.addMarkers();
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

            var called = false;

            $scope.toggle = function toggle() {
                if(!called) { called = true; return $scope.listResults(); }
                $scope.exit();
                called = false;
            };
            
            $scope.addMarkers = function addMarkers() {

                    var root = $scope.results;

                    function lat(i){
                        return Number($scope.results[i]["Latitude"]);
                    }

                    function lng(i) {
                        return Number(root[i]["Longitude"]);
                    }

                    function message(i) {
                        //this stops undefined being returned in message
                        var check = function(value, spacing) {
                            if(value !== undefined) {
                                pointMessage += (value + spacing);
                            }
                        };

                        var pointMessage = "";

                        //TODO work out a sensible way to loop over this.... 
                        //TODO replace view with nothing if it returns 0, ref car parks
                        check(root[i]["display"]["Name"] || root[i]["display"][0]["Name"], "<br>"); 
                        check(root[i]["BuildingName"], "<br>");
                        check(root[i]["StreetNum"], " ");
                        check(root[i]["Street"], "<br>"); 
                        check(root[i]["PostCode"], "<br>");
                        check(root[i]["display"]["Telephone"], "");

                        return pointMessage;
                    }

                    //this hard coding is for development purposes - *MUST* be changed
                    //only returns the first Name when there are more than one
                    var firstEight = {

                        m1: {
                            lat: lat(0),
                            lng: lng(0),
                            message: message(0)

                        },
                        m2: {
                            lat: lat(1),
                            lng: lng(1),
                            message: message(1)
                        },
                        m3: {
                            lat: lat(2),
                            lng: lng(2),
                            message: message(2)
                        },
                        m4: {
                            lat: lat(3),
                            lng: lng(3),
                            message: message(3)
                        },
                        m5: {
                            lat: lat(4),
                            lng: lng(4),
                            message: message(4)
                        },
                        m6: {
                            lat: lat(5),
                            lng: lng(5),
                            message: message(5)
                        },
                        m7: {
                            lat: lat(6),
                            lng: lng(6),
                            message: message(6)
                        },
                        m8: {
                            lat: lat(7),
                            lng: lng(7),
                            message: message(7)
                        }

                    };

                    $scope.updateMarkers(firstEight);

                };
        }
    ];
}());
