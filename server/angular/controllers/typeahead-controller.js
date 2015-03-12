/*****************************
*   TYPEAHEAD-CONTROLLER.JS
*
*****************************/

//TODO: autofocus on huge typeahead lists

var resetActiveMarker = require('../lib/reset-active-marker.js');

function getObject (array, selected) {
    return array.filter(function (item) {
        if (item.title.indexOf(selected) > -1) {
            return item;
        }
    });
}

;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$location",
        "buttonHandlers",
        "fetchToken",
        "$http",
        "$stateParams",
        "apiSearch",
        "markers",
        "localstorage",
        "locationCheck",
        "validate",
        "menuFind",
        "localStorageService",
        "$timeout",
        "httpq",
        function ($scope, $location, buttonHandlers, fetchToken, $http, $stateParams, apiSearch, markers, localstorage, locationCheck, validate, menuFind, localStorageService, $timeout, httpq) {

            var uprnArray,
                centreLocation,
                round = require("../lib/round.js"),
                url = $location.path();

            $scope.selected = '';
            $scope.searchAgain = buttonHandlers.searchAgain($scope, "/home");
            $scope.geolocationToolTip = 'Click to use my current location';
            $scope.geolocate = locationCheck.postcodeSearch();
            $scope.maplisttoggle = false;
            $scope.mapOrList = 'Click or swipe left to see the map';
            uprnArray = [];

            if($stateParams.address) {

                $scope.address = validate.cleanDisplayAddress($stateParams.address);

                $scope.$on('$locationChangeSuccess', function(event) {
                    var updatedAddress = $location.path().split('/').pop();
                    $scope.address = validate.cleanDisplayAddress(updatedAddress); 
                });
            }

            if (window.innerWidth < 768 || screen.width < 768) {
                $scope.toolTipPlacement = "bottom";
            } else {
                $scope.toolTipPlacement = "right";
            }

            $scope.toggleView = function () {
                if(screen.width < 768) {
                    $scope.maplisttoggle = !$scope.maplisttoggle;
                    if ($scope.maplisttoggle) {
                        $scope.mapOrList = 'Click to see the list';
                    } else {
                        $scope.mapOrList = 'Click or swipe left to see the map';
                    }
                }
            };



            $scope.geolocateUser = function() {
                markers.geolocateUser($scope, url)();
                resetActiveMarker($scope);
            };

            if (locationCheck.locationFound()) {
                var address = $stateParams.address || $stateParams.uprn;
                searchApi(address);
            }

            if (locationCheck.resultsLoaded()) {
                $scope.mapToggle = true;
            }
            if(locationCheck.addressSearch()) {

                if ($location.path().indexOf('location') === -1) {
                    localstorage.get($scope)();
                }

                serviceApiSearch();

                $scope.placeholder = 'Enter an address';
                $scope.additions = '(($viewValue))';
                $scope.minLength = '1';

                getAddresses();

            } else {

                $scope.placeholder = 'Enter a service to search';
                $scope.additions = ' | filter:$viewValue | limitTo: 8';
                $scope.minLength = '2';

                $scope.typeaheadSearchList = menuFind.services();
            }

            $scope.handler = function (selected) {

                var destination;

                if(locationCheck.addressSearch()) {
                    destination = addressHandler(uprnArray, selected);
                
                    $scope.showEnterLocation = false;
                    $scope.showResetLocation = true;

                }  else if(validate.service(selected)) {

                    destination = servicesHandler(selected);

                } else {
                    return $scope.updateError("Sorry, that is not a valid camden service. Please search again.");
                }
                $location.path(destination);
            };

            function servicesHandler (serv) {
                var service = serv.toLowerCase();

                return "/home/" + service + "/search";
            }

            function addressHandler (array, add) {
                //clears input box between searches
                $('input').val('');
                //if address has been selected by typeahead, then will exist in saved array
                var address = getObject(array, add);

                //if address has not been selected by typeahead
                if (address[0] === undefined) {
                     //searchApi checks if valid address, if not, will throw error.
                    localstorage.save(add);
                    searchApi(add);
                    return;
                } else {
                    localstorage.save(address);
                     if (locationCheck.postcodeSearch()) {
                        $scope.update("locationSelected", address[0].Postcode);
                        searchApi(address[0].Postcode);
                    } else {
                        $scope.update("locationSelected", address[0].UPRN);
                        searchApi(address[0].UPRN);
                    }

                   return locationCheck.destination(address);
                }
            }

            function getAddresses () {

                return fetchToken.getToken().success(function() {

                    $scope.typeaheadSearchList = function(value) {

                        return $http.get('https://camdenmaps-addresslookup.herokuapp.com/search/' + value)
                            .then(function(response){

                                if(typeof response.data === 'string') {
                                    return;
                                } else {

                                    return response.data.map(function (item){
                                        item.title = item.Unit + " " +
                                            item.BuildingName + " " +
                                            item.BuildingNumber + " " +
                                            item.Street + " " +
                                            item.Postcode;

                                        uprnArray.push(item);
                                        return item;
                                    });
                                }
                            });
                    };
                });
            }

            function serviceApiSearch () {
                if(locationCheck.serviceSearch()) {
                    apiSearch.search($stateParams.service)
                        .success(function success (data) {
                            if(data.hasOwnProperty("error")) {
                                // display error message
                                $scope.updateError(data.message);
                                // and redirect back to services menu to try again
                                $location.path("/home/services");
                            }
                            $scope.updateResults(data.properties);
                            //selects item from results with matching {id}
                            $scope.result = $scope.results.filter(function (result) {
                                return result.display.Name === $stateParams.id;
                            })[0];

                            $scope.addMarkers();
    
                            $scope.centre.zoom = markers.zoomCheck($scope)();
                        })
                        .error(function error(err) {
                            return $scope.updateError(err.message);
                        });  
                }
            }

            function searchApi (address) {

                var path,
                    service,
                    lat,
                    lng,
                    resetActiveMarker,
                    mapMarkers;

                    resetActiveMarker = require("../lib/reset-active-marker");
                    mapMarkers = $scope.markers;

                if (locationCheck.postcodeSearch()){

                    if(address) {
                        
                        lat = null;
                        lng = null;
                        
                        service = $stateParams.service || 'streetworks';

                        if(address === "your location") {
                            lat = mapMarkers.m0.lat;
                            lng = mapMarkers.m0.lng;
                        }

                        apiSearch.search(service, address, lat, lng)
                            .success(function success (data) {
                                if(data.hasOwnProperty("error")) {
                                    return $scope.updateError(data.message);
                                }

                                $scope.update("markers", {});
                                $scope.updateResults(data.properties);
                                $scope.update("locationSelected", data.location);
                                $scope.addMarkers();

                                // this rounds results to one decimal place 
                                $scope.results.forEach(function(entry) {
                                    entry.Distance = round(entry.Distance);
                                });

                                $scope.result = $scope.results.filter(function (result) {
                                    return result.display.Name === $stateParams.id;
                                })[0];

                                resetActiveMarker($scope);

                                centreLocation = data.location;

                                if ($location.path().indexOf("/streetworks") > -1) {

                                    path = "/home/streetworks/location/" + address;

                                } else {

                                    path = "/home/" + $stateParams.service + "/location/" + address;
                                    //redirects to new path and runs location controller
                                }

                                $location.path(path);
                            })

                            .error(function (data) {
                                return $scope.updateError("Sorry, that does not appear to be a valid camden address.");
                            })

                            .finally(function () {

                                $timeout(function () {
                                    $scope.update('centre', {
                                        lat: Number(centreLocation.Latitude),
                                        lng: Number(centreLocation.Longitude),
                                        zoom: markers.zoomCheck($scope)()
                                    })

                                    $scope.markers.m0.message = $scope.address;
                                }, 1500);
                            });
                    }

                } else if ($location.path().indexOf('neighbourhood') > -1) {

                    var uprn = $stateParams.uprn || address;

                    apiSearch.searchNeighbourhood(uprn)
                        .success(function(data) {

                            if (data.hasOwnProperty("error")) {
                                $location.path("/home/neighbourhood");
                                return $scope.updateError(data.message);
                            }
                            $scope.updateError("");
                            $scope.markers.neighbourhood = {
                                lat: Number(data.location.Latitude),
                                lng: Number(data.location.Longitude),
                                icon: {
                                    iconSize: [28],
                                    iconUrl: "../img/icons/location-marker.png"
                                },
                            };

                            $scope.update("centre", {
                                lat: (Number(data.location.Latitude) - 0.003),
                                lng: (Number(data.location.Longitude) - 0.004),
                                zoom: 15
                            });
                            if (hasPollingStation(data)) {
                                var pollingStationUPRN = data.information["Polling Station"].Url.split("uprn=").pop();
                                getPollingStationCoordinates(pollingStationUPRN);
                            }
                            return $scope.update("information", data.information);
                        })
                        .error(function(data) {
                            $scope.updateError("Sorry, it looks like something went wrong");
                            return $location.path("/home/neighbourhood");
                        });
                } else {
                    //TODO: need a error phrase for when a non-typeahead search is done on `about your neighbourhood`
                    return $scope.updateError("Sorry, something went wrong");
                }
            }

            /*
            * HELPER FUNCTIONS
            */

            var pollingStationCoordinates;

            $scope.showPollingStation = false;

            $scope.togglePollingStation = function() {
                if ($scope.showPollingStation) {
                    $scope.showPollingStation = false;
                    delete $scope.markers.pollingStation;
                } else {
                    $scope.showPollingStation = true;
                    $scope.markers.pollingStation = pollingStationCoordinates;
                    if(screen.width < 768) {
                        $scope.toggleView();
                        $scope.centre.lat = $scope.markers.pollingStation.lat; 
                        $scope.centre.lng = $scope.markers.pollingStation.lng; 



                    }
                }

            };

            function getPollingStationCoordinates (uprn) {

                apiSearch.searchNeighbourhood(uprn)
                    .success(function(data) {

                        pollingStationCoordinates = {

                            lat: Number(data.location.Latitude),
                            lng: Number(data.location.Longitude),
                            icon: {
                                iconSize: [28],
                                iconUrl: "img/icons/ballot.png"
                            }

                        };

                        if($scope.showPollingStation) {
                            $scope.markers.pollingStation = pollingStationCoordinates;
                        }

                    });

            }

            function hasPollingStation (data) {

                return data.information.hasOwnProperty("Polling Station");

            }
        }
    ];
}());
