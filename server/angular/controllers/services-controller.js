/*******************************************
*   SERVICES-CONTROLLER.JS
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
        "buttonHandlers",
        "menuFind",
        function ($scope, $location, $stateParams, buttonHandlers, menuFind) {

            $scope.category = menuFind.category($stateParams.category);

            $scope.services = menuFind.servicesById($scope.category.id);

            //handler that opens new category 
            $scope.clickHandler = function (item) {

                var path;

                $scope.update("error", "");

                path = "/home/" + item.title + "/search";

                $location.path(path);
            };

            $scope.returnToCategories = buttonHandlers.searchAgain($scope, "/home/services")

        }
    ];
}());
