/*  APP.JS
*   Description: Define core angular module
*   Use: Initialize core angular module and register controllers, directives and services.
*/

(function () {
    "use strict";
     var app = angular.module("map", ["leaflet-directive"]);

	app.controller("CustomParametersController", [ '$scope', function($scope) {
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


        $scope.requestResults = function () {


		    //vanilla js ajax call rather than using jquery
		    function ajaxCall (url, callback) {
			    var xmlhttp;

			    xmlhttp = new XMLHttpRequest();
			    xmlhttp.onreadystatechange = function () {
			        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			            callback(xmlhttp.responseText);
			        }
			    };
			    xmlhttp.open("GET", url, true);
			    xmlhttp.send();
			}


			//get element by class and add action listener that sends requests to API    
		    var service = document.getElementById("Dropdownlistfind").value;
		    var location = document.getElementById("postcode").value;
		    ajaxCall("https://camdenmaps.herokuapp.com/services/" + service + "/locations/" + location,function (data) {
		        
	        console.log(data);
	        // results = data;
	        
	        $scope.addMarkers = function() {
              
              //until XML is correctly parsed, using fake data that mocks the correct JSON format we want
                var fakeData = {
					  "Locations": {
					    "-Area": "WC1H 9JE",
					    "AddressSearchResults": {
					      "-Area": "WC1H 9JE",
					      "-East": "182795",
					      "-North": "530135",
					      "-Longitude": "-0.12536",
					      "-Latitude": "51.52908"
					    },
					    "Properties": {
					      "Property": [
					        {
					          "-LocationID": "530521182287",
					          "-BuildingName": "Corams Fields ",
					          "-StreetNum": "93",
					          "-Street": "Guilford Street",
					          "-PostCode": "WC1N 1DN",
					          "-Longitude": "-0.11999",
					          "-Latitude": "51.52442",
					          "-ViewLat": "51.52356",
					          "-ViewLng": "-0.11946",
					          "-View": "338",
					          "-Distance": "0.638",
					          "PoI": {
					            "-Name": "Brownies Holborn 3Rd",
					            "-Type": "Brownies group",
					            "-Telephone": "0800 169 5901",
					            "-URL": "http://www.girlguiding.org.uk/interested",
					            "-Source": "CINDEX"
					          }
					        },
					        {
					          "-LocationID": "530533182040",
					          "-BuildingName": "Great Ormond Street Childrens Hospital ",
					          "-Street": "Great Ormond Street",
					          "-PostCode": "WC1N 3JH",
					          "-Longitude": "-0.11991",
					          "-Latitude": "51.5222",
					          "-ViewLat": "51.52204",
					          "-ViewLng": "-0.11976",
					          "-View": "331",
					          "-Distance": "0.853",
					          "PoI": {
					            "-Name": "Guides Holborn 17Th",
					            "-Type": "Brownies group",
					            "-Telephone": "0800 169 5901",
					            "-URL": "http://www.girlguiding.org.uk/interested",
					            "-Source": "CINDEX"
					          }
					        },
					        {
					          "-LocationID": "530356181415",
					          "-BuildingName": "Dragon Hall ",
					          "-StreetNum": "17",
					          "-Street": "Stukeley Street",
					          "-PostCode": "WC2B 5LL",
					          "-Longitude": "-0.12269",
					          "-Latitude": "51.51663",
					          "-ViewLat": "51.51657",
					          "-ViewLng": "-0.12259",
					          "-View": "315",
					          "-Distance": "1.398",
					          "PoI": {
					            "-Name": "Brownies Covent Garden 1St",
					            "-Type": "Brownies group",
					            "-Telephone": "0800 169 5901",
					            "-URL": "http://www.girlguiding.org.uk/interested",
					            "-Source": "CINDEX"
					          }
					        },
					        {
					          "-LocationID": "528859184650",
					          "-BuildingName": "Kentish Town Congregational Church ",
					          "-Street": "Kelly Street",
					          "-PostCode": "NW1 8PH",
					          "-Longitude": "-0.14307",
					          "-Latitude": "51.54604",
					          "-ViewLat": "51.54589",
					          "-ViewLng": "-0.14357",
					          "-View": "62",
					          "-Distance": "2.251",
					          "PoI": {
					            "-Name": "Brownies St Pancras 8Th",
					            "-Type": "Brownies group",
					            "-Telephone": "0800 169 5901",
					            "-URL": "http://www.girlguiding.org.uk/interested",
					            "-Source": "CINDEX"
					          }
					        },
					        {
					          "-LocationID": "527885185667",
					          "-StreetNum": "53",
					          "-Street": "Courthope Road",
					          "-PostCode": "NW3 2LE",
					          "-Longitude": "-0.15674",
					          "-Latitude": "51.5554",
					          "-ViewLat": "51.55547",
					          "-ViewLng": "-0.15646",
					          "-View": "248",
					          "-Distance": "3.648",
					          "PoI": [
					            {
					              "-Name": "Brownies St Pancras 7Th",
					              "-Type": "Brownies group",
					              "-Telephone": "0800 169 5901",
					              "-URL": "http://www.girlguiding.org.uk/interested",
					              "-Source": "CINDEX"
					            },
					            {
					              "-Name": "Rainbows St Pancras 7Th",
					              "-Type": "Brownies group",
					              "-Telephone": "0800 169 5901",
					              "-URL": "http://www.girlguiding.org.uk/interested",
					              "-Source": "CINDEX"
					            }
					          ]
					        },
					        {
					          "-LocationID": "527001184736",
					          "-StreetNum": "52",
					          "-Street": "Belsize Square",
					          "-PostCode": "NW3 4HN",
					          "-Longitude": "-0.16982",
					          "-Latitude": "51.54723",
					          "-ViewLat": "51.54735",
					          "-ViewLng": "-0.16974",
					          "-View": "201",
					          "-Distance": "3.686",
					          "PoI": {
					            "-Name": "Brownies Hampstead 17Th",
					            "-Type": "Brownies group",
					            "-Telephone": "0800 169 5901",
					            "-URL": "http://www.girlguiding.org.uk/interested",
					            "-Source": "CINDEX"
					          }
					        },
					        {
					          "-LocationID": "526942185341",
					          "-BuildingName": "Olave Centre ",
					          "-StreetNum": "12C",
					          "-Street": "Lyndhurst Road",
					          "-PostCode": "NW3 5PQ",
					          "-Longitude": "-0.17045",
					          "-Latitude": "51.55268",
					          "-ViewLat": "51.55312",
					          "-ViewLng": "-0.17064",
					          "-View": "164",
					          "-Distance": "4.084",
					          "PoI": [
					            {
					              "-Name": "Brownies Hampstead 12Th",
					              "-Type": "Brownies group",
					              "-Telephone": "0800 169 5901",
					              "-URL": "http://www.girlguiding.org.uk/interested",
					              "-Source": "CINDEX"
					            },
					            {
					              "-Name": "Rainbows Hampstead Pax Lodge",
					              "-Type": "Brownies group",
					              "-Telephone": "07787 551771",
					              "-URL": "http://www.girlguiding.org.uk/interested",
					              "-Source": "CINDEX"
					            }
					          ]
					        },
					        {
					          "-LocationID": "525297185872",
					          "-BuildingName": "St Lukes Church Hall ",
					          "-Street": "Kidderpore Avenue",
					          "-PostCode": "NW3 7SU",
					          "-Longitude": "-0.19398",
					          "-Latitude": "51.55782",
					          "-ViewLat": "51.55768",
					          "-ViewLng": "-0.19413",
					          "-View": "31",
					          "-Distance": "5.734",
					          "PoI": {
					            "-Name": "Brownies West Hampstead 2Nd",
					            "-Type": "Brownies group",
					            "-Telephone": "0800 169 5901",
					            "-URL": "http://www.girlguiding.org.uk/interested",
					            "-Source": "CINDEX"
					          }
					        }
					      ]
					    }
					  }
					};


	//once we have real data this will need to be changed to data not fakeData
	var root = fakeData.Locations.Properties;


	function lat(i){
		return Number(root.Property[i]["-Latitude"]);
	}

	function lng(i) {
		return Number(root.Property[i]["-Longitude"]);
	}

	function message(i) {
		return root.Property[i]["PoI"]["-Name"] + "<br>" + root.Property[i]["-BuildingName"] + "<br>" + root.Property[i]["-StreetNum"] + " " + root.Property[i]["-Street"] + "<br>" + root.Property[i]["-PostCode"] + "<br>" + root.Property[i]["PoI"]["-Telephone"];
	}


	//this hard coding is for development purposes - *MUST* be changed
	//does not work when there are two POIs at the same address
	var firstFive = {
		m1: {
			lat: lat(0),
			lng: lng(0),
			message: message(0)

		},
		m2: {
			lat: lat(1),
			lng: lng(1),
			message: message(1)
		},
		m3: {
			lat: lat(2),
			lng: lng(2),
			message: message(2)
		},
		m4: {
			lat: lat(3),
			lng: lng(3),
			message: message(3)
		},
		m5: {
			lat: lat(4),
			lng: lng(4),
			message: message(4)
		}
	};




                angular.extend($scope, {
                    

                    markers: firstFive

                });
            }();


			});
		};


	}]);

}());
