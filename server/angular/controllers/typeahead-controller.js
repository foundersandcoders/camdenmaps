/*****************************
*   TYPEAHEAD-CONTROLLER.JS
*
*****************************/

//TODO: Auto center list on focus for long typeahead lists
//TODO: Add Error messages
//TODO: Add remember location here.

;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$location",
        "fetchToken",
        "$http",
        "$stateParams",
        function ($scope, $location, fetchToken, $http, $stateParams) {

            var menu = [],
                uprnArray = [];
            $scope.selected = '';

            $scope.geolocate = isPostcodeSearch();

            if(isAddressSearch()) { 

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
                    destination;

                if(isAddressSearch()) {

                    address = getObject(uprnArray, selected)

                    destination = ($location.path().indexOf("/neighbourhood") > -1)
                                ? "/home/neighbourhood/" + address[0].UPRN
                                : ($location.path().indexOf("/streetworks") > -1)
                                ? "/home/streetworks/location/" + address[0].Postcode
                                : "/home/" + $stateParams.service + "/location/" + address[0].Postcode;

                }  else {

                    service = encodeURIComponent(selected);

                    destination = "/home/" + service + "/search";
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
