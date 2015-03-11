/*****************************
*   LOCAL-FOUND-CONTROLLER.JS
*
*****************************/

;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "buttonHandlers",
        function ($scope, buttonHandlers) {

            $scope.isListShowing = true;

            $scope.isListShowing = true;

            $scope.exit = function exit() {
                $location.path("/home/neighbourhood");
            };

            //model for page title
            $scope.title = "About your Neighbourhood";

            $scope.icon = "img/icons/your-neighbourhood-black.png";

            $scope.changeAddress = buttonHandlers.changeUserLocation($scope, "home/neighbourhood");
        }
    ];
}());
