/*****************************
*   STREETWORKS-SEARCH-CONTROLLER.JS
*
*****************************/

//TODO: Error Messages by updateError('error', data);

;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$location",
        function ($scope, $location) {

            //model for page title
            $scope.title = "Live Streetworks";

            //back button function
            $scope.searchAgain = function() {
                $location.path("/home");
            };
            //back button text
            $scope.backButtonText = "Main Menu";

        }
    ];
}());
