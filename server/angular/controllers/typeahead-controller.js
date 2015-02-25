/*****************************
*   TYPEAHEAD-CONTROLLER.JS
*
*****************************/

//TODO: Auto center list on focus for long typeahead lists

;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$location",
        "fetchToken",
        "$http",
        "$stateParams",
        "localStorageService",
        "apiSearch",
        "markers",
        function ($scope, $location, fetchToken, $http, $stateParams, localStorageService, apiSearch, markers) {

            var menu = [],
                uprnArray = [];

            $scope.selected = '';
            $scope.geolocationToolTip = 'Use my current location';
            $scope.geolocate = isPostcodeSearch();

            $scope.geolocateUser = function() {
                markers.geolocateUser($scope)();
                resetActiveMarker($scope);
            };

            if(isAddressSearch()) {

                locationGet();

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

                if(isAddressSearch()) {

                    //if address has been selected by typeahead, then will exist in saved array
                    address = getObject(uprnArray, selected)

                    //if address has not been selected by typeahead
                    if (address[0] === undefined) {

                        //searchApi checks if valid address, if not, will throw error.
                        searchApi(selected);

                        return;
                    
                    } else {
                        
                        //saves location in localStorage
                        locationSave(address);

                        destination = getAddressDestination(address);
                    }

                }  else if(isValidService(selected)) {

                    service = encodeURIComponent(selected);

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

                                return response.data.map(function (item){
                                    item.title = item.Unit + " " +
                                        item.BuildingName + " " +
                                        item.BuildingNumber + " " +
                                        item.Street + " " +
                                        item.Postcode;

                                    uprnArray.push(item);

                                    return item;
                                });
                            });
                    };
                });
            }

            function isValidService (service) {
                var match = $scope.typeaheadSearchList.filter(function (item) {
                    return item.title === service;
                });
                return (match.length >= 1);
            }
            
            /*
            * HELPER FUNCTIONS:
            * TODO: Move into services.
            */

            function locationGet () {

                var destination,
                    address;

                if (localStorageService.isSupported) {

                    address = localStorageService.get("USER-LOCATION");

                    if(address && address[0] && address[0].title) {

                        if($scope.activeMarker) {
                            //resets active marker
                            $scope.activeMarker.icon.iconUrl = "../img/icons/marker-hi.png";
                            $scope.update("activeMarker", 0);
                        }

                        $scope.value = address[0].title;

                        destination = getAddressDestination(address);
                        //redirects to new path and runs location controller
                        $location.path(destination);

                    } else {
                        localStorageService.remove("userLocation");
                        localStorageService.remove("USER-LOCATION");
                    }
                }
            }

            function locationSave(address) {
                if (localStorageService.isSupported) {
                    localStorageService.set("USER-LOCATION", address);
                }
            }

            function getAddressDestination (address) {

                return ($location.path().indexOf("/neighbourhood") > -1)
                        ? "/home/neighbourhood/" + address[0].UPRN
                        : ($location.path().indexOf("/streetworks") > -1)
                        ? "/home/streetworks/location/" + address[0].Postcode
                        : "/home/" + $stateParams.service + "/location/" + address[0].Postcode;

            }

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

            function isAddressSearch () {

                if (($location.path().indexOf("/neighbourhood") > -1) || 
                    ($location.path().indexOf("/streetworks") > -1) || 
                    ($location.path().indexOf("/search") > -1)) {

                    return true;
                } else {
                    return false;
                }
            }
            function isPostcodeSearch () {

                if (($location.path().indexOf("/streetworks") > -1)|| 
                    ($location.path().indexOf("/search") > -1)) {

                    return true;
                } else {
                    return false;
                }
            }


            function searchApi (address) {

                var path,
                    noResults = require("../lib/no-results.js"),
                    resetActiveMarker = require("../lib/reset-active-marker");

                if (isPostcodeSearch()){

                    if(address) {
                        apiSearch.search($stateParams.service, address)
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


                                if (localStorageService.isSupported) {
                                    localStorageService.set( "userLocation", address);
                                }

                                resetActiveMarker($scope);


                                path = "/home/" + $stateParams.service + "/location/" + address;
                                //redirects to new path and runs location controller
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
