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
                    if(Object.size(markers) === 0) {
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

                    if(Object.size(markers) === 5 && !$stateParams.location) {

                            markers.m0 = {
                                lat: 51.53861,
                                lng: -0.14205, 
                                icon: {
                                    iconUrl: "../img/icons/location-marker.png",
                                    iconSize: [28]
                                },
                                focus: true,
                                message:  "NW1 0NE, <br> please enter an address for the 5 closest results.",
                                name: "fiveResultsOnlyMessage"
                            };

                    }

                    // only runs when a search address has been entered and is valid
                    if($stateParams.address && scope.locationSelected.North) {
                        markers.m0 = {
                            lat: Number(scope.locationSelected.Latitude),
                            lng: Number(scope.locationSelected.Longitude),
                            name: "location",
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
                    } else if ($stateParams.address && !scope.locationSelected.North) {
                        alert("Please enter a valid address");
                    }

                    scope.update("markers", markers);
			};

			};
		}

	];

})();