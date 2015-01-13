/*******************************
*   SINGLE-CONTROLLER.JS
*
********************************/

;(function () {
    "use strict";

    module.exports = [
            "$stateParams",
            "$scope",
            "$http",
            function ($stateParams, $scope, $http) {

                //TODO: Do some DATA CLEANING so data is standardized before it reaches us

                /*
                //CHECKME: theoretically shouldn't be executed if cache is working correctly.
                //loads results if not previously loaded (i.e navigated to directly by url)
                apiSearch.search($stateParams.service, $stateParams.address)
                    .then(function success (data) {
                        $scope.results = data;
                    });
                */

                $http.get("/services/" + $stateParams.service + "/locations/" + $stateParams.address)
                    .success(function success (data) {
                        $scope.updateResults(data.Locations.Properties.Property);
                        
                        //selects item from results with matching {id}
                        $scope.result = $scope.results.filter(function (result) {
                            return result.PoI.Name === $stateParams.id;
                        })[0];
                    });

              
                 //selects item from results with matching {id}
                $scope.result = $scope.results.filter(function (result) {
                    return result.PoI.Name === $stateParams.id;
                })[0];

                $scope.currentDisplay = $scope.results.filter(function (result) {
                    return result.text.toLowerCase()  === $stateParams.service.toLowerCase();
                });
            }
        ];
}());
