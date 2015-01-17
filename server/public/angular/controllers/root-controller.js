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
            
            //functions to update results and location on root level 
            $scope.updateResults = function updateResults (newResults) {
                $scope.results = newResults;
            };
            $scope.updateLocationSelected = function updateLocationSelected (newLocation) {
                $scope.locationSelected = newLocation;
            };

            //************ MAP MANIPULATIONS ***************

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

            Object.size = function(obj) {
                var size = 0, key;
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) size++;
                }
                    return size;
            };
            
            $scope.addMarkers = function addMarkers() {

                    var root = $scope.results;

                    // console.log('size of results', Object.size(root));

                    var lat = function lat(i){
                        return Number($scope.results[i]["Latitude"]);
                    }

                    var lng = function lng(i) {
                        return Number(root[i]["Longitude"]);
                    }

                    var message = function message(i) {
                        //this stops undefined being returned in message
                        var check = function(value, spacing) {
                            if(value !== undefined && (value + "<br>") !== pointMessage) {
                                pointMessage += (value + spacing);
                            }
                        };

                        var pointMessage = "";
 
                        check(root[i]["display"]["Name"] || root[i]["display"][0]["Name"], "<br>"); 
                        check(root[i]["BuildingName"], "<br>");
                        check(root[i]["StreetNum"], " ");
                        check(root[i]["Street"], "<br>"); 
                        check(root[i]["PostCode"], "<br>");
                        check(root[i]["display"]["Telephone"], "");

                        return pointMessage;
                    };

                    // this creates the marker objects to plot the locations on the map
                    var markers = {};

                    for (var i = 0; i<Object.size(root); i++) {
                        var property = "m"+i;
                       
                        markers[property] = {};
                        markers[property].lat = lat(i);
                        markers[property].lng = lng(i);
                        markers[property].message = message(i);
  
                    }

                    $scope.updateMarkers(markers);

                };

        }  
    ];
}());
