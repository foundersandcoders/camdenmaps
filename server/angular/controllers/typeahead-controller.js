/*****************************
*   TYPEAHEAD-CONTROLLER.JS
*
*****************************/

//TODO: Auto center list on focus for long typeahead lists
//TODO: Add Error messages

;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$location",
        "fetchToken",
        "$http",
        "$stateParams",
        "localStorageService",
        function ($scope, $location, fetchToken, $http, $stateParams, localStorageService) {

            var menu = [],
                uprnArray = [];

            $scope.selected = '';
            $scope.geolocationToolTip = 'Use my current location';
            $scope.geolocate = isPostcodeSearch();

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

                    address = getObject(uprnArray, selected)

                    if (address[0] === undefined) {

                        return $scope.updateError("Sorry, it looks like that isn't a valid camden address");
                    
                    } else {
                        locationSave(address);

                        destination = getAddressDestination(address);
                    }

                }  else {

                    checkService = $scope.typeaheadSearchList.filter(function (item) {
                        if (item.title === selected) {
                            return item;
                        }
                    })

                    if (checkService[0] === undefined) {

                        return $scope.updateError("Sorry, it looks like that isn't a valid camden service");
                    
                    } else {

                        service = encodeURIComponent(selected);

                        destination = "/home/" + service + "/search";
                    }
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

            /*
            * HELPER FUNCTIONS:
            * TODO: Move into services.
            */

            function locationGet () {

                var destination,
                    address;

                if (localStorageService.isSupported) {

                    address = localStorageService.get("userLocation");

                    if(address) {
                        if($scope.activeMarker) {
                            //resets active marker
                            $scope.activeMarker.icon.iconUrl = "../img/icons/marker-hi.png";
                            $scope.update("activeMarker", 0);
                        }

                        $scope.value = address[0].title;

                        destination = getAddressDestination(address);
                        //redirects to new path and runs location controller
                        $location.path(destination);

                    }
                }
            }

            function locationSave(address) {
                if (localStorageService.isSupported) {
                    localStorageService.set("userLocation", address);
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
        }
    ];
}());
