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


    //require angular using browserify

    var angular = require("angular");

   	//does not use var app = angular.... becuase using chaining
    angular.module("maps", [
            require("angular-ui-router"),
            "leaflet-directive"
 //           require("./controllers/controllers.js"), 
 //           require("./directives/directive.js"), 
 //           require("./services/service.js")
    ])


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CONTROLLERS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


        .controller("LandingController", [
            "$scope",

            function ($scope) {

                
                //stores function names and corresponding paths for landing-page buttons
                $scope.buttons = [
                    {
                        id: "findYourNearest",
                        title: "Find Your Nearest",
                        path: "root.landing.services",
                        iconUrl: "img/icons/find-your-nearest.png"
                    },
                    {
                        id: "aboutYourNeighbourhood",
                        title: "About Your Neighbourhood",
                        path: "/neighbourhood/search",
                        iconUrl: "img/icons/your-neighbourhood.png"
                    },
                    {
                        id: "liveStreetworks",
                        title: "Live Streetworks",
                        path: "/streetworks/search",
                        iconUrl: "img/icons/streetworks.png"
                    }
                ];   
            }
        ])

    
        .config( require("./config.js") )
        
        // .controller("ServicesController", [
        //     "$scope",
        //     "$location",
        //     "$http",
        //     //"menu",
        //     function ($scope, $location, $http/*, menu*/) {
         

        //         //***************** Initialize menu and variables **************
               
        //         //current index of visibleItems within currentCategory
        //         var currentIndex = 0, 
        //         //number of items visible in menu
        //             numberOfItems = 3,
        //         //current position in the menu
        //             currentPosition = 0,
        //         //all items in current category
        //             currentCategory = [],
        //         //stores full menu
        //             menu = [];
        //         //stores currently visible items
        //         $scope.visibleItems = [];
               
               
        //         //****************** Menu population functions ***************** 
                
        //         //makes visible 4 items from current category
        //         function getVisibleItems(index) {
        //             $scope.visibleItems = currentCategory[index];
        //         }
                
        //         //handler that either redirects user or opens new category 
        //         function clickHandler (item) {
        //             if (item.type === "service") {
        //                 var path = "/home/" + item.title + item.text + "/search";
        //                 $location.path(path);
        //             } else if (item.type === "category") {
        //                 currentIndex = 0;
        //                 currentPosition = item.id;
        //                 getCurrentCategory(currentPosition, numberOfItems);
        //                 getVisibleItems(currentIndex);
        //             }
        //         }
                
        //         //adds click handler functions to menu items
        //         function addClickHandler (item) {
        //             return function () {
        //                 clickHandler(item);
        //             };
        //         }
                
        //         //populates currentCategory with items in current position in menu
        //         function getCurrentCategory(positionInMenu, amountPerPage) {
        //             currentCategory = [];
        //             var fullCategory = menu.filter(function (item) {
        //                 return Number(item.parentId) === Number(positionInMenu);
        //             });
        //             var i, index = 0;
        //             for (i = 0; i < fullCategory.length; i += 1) {
        //                 if (i && i % amountPerPage === 0) {
        //                     index = i / amountPerPage;
        //                     currentCategory[index] = [];
        //                 } else if (!i) {
        //                     currentCategory[index] = [];
        //                 }
        //                 fullCategory[i].handler = addClickHandler(fullCategory[i]);
        //                 currentCategory[index].push(fullCategory[i]);
        //             }
        //         }
                
        //         //loads menu 
        //         $http.get("menu.json")
        //             .success(function success (data) {
        //                 menu = data;
        //                 getCurrentCategory(currentPosition, numberOfItems);
        //                 getVisibleItems(currentIndex);
        //             });

        //         //********************* Menu control functions ******************
               
        //         //loads next page of items
        //         $scope.nextItems = function nextItems () {
        //             if (currentIndex === currentCategory.length-1) {
        //                 return;
        //             } else {
        //                 currentIndex += 1;
        //                 getVisibleItems(currentIndex);
        //             }
        //         };
        //         //loads previous page of items
        //         $scope.prevItems = function prevItems () {
        //             if (currentIndex === 0) {
        //                 return;
        //             } else {
        //                 currentIndex -= 1;
        //                 getVisibleItems(currentIndex);
        //             }
        //         };
        //         //loads parent category
        //         $scope.backOneCategory = function backOneCategory () {
        //             if (Number(currentPosition) === 0) {
        //                 return;
        //             } else {
        //                 currentPosition = menu.filter(function(item){
        //                     return Number(item.id) === Number(currentPosition);
        //                 })[0].parentId;
        //                 currentIndex = 0;
        //                 getCurrentCategory(currentPosition, numberOfItems);
        //                 getVisibleItems(currentIndex);
        //             }
        //         };
               
        //         //execute function to solve scoping issues with ng-repeat & ng-click
        //         $scope.execute = function execute (fn) {
        //             fn();
        //         };

        //     }
        // ])
        


        .controller("ListController", [
            "$scope",
            "$stateParams",
            "$location", 
            function ($scope, $stateParams, $location) {
       
                $scope.results = [];

                //TODO: populate results with REAL results
                //mock populate results
                $scope.results = [
                    {
                        name: "Animal Hospital",
                        address: "33 Midhurst Avenue",
                        city: "London, You're Kidding Me",
                        distance: "290129miles"
                    },
                    {
                        name: "Gun Shop",
                        address: "33 Midhurst Avenue",
                        city: "London, York",
                        distance: "5miles"
                    },
                    {
                        name: "Spoon Straightener",
                        address: "24 Clapham Road",
                        city: "London, N10 3EP",
                        distance: "229miles"
                    },
                    {
                        name: "Bag Shredder",
                        address: "33 Midhurst Avenue",
                        city: "London, Castle",
                        distance: "0.4miles"
                    }
                ];


                //button to exit list view
                $scope.exit = function exit () {
                    var destination = "/home/" + $stateParams.service + "/location/" + $stateParams.address;
                    $location.path(destination);
                };

                //handler for each result
                function createResultsHandler (id) {
                    return function () {
                        var path = "/service" + $stateParams.service + 
                            "/location/" + $stateParams.address +
                            id;
                        $location.path(path); 
                    };
                }
/*
                //add handler to results list
                (function addResultsHandlers (index){
                    if (index > $scope.results.length) {
                        return;
                    }
                    $scope.results[index].createResultsHandler($scope.result.id);
                    addResultsHandlers(index+1);
                }(0));
*/
                }
        ])

        .controller("SingleController", [
            "$stateParams",
            "$scope",
            function ($stateParams, $scope) {

                /*
                //CHECKME: theoretically shouldn't be executed if cache is working correctly.
                //loads results if not previously loaded (i.e navigated to directly by url)
                apiSearch.search($stateParams.service, $stateParams.address)
                    .then(function success (data) {
                        $scope.results = data;
                    });
                */

                //selects item from results with matching {id}
                $scope.currentDisplay = $scope.results.filter(function (result) {
                    return result.text.toLowerCase()  === $stateParams.service.toLowerCase();
                });
            }
        ])
