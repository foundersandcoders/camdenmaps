/*****************************
*   TYPEAHEAD-CONTROLLER.JS
*
*****************************/

;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$location",
        "buttonHandlers",
        "fetchToken",
        "$http",
        function ($scope, $location, buttonHandlers, fetchToken, $http) {

            var menu = [];

            $scope.selected = '';
             $scope.searchAgain = buttonHandlers.searchAgain($scope, "/home");

            if(isAddressSearch()) { 

                $scope.placeholder = 'Enter an address';
                $scope.additions = '(($viewValue))';

                fetchToken.getToken().success(function() {

                    $scope.typeaheadSearchList = function(value) {

                        return $http.get('https://camdenmaps-addresslookup.herokuapp.com/search/' + value)
                            .then(function(response){

                                var data = response.data.slice(0, 10);

                                return data.map(function (item){
                                    var displayItem = item.Unit + " " +
                                        item.BuildingName + " " +
                                        item.BuildingNumber + " " +
                                        item.Street + " " +
                                        item.Postcode + " " +
                                        item.UPRN;
                                    return displayItem;
                                });
                            });
                    };
                });

            } else {

                menu = require("../menu.json");

                $scope.placeholder = 'Enter a service to search';
                $scope.additions = ' | filter:$viewValue | limitTo: 8';

                $scope.typeaheadSearchList = getItems(menu);
            }

            $scope.handler = function (item) {
                var service,
                    uprn,
                    destination;

                if(isAddressSearch()) {

                    uprn = item.slice(-7);

                    destination = "/home/neighbourhood/" + uprn;

                } else {

                    service = encodeURIComponent(item);

                    destination = "/home/" + service + "/search";
                }
                $location.path(destination);
            };

            function getItems(array) {

                var newArray = [];

                for (var i = array.length - 1; i >= 0; i--) {
                    if (array[i].type === "service") {
                        newArray.push(array[i].title);
                    }
                }
                return newArray;
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
        }
    ];
}());
