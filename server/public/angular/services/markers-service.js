;(function () {
	"use strict";

	module.exports = [
		function () {

			this.addMarkers = function (cb, scope) {
				return function () {
                    var root = scope.results;
                    //These propertes should be dot notation

                    // instead of two function, one obj with two methods?
                    var coord = function coord(i, coord){
                        return Number(scope.results[i][coord]);
                    };

                    // this creates the marker objects to plot the locations on the map
                    var markers = scope.markers;   
                    
                    //this is declared here to prevent it being declared every time the loop runs
                    var property;

                    // this stops it recreating the whole object when the search location is added
                    // but it will run if there are only 5 markers and re-populate near search result
                    if(!scope.markers.m6) {
                        console.log("ROOT-CONTROLLER line 133");
                        // var x will save time as the loop does not have to look up the length each time
                        var i, resultLength = Object.size(root);
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

                    console.log("location", scope.locationSelected.Area);
                    // only runs when a search address has been entered
                    if(scope.locationSelected.Area) {
                        markers.m0 = {
                            lat: Number(scope.locationSelected.Latitude),
                            lng: Number(scope.locationSelected.Longitude),
                            name: "location",
                            focus: true,
                            popupOptions: {
                                closeOnClick: false
                             },
                            message: scope.locationSelected.Area.toUpperCase(),
                            icon: {
                                iconUrl: "../img/icons/location-marker.png",
                                iconSize: [28]
                            }
                        };
                    }

                    cb(markers);
			};

			};
		}

	];

})();