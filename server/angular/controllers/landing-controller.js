/****************************************
*   LANDING-CONTROLLER.JS
*
*
*****************************************/
;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$location",
        function ($scope, $location) {

            $scope.choosePath = function () {
                var findYourNearest = $('#find-your-nearest');

                if (findYourNearest.length === 0){
                    var destination = "/home/services"
                    $location.path(destination);
                    
                } else {
                    var destination = "/home"
                    $location.path(destination);
                }
            };


            //stores function names and corresponding paths for landing-page buttons
            $scope.buttons = [
                {
                    id: "findYourNearest",
                    title: "Find Your Nearest",
                    path: $scope.choosePath(),
                    iconUrl: "img/icons/find-your-nearest.png"
                },
                {
                    id: "aboutYourNeighbourhood",
                    title: "About Your Neighbourhood",
                    path: "http://maps.camden.gov.uk/nearest/nearest.aspx?tab=m",
                    iconUrl: "img/icons/your-neighbourhood.png"
                },
                {
                    id: "liveStreetworks",
                    title: "Live Streetworks",
                    path: "http://maps.camden.gov.uk/streetworks/neareststreetworks.aspx",
                    iconUrl: "img/icons/streetworks.png"
                }
            ];
            
            //this should be in a directive
            $scope.$watch( function toggleWords() {
                 var findYourNearest = $('#find-your-nearest');

                if (findYourNearest.length === 0) {
                    $scope.showMe = true;
                } else {
                    $scope.showMe = false;
                }
            });
           
        }
    ];

}());
