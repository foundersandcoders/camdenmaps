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
            
            $scope.addMarkers = function addMarkers() {

                    var root = $scope.results;

                    var lat = function lat(i){
                        return Number($scope.results[i]["Latitude"]);
                    }

                    var lng = function lng(i) {
                        return Number(root[i]["Longitude"]);
                    }

                    var message = function message(i) {
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

                        // return PoIName + "<br>" + root.Property[i]["-BuildingName"] + "<br>" + root.Property[i]["-StreetNum"] + " " + root.Property[i]["-Street"] + "<br>" + root.Property[i]["-PostCode"] + "<br>" + root.Property[i]["PoI"]["-Telephone"];

                        return pointMessage;
                    };

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
