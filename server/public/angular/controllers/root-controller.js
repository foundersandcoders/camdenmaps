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
        "$http",
        function ($scope, $location, $stateParams, $http) {
            
            //stores results at root for access by all controllers
            $scope.results = [];
            //stores entered location at root for access by leafletjs
            $scope.locationSelected = {};
           

            //functions to update results and location on root level 
            $scope.updateResults = function updateResults (newResults) {
                var i;
                for(i = 0; i < newResults.length; i += 1) {
                    newResults[i].display.Telephone = stripText(newResults[i].display.Telephone);
                }
                $scope.results = newResults;
                console.log($scope.results);
            };

            // some comments
            $scope.updateLocationSelected = function updateLocationSelected (newLocation) {
                $scope.locationSelected = newLocation;
            };

            //************ MAP MANIPULATIONS ***************

            //this will allow marker colour to change when it is highlighted
            //in root as accessed by several controllers
            $scope.activeMarker = 0;
            //update active marker
            $scope.updateActiveMarker = function (newActiveMarker) {
                $scope.activeMarker = newActiveMarker;
            };


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

            $scope.setRegion = function(region) {
                if (!region) {
                    $scope.maxbounds = {};
                } else {
                    $scope.maxbounds = regions[region];
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

                paths: {},

            });


            $scope.updateMarkers = function updateMarkers(newMarkers){
                $scope.markers = newMarkers;
            };

            $scope.updateCentre = function updateCentre(newCentre){
                $scope.centre = newCentre;
            };

            $scope.updatePaths = function updateCentre(newPaths){
                $scope.paths = newPaths;
            };

            // $scope.update = function update (type, newType){
            //     $scope[type] = newType
            // };

            Object.size = function(obj) {
                var size = 0, key;
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) size++;
                }
                    return size;
            };
            
            $scope.addMarkers = function addMarkers() {

                    var root = $scope.results;
                    //These propertes should be dot notation

                    // instead of two function, one obj with two methods?
                    var coord = function coord(i, coord){
                        return Number($scope.results[i][coord]);
                    };

                    // this creates the marker objects to plot the locations on the map
                    var markers = $scope.markers;   
                    
                    //this is declared here to prevent it being declared every time the loop runs
                    var property;

                    // this stops it recreating the whole object when the search location is added
                    // but it will run if there are only 5 markers and re-populate near search result
                    if(!$scope.markers.m6) {
                        // var x will save time as the loop does not have to look up the length each time
                        for (var i = 0, resultLength = Object.size(root); i<resultLength; i++) {

                            property = "m" + (i+1);
                           
                            markers[property] = {};
                            markers[property].icon = {};
                            markers[property].lat = coord(i, "Latitude");
                            markers[property].lng = coord(i, "Longitude");
                            markers[property].name = $scope.results[i]["display"]["Name"];
                            markers[property].icon.iconUrl = "../img/icons/marker-hi.png";
                            markers[property].icon.iconSize = [28];

                        }
                        
                    }

                    // only runs when a search address has been entered
                    if($scope.locationSelected.Area) {
                        markers.m0 = {
                            lat: Number($scope.locationSelected.Latitude),
                            lng: Number($scope.locationSelected.Longitude),
                            name: "location",
                            focus: true,
                            popupOptions: {
                                closeOnClick: false
                            },
                            message: $scope.locationSelected.Area.toUpperCase(),
                            icon: {
                                iconUrl: "../img/icons/location-marker.png",
                                iconSize: [28]
                            }
                        };
                    }

                    $scope.updateMarkers(markers);

                };

            
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

        }

    ];
}());
