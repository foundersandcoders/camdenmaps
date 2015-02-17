/*******************************************
*   CATEGORIES-CONTROLLER.JS
*
*
********************************************/

;(function () {
    "use strict";

    module.exports = [
            "$scope",
            "$location",
            function ($scope, $location) {
         

                //***************** Initialize menu and variables **************

                //stores full menu
                   var menu = [];

                //***************** Initialize category menu items **************

                menu = require("../menu.json");

                $scope.serviceCategories = menu.filter(function (item) {
                    if (item.type === "category") {
                        return  item;
                    }
                });

                //****************** Menu population functions ***************** 
                
                //handler that opens new category 
                $scope.clickHandler = function (item) {

                    var path;

                    $scope.update("error", "");

                    path = "/home/" + item.title + "/service";

                    $location.path(path);
                };

            }
        ];

}());
