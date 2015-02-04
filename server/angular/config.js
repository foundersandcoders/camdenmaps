
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
                templateUrl: "partials/root.html",
                controller: "RootController"
            })

            .state("root.landing", {
                url: "",
                templateUrl: "partials/root.landing.html",
                controller: "LandingController"
            })
  
            .state("root.landing.services", {
                url: "/services",
                templateUrl: "partials/root.landing.services.html",
                controller: "ServicesController" 
            })
  
            .state("root.address-search", {
                url: "/{service}/search",
                templateUrl: "partials/root.address-search.html",
                controller: "SearchController"
            })
 
            .state("root.address-search.list-view", {
                url: "/list",
                templateUrl: "partials/list-view.html",
                controller: "ListController" 
            })

            .state("root.address-search.single-view", {
                url: "/{id}",
                templateUrl: "partials/root.address-found.single-view.html",
                controller: "SingleController" 
            })

            .state("root.address-found", {
                url: "/{service}/location/{address}",
                templateUrl: "partials/root.address-found.html",
                controller: "LocationController"
            })
  
            .state("root.address-found.list-view", {
                url: "/list",
                templateUrl: "partials/list-view.html",
                controller: "ListController" 
            })
  
            .state("root.address-found.single-view", {
                url: "/{id}",
                templateUrl: "partials/root.address-found.single-view.html",
                controller: "SingleController" 
            })

            .state("root.locations", {
                url: "/locations",
                templateUrl: "partials/root.locations.html",
                controller: "locationLocalController"
            });

    }];
}());
