/*****************************
*   TYPEAHEAD-CONTROLLER.JS
*
*****************************/

;(function () {
    "use strict";

    module.exports = [
        "$scope",
        function ($scope) {

        	var menu = [];

        	menu = require("../menu.json");

            $scope.selected = '';

            $scope.typeaheadServicesList = menu.filter(function (item) {
                if (item.type === "service") {
                    return item;
                }
            });
        }
    ];
}());



                    
        			