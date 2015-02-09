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

                function getItems() {

                    var newArray = [];

                    for (var i = menu.length - 1; i >= 0; i--) {
                    
                        if (menu[i].type === "service") {
                            newArray.push(menu[i].title);
                        }
                        
                    };
                    return newArray;
                };

            if(($location.path().indexOf("/neighbourhood") > -1) || ($location.path().indexOf("/streetworks") > -1)) { 

                console.log("address search goes here");

            } else {

                $scope.typeaheadSearchList = getItems();

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



                    
        			