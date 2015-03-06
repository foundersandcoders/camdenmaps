/***************************
*   ROOT-CONTROLLER.JS
*
***************************/

;(function () {
    "use strict";

    function stripText(word) {
        return word.replace(/[^0-9" "]+/ig,"").replace(/\s+$/,'');
    }

    module.exports = [
        "$scope",
        "markers",
        "buttonHandlers",
        function ($scope, markers, buttonHandlers) {

            //stores geo data for camden borough boundaries
            var camdenBoundaries = require("../../public/lib/camdenBorough.geo.json");
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

            $scope.centre = {
                    lat: 51.541,
                    lng: -0.139991,
                    zoom: 13,
                };
            $scope.maxbounds = {
                northEast: {
                    lat: 51.593,
                    lng: -0.0745
                },
                southWest: {
                    lat: 51.490,
                    lng: -0.259
                }
            };
            $scope.defaults = {
                scrollWheelZoom: true,
                tileLayer: "http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png",
                zoomControlPosition: "bottomright",
            };
            $scope.markers = {};
            $scope.geojson = {
                data: camdenBoundaries,
                style: {
                    fillColor: "#E6E6E6",
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.6
                }
            };

            $scope.addMarkers = markers.addMarkers($scope);

        }

    ];
}());
