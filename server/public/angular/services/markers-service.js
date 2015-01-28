;(function () {
	"use strict";

	module.exports = [
        "$stateParams",
		function ($stateParams) {

			Object.size = function(obj) {
                var size = 0, key;
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) size++;
                }
                return size;
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
                    // TODO run when services with 5 results have address added
                    if(Object.size(markers) === 0 || (Object.size(markers) === 1 && markers.location ) || ( !markers.m6 && markers.m0 && !markers.m0.locationTest ) ) {
                        // var x will save time as the loop does not have to look up the length each time
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
            
                    //to prevent the geolocation marker from being overwritten... 
                    // if(markers.location) {
                    //     markers.location = markers.location;
                    // }

                    console.log(markers.location, "markers location in markers");

                    if( (Object.size(markers) === 5 || ( (Object.size(markers) === 6 && markers.location) ) ) && !$stateParams.location) {

  
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
                        alert("Please enter a valid address");
                    }

                    scope.update("markers", markers);
			};


			};

            this.zoomCheck = function (scope) {
                return function () {

                    var zoomLevel,
                        size = Object.size(scope.markers);
                    console.log("size", size);
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
		}

	];

})();