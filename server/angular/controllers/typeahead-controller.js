/*****************************
*   TYPEAHEAD-CONTROLLER.JS
*
*****************************/

;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$location",
        "fetchToken",
        "$http",
        function ($scope, $location, fetchToken, $http) {

            // fetchToken.getToken().success(function() {

            //     $http.get("http://localhost:8081/search/cam").success(function(data){

            //         console.log(data);
            //     })
            // });

                var menu = [];

                $scope.selected = '';


            if(($location.path().indexOf("/neighbourhood") > -1) || ($location.path().indexOf("/streetworks") > -1) || ($location.path().indexOf("/search") > -1)) { 

                $scope.placeholder = 'Enter an address';

                // $scope.limitNumber = 20;

                $scope.handler = function (address) {
                    var uprn,
                        destination;

                    uprn = address.slice(-7);

                    console.log(uprn);

                    destination = "/home/neighbourhood/" + uprn;

                    $location.path(destination);
                };
                fetchToken.getToken().success(function() {
                    $scope.typeaheadSearchList = function(value) {

                        return $http.get('http://localhost:8081/search/' + value)
                            .then(function(response){

                                console.log(response);
                                var data = response.data.slice(0, 10);


                                return data.map(function (item, index){
                                    var displayItem = item.Unit + " " +
                                        item.BuildingName + " " +
                                        item.BuildingNumber + " " +
                                        item.Street + " " +
                                        item.Postcode + " ";
                                    return displayItem;


                                });
                            });
                    
                    };
                })

            } else {

                menu = require("../menu.json");

                $scope.placeholder = 'Enter a service to search';

                $scope.limitNumber = 8;

                $scope.typeaheadSearchList = getItems(menu);

                $scope.handler = function (item) {
                    var service,
                        destination;

                    service = encodeURIComponent(item);

                    destination = "/home/" + service + "/search";

                    $location.path(destination);
                };
            }

            function getItems(array) {

                var newArray = [];

                for (var i = array.length - 1; i >= 0; i--) {
                    if(($location.path().indexOf("/neighbourhood") > -1) || ($location.path().indexOf("/streetworks") > -1) || ($location.path().indexOf("/search") > -1)) {
                        var title = array[i].Unit + " " +
                                array[i].BuildingName + " " +
                                array[i].BuildingNumber + " " +
                                array[i].Street + " " +
                                array[i].Postcode + " " +
                                array[i].UPRN;

                        newArray.push(title);
                    } else {
                        if (array[i].type === "service") {
                            newArray.push(array[i].title);
                        }
                    }
                }
                return newArray;
            }
        }
    ];
}());
                    
        			