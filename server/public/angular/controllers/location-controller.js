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

            
            //reloads $scope.results with new data based on address 
            $http.get("/services/" + $stateParams.service + "/locations/" + $stateParams.address)
                .success(function success (data) {
                    $scope.updateResults(data.properties);
                    $scope.updateLocationSelected(data.location);
                    console.log('get location', data.location);
                    console.log('location in get', $scope.locationSelected);
                    console.log('location in get', $scope.locationSelected.Latitude);

                });

            $scope.service = $stateParams.service;
            console.log('state params.service', $stateParams.service);
            $scope.address = $stateParams.address.toUpperCase();

            $scope.searchAgain = function searchAgain () {
                //TODO: write logic for function
                $scope.updateMarkers({});
                $location.path("/home");
            };

            $scope.listResults = function listResults () {       
                //TODO: write logic for function
                var destination = "/home/"+$scope.service+"/location/"+$scope.address+"/list"; 
                $location.path(destination);
            };

            //to allow toggling in toggle()
            var called = false; 

            //button to exit list view
            $scope.exit = function exit () {
                var destination = "/home/" + $stateParams.service + "/location/" + $stateParams.address;
                $location.path(destination);
            };

            $scope.toggle = function toggle() {
                if(!called) { called = true; return $scope.listResults(); }
                $scope.exit();
                called = false;
            };

            //return icon url from menu.json
            $http.get("menu.json")
                .success(function success(menu) {
                    $scope.iconUrl = menu.filter(function (item) {
                        return item.title === $scope.service;
                    })[0].img;
                });


            $scope.addMarkers = function addMarkers() {

                    var root = $scope.results;

                    console.log('results', $scope.results);
                     console.log('location', $scope.locationSelected);


                    function lat(i){
                        return Number($scope.results[i]["Latitude"]);
                    }

                    function lng(i) {
                        return Number(root[i]["Longitude"]);
                    }

                    function message(i) {
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
                    }

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

                // var newCentre = {
                //   centre: {
                //     lat: Number($scope.location.Latitude),
                //     lng: Number($scope.location.Longitude),
                //     zoom: 14
                //   }
                // };

                $scope.addMarkers();
                // $scope.updateCentre(newCentre);
                console.log('lat', $scope.locationSelected.Latitude);
                console.log('location', $scope.locationSelected);




        }
    ];
}());
