/*****************************
*   TYPEAHEAD-CONTROLLER.JS
*
*****************************/

function getItems(array) {

    var newArray = [];

    for (var i = array.length - 1; i >= 0; i--) {
    
        if (array[i].type === "service") {
            newArray.push(array[i].title);
        }
        
    };
    return newArray;
};

function getAddresses(array) {

    var newArray = [];

    for (var i = array.length - 1; i >= 0; i--) {
    
        var string = array[i].BuildingNumber + " " +
                        array[i].Street + " " +
                        array[i].Postcode + " " +
                        array[i].UPRN;

        newArray.push(string);
        
    };
    return newArray;
};

;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$location",
        function ($scope, $location) {

                var menu = [],
                    addresses = [];

                $scope.selected = '';


            if(($location.path().indexOf("/neighbourhood") > -1) || ($location.path().indexOf("/streetworks") > -1) || ($location.path().indexOf("/search") > -1)) { 

                addresses = require("../../lib/address.json")

                $scope.placeholder = 'Enter an address';

                $scope.limitNumber = 20;

                $scope.typeaheadSearchList = getAddresses(addresses);

                $scope.handler = function handler (address) {
                    var uprn,
                        destination;

                    uprn = address.slice(-7);

                    destination = "/home/neighbourhood/" + uprn;

                    $location.path(destination);
                };

            } else {

                menu = require("../menu.json");

                $scope.placeholder = 'Enter a service to search'

                $scope.limitNumber = 8;

                $scope.typeaheadSearchList = getItems(menu);

                $scope.handler = function handler (item) {
                    var service,
                        destination;

                    service = encodeURIComponent(item);

                    destination = "/home/" + service + "/search";

                    $location.path(destination);
                };
            }
        }
    ];
}());
                    
        			