/******************************
*   LOCATION-CONTROLLER.JS
*
******************************/

//TODO: Add handler for List Results and Search Again buttons
//Broken results: recyling, connexions... these could be all results with fewer than 8 results becuase of hard coding 8 markers

;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$location",
        "$stateParams",
        "$http",
        function ($scope, $location, $stateParams, $http) {

        var path,
            destination;

            // Args will contain the marker name and other relevant information   
            $scope.$on('leafletDirectiveMarker.click', function(e, args) {
                //this will reset the colour for any marker currently selected        
                if($scope.activeMarker) { $scope.activeMarker.icon.iconUrl = "../img/icons/marker-hi.png"; }
                
                //if the location marker if selected it will stay on the current view
                if (args.markerName === "m0") {
                    path = "/home/" + $stateParams.service + "/location/" + $scope.address;
                    $location.path(path);
                } 
                //otherwise the single results page will be shown
                else {
                    //sets active marker so it can be reset when user clicks elsewhere
                    $scope.activeMarker = $scope.markers[args.markerName];

                    //changes colour of marker selected
                    $scope.markers[args.markerName].icon.iconUrl = "../img/icons/yellow-marker.png";
                    
                    //as you click on markers the map recentres to place them in the centre
                    $scope.updateCentre({
                        lat: args.leafletEvent.latlng.lat,
                        lng: args.leafletEvent.latlng.lng,
                        zoom: 15
                    });

                    //correct path will depend on if a location has been entered
                    path = $stateParams.address ?  
                        "/home/" + $stateParams.service + "/location/" + $stateParams.address + "/" + $scope.markers[args.markerName].name 
                        : "/home/" + $stateParams.service + "/search/" + $scope.markers[args.markerName].name;
                    $location.path(path);
                    

                } 

            });


            // Args will contain the marker name and other relevant information 
            $scope.$on('leafletDirectiveMap.click', function(e, args) {
                //if there is an active marker it will be reset to default icon      
                if($scope.activeMarker) {
                    $scope.activeMarker.icon.iconUrl = "../img/icons/marker-hi.png";
                    $scope.updateActiveMarker(0);
                }

                // correct path will depend on if a location has been selected
                path = $stateParams.address ?  "/home/" + $stateParams.service + 
                "/location/" + $stateParams.address : "/home/" + $stateParams.service + 
                "/search";
                $location.path(path);
            });


            //model for image icon
            $scope.icon = require("../menu.json").filter(function filterImg (item) {
                var name = item.title + item.text;
                return name.toLowerCase() === $stateParams.service.toLowerCase();
            })[0].img;
            
            //reloads $scope.results with new data based on address 
            $http.get("/services/" + $stateParams.service + "/locations/" + $stateParams.address)
                .success(function success (data) {
                    console.log("http get running in location LOCATION-CONTROLLER");
                    $scope.updateResults(data.properties);
                    $scope.updateLocationSelected(data.location);
                    $scope.addMarkers();
                    $scope.updateCentre({
                        lat: Number($scope.locationSelected.Latitude),
                        lng: Number($scope.locationSelected.Longitude),
                        zoom: 15
                    });
                });

            $scope.service = $stateParams.service;
            $scope.address = $stateParams.address.toUpperCase();

            $scope.searchAgain = function searchAgain () {
                $location.path("/home/services");
                $scope.updateMarkers({});
                $scope.updateLocationSelected({});
                $scope.updateCentre({
                        lat: 51.535923,
                        lng: -0.139991,
                        zoom: 14
                    });

            };

            $scope.listResults = function listResults () {       
                //clears the active marker
                if($scope.activeMarker) {
                    $scope.activeMarker.icon.iconUrl = "../img/icons/marker-hi.png";
                    $scope.updateActiveMarker(0);
                }

                destination = "/home/"+$scope.service+"/location/"+$scope.address+"/list"; 
                $location.path(destination);
            };

            //button to exit list view
            $scope.exit = function exit () {
                var current = $location.path();
                destination = current.substring(0, current.indexOf("/list"));
                $location.path(destination);
            };

            $scope.toggle = function toggle() {
                if($location.path().indexOf("/list") > -1) { 
                    return $scope.exit(); 
                } else {
                    return $scope.listResults();
                }
            };

            //return icon url from menu.json
            $http.get("menu.json")
                .success(function success(menu) {
                    $scope.iconUrl = menu.filter(function (item) {
                        return item.title === $scope.service;
                    })[0].img;
                });
                
        }
    ];
}());
