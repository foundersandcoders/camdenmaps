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
        "scrollElement",
        function ($scope, $location, buttonHandlers, fetchToken, $http, $stateParams, apiSearch, markers, localstorage, locationCheck, validate, menuFind, localStorageService, scrollElement) {

            var uprnArray,
                round = require("../lib/round.js");

            $scope.selected = '';
            $scope.searchAgain = buttonHandlers.searchAgain($scope, "/home");
            $scope.geolocationToolTip = 'Click to use my current location';
            $scope.geolocate = locationCheck.postcodeSearch();
            $scope.maplisttoggle = false;
            $scope.mapOrList = 'map';
            uprnArray = [];

            $scope.toggleView = function () {
                $scope.maplisttoggle = !$scope.maplisttoggle;
                if ($scope.maplisttoggle) {
                    $scope.mapOrList = 'list';
                } else {
                    $scope.mapOrList = 'map';
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

            if(locationCheck.addressSearch()) {

                if ($location.path().indexOf('location') === -1) {
                    localstorage.get($scope)();
                }

                //runs on services to display all the results or those around the default location
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

            $scope.$watch(function(){

                var typeaheadActivated = $("input").attr('aria-expanded');
                var data = $(".dropdown-menu").html()//("aria-activedescendant");
                console.log(data);

                if (typeaheadActivated === "true") {
                    var dropDown = $(".dropdown-menu");
                    var currentMatch = $("li.active").change( function() {
                        console.log('hello');
                    })
                    // console.log(currentMatch);
                    // scrollElement.stop(dropDown, currentMatch);                      
                }
            });

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
                            })
                    };
                });
            }

            function searchApi (address) {

                var path,
                    service,
                    resetActiveMarker = require("../lib/reset-active-marker");

                if (locationCheck.postcodeSearch()){

                    if(address) {

                        if ($location.path().indexOf('streetworks') > -1) {
                            service = 'streetworks';
                        } else {
                            service = $stateParams.service;
                        }

                        apiSearch.search(service, address)
                            .success(function success (data) {
                                if(data.hasOwnProperty("error")) {
                                    return $scope.updateError(data.message);
                                }
                                
                                localstorage.save(address);

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

                                // $scope.centre = markers.centreCheck($scope)();
                                $scope.centre.zoom = markers.zoomCheck($scope)();

                                resetActiveMarker($scope);

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
                            });
                    }

                } else {
                    //TODO: need a error phrase for when a non-typeahead search is done on `about your neighbourhood`
                    return $scope.updateError("Sorry, something went wrong");
                }
            }
        }
    ];
}());
