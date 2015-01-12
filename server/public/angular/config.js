
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
                controller: "LandingController"
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
                url: "/list",
                templateUrl: "angular/partials/root.address-found.list-view.html",
                controller: "ListController" 
            })
  
            .state("root.address-found.single-view", {
                url: "/{id}",
                templateUrl: "angular/partials/root.address-found.single-view.html",
                controller: "SingleController" 
            })

    }];
}());
