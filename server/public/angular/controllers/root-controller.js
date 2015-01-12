/***************************
*   ROOT-CONTROLLER.JS
*
***************************/
;(function () {
    "use strict";

    module.exports = [
        "$scope",
        function ($scope) {
            
            //initialize $scope.results at root level
            $scope.results = [];

            $scope.updateResults = function updateResults (data) {
                $scope.results = data;
            }

                            //initialize $scope.results at root level
                $scope.results = [];

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
                    camden: {
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
            

        }  
    ];
}());
