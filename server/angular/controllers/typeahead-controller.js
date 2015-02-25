/*****************************
*   TYPEAHEAD-CONTROLLER.JS
*
*****************************/

//todo: autofocus on huge typeahead lists

/*
* HELPER FUNCTIONS:
*/

function getObject (array, selected) {
    return array.filter(function (item) {
        if (selected === item.title) {
            return item;
        }
    });
}

function getServices (array) {
    return array.filter(function (item) {
        if (item.type === "service") {
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
        function ($scope, $location, buttonHandlers, fetchToken, $http, $stateParams, apiSearch, markers, localstorage, locationCheck) {

            var menu = [],
                uprnArray = [];

            $scope.selected = '';
            $scope.searchAgain = buttonHandlers.searchAgain($scope, "/home");
            $scope.geolocationToolTip = 'Click to use my current location';
            $scope.geolocate = locationCheck.postcodeSearch();

            $scope.geolocateUser = function() {
                markers.geolocateUser($scope)();
                resetActiveMarker($scope);
            };

            if(locationCheck.addressSearch()) {

                localstorage.get($scope)();

                $scope.placeholder = 'Enter an address';
                $scope.additions = '(($viewValue))';

                getAddresses();

            } else {

                menu = require("../menu.json");

                $scope.placeholder = 'Enter a service to search';
                $scope.additions = ' | filter:$viewValue | limitTo: 8';

                $scope.typeaheadSearchList = getServices(menu);
            }

            $scope.handler = function (selected) {

                var service,
                    address,
                    checkService,
                    destination;

                if(locationCheck.addressSearch()) {

                    //if address has been selected by typeahead, then will exist in saved array
                    address = getObject(uprnArray, selected);

                    //if address has not been selected by typeahead
                    if (address[0] === undefined) {

                        //searchApi checks if valid address, if not, will throw error.
                        searchApi(selected);

                        return;
                    
                    } else {
                        
                        //saves location in localStorage
                        localstorage.save(address);

                        destination = locationCheck.destination(address);
                    }

                }  else if(validate.service(service, $scope.typeaheadSearchList)) {

                    service = encodeURIComponent(selected);

                    destination = "/home/" + service + "/search";

                } else {
                    return $scope.updateError("Sorry, it looks like that isn't a valid camden service");
                }

                $location.path(destination);
            };


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
                    noResults = require("../lib/no-results.js"),
                    resetActiveMarker = require("../lib/reset-active-marker");

                if (locationCheck.postcodeSearch()){

                    if(address) {
                        apiSearch.search($stateParams.service, address)
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
