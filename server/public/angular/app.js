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

    angular.module("maps", [
            require("angular-ui-router"),
            "leaflet-directive"
 //           require("./controllers/controllers.js"), 
 //           require("./directives/directive.js"), 
 //           require("./services/service.js")
    ])

    .config( require("./config.js") )
   
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
        ])
   
    require("./controllers");

}());
