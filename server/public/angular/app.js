/************************************************************************************
*   APP.JS
*   Description: Define core angular module
*   Use: Initialize core angular module and register controllers, directives and services.i
*
*************************************************************************************/

//TODO: Find out why it only works when controllers and services are registered directly
//TODO: Find out why controllers only work when written directly here rather than requiring (browserify not working properly)

;(function () {
    "use strict";

    var angular = require("angular");

    angular.module("maps", [
            require("angular-ui-router"),
 //           require("./controllers/controllers.js"), 
 //           require("./directives/directive.js"), 
 //           require("./services/service.js")
    ])


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CONTROLLERS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        .controller("RootController", [
            "$scope",
            function ($scope) {
                
                //initialize $scope.results at root level
                $scope.results = [];

            }  
        ])

        .controller("LandingController", [
            "$scope",
            function ($scope) {
                
                //stores function names and corresponding paths for landing-page buttons
                $scope.buttons = [
                    {
                        id: "findYourNearest",
                        title: "Find Your Nearest",
                        path: "root.landing.services",
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
                
            }
        ])

        .config( require("./config.js") ) 
        
        .controller("ServicesController", [
            "$scope",
            "$location",
            "$http",
            //"menu",
            function ($scope, $location, $http/*, menu*/) {
         
                //TODO: Add event handlers for items
                //TODO: Write functions that repopulate the current and visible

                //***************** Initialize menu and variables **************
               
                //current index of visibleItems within currentCategory
                var currentIndex = 0, 
                //number of items visible in menu
                    numberOfItems = 3,
                //current position in the menu
                    currentPosition = 0,
                //all items in current category
                    currentCategory = [],
                //stores full menu
                    menu = [];
                //stores currently visible items
                $scope.visibleItems = [];
                
                //makes visible 4 items from current category
                function getVisibleItems(index, number) {
                    $scope.visibleItems = currentCategory.slice(index, index + number);
                }
                //populates currentCategory with items in current position in menu
                function getCurrentCategory(positionInMenu) {
                    currentCategory = menu.filter(function (item) {
                        return Number(item.parentId) === positionInMenu;
                    });
                }
                
                //loads menu 
                $http.get("menu.json")
                    .success(function success (data) {
                        menu = data;
                        getCurrentCategory(currentPosition);
                        getVisibleItems(currentIndex, numberOfItems);
                    });


                           
            }
        ])
        
        
//        .controller("RootController", require("./controllers/root-controller.js"))  
//        .controller("LandingController", require("./controllers/landing-controller.js"))  
//        .service("apiSearch", require("./services/api-search.js"));
    }());
