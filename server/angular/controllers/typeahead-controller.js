/*****************************
*   TYPEAHEAD-CONTROLLER.JS
*
*****************************/

//todo: autofocus on huge typeahead lists

/*
* HELPER FUNCTIONS:
*/
var resetActiveMarker = require('../lib/reset-active-marker.js');

function getObject (array, selected) {
    return array.filter(function (item) {
        if (selected === item.title) {
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
        function ($scope, $location, buttonHandlers, fetchToken, $http, $stateParams, apiSearch, markers, localstorage, locationCheck, validate, menuFind) {

            var menu = [],
                uprnArray = [],
                url = $location.path();

            $scope.selected = '';
            $scope.searchAgain = buttonHandlers.searchAgain($scope, "/home");
            $scope.geolocationToolTip = 'Click to use my current location';
            $scope.geolocate = locationCheck.postcodeSearch();

            $scope.geolocateUser = function() {
                markers.geolocateUser($scope, url)();
                resetActiveMarker($scope);
            };

            if(locationCheck.addressSearch()) {

                localstorage.get($scope)();

                $scope.placeholder = 'Enter an address';
                $scope.additions = '(($viewValue))';

                getAddresses();

            } else {

                $scope.placeholder = 'Enter a service to search';
                $scope.additions = ' | filter:$viewValue | limitTo: 8';

                $scope.typeaheadSearchList = menuFind.services();
            }

            $scope.handler = function (selected) {

                var service,
                    checkService,
                    destination;

                if(locationCheck.addressSearch()) {

                    destination = addressHandler(uprnArray, selected);
                
                    $scope.showEnterLocation = false;
                    $scope.showResetLocation = true;


                }  else if(validate.service(selected)) {

                    destination = servicesHandler(selected);
                } else {
                    return $scope.updateError("Sorry, it looks like that isn't a valid camden service");
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
                    //saves location in localStorage
                    localstorage.save(address);

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

            function searchApi (address) {

                var path,
                    service,
                    noResults = require("../lib/no-results.js"),
                    resetActiveMarker = require("../lib/reset-active-marker");

                if (locationCheck.postcodeSearch()){

                    if(address) {

                        if ($location.path().indexOf('streetworks') > -1) {
                            service = 'streetworks';
                        } else {
                            service = $stateParams.service;
                        }

                        apiSearch.search(service, address)
                            .error(function (data) {
                                return $scope.updateError("Sorry, that doesn't appear to be a valid camden address");
                            })
                            .success(function success (data) {
                                if(data.hasOwnProperty("error")) {
                                    return $scope.updateError(data.message);
                                }

                                $scope.updateResults(data.properties);
                                $scope.result = $scope.results.filter(function (result) {
                                    return result.display.Name === $stateParams.id;
                                })[0];

                                $scope.addMarkers();
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
