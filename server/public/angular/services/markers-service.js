;(function () {
	"use strict";

	module.exports = [
		function () {

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
        

                    // this stops it recreating the whole object when the search location is added
                    // but it will run if there are only 5 markers and re-populate near search result
                    if(!scope.markers.m6 && scope.locationSelected) {
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

                    console.log("location", scope.locationSelected.Area);
                    // only runs when a search address has been entered and is valid
                    if(scope.locationSelected.OSARP) {
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

                    scope.update("markers", markers);
			};

			};
		}

	];

})();