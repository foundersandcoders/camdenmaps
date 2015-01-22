/***************************
*   ROOT-CONTROLLER.JS
*
***************************/
;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$location",
        "$stateParams",
        function ($scope, $location, $stateParams) {
            
            //stores results at root for access by all controllers
            $scope.results = [];
            //stores entered location at root for access by leafletjs
            $scope.locationSelected = {};
            
            //functions to update results and location on root level 
            $scope.updateResults = function updateResults (newResults) {
                $scope.results = newResults;
            };

            // some comments
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

            var circleCentre = {
                a: {
                    lat: 51.535923,
                    lng: -0.139991
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

            $scope.updatePaths = function updateCentre(newPaths){
                $scope.paths = newPaths;
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
                    //These propertes should be dot notation



                    // instead of two function, one obj with two methods?
                    var lat = function lat(i){
                        return Number($scope.results[i]["Latitude"]);
                    }
                    var lng = function lng(i) {
                        return Number(root[i]["Longitude"]);
                    }

                    // var message = function message(i) {
                    //     //this stops undefined being returned in message
                    //     //will not return building name if same as display name
                    //     var check = function(value, spacing) {
                    //         if(value !== undefined && (value + "<br>") !== pointMessage) {
                    //             pointMessage += (value + spacing);
                    //         }
                        
                    // };

                    //     var pointMessage = "";
 
                    //     check(root[i]["display"]["Name"] || root[i]["display"][0]["Name"], "<br>"); 
                    //     check(root[i]["BuildingName"], "<br>");
                    //     check(root[i]["StreetNum"], " ");
                    //     check(root[i]["Street"], "<br>"); 
                    //     check(root[i]["PostCode"], "<br>");
                    //     check(root[i]["display"]["Telephone"], "");

                    //     return pointMessage;
                    // };


                    // this creates the marker objects to plot the locations on the map
                    var markers = $scope.markers;   

                    // this stops it recreating the whole object when the search location is added
                    // but it will run if there are only 5 markers and re-populate near search result
                    if(!$scope.markers.m6) {
                        // var x will save time as the loop does not have to look up the length each time
                        for (var i = 0, resultLength = Object.size(root); i<resultLength; i++) {
                            // var property = root[i]["display"]["Name"];
                            var property = "m" + (i+1);
                           
                            markers[property] = {};
                            markers[property].icon = {};
                            markers[property].lat = lat(i);
                            markers[property].lng = lng(i);
                            // markers[property].message = message(i);
                            markers[property].name = $scope.results[i]["display"]["Name"];
                            markers[property].icon.iconUrl = "../img/icons/markericon.png";
                            markers[property].icon.iconSize = [42, 49];
                        }
                        console.log('creating object');
                    }

                    // only runs when a search address has been entered
                    if($scope.locationSelected.Area) {
                        markers.m0 = {
                            lat: Number($scope.locationSelected.Latitude),
                            lng: Number($scope.locationSelected.Longitude),
                            // message: "Searching near " + $scope.locationSelected.Area.toUpperCase(),
                            focus: true,
                            name: "location",
                            icon: {
                                iconUrl: "../img/icons/locationpin2.png",
                                // iconSize: [30, 30]
                            }
                        };
                    }

                    $scope.updateMarkers(markers);


                };

        }  
    ];
}());