//        .controller("RootController", require("./controllers/root-controller.js"))  )
//        .controller("LandingController", require("./controllers/landing-controller.js"))  
//        .service("apiSearch", require("./services/api-search.js"));
    

   
    .controller("CustomParametersController", [ '$scope', function($scope) {
            var regions = {
                    camdenBorough: {
                        northEast: {
                            lat: 51.57878,
                            lng: -0.094538
                        },
                        southWest: {
                            lat: 51.510989,
                            lng: -0.218649
                        }
                    }
            };

            $scope.setRegion = function(region) {
                if (!region) {
                    $scope.maxbounds = {};
                } else {
                    $scope.maxbounds = regions[region];
                }
            };

            angular.extend($scope, {
                camden: {
                    lat: 51.535923,
                    lng: -0.139991,
                    zoom: 14
                },
                maxbounds: regions.camdenBorough,
                defaults: {
                scrollWheelZoom: false
                },
                markers: {}
                
            });


            // $scope.requestResults = function () {


            //     //vanilla js ajax call rather than using jquery
            //     function ajaxCall (url, callback) {
            //         var xmlhttp;

            //         xmlhttp = new XMLHttpRequest();
            //         xmlhttp.onreadystatechange = function () {
            //             if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //                 callback(xmlhttp.responseText);
            //             }
            //         };
            //         xmlhttp.open("GET", url, true);
            //         xmlhttp.send();
            //     }


                //get element by class and add action listener that sends requests to API    
                // var service = document.getElementById("Dropdownlistfind").value;
                // var location = document.getElementById("postcode").value;
            }
        ]);
   
    require("./controllers");

}());

