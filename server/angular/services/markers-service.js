;(function () {
	"use strict";

    var noResults = require("../lib/no-results.js");
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
                            console.log("inside Camden");
                            scope.markers.location = {
                                lat: e.latitude,
                                lng: e.longitude,
                                icon: {
                                    iconSize: [28],
                                    iconUrl: "../img/icons/geolocation.png"
                                },
                                
                                //not sure this is necessary if we have a location symbol used 
                                message: "You are here",
                                focus: true
                            };
                            //if we are within Camden then it will auto-centre the map on the user's location
                            map.locate({setView: true, watch: false});
                            path = "/home/" + $stateParams.service + "/location/" + "your location";
                            $location.path(path);
                        } else {
                            //TODO DELETE THIS it is being used for testing as we are outside camden
                            //if they are outside Camden normal functionality will be used
                            console.log("outside Camden");
                            scope.markers.location = {
                                lat: e.latitude,
                                lng: e.longitude,
                                icon: {
                                    iconSize: [28],
                                    iconUrl: "../img/icons/geolocation.png"
                                },
                                message: "You are here",
                                focus: true
                            };
                            var path = "/home/" + $stateParams.service + "/location/" + "your location";
                            $location.path(path);
                        }
                      });


                    });
                };
            };

            this.addMarkers = function (scope) {
                return function () {
                var root = scope.results,
                // this creates the marker objects to plot the locations on the map
                markers = scope.markers,
            //this is declared here to prevent it being declared every time the loop runs
                property, 
            // instead of two function, one obj with two methods?
                coord = function coord(i, latlng){
                    return Number(scope.results[i][latlng]);
                };
        


                    // this will run on refreshes
                    // it will run if there are capped results
                    if(noResults(scope) || cappedResults(decodeURI($stateParams.service)) ) {
                        
   
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
            

                    if( cappedResults(decodeURI($stateParams.service)) ) {
                        console.log("capped results state params", decodeURI($stateParams.service) ) ;
                        console.log("City farm capped?", cappedResults("City farm"));
                         console.log("City hall", cappedResults("Hall for hire"));
                            markers.m0 = {
                                icon: {
                                    iconSize: [28]
                                },
                                focus: true,
                            };
                            //sets this markers to geolocation 
                            if (markers.location) {

                                markers.m0.message = "Please enter another address for the 5 closest results to that location.";
                                markers.m0.lat = markers.location.lat;
                                markers.m0.lng = markers.location.lng;
                                markers.m0.icon.iconUrl =  "../img/icons/geolocation.png"; 
                                markers.m0.geolocation = true;

                            } 
                            //else sets it to the default location
                            else {
                                markers.m0.message = "NW1 0NE, <br> please enter an address for the 5 closest results.";
                                markers.m0.lat = 51.53861;
                                markers.m0.lng = -0.14205; 
                                markers.m0.icon.iconUrl =  "../img/icons/location-marker.png";
                            }


                    }

                    // only runs when a search address has been entered and is valid
                    // or runs using the defaul location if none is given.... 
                    if($stateParams.address && scope.locationSelected.North) {
                        markers.m0 = {
                            lat: Number(scope.locationSelected.Latitude),
                            lng: Number(scope.locationSelected.Longitude),
                            name: "location",
                            locationTest: true,
                            focus: true,
                            popupOptions: {
                                closeOnClick: false
                             },
                             //this will correctly format street addresses to capitalised
                             //and postcodes to upper case
                            message: ($stateParams.address.replace(/\s/g, "").length < 7
                                    ? $stateParams.address.toUpperCase()
                                    : $stateParams.address.replace(/\b./g, function(m){ return m.toUpperCase(); })),
                            icon: {
                                iconUrl: "../img/icons/location-marker.png",
                                iconSize: [28]
                            }
                        };
                    } 
                    else if ($stateParams.address && !scope.locationSelected.North) {
                        //TODO: Handle this better, alerts are terrible
                        //alert("Please enter a valid address");
                    }

                    scope.update("markers", markers);
			};


			};

            this.zoomCheck = function (scope) {
                return function () {

                    var zoomLevel,
                        size = Object.size(scope.markers);

                    //if results capped at 5 (plus location marker) can zoom in 
                    if(size === 6 || ( size === 7 && scope.markers.location) ) {
                        zoomLevel = 15;
                    }
                    //if results are less than 5 markers zooms out to fit them all in
                    else if (size < 6 || ( size < 7 && scope.markers.location) ) {
                        zoomLevel = 12;
                    }
                    else {
                        zoomLevel = 13;
                    }

                    return zoomLevel;

                };
            };



            
  //           this.centreCheck = function (scope) {
  //               return function () {

  //                   var centre;

  //                   //if geolocation used centres map on this point
  //                   if(scope.markers.location) {
  //                       centre = {
  //                           lat: scope.markers.location.lat,
  //                           lng: scope.markers.location.lng
  //                       };
  //                   }
  //                   //if only five results centres map on NW1 0NE 
  //                   else if (scope.markers.m0 && scope.markers.m0.locationTest) {
  //                       centre = {
  //                           lat: 51.53861,
  //                           lng: -0.14205
  //                       };
  //                   }
  //                   //otherwise remains intial location
  //                   else {
  //                       centre = scope.centre;
  //                   }

  //                   return centre;

  //               };
  //           };
		}

	];

})();
