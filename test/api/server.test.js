var test = require("tape");
var server = require("../../server/server.js");
var request = require("request");

var apiUrl = "http://0.0.0.0:8080";

function dataProperties () {
    var prop = {};
    prop.services = {};
    prop.services.propertiesKeys = ["StreetNum", "Street", "PostCode", "Longitude", "Latitude", "ViewLat", "ViewLng", "View", "Distance", "display"];
    prop.services.locationsKeys = ["Area", "Longitude", "Latitude"];

    return prop;
}

test("server should ");

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
    

    test("server should return expected data structure from /services/{service}", function(t) {
    
        var servicesProperties = dataProperties().services;

        request(apiUrl + "/services/Library", function(e, h, b) {
        
            var properties, locations, firstProperty;
            b = JSON.parse(b);
            
            t.ok(b.hasOwnProperty("properties"), "response has properties property");
            t.ok(b.hasOwnProperty("location"), "response has location property");
    
            properties = b.properties;
            location = b.location 

            t.ok(properties.length >= 1, "properties is populated");
            t.equals(typeof location, "object", "locations is an object");

            firstProperty = properties[0];
           
            servicesProperties.propertiesKeys.map(function(k) {
                t.ok(firstProperty.hasOwnProperty(k), "properties contains " + k);
            }); 
            servicesProperties.locationsKeys.map(function(k) {
            
                t.ok(location.hasOwnProperty(k), "location contains " + k);
            });

            t.equals(location.Area, "N1C 4AG", "location has default postcode");

            t.end();
      
        });
    
    });


    test("server should return expected data structure from /services/{service}/locations/{location}", function(t) {
    
        var servicesProperties = dataProperties().services;
        
        request(apiUrl + "/services/Lunch club/locations/NW1 0NE", function(e, h, b) {
            
            var properties, locations, firstProperty;
            b = JSON.parse(b);
            
            t.ok(b.hasOwnProperty("properties"), "response has properties property");
            t.ok(b.hasOwnProperty("location"), "response has location property");
    
            properties = b.properties;
            location = b.location 

            t.ok(properties.length >= 1, "properties is populated");
            t.equals(typeof location, "object", "locations is an object");

            firstProperty = properties[0];
           
            servicesProperties.propertiesKeys.map(function(k) {
                t.ok(firstProperty.hasOwnProperty(k), "properties contain" + k);
            }); 
            servicesProperties.locationsKeys.map(function(k) {
                t.ok(location.hasOwnProperty(k), "location contains " + k);
            });

            t.equals(location.Area, "NW1 0NE", "location postcode is NW1 0NE");

            t.end();

        });
    
    });

    
    test("server should return expected data structure from /services/{service}/locations/{location}", function(t) {
    
        var parkingProperties = dataProperties().parking;
        
        request(apiUrl + "/services/Lunch club/locations/NW1 0NE", function(e, h, b) {
            
            var properties, locations, firstProperty;
            b = JSON.parse(b);
            
            t.ok(b.hasOwnProperty("properties"), "response has properties property");
            t.ok(b.hasOwnProperty("location"), "response has location property");
    
            properties = b.properties;
            location = b.location 

            t.ok(properties.length >= 1, "properties is populated");
            t.equals(typeof location, "object", "locations is an object");

            firstProperty = properties[0];
           
            servicesProperties.propertiesKeys.map(function(k) {
                t.ok(firstProperty.hasOwnProperty(k), "properties contain" + k);
            }); 
            servicesProperties.locationsKeys.map(function(k) {
                t.ok(location.hasOwnProperty(k), "location contains " + k);
            });

            t.equals(location.Area, "NW1 0NE", "location postcode is NW1 0NE");

            t.end();

        });
    
    });



    test("stop server", function(t) {
    
        server.stop();
        t.end();
    
    });

});




