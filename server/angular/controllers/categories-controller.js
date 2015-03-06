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
            "menuFind",
            function ($scope, $location, menuFind) {

                $scope.serviceCategories = menuFind.categories();
                
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
