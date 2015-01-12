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
    var angular = require("angular");

   	//does not use var app = angular.... becuase using chaining
    angular.module("maps", [
            require("angular-ui-router"),
            "leaflet-directive"
 //           require("./controllers/controllers.js"), 
 //           require("./directives/directive.js"), 
 //           require("./services/service.js")
    ])


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CONTROLLERS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        .controller("RootController", [
            "$scope",
            function ($scope) {
                
                //initialize $scope.results at root level
                $scope.results = [];

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
		        	markers: {
		    //     		m1: {
						// 	lat: 51.52908,
						// 	lng: -0.12536,
						// },
		        	}      
		    	});

				$scope.updateMarkers = function updateMarkers(newMarkers){
					$scope.markers = newMarkers;
				};
            }

        ])

        .controller("LandingController", [
            "$scope",

            function ($scope) {

                
                //stores function names and corresponding paths for landing-page buttons
                $scope.buttons = [
                    {
                        id: "findYourNearest",
                        title: "Find Your Nearest",
                        path: "root.landing.services",
                        iconUrl: "img/icons/find-your-nearest.png"
                    },
                    {
                        id: "aboutYourNeighbourhood",
                        title: "About Your Neighbourhood",
                        path: "/neighbourhood/search",
                        iconUrl: "img/icons/your-neighbourhood.png"
                    },
                    {
                        id: "liveStreetworks",
                        title: "Live Streetworks",
                        path: "/streetworks/search",
                        iconUrl: "img/icons/streetworks.png"
                    }
                ];   
            }
        ])

    
        .config( require("./config.js") )
        
        .controller("ServicesController", [
            "$scope",
            "$location",
            "$http",
            //"menu",
            function ($scope, $location, $http/*, menu*/) {
         

                //***************** Initialize menu and variables **************
               
                //current index of visibleItems within currentCategory
                var currentIndex = 0, 
                //number of items visible in menu
                    numberOfItems = 3,
                //current position in the menu
                    currentPosition = 0,
                //all items in current category
                    currentCategory = [],
                //stores full menu
                    menu = [];
                //stores currently visible items
                $scope.visibleItems = [];
               
               
                //****************** Menu population functions ***************** 
                
                //makes visible 4 items from current category
                function getVisibleItems(index) {
                    $scope.visibleItems = currentCategory[index];
                }
                
                //handler that either redirects user or opens new category 
                function clickHandler (item) {
                    if (item.type === "service") {
                        var path = "/home/" + item.title + item.text + "/search";
                        $location.path(path);
                    } else if (item.type === "category") {
                        currentIndex = 0;
                        currentPosition = item.id;
                        getCurrentCategory(currentPosition, numberOfItems);
                        getVisibleItems(currentIndex);
                    }
                }
                
                //adds click handler functions to menu items
                function addClickHandler (item) {
                    return function () {
                        clickHandler(item);
                    };
                }
                
                //populates currentCategory with items in current position in menu
                function getCurrentCategory(positionInMenu, amountPerPage) {
                    currentCategory = [];
                    var fullCategory = menu.filter(function (item) {
                        return Number(item.parentId) === Number(positionInMenu);
                    });
                    var i, index = 0;
                    for (i = 0; i < fullCategory.length; i += 1) {
                        if (i && i % amountPerPage === 0) {
                            index = i / amountPerPage;
                            currentCategory[index] = [];
                        } else if (!i) {
                            currentCategory[index] = [];
                        }
                        fullCategory[i].handler = addClickHandler(fullCategory[i]);
                        currentCategory[index].push(fullCategory[i]);
                    }
                }
                
                //loads menu 
                $http.get("menu.json")
                    .success(function success (data) {
                        menu = data;
                        getCurrentCategory(currentPosition, numberOfItems);
                        getVisibleItems(currentIndex);
                    });

                //********************* Menu control functions ******************
               
                //loads next page of items
                $scope.nextItems = function nextItems () {
                    if (currentIndex === currentCategory.length-1) {
                        return;
                    } else {
                        currentIndex += 1;
                        getVisibleItems(currentIndex);
                    }
                };
                //loads previous page of items
                $scope.prevItems = function prevItems () {
                    if (currentIndex === 0) {
                        return;
                    } else {
                        currentIndex -= 1;
                        getVisibleItems(currentIndex);
                    }
                };
                //loads parent category
                $scope.backOneCategory = function backOneCategory () {
                    if (Number(currentPosition) === 0) {
                        return;
                    } else {
                        currentPosition = menu.filter(function(item){
                            return Number(item.id) === Number(currentPosition);
                        })[0].parentId;
                        currentIndex = 0;
                        getCurrentCategory(currentPosition, numberOfItems);
                        getVisibleItems(currentIndex);
                    }
                };
               
                //execute function to solve scoping issues with ng-repeat & ng-click
                $scope.execute = function execute (fn) {
                    fn();
                };

            }
        ])
        
        .controller("SearchController", [
            "$scope",
            "$stateParams",
            "$location",
            "$http",
            function ($scope, $stateParams, $location, $http) {

                //model for search query
                $scope.address = "";
                //model for error messages
                $scope.error = "";
                //model for service results
                $scope.results = [];
                //model for title
                $scope.service = $stateParams.service;
                //model for icon
                $scope.iconUrl = "";
                
                //return icon url from menu.json
                $http.get("menu.json")
                    .success(function success(menu) {
                        $scope.iconUrl = menu.filter(function (item) {
                            return item.text.toLowerCase() === $scope.service;
                        })[0].img;
                    });

                //populate results when response is received
                $http.get("/services/" + $stateParams.service)
                    .success(function success (services) {
                        $scope.results = services;
                    });

                //redirects to next state when provided with address
                $scope.search = function search () {
                    if ($scope.address) {
                        var path = "/home/" + $stateParams.service + "/location/" + $scope.address;
                        $location.path(path);
                    } else {
                        $scope.error = "Please enter an address";
                    } 
                };

                $scope.searchAgain = function searchAgain () {
                    //TODO: write logic for function
                    console.log("searching again");
                };

                $scope.listResults = function listResults () {
                    //TODO: write logic for function
                    console.log("listing results");
                };

            }
        ])
        
        .controller("LocationController", [
            "$scope",
            "$location",
            "$stateParams",
            "$http",
            function ($scope, $location, $stateParams, $http) {
                
                //reloads $scope.results with new data based on address 
                $http.get("/services/" + $stateParams.service + "/locations/" + $stateParams.address)
                    .success(function success (data) {
                        $scope.results = data;
                        console.log('data', data);
                    });

                $scope.service = $stateParams.service;
                $scope.address = $stateParams.address;

               	$scope.addMarkers = function addMarkers() {
              	

              		console.log('addMarkers being called');
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

					console.log(root.Property[1]["-StreetNum"] !== undefined);



					function lat(i){
						return Number(root.Property[i]["-Latitude"]);
					}

					function lng(i) {
						return Number(root.Property[i]["-Longitude"]);
					}

					function message(i) {
						//this stops undefined being returned in message
						var check = function(value, spacing) {
							if(value !== undefined) {
								pointMessage += (value + spacing);
							}
						};

						var pointMessage = "";

						//TODO work out a sensible way to loop over this.... 
						check(root.Property[i]["PoI"]["-Name"] || root.Property[i]["PoI"][0]["-Name"], "<br>"); 
						check(root.Property[i]["-BuildingName"], "<br>");
						check(root.Property[i]["-StreetNum"], " ");
						check(root.Property[i]["-Street"], "<br>"); 
						check(root.Property[i]["-PostCode"], "<br>");
						check(root.Property[i]["PoI"]["-Telephone"], "");

						// return PoIName + "<br>" + root.Property[i]["-BuildingName"] + "<br>" + root.Property[i]["-StreetNum"] + " " + root.Property[i]["-Street"] + "<br>" + root.Property[i]["-PostCode"] + "<br>" + root.Property[i]["PoI"]["-Telephone"];

						return pointMessage;
					}

					//this hard coding is for development purposes - *MUST* be changed
					//only returns the first Name when there are more than one
					var firstEight = {

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
						},
						m6: {
							lat: lat(5),
							lng: lng(5),
							message: message(5)
						},
						m7: {
							lat: lat(6),
							lng: lng(6),
							message: message(6)
						},
						m8: {
							lat: lat(7),
							lng: lng(7),
							message: message(7)
						}

					};

				$scope.updateMarkers(firstEight);

    			};

    			$scope.addMarkers();


                $scope.searchAgain = function searchAgain () {
                    //TODO: write logic for function
                    console.log("searching again");
                };

                $scope.listResults = function listResults () {
                    //TODO: write logic for function
                    var destination = "/home/"+$scope.service+"/location/"+$scope.address+"/list"; 
                    $location.path(destination);
                };
            }
        ])

        .controller("ListController", [
            "$scope",
            "$stateParams",
            "$location", 
            function ($scope, $stateParams, $location) {
       
                $scope.results = [];

                //TODO: populate results with REAL results
                //mock populate results
                $scope.results = [
                    {
                        name: "Animal Hospital",
                        address: "33 Midhurst Avenue",
                        city: "London, You're Kidding Me",
                        distance: "290129miles"
                    },
                    {
                        name: "Gun Shop",
                        address: "33 Midhurst Avenue",
                        city: "London, York",
                        distance: "5miles"
                    },
                    {
                        name: "Spoon Straightener",
                        address: "24 Clapham Road",
                        city: "London, N10 3EP",
                        distance: "229miles"
                    },
                    {
                        name: "Bag Shredder",
                        address: "33 Midhurst Avenue",
                        city: "London, Castle",
                        distance: "0.4miles"
                    }
                ];


                //button to exit list view
                $scope.exit = function exit () {
                    var destination = "/home/" + $stateParams.service + "/location/" + $stateParams.address;
                    $location.path(destination);
                };

                //handler for each result
                function createResultsHandler (id) {
                    return function () {
                        var path = "/service" + $stateParams.service + 
                            "/location/" + $stateParams.address +
                            id;
                        $location.path(path); 
                    };
                }
/*
                //add handler to results list
                (function addResultsHandlers (index){
                    if (index > $scope.results.length) {
                        return;
                    }
                    $scope.results[index].createResultsHandler($scope.result.id);
                    addResultsHandlers(index+1);
                }(0));
*/
                }
        ])

        .controller("SingleController", [
            "$stateParams",
            "$scope",
            function ($stateParams, $scope) {

                /*
                //CHECKME: theoretically shouldn't be executed if cache is working correctly.
                //loads results if not previously loaded (i.e navigated to directly by url)
                apiSearch.search($stateParams.service, $stateParams.address)
                    .then(function success (data) {
                        $scope.results = data;
                    });
                */

                //selects item from results with matching {id}
                $scope.currentDisplay = $scope.results.filter(function (result) {
                    return result.text.toLowerCase()  === $stateParams.service.toLowerCase();
                });
            }
        ]);
//        .controller("RootController", require("./controllers/root-controller.js"))  )
//        .controller("LandingController", require("./controllers/landing-controller.js"))  
//        .service("apiSearch", require("./services/api-search.js"));
    }());

