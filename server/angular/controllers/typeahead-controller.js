/*****************************
*   TYPEAHEAD-CONTROLLER.JS
*
*****************************/

var resetActiveMarker = require("../lib/reset-active-marker.js");

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
        "markers",
        "localstorage",
        "locationCheck",
        "validate",
        "menuFind",
        "apiResponse",
        function ($scope, $location, buttonHandlers, fetchToken, $http, $stateParams, markers, localstorage, locationCheck, validate, menuFind, apiResponse) {

            var uprnArray,
                url = $location.path();

            $scope.selected = "";
            $scope.searchAgain = buttonHandlers.searchAgain($scope, "/home");
            $scope.geolocationToolTip = "Click to use my current location";
            $scope.geolocate = locationCheck.postcodeSearch();
            $scope.maplisttoggle = false;
            $scope.mapOrList = "Click or swipe left to see the map";
            uprnArray = [];

            if($stateParams.address) {
                $scope.address = validate.cleanDisplayAddress($stateParams.address);
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
                        $scope.mapOrList = "Click to see the list";
                    } else {
                        $scope.mapOrList = "Click or swipe left to see the map";
                    }
                }
            };

            $scope.geolocateUser = function() {
                markers.geolocateUser($scope, url, searchApi)();
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

                if ($location.path().indexOf("location") === -1) {
                    localstorage.get($scope)();
                }

                apiResponse.service($scope);

                $scope.placeholder = "Enter an address";
                $scope.additions = "(($viewValue))";
                $scope.minLength = "1";

                getAddresses();

            } else {

                $scope.placeholder = "Enter a service to search";
                $scope.additions = " | filter:$viewValue | limitTo: 8";
                $scope.minLength = "2";

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

                if (destination) {
                    $location.path(destination);
                }
            };

            function servicesHandler (serv) {
                var service = serv.toLowerCase();

                return "/home/" + service + "/search";
            }

            function addressHandler (array, add) {
                //clears input box between searches
                $("input").val("");
                //if address has been selected by typeahead, then will exist in saved array
                var address = getObject(array, add);

                //if address has not been selected by typeahead
                if (address[0] === undefined) {
                     //searchApi checks if valid address, if not, will throw error.
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

                        return $http.get('http://camdenmaps-addresslookup.herokuapp.com/search/' + value)

                            .then(function(response){

                                if(typeof response.data === "string") {
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

            function searchApi (address, gLat, gLng) {

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
                           
                        service = $stateParams.service || 'streetworks';

                        if(address === "your location" && mapMarkers.m0 && mapMarkers.m0.geolocation) {
                            lat = gLat;
                            lng = gLng;
                        } else {
                            lat = null;
                            lng = null;
                        }

                        apiResponse.searchAddress($scope, service, address, lat, lng);
                    }

                } else if ($location.path().indexOf("neighbourhood") > -1) {

                    var uprn = $stateParams.uprn || address;
                    if (!$stateParams.uprn) {
                        $http.get("/uprn/" + uprn).success(function(res) {
                            if((/\d{7}$/).test(res)) {
                                var path = "/home/neighbourhood-found/" + res;
                                $location.path(path);
                            } else {
                                $scope.updateError("Sorry, " + uprn + " is not a valid Camden address");
                            }
                            
                        });
                    } else {
                        apiResponse.neighbourhood($scope, address);
                    }
                } else {
                    return $scope.updateError("Sorry, something went wrong");
                }
            }

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
        }
    ];
}());
