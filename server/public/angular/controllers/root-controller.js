/***************************
*   ROOT-CONTROLLER.JS
*
***************************/
;(function () {
    "use strict";

    //var camden = require("../../../lib/camdenCordinates.js");

    function stripText(word) {
        return word.replace(/[^0-9" "]+/ig,"").replace(/\s+$/,'');
    }

    module.exports = [
        "$scope",
        "$location",
        "$stateParams",
<<<<<<< HEAD
        "$http",
        function ($scope, $location, $stateParams, $http) {
            
=======
        "markers",
        function ($scope, $location, $stateParams, markers) {
           
            console.log("ROOT-CONTROLLER");

            //stores geo data for camden borough boundaries
            var camdenBoundaries = require("../../lib/camdenBorough.geo.json");
>>>>>>> dev
            //stores results at root for access by all controllers
            $scope.results = [];
            //stores entered location at root for access by leafletjs
            $scope.locationSelected = {};
<<<<<<< HEAD
           

=======
            //this will allow marker colour to change when it is highlighted
            $scope.activeMarker = 0;
            
>>>>>>> dev
            //functions to update results and location on root level 
            $scope.updateResults = function updateResults (newResults) {
                var i;
                for(i = 0; i < newResults.length; i += 1) {
                    newResults[i].display.Telephone = stripText(newResults[i].display.Telephone);
                }
                $scope.results = newResults;
                console.log($scope.results);
            };

            //used for updating centre, markers, active markers and location selected 
            $scope.update = function update (type, newType){
                $scope[type] = newType;
            };

            //************ MAP MANIPULATIONS ***************

<<<<<<< HEAD
            //this will allow marker colour to change when it is highlighted
            //in root as accessed by several controllers
            $scope.activeMarker = 0;
            //update active marker
            $scope.updateActiveMarker = function (newActiveMarker) {
                $scope.activeMarker = newActiveMarker;
            };


=======
>>>>>>> dev
            var regions = {
                camdenBorough: {
                    northEast: {
                        lat: 51.57878,
                        lng: -0.094538
                    },
                    southWest: {
                        lat: 51.450089,
                        lng: -0.218650
                    }
                }
            };

            angular.extend($scope, {
                centre: {
                    lat: 51.535923,
                    lng: -0.139991,
                    zoom: 14
                },
                maxbounds: regions.camdenBorough,
                defaults: {
                    scrollWheelZoom: false
                },
                markers: {},
<<<<<<< HEAD

                paths: {},
=======
                geojson: {
                    data: camdenBoundaries,
                    style: {
                        fillColor: "#E6E6E6",
                        weight: 2, 
                        opacity: 1,
                        color: 'white', 
                        dashArray: '3', 
                        fillOpacity: 0.6
                    }
                }
>>>>>>> dev

            });
            
<<<<<<< HEAD
            $http.get('lib/camdenBorough.geo.json').success(function (data, status){
                angular.extend($scope, {
                    geojson: {
                        data: data,
                        style: {
                            fillColor: "#E6E6E6",
                            weight: 2, 
                            opacity: 1,
                            color: 'white', 
                            dashArray: '3', 
                            fillOpacity: 0.7
                        }
                    }
                });
            }); 

            $scope.sendHome = function sendHome () {
                $location.path("/home");
                $scope.updateMarkers({});
                $scope.updateLocationSelected({});
                $scope.updateCentre({
                        lat: 51.535923,
                        lng: -0.139991,
                        zoom: 14
                    });
            }
=======
            $scope.addMarkers = markers.addMarkers($scope);
          
>>>>>>> dev

        }

    ];
}());
