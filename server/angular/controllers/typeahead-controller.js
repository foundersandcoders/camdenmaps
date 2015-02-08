/*****************************
*   TYPEAHEAD-CONTROLLER.JS
*
*****************************/

;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$location",
        function ($scope, $location) {

        	var menu = [];

        	menu = require("../menu.json");

            $scope.selected = '';

            $scope.typeaheadServicesList = menu.filter(function (item) {
                if (item.type === "service") {
                    return item;
                }
            });

            $scope.handler = function handler (item) {
                var service,
                    destination;

                service = encodeURIComponent(item);

                destination = "/home/" + service + "/search";

                $location.path(destination);

                console.log(item);
            }
        }
    ];
}());



                    
        			