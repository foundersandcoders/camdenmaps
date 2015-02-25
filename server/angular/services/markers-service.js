;(function () {
	"use strict";

    function isWithinCamden (latitude, longitude) {
    	//coordinates represent a square around Camden to roughly test if location is inside boundary
        if((51.590 > latitude && latitude > 51.495) && (-0.0750 > longitude && longitude > -0.255)) {
            return true;
        } else {
            return false;
        }
    }


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

    
                                // if (isWithinCamden(e.latitude, e.longitude)) {
                                if(true) {
                                    scope.markers.m0 = {
                                        lat: e.latitude,
                                        lng: e.longitude,
                                        icon: {
                                            iconSize: [28],
                                            iconUrl: "../img/icons/location-marker.png"
                                        },
                                
                                        //not sure this is necessary if we have a location symbol used 
                                        message: "Your location",
                                        focus: true,
                                        geolocation: true
                                    };

                                    console.log("streetworks location path", ($location.path().indexOf("/streetworks") > -1));
                                    console.log("location", $location.path());
                                    console.log($stateParams.service);

                                    var path = ($location.path().indexOf("/streetworks") > -1)
                                    ? "home/streetworks/location/your location"
                                    : "/home/" + $stateParams.service + "/location/" + "your location";

                                    $location.path(path);

                                } else {
                                    scope.updateError("That location is outside Camden");
                                    $location.path("home/streetworks");
                                }
                            })
                            .on('locationerror', function(e){
                                scope.updateError("Geolocation error. Please use an address");
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
                            message: "Searching for results near <strong>N1C 4AG</strong>, <br> enter another post code above for more results",

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
                    if (size === 0 ) {
                        zoomLevel = 13;
                    }
                    else if (size < 5 ) {
                        zoomLevel = 12;
                    }
                    else if (scope.service.toLowerCase() === "streetworks") {
                        zoomLevel = 16;
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
