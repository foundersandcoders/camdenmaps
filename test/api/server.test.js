var test = require("tape");
var server = require("../../server/server.js");
var request = require("request");
var jwt = require("jsonwebtoken");

var apiUrl = "http://0.0.0.0:8080";

function dataProperties () {
    var prop = {};
    
    prop.services = {};
    prop.services.propertiesKeys = ["StreetNum", "Street", "PostCode", "Longitude", "Latitude", "ViewLat", "ViewLng", "View", "Distance", "display"];
    prop.services.locationsKeys = ["Area", "Longitude", "Latitude"];

    prop.parking = {};
    prop.parking.propertiesKeys = ["Latitude", "Longitude", "Street", "display"];
    prop.parking.locationsKeys = ["Area", "Longitude", "Latitude"];

    prop.neighbourhood = {};
    prop.neighbourhood.informationKeys = ["Children Locality Areas", "Conservation Area", "Controlled Parking Main Zone", "European constituency", "Housing district", "Licensing Enforcement Areas", "UDP Town Centre", "Ward", "Ward district management committee", "Ward housing team"];
    prop.neighbourhood.locationsKeys = ["Area", "Latitude", "Longitude"];

    prop.recycling = {};
    prop.recycling.propertiesKeys = ["Street", "Latitude", "Longitude", "display"];
    prop.recycling.locationsKeys = ["Area", "Latitude", "Longitude"];
    
    return prop;
}

// BASIC
test("server should contain an object", function(t) {

    t.equals(typeof server, "object", "server contains an object");
    t.end();

});

