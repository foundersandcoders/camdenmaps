/***************************
*   ROOT-CONTROLLER.JS
*
***************************/
;(function () {
    "use strict";

    module.exports = [
        "$scope",
        function ($scope) {
            
            //stores results at root for access by all controllers
            $scope.results = [];
            //stores entered location at root for access by leafletjs

            $scope.locationSelected = {};

            //stores current service icon
            $scope.icon = "";

            //functions to update results and location on root level 
            $scope.updateResults = function updateResults (newResults) {
                $scope.results = newResults;
            };

            $scope.updateLocationSelected = function updateLocationSelected (newLocation) {
                $scope.locationSelected = newLocation;
            };
            $scope.updateIcon = function updateIcon (newIcon) {
                $scope.icon = newIcon;
            };

            var regions = {
                camdenBorough: {
                    northEast: {
                        lat: 51.57878,
                        lng: -0.094538
                    },
                    southWest: {
                        lat: 51.510989,
                        lng: -0.218649
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
                markers: {}      
            });

            $scope.updateMarkers = function updateMarkers(newMarkers){
                $scope.markers = newMarkers;
            };

            $scope.updateCentre = function updateCentre(newCentre){
                $scope.centre = newCentre;
            };
            

        }  
    ];
}());
