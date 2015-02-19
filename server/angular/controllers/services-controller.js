/*******************************************
*   SERVICES-CONTROLLER.JS
*
*
********************************************/

//TODO: Write service to access menu
//TODO: Preload visible items in a resolve

;(function () {
    "use strict";

    module.exports = [
            "$scope",
            "$location",
            "$stateParams",
            function ($scope, $location, $stateParams) {
         

                //***************** Initialize menu and variables **************

                var menu,
                    category;

                //***************** Initialize service menu items **************

                menu = require("../menu.json");

                category = menu.filter(function (item) {
                    if (item.title === $stateParams.category) {
                        return item;
                    }
                })

                $scope.category = category[0];

                $scope.services = menu.filter(function (item) {
                    if (item.parentId === category[0].id) {
                        return  item;
                    }
                });

                //handler that opens new category 
                $scope.clickHandler = function (item) {

                    var path;

                    $scope.update("error", "");

                    path = "/home/" + item.title + "/search";

                    $location.path(path);
                };
            }
        ];

}());
