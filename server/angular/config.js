
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
    "localStorageServiceProvider",
    function ($urlRouterProvider, $stateProvider, localStorageServiceProvider) {

        localStorageServiceProvider
            .setPrefix('maps')
            // send notification for both setItem and removeItem.
            .setNotify(true, true);

        //default state is /home
        $urlRouterProvider.otherwise("/home");

        $stateProvider
            //root contains map and white banner and map functionality
            .state("root", {
                abstract: true,
                url:"/home",
                templateUrl: "partials/root.html",
                controller: "RootController"
            })

            //landing contains 3-icon view and "Choose one of the following"
            .state("root.landing", {
                url: "",
                templateUrl: "partials/root.landing.html",
                controller: "LandingController"
            })
    
            //services contains menu for searching and selecting service category
            .state("root.categories", {
                url: "/services",
                templateUrl: "partials/root.categories.html",
                controller: "CategoriesController" 
            })

            //services contains menu for searching and selecting services
            .state("root.services", {
                url: "/{category}/service",
                templateUrl: "partials/root.services.html",
                controller: "ServicesController" 
            })
  
            //address-search contains search box for entering postcodes/streetnames
            .state("root.address-search", {
                url: "/{category}/{service}/search",
                templateUrl: "partials/root.address-search.html",
                controller: "SearchController"
            })
 
            //list-view contains view for listing found services
            .state("root.address-search.list-view", {
                url: "/list",
                templateUrl: "partials/list-view.html",
                controller: "ListController" 
            })

            //single view  contains view for displaying single selected service
            .state("root.address-search.single-view", {
                url: "/{id}",
                templateUrl: "partials/root.address-found.single-view.html",
                controller: "SingleController" 
            })

            //state for searching streetworks by address
            .state("root.streetworks", {
                url: "/streetworks",
                templateUrl: "partials/root.address-search.html",
                controller: "StreetworksSearchController"
            })

            //state for your local streetworks when address has been found
            .state("root.streetworks.found", {
                url: "locations/{address}", 
                templateUrl: "partials/root.streetworks.local-information.html",
                controller: "LocalFoundController"
            })

            //address-found contains view for when an address+service are found
            .state("root.address-found", {
                url: "/{service}/location/{address}",
                templateUrl: "partials/root.address-found.html",
                controller: "LocationController"
            })
  
            //list-view contains view for listing found services
            .state("root.address-found.list-view", {
                url: "/list",
                templateUrl: "partials/list-view.html",
                controller: "ListController" 
            })
  
            //single view  contains view for displaying single selected service
            .state("root.address-found.single-view", {
                url: "/{id}",
                templateUrl: "partials/root.address-found.single-view.html",
                controller: "SingleController" 
            })

            //state for about your neighbourhood search
            .state("root.neighbourhood", {
                url: "/neighbourhood",
                templateUrl: "partials/root.address-search.html",
                controller: "LocalSearchController"
            })

            //state for about your neighbourhood when address is found
            .state("root.neighbourhood.found", {
                url: "/{uprn}",
                templateUrl: "partials/root.neighbourhood.local-information.html",
                controller: "LocalFoundController"
            })

        

    }];
}());
