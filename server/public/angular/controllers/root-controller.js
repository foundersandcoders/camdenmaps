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

            // $scope.update = function update (type, newType){
            //     $scope.type = newType
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

                    // this stops it recreating the whole object when the search location is added
                    // but it will run if there are only 5 markers and re-populate near search result
                    if(!$scope.markers.m6) {
                        // var x will save time as the loop does not have to look up the length each time
                        for (var i = 0, resultLength = Object.size(root); i<resultLength; i++) {

                            var property = "m" + (i+1);
                           
                            markers[property] = {};
                            markers[property].icon = {};
                            markers[property].lat = coord(i, "Latitude");
                            markers[property].lng = coord(i, "Longitude");
                            markers[property].name = $scope.results[i]["display"]["Name"];
                            markers[property].icon.iconUrl = "../img/icons/marker-hi.png";
                            markers[property].icon.iconSize = [28];

                        }
                        console.log('creating marker object in root controller');
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


                // $scope.highlightMarker = function highlightMarker(lat, lng) {
                //     var markers = $scope.markers;
                //     markers.m = {
                //             lat: Number(lat),
                //             lng: Number(lng),
                //             icon: {
                //                 iconUrl: "../img/icons/yellow-marker.png",
                //                 iconSize: [28]
                //             }
                //         };
                //     $scope.updateMarkers(markers);
                        
                // };

        }  
    ];
}());
