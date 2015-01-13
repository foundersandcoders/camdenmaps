/******************************
*   LOCATION-CONTROLLER.JS
*
******************************/

//TODO: Add handler for List Results and Search Again buttons

;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$location",
        "$stateParams",
        "$http",
        function ($scope, $location, $stateParams, $http) {

            
            //reloads $scope.results with new data based on address 
            $http.get("/services/" + $stateParams.service + "/locations/" + $stateParams.address)
                .success(function success (data) {
                    $scope.updateResults(data.Locations.Properties.Property);
                });

            $scope.service = $stateParams.service;
            $scope.address = $stateParams.address.toUpperCase();

            $scope.searchAgain = function searchAgain () {
                //TODO: write logic for function
                $location.path("/home");
            };

            $scope.listResults = function listResults () {       
                //TODO: write logic for function
                console.log($scope.results);
                var destination = "/home/"+$scope.service+"/location/"+$scope.address+"/list"; 
                $location.path(destination);
            };

            $scope.addMarkers = function addMarkers() {

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

        }
    ];
}());
