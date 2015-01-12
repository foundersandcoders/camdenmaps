/*******************************
*   SINGLE-CONTROLLER.JS
*
********************************/

;(function () {
    "use strict";

    module.exports = [
            "$stateParams",
            "$scope",
            function ($stateParams, $scope) {

                /*
                //CHECKME: theoretically shouldn't be executed if cache is working correctly.
                //loads results if not previously loaded (i.e navigated to directly by url)
                apiSearch.search($stateParams.service, $stateParams.address)
                    .then(function success (data) {
                        $scope.results = data;
                    });
                */

                //selects item from results with matching {id}
                $scope.currentDisplay = $scope.results.filter(function (result) {
                    return result.text.toLowerCase()  === $stateParams.service.toLowerCase();
                });
            }
        ];
}());
