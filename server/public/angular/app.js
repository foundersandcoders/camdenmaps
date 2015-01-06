/************************************************************************************
*   APP.JS
*   Description: Define core angular module
*   Use: Initialize core angular module and register controllers, directives and services.i
*
*************************************************************************************/

//TODO: Find out why it only works when controllers and services are registered directly
//TODO: Find out why controllers only work when written directly here rather than requiring (browserify not working properly)

//;(function () {
    "use strict";

    var angular = require("angular");

    angular.module("maps", [
            require("angular-ui-router"),
 //           require("./controllers/controllers.js"), 
 //           require("./directives/directive.js"), 
 //           require("./services/service.js")
    ])

        .config( require("./config.js") )

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CONTROLLERS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        .controller("RootController", [
            "$scope",
            function ($scope) {
                
                //initialize $scope.results at root level
                $scope.results = [];

            }  
        ])

        .controller("LandingController", [
            "$location",
            "$scope",
            function ($scope, $location) {
                

                var button; 
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

                //create redirectHandler for each button
                for (var i = 0; i < $scope.buttons.length; i += 1) {
                    $scope[$scope.buttons[i].id] = makeRedirectHandler($scope.buttons[i].path);
                }
            }
        ])

        .controller("ServicesController", [
            "$scope",
            "$location",
            "$http",
            //"menu",
            function ($http, $scope, $location/*, menu*/) {
           
                /*************** MOVE THIS INTO SERVICe CALLED MENU *******/

                $scope.menu = "HELOH";

                $http.get("menu.json").success(function (data) {
                    $scope.menu = data;
                    console.log("HE");
                }).error(function (data) {
                    console.log(data);
                });

                
                /***************** MENU STATE VARIABLES ****************/

                var menu = [];

                //exposes current menu items to be displayed
                $scope.visibleItems = [];
                //current position in menu
                var currentPosition = 0, 
                    currentCategory = getCurrentItems,
                    currentIndex = 0,
                    menuSize = 4;

                /***************** MENU POPULATION FUNCTIONS ****************/

                //loads current items based on current position
                function getCurrentItems (done) {
                    currentCategory = menu.filter(function menuFilter (item) {
                        return item.parentId === currentPosition;
                    });
                    done(currentIndex);
                }

                //loads visible items
                function loadVisibleItems (start) {
                    //loads first 4 items from current category into visible
                    $scope.visibleItems = currentCategory.slice(start, start+menuSize);
                    //adds click handlers to each visible item
                    (function addClickHandlers (index) {
                        var item = $scope.visibleItems[index];
                        if (index > $scope.visibleItems.length) {
                            return;
                        }
                        item.handler = returnItemClickHandler(item);
                        addClickHandlers(index+1);
                    }(0));
                }

                /***************** MENU CONTROL FUNCTIONS ****************/

                //returns click handler for menu items
                function returnItemClickHandler (item) {
                    return function () {
                        var destination;
                        if (item.type === "service") {
                            destination = "/" + item.text + "/search";
                            $location.path(destination);
                        } else if (item.type === "category") {
                            currentIndex = 0;
                            currentPosition = item.id;
                            getCurrentItems(loadVisibleItems);
                        }
                    }
                }
                 
                //loads next items in menu   
                function nextItems () {
                    if (currentIndex + menuSize > currentCategory.length) {
                        return;
                    } else {
                        currentIndex += menuSize;
                        loadVisibleItems(currentIndex);
                    }
                }

                //returns to previous category
                function backCategory () {
                    currentPosition = currentCategory[0].parentId;
                    getCurrentItems(loadVisibleItems);
                }
                 
                //loads previous items in menu   
                function prevItems () {
                    if (currentIndex - menuSize < 0) {
                        currentIndex = 0;
                        loadVisibleItems(currentIndex);
                    } else {
                        currentIndex -= menuSize;
                        loadVisibleItems(currentIndex);
                    }
                }

                //bind to next button
                $scope.next = nextItems;
                //bind to prev button
                $scope.prev = prevItems;
                //bind to back button
                $scope.back = backCategory;

            }
        ])
        
        
//        .controller("RootController", require("./controllers/root-controller.js"))  
//        .controller("LandingController", require("./controllers/landing-controller.js"))  
//        .service("apiSearch", require("./services/api-search.js"));
//    }());
