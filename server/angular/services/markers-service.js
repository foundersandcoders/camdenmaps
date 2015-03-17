/*************************************
*   MARKERS SERVICE.JS
*
*************************************/



;(function () {
	"use strict";

    var cappedResults = require("../lib/capped-results.js");
    var resetActiveMarker = require("../lib/reset-active-marker");

function linkResultToMarker(scope, markerName) {

    var result = scope.results.filter(function (res) {
        return res.display.Name === markerName;
    })[0];

    //links list result with relevant marker
    var marker = "m" + (scope.results.indexOf(result) + 1);
    
    //if single list view loaded from click this marker will already be the active marker
    if(marker !== scope.activeMarker) {
        resetActiveMarker(scope); 
        scope.markers[marker].icon.iconUrl = "../img/icons/yellow-marker.png";
        scope.update("activeMarker", scope.markers[marker]);
        
        //recentres map on the list result selected
        scope.update("centre", {
            lat: Number(result.Latitude),
            lng: Number(result.Longitude),
            zoom: scope.centre.zoom,
        });
    }
}

	module.exports = [
        "$stateParams",
        "leafletData",
        "$location",
        "validate",
        function ($stateParams, leafletData, $location, validate) {

            Object.size = function(obj) {
                var size = 0, key;
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) size++;
                }
                return size;
            };  

            this.geolocateUser = function (functionScope, location, cb) {  
                
                var remainOnPage = function() {
                    var path = location;
                       
                    $location.path(path);
                }; 

                return function(scope) {
                    scope = scope || functionScope; 
                    
                    leafletData.getMap().then(function(map) {
                         //this will return the location but not auto-centre on it or continuously watch
                         map.locate({setView: false, watch: false})
                            .on("locationfound", function (e){

                                if (validate.isWithinCamden(e.latitude, e.longitude)) {
                     
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

                                    return cb("your location", e.latitude, e.longitude);
                          
                                } else {
                                    scope.updateError("Your location is not working please use an address");
                                    remainOnPage();
                                }
                            })
                            .on("locationerror", function(e){
                                scope.updateError("Geolocation error. Please use an address");      
                                remainOnPage();
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
                            message: "Searching for results near <strong>N1C 4AG</strong>, <br> enter another post code for more results",

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
                             
                            message: validate.cleanDisplayAddress(scope.locationSelected.message),
                            icon: {
                                iconUrl: "../img/icons/location-marker.png",
                                iconSize: [28]
                            }
                        };

                    } 
                    scope.markers = {};
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
                    else if (scope.category.title === "Live Streetworks") {
                        zoomLevel = 16;
                    }
                    else {
                        zoomLevel = 13;
                    }
                    return zoomLevel;

                };
            };

            this.activateListItem = function (functionScope) {
                return function (resultId) {

                    var scope = functionScope; 

                    var listItem = $('[id="' + resultId + '"]');
                    var allListItems = $(".list-item");
                    var displayResult = listItem.find(".display-result");
                    var allResults = $(".display-result");

                    if (displayResult.hasClass("active")) {
                        listItem.removeClass("display-active-result");
                        allResults.removeClass("active");

                        resetActiveMarker(scope); 
                    } else {
                        allListItems.removeClass("display-active-result");
                        allResults.removeClass("active");

                        listItem.toggleClass("display-active-result");
                        displayResult.toggleClass("active");

                        linkResultToMarker(scope, resultId);
                    }
                };
            };
		}
	];

})();
