/*****************************
*   TYPEAHEAD-CONTROLLER.JS
*
*****************************/

//TODO: Auto center list on focus
//TODO: Hide uprn

;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$location",
        "fetchToken",
        "$http",
        function ($scope, $location, fetchToken, $http) {

            var menu = [],
                uprnArray = [];
            $scope.selected = '';

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

        /*
        * HELPER FUNCTIONS:
        * TODO: Move into services.
        */

            $scope.handler = function (selected) {
                var service,
                    uprn,
                    postcode,
                    filter,
                    destination;

                if(($location.path().indexOf("/neighbourhood") > -1)) {

                    filter = uprnArray.filter(function (item) {
                        if (selected === item.title) {
                            return item;
                        }
                    })

                    uprn = filter[0].UPRN;

                    console.log(uprn);

                    destination = "/home/neighbourhood/" + uprn;

                } else if (isPostcodeSearch()) {

                    destination = "/home/streetworks/locations" + postcode;

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
                                        item.Postcode + " " +
                                        item.UPRN;

                                    uprnArray.push(item);

                                    return item;
                                });
                            });
                    };
                });
            };

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

                if (($location.path().indexOf("/streetworks") > -1) || 
                    ($location.path().indexOf("/search") > -1)) {

                    return true;
                } else {
                    return false;
                }
            }     
        }
    ];
}());
