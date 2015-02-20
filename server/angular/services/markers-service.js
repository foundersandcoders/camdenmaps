;(function () {
	"use strict";

    var cappedResults = require("../lib/capped-results.js");

	module.exports = [
        "$stateParams",
        "leafletData",
        "$location",
        function ($stateParams, leafletData, $location) {

            Object.size = function(obj) {
                var size = 0, key;
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) size++;
                }
                return size;
            };  
            

            this.geolocateUser = function (functionScope, cb) {
                
                return function(scope) {
                    scope = scope || functionScope; 
                    
                    leafletData.getMap().then(function(map) {
                         //this will return the location but not auto-centre on it or continuously watch
                         map.locate({setView: false, watch: false})
                            .on('locationfound', function (e){
    
                                //this checks if the location returned is within the map boundaries i.e. larger than Camden
                                if (51.57878 > e.latitude > 51.450089 && -0.094538 > e.longitude > -0.218650) {
                            
                                    scope.markers.m0 = {
                                        lat: e.latitude,
                                        lng: e.longitude,
                                        icon: {
                                            iconSize: [28],
                                            iconUrl: "../img/icons/location-marker.png"
                                        },
                                
                                        //not sure this is necessary if we have a location symbol used 
                                        message: "Your location",
                                        focus: true
                                    };
                                    //if we are within Camden then it will auto-centre the map on the user's location
                                    // map.locate({setView: true, watch: false});
                                    path = "/home/" + $stateParams.service + "/location/" + "your location";
                                    $location.path(path);

                                } else {
           
                                    scope.markers.m0 = {
                                        lat: e.latitude,
                                        lng: e.longitude,
                                        icon: {
                                            iconSize: [28],
                                            iconUrl: "../img/icons/location-marker.png"
                                        },
                                        message: "Your location",
                                        focus: true,
                                        geolocation: true
                                    };

                                    var path = "/home/" + $stateParams.service + "/location/" + "your location";
                                    $location.path(path);

                                }
                            })
                            .on('locationerror', function(e){
                                console.log(e);
                                alert("Location access denied.");
                            });

                    });
                };
            };

            this.addMarkers = function (scope) {

                return function () {
                    var root = scope.results,
                    markers = scope.markers,
                    property, 
                    coord = function coord(i, latlng){
                        return Number(scope.results[i][latlng]);
                    };
        

                    // this creates the marker objects to plot the locations on the map
                    // this will run on refreshes
                    // it will run if there are capped results
                    if( Object.size(markers) === 0 || cappedResults(decodeURI($stateParams.service), scope) ) {
                        
                        var i, 
                        	resultLength = Object.size(root);
                        
                        for (i = 0; i<resultLength; i++) {

                            property = "m" + (i+1);
                           
                            markers[property] = {};
                            markers[property].icon = {};
                            markers[property].lat = coord(i, "Latitude");
                            markers[property].lng = coord(i, "Longitude");
                            markers[property].name = scope.results[i]["display"]["Name"];
                            markers[property].icon.iconUrl = "../img/icons/marker-hi.png";
                            markers[property].icon.iconSize = [28];

                        }
                        
                    }   

                    //loads default location marker if results are capped
                    //but not if searching with geolocate 
                    if( cappedResults(decodeURI($stateParams.service), scope) && !scope.markers.m0 ) {
 
                        markers.m0 = {
                            lat: 51.534,
                            lng: -0.126,
                            icon: {
                                iconSize: [28],
                                iconUrl: "../img/icons/location-marker.png",
                            },
                            focus: true,
                            message: "<b>N1C 4AG</b> <br> Please enter a postcode <br> above for nearby results.",

                        };
                    }

                    // only runs when a search address has been entered and is valid
                    //does not over-write the geolocate marker  
                    if($stateParams.address && scope.locationSelected.Latitude && $stateParams.address !== "your location") {

                        markers.m0 = {
                            lat: Number(scope.locationSelected.Latitude),
                            lng: Number(scope.locationSelected.Longitude),
                            name: "location",
                            focus: true,
                            popupOptions: {
                                closeOnClick: false
                             },
                             //this will capitalise street addresses
                             //and upper case postcodes
                            message: ($stateParams.address.replace(/\s/g, "").length < 7
                                    ? $stateParams.address.toUpperCase()
                                    : $stateParams.address.replace(/\b./g, function(m){ return m.toUpperCase(); })),
                            icon: {
                                iconUrl: "../img/icons/location-marker.png",
                                iconSize: [28]
                            }
                        };
                    } 

                    scope.update("markers", markers);
                };


			};

            this.zoomCheck = function (scope) {
                return function () {

                    var zoomLevel,
                        size = Object.size(scope.markers);

                    //if results are less than 5 markers zooms out to fit them all in
                    if (size < 5 ) {
                        zoomLevel = 12;
                    }
                    else {
                        zoomLevel = 13;
                    }

                    return zoomLevel;

                };
            };
		}
	];

})();
