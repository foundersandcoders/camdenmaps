/***************************
*   ROOT-CONTROLLER.JS
*
***************************/
;(function () {
    "use strict";

    module.exports = [
        "$scope",
        function ($scope) {
            
            //initialize $scope.results at root level
            $scope.results = [];

            $scope.updateResults = function updateResults (data) {
                $scope.results = data;
            }

        }  
    ];
}());
