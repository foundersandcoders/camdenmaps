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
        "markers",
        "buttonHandlers",
        "leafletData",
        function ($scope, $location, markers, buttonHandlers, leafletData) {
           

            //stores geo data for camden borough boundaries
            var camdenBoundaries = require("../../lib/camdenBorough.geo.json");
            //stores results at root for access by all controllers
            $scope.results = [];
            //stores entered location at root for access by leafletjs
            $scope.locationSelected = {};

            //this will allow marker colour to change when it is highlighted
            $scope.activeMarker = 0;
            
            //functions to update results and location on root level 
            $scope.updateResults = function updateResults (newResults) {
                var i;
                for(i = 0; i < newResults.length; i += 1) {
                    if (newResults[i].display.hasOwnProperty("Telephone")) {
                        newResults[i].display.Telephone = stripText(newResults[i].display.Telephone);
                    }
                }
                $scope.results = newResults;
            };

            //used for updating centre, markers, active markers and location selected 
            $scope.update = function update (type, newType){
                $scope[type] = newType;
            };

            //************ MAP MANIPULATIONS ***************

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
                    zoom: 13,
                    // autoDiscover: true
                },
                maxbounds: regions.camdenBorough,
                defaults: {
                    scrollWheelZoom: false
                },
                markers: {},

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

            });

            $scope.sendHome = buttonHandlers.searchAgain($scope, "/home");

            $scope.addMarkers = markers.addMarkers($scope);

            leafletData.getMap().then(function(map) {
                     map.locate({setView: false, watch: false})
                     .on('locationfound', function (e){
                        if (51.57878 > e.latitude > 51.450089 && -0.094538 > e.longitude > -0.218650) {
                            console.log("inside Camden");
                            $scope.markers.locating = {
                                lat: e.latitude,
                                lng: e.longitude,
                                message: "You are here"
                            };
                            map.locate({setView: true, watch: false});
                        } else {
                            console.log("outside Camden");
                        }
                     });
            });


        }

    ];
}());
