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

            $scope.executeFn = function executeFn(fn) {
                fn();
            };

            function addLandingButtonHandler (path) {
                return function () {
                    var findYourNearest = $('#find-your-nearest');

                    var destination = findYourNearest.length === 0
                                    ? path
                                    : "/home";
                                    
                    $location.path(destination);
                };
            }


            //stores function names and corresponding paths for landing-page buttons
            $scope.buttons = [
                {
                    id: "findYourNearest",
                    title: "Camden Services",
                    handler: addLandingButtonHandler("/home/services"),
                    iconUrl: "img/icons/find-your-nearest.png"
                },
                {
                    id: "aboutYourNeighbourhood",
                    title: "About Your Neighbourhood",
                    handler: addLandingButtonHandler("/home/neighbourhood"),
                    iconUrl: "img/icons/your-neighbourhood.png"
                },
                {
                    id: "liveStreetworks",
                    title: "Live Streetworks",
                    handler: addLandingButtonHandler("/home/streetworks"),
                    iconUrl: "img/icons/streetworks.png"
                }
            ];
        }
    ];

}());
