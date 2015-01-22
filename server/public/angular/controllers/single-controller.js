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

                //var uri;

                //TODO: Do some DATA CLEANING so data is standardized before it reaches us

                /*
                //CHECKME: theoretically shouldn't be executed if cache is working correctly.
                //loads results if not previously loaded (i.e navigated to directly by url)
                apiSearch.search($stateParams.service, $stateParams.address)
                    .then(function success (data) {
                        $scope.results = data;
                    });
                */

                $scope.showDistance = $stateParams.address ? true : false; 
           
                if ($stateParams.address) {
                    var uri = "/services/" + $stateParams.service + "/locations/" + $stateParams.address;
                } else {
                    console.log("you too");
                    var uri = "/services/" + $stateParams.service; 
                }
               

                $http.get(uri)
                    .success(function success (data) {
                        $scope.updateResults(data.properties);
                        $scope.updateLocation(data.location);
                        //selects item from results with matching {id}
                        $scope.result = $scope.results.filter(function (result) {
                            return result.display.Name === $stateParams.id;
                        })[0];
                    });
                 //selects item from results with matching {id}
                $scope.result = $scope.results.filter(function (result) {
                    return result.display.Name === $stateParams.id;
                })[0];

            }
        ];
}());
