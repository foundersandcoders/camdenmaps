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

        //default state is /landing
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state("root", {
                abstract: true,
                url:"/",
                templateUrl: "partials/root.html"
                controller: "RootController"
            })

            .state("root.landing", {
                url: "",
                templateUrl: "partials/root.landing.html",
                controller: "LandingController" 
            })
  
            .state("root.landing.services", {
                url: "/services",
                templateUrl: "partials/root.landing.services.html"
                controller: "ServicesController" 
            })
  
            .state("root.address-search", {
                url: "/{service}/search",
                templateUrl: "partials/root.address-search.html",
                controller: "SearchController"
            })
  
            .state("root.address-found", {
                url: "/{service}/location/{address}",
                templateUrl: "partials/root.address-found.html",
                controller: "LocationController"
            })
  
            .state("root.address-found.list-view", {
                url: "/{service}/location/{address}/list",
                templateUrl: "partials/root.address-found.list-view.html",
                controller: "ViewListController" 
            })
  
            .state("root.address-found.single-view", {
                url: "/{service}/location/{address}/{id}",
                templateUrl: "partials/root.address-found.single-view.html" 
                controller: "ViewSingleController" 
            })

    }];
}());
