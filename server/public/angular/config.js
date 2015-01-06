
/******************************************************************** 
*   CONFIG.JS
*   Description: Defines configuration and routes for angular app.
*   Use: Registered with core angular module in app.js
*
*********************************************************************/

;(function() {
    "use strict";

    module.exports = [
    "$urlRouterProvider",
    "$stateProvider",
    function ($urlRouterProvider, $stateProvider) {

        //default state is /home
        $urlRouterProvider.otherwise("/home");

        $stateProvider
            .state("root", {
                abstract: true,
                url:"/home",
                templateUrl: "angular/partials/root.html",
                controller: "RootController"
            })

            .state("root.landing", {
                url: "",
                templateUrl: "angular/partials/root.landing.html",
                //controller: ["$scope", function ($scope) {
                //    $scope.test = function () {
                //        console.log("HEOU");
                //    }
                //}]
                //controller: "LandingController",
                controller: [
            "$location",
            "$scope",
            function ($scope, $location) {

                var button;
                $scope.hello = [1, 2, 3, 4];
                    //stores function names and corresponding paths for landing-page buttons
                $scope.buttons = [
                    {
                        id: "findYourNearest",
                        title: "Find Your Nearest",
                        path: "/services",
                        iconUrl: "img/icons/find-your-nearest.svg"
                    },
                    {
                        id: "aboutYourNeighbourhood",
                        title: "About Your Neighbourhood",
                        path: "/neighbourhood/search",
                        iconUrl: "img/icons/your-neighbourhood.svg"
                    },
                    {
                        id: "liveStreetworks",
                        title: "Live Streetworks",
                        path: "/streetworks/search",
                        iconUrl: "img/icons/streetworks.svg"
                    }
                ]; 
                
                //creates event handler that redirects client to newPath
                function makeRedirectHandler (newPath) {
                    return function redirectHandler() {
                        $location.path(newPath);
                    }
                }

                $scope.test = function test () {
                    console.log("TESOTEUH");
                }

                //create redirectHandler for each button
                for (var i = 0; i < $scope.buttons.length; i += 1) {
                    $scope.buttons[i][$scope.buttons[i].id] = makeRedirectHandler($scope.buttons[i].path);
                }
            }
        ] 
            })
  
            .state("root.landing.services", {
                url: "/services",
                templateUrl: "angular/partials/root.landing.services.html",
                controller: "ServicesController" 
            })
  
            .state("root.address-search", {
                url: "/{service}/search",
                templateUrl: "angular/partials/root.address-search.html",
                controller: "SearchController"
            })
  
            .state("root.address-found", {
                url: "/{service}/location/{address}",
                templateUrl: "angular/partials/root.address-found.html",
                controller: "LocationController"
            })
  
            .state("root.address-found.list-view", {
                url: "/{service}/location/{address}/list",
                templateUrl: "angular/partials/root.address-found.list-view.html",
                controller: "ViewListController" 
            })
  
            .state("root.address-found.single-view", {
                url: "/{service}/location/{address}/{id}",
                templateUrl: "angular/partials/root.address-found.single-view.html",
                controller: "ViewSingleController" 
            })

    }];
}());