server.start(function(){
    console.log("server started and tests running ...");

    test("server should return 200", function(t) {
    
        request(apiUrl + "/services/Library", function(e, h, b) {
        
            t.equals(h.statusCode, 200, "server returned status code 200");
            t.end();
        
        });

    });
    

//NEAREST API
    test("server should return expected data structure from /services/{service}", function(t) {
    
        var servicesProperties = dataProperties().services;

        request(apiUrl + "/services/Library", function(e, h, b) {
        
            var properties, location, firstProperty;
            b = JSON.parse(b);
            
            t.ok(b.hasOwnProperty("properties"), "response has properties property");
            t.ok(b.hasOwnProperty("location"), "response has location property");
    
            properties = b.properties;
            location = b.location 

            t.ok(properties.length >= 1, "properties is populated");
            t.equals(typeof location, "object", "location is an object");

            firstProperty = properties[0];
           
            servicesProperties.propertiesKeys.map(function(k) {
                t.ok(firstProperty.hasOwnProperty(k), "properties contain " + k);
            }); 
            servicesProperties.locationsKeys.map(function(k) {
            
                t.ok(location.hasOwnProperty(k), "location contains " + k);
            });

            t.equals(location.Area, "N1C 4AG", "location has default postcode");

            t.end();
      
        });
    
    });


    test("server should return expected data structure from /services/{service}/locations/{location} with nearest services and postcode", function(t) {
    
        var servicesProperties = dataProperties().services;
        
        request(apiUrl + "/services/Lunch club/locations/NW1 0NE", function(e, h, b) {
            
            var properties, location, firstProperty;
            b = JSON.parse(b);
            
            t.ok(b.hasOwnProperty("properties"), "response has properties property");
            t.ok(b.hasOwnProperty("location"), "response has location property");
    
            properties = b.properties;
            location = b.location 

            t.ok(properties.length >= 1, "properties is populated");
            t.equals(typeof location, "object", "location is an object");

            firstProperty = properties[0];
           
            servicesProperties.propertiesKeys.map(function(k) {
                t.ok(firstProperty.hasOwnProperty(k), "properties contain " + k);
            }); 
            servicesProperties.locationsKeys.map(function(k) {
                t.ok(location.hasOwnProperty(k), "location contains " + k);
            });

            t.equals(location.Area, "NW1 0NE", "location postcode is NW1 0NE");

            t.end();

        });
    
    });

    test("server should return expected data structure from /services/{service}/locations/{location} with nearest services and streetname", function(t) {
    
        var servicesProperties = dataProperties().services;
        
        request(apiUrl + "/services/Lunch club/locations/well road", function(e, h, b) {
            
            var properties, location, firstProperty;
            b = JSON.parse(b);
            
            t.ok(b.hasOwnProperty("properties"), "response has properties property");
            t.ok(b.hasOwnProperty("location"), "response has location property");
    
            properties = b.properties;
            location = b.location 

            t.ok(properties.length >= 1, "properties is populated");
            t.equals(typeof location, "object", "location is an object");

            firstProperty = properties[0];
           
            servicesProperties.propertiesKeys.map(function(k) {
                t.ok(firstProperty.hasOwnProperty(k), "properties contain " + k);
            }); 
            servicesProperties.locationsKeys.map(function(k) {
                if(k !== "Area"){
                    t.ok(location.hasOwnProperty(k), "location contains " + k);
                }
            });

            t.end();

        });
    
    });
   

// PARKING API 
    test("server should return expected data structure from /services/{service} with parking services", function(t) {
    
        var parkingProperties = dataProperties().parking;
        
        request(apiUrl + "/services/Car park", function(e, h, b) {
            
            var properties, location, firstProperty;
            b = JSON.parse(b);
            
            t.ok(b.hasOwnProperty("properties"), "response has properties property");
            t.ok(b.hasOwnProperty("location"), "response has location property");
    
            properties = b.properties;
            location = b.location 

            t.ok(properties.length >= 1, "properties is populated");
            t.equals(typeof location, "object", "location is an object");

            firstProperty = properties[0];
           
            parkingProperties.propertiesKeys.map(function(k) {
                t.ok(firstProperty.hasOwnProperty(k), "properties contain " + k);
            }); 
            parkingProperties.locationsKeys.map(function(k) {
                t.ok(location.hasOwnProperty(k), "location contains " + k);
            });

            t.equals(location.Area, "N1C 4AG", "location postcode is default (N1C 4AG)");

            t.end();

        });
    
    });

    test("server should return expected data structure from /services/{service}/locations/{location} with parking services and postcode", function(t) {
    
        var parkingProperties = dataProperties().parking;
        
        request(apiUrl + "/services/Car park/locations/NW1 0NE", function(e, h, b) {
            
            var properties, location, firstProperty;
            b = JSON.parse(b);
            
            t.ok(b.hasOwnProperty("properties"), "response has properties property");
            t.ok(b.hasOwnProperty("location"), "response has location property");
    
            properties = b.properties;
            location = b.location 

            t.ok(properties.length >= 1, "properties is populated");
            t.equals(typeof location, "object", "location is an object");

            firstProperty = properties[0];
           
            parkingProperties.propertiesKeys.map(function(k) {
                t.ok(firstProperty.hasOwnProperty(k), "properties contain " + k);
            }); 
            parkingProperties.locationsKeys.map(function(k) {
                t.ok(location.hasOwnProperty(k), "location contains " + k);
            });

            t.equals(location.Area, "NW1 0NE", "location postcode is NW1 0NE");

            t.end();

        });
    
    });
    
    
    test("server should return expected data structure from /services/{service}/locations/{location} with parking services and streetname", function(t) {
    
        var parkingProperties = dataProperties().parking;
        
        request(apiUrl + "/services/Car park/locations/well road", function(e, h, b) {
            
            var properties, location, firstProperty;
            b = JSON.parse(b);
            
            t.ok(b.hasOwnProperty("properties"), "response has properties property");
            t.ok(b.hasOwnProperty("location"), "response has location property");
    
            properties = b.properties;
            location = b.location 

            t.ok(properties.length >= 1, "properties is populated");
            t.equals(typeof location, "object", "location is an object");

            firstProperty = properties[0];
           
            parkingProperties.propertiesKeys.map(function(k) {
                t.ok(firstProperty.hasOwnProperty(k), "properties contain " + k);
            }); 
            parkingProperties.locationsKeys.map(function(k) {
                if(k !== "Area") { 
                    t.ok(location.hasOwnProperty(k), "location contains " + k);
                }
            });

            t.end();

        });
    
    });
   
//RECYCLING
    test("server should return expected data structure from /services/{service} with recycling services", function(t) {
    
        var recyclingProperties = dataProperties().recycling;
        
        request(apiUrl + "/services/recycling point", function(e, h, b) {
            
            var properties, location, firstProperty;
            b = JSON.parse(b);
            
            t.ok(b.hasOwnProperty("properties"), "response has properties property");
            t.ok(b.hasOwnProperty("location"), "response has location property");
    
            properties = b.properties;
            location = b.location 

            t.ok(properties.length >= 1, "properties is populated");
            t.equals(typeof location, "object", "location is an object");

            firstProperty = properties[0];
           
            recyclingProperties.propertiesKeys.map(function(k) {
                t.ok(firstProperty.hasOwnProperty(k), "properties contain " + k);
            }); 
            recyclingProperties.locationsKeys.map(function(k) {
                t.ok(location.hasOwnProperty(k), "location contains " + k);
            });

            t.equals(location.Area, "N1C 4AG", "location postcode is default (N1C 4AG)");

            t.end();

        });
    
    });
   
    test("server should return expected data structure from /services/{service}/locations/{location} with recycling services and postcode", function(t) {
    
        var recyclingProperties = dataProperties().recycling;
        
        request(apiUrl + "/services/recycling point/locations/NW1 0NE", function(e, h, b) {
            
            var properties, location, firstProperty;
            b = JSON.parse(b);
            
            t.ok(b.hasOwnProperty("properties"), "response has properties property");
            t.ok(b.hasOwnProperty("location"), "response has location property");
    
            properties = b.properties;
            location = b.location 

            t.ok(properties.length >= 1, "properties is populated");
            t.equals(typeof location, "object", "location is an object");

            firstProperty = properties[0];
           
            recyclingProperties.propertiesKeys.map(function(k) {
                t.ok(firstProperty.hasOwnProperty(k), "properties contain " + k);
            }); 
            recyclingProperties.locationsKeys.map(function(k) {
                t.ok(location.hasOwnProperty(k), "location contains " + k);
            });

            t.equals(location.Area, "NW1 0NE", "location postcode is NW1 0NE");

            t.end();

        });
    
    });
   
    test("server should return expected data structure from /services/{service}/locations/{location} with recycling services and streetname", function(t) {
    
        var recyclingProperties = dataProperties().recycling;
        
        request(apiUrl + "/services/recycling point/locations/well road", function(e, h, b) {
            
            var properties, location, firstProperty;
            b = JSON.parse(b);
            
            t.ok(b.hasOwnProperty("properties"), "response has properties property");
            t.ok(b.hasOwnProperty("location"), "response has location property");
    
            properties = b.properties;
            location = b.location 

            t.ok(properties.length >= 1, "properties is populated");
            t.equals(typeof location, "object", "location is an object");

            firstProperty = properties[0];
           
            recyclingProperties.propertiesKeys.map(function(k) {
                t.ok(firstProperty.hasOwnProperty(k), "properties contain " + k);
            }); 
            recyclingProperties.locationsKeys.map(function(k) {
                if(k !== "Area") {
                    t.ok(location.hasOwnProperty(k), "location contains " + k);
                }
            });

            t.end();

        });
    
    });

// LOCAL INFORMATION
    test("server should return expected data structure from /addresses/{uprn} ", function(t) {
    
        var neighbourhoodProperties = dataProperties().neighbourhood;
        
        request(apiUrl + "/addresses/5023741", function(e, h, b) {
            
            var information, location, firstProperty;
            b = JSON.parse(b);
            
            t.ok(b.hasOwnProperty("information"), "response has information property");
            t.ok(b.hasOwnProperty("location"), "response has location property");
    
            information = b.information;
            location = b.location 

            t.equals(typeof location, "object", "location is an object");
            t.equals(typeof information, "object", "information is an object");

            neighbourhoodProperties.informationKeys.map(function(k) {
                t.ok(information.hasOwnProperty(k), "information contains " + k);
            }); 
            neighbourhoodProperties.locationsKeys.map(function(k) {
                t.ok(location.hasOwnProperty(k), "location contains " + k);
            });

            t.equals(location.Area, "NW1 0JH", "location postcode is NW1 0JH");

            t.end();

        });
    
    });

// AUTHTOKEN
    test("server should return an auth token from /auth_token", function(t) {
    
        request(apiUrl + "/auth_token", function(e, h, b) {
       
            var token, decoded;
            t.ok(h.headers.hasOwnProperty("x-access-token"), "token received");
            
            token = h.headers["x-access-token"];
            decoded = jwt.decode(token, "changeme");

            t.equals(typeof decoded, "object", "token is valid");

            t.end();
        
        });
    
    });

// DOCS
    test("server should expose /api endpoint", function(t) {
    
        request(apiUrl + "/api", function(e, h, b) {
        
            t.equals(h.statusCode, 200, "/api returns 200");
            t.end();

        });
    
    });
        

// LOGS
    test("server should expose /logs endpoint", function(t) {
    
        request(apiUrl + "/logs", function(e, h, b) {
        
            t.equals(h.statusCode, 200, "/logs returns 200");
            t.ok(/text\/richtext/.test(h.headers["content-type"]), "content type is rich text");
            t.end();
        
            server.stop();
        });
    
    });

});




