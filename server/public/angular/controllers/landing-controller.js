/****************************************
*   LANDING-CONTROLLER.JS
*
*
*****************************************/
;(function () {
    "use strict";

    module.exports = [
        "$scope",
        function ($scope) {
            
            //stores function names and corresponding paths for landing-page buttons
            $scope.buttons = [
                {
                    id: "findYourNearest",
                    title: "Find Your Nearest",
                    path: "/#/home/services",
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
            $scope.watch( function toggle() {
                 var findYourNearest = $('#findYourNearest');

                 console.log("hello");

                if (findYourNearest.length === 0) {
                    button.hideMe = true;
                } else {
                    button.hideMe = false;
                }
            });
            // $scope.toggle = function toggle() {
            //     var findYourNearest = $('#findYourNearest');

            //      console.log("hello");

            //     if (findYourNearest.length === 0) {
            //         showMe = true;
            //     } else {
            //         showMe = false;
            //     }
            // }
        }
    ];

}());
