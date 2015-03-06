var test = require("tape");
var path = require("path");
var controllerDir = path.join(__dirname, "../../../server/angular/controllers/");
var controller = require(path.join(controllerDir, "search-controller.js"));

controller = controller.filter(function(c) {
    return typeof c === "function";
})[0];

//***MOCKS****
var scope = {
    results: [{}, {}, {}, {}],
    error: "",
    activeMarker: false,
    addMarkersCalled: false,
    $on: function(name, handler) {
        this[name] = handler;
    },
    updateResults: function(data) {
        this.results = data;
    },
    updateError: function(err) {
        this.error = err;
    },
    addMarkers: function() {
        this.addMarkersCalled = true;
        return;
    },
    centre: {},
    update: function(name, val) {
        this[name] = val;
    }
};
var location = {
    current: "/",
    path: function(dest) {
        this.current = dest;
    }
};
var stateParams = {
    service: "doesnotexist"
};
var markerHandlers = {
    markerClick: function() {
        return function() {};
    },
    mapClick: function() {
        return function() {};
    }
};
var localStorageService = {
    isSupported: true,
    location: "",
    get: function() {
        return this.location;
    },
    set: function(what, value) {
        this.location = value;
    }
};
var buttonHandlers = {
    searchAgain: function() {},
    toggle: function() {}
};
var apiSearch = {
    data: { error: "error", message: "errormessage"},
    search: function(service) {
        var that = this;
        return {
            success: function(cb) {
                return cb(that.data);
            }
        };
    }
};
var markers = {
    zoomCheck: function() {
        return function() {
            return 10;
        };
    }
};
//*** TESTS ****

function createController() {
    controller(scope, stateParams, location, apiSearch, markers, markerHandlers, buttonHandlers, localStorageService);
}

createController();

test("services-controller.js should exist", function(t) {
    t.ok(controller, "services controller exists");

   
    t.test("scope should have...", function(st) {
    
        st.ok(scope.hasOwnProperty("address"), "scope.address exists");
        st.ok(scope.hasOwnProperty("error"),"scope.error exists");
        st.ok(scope.hasOwnProperty("title"),"scope.title exists");
        st.ok(scope.hasOwnProperty("placeholder"),"scope.placeholder exists");
        st.ok(scope.hasOwnProperty("service"),"scope.service exists");
        st.ok(scope.hasOwnProperty("icon"),"scope.icon exists");
        st.ok(scope.hasOwnProperty("geolocationToolTip"),"scope.geolocationToolTip exists");
        st.ok(scope.hasOwnProperty("geolocateUser"),"scope.geolocateUser exists");
        st.ok(scope.hasOwnProperty("searchAgain"),"scope.searchAgain exists");
        st.ok(scope.hasOwnProperty("backButtonText"),"scope.backButtonText exists");
        st.ok(scope.hasOwnProperty("toggle"),"scope.toggle exists");
       
        
        st.equals(typeof scope.geolocateUser, "function","scope.geolocateUser is a function");

        st.end();

    });

   
    t.test("controller should not break if scope.icon cannot load", function(st) {
        
        stateParams.service = "doesnotexists";

        createController();
        st.ok(scope.hasOwnProperty("icon"), "scope.icon exists");
        st.notOk(scope.icon, "scope.icon doesn't have image url");
        
        st.end();

    });


   
    t.test("if no results, expect api call - if error returned expect error to be updated", function(st) {
   
        scope.results = [];
        stateParams.service = "library";
        createController();
        st.ok(scope.error, "scope.error has been updated");
        st.equals(scope.error, "errormessage", "error updated with data.error");
        
        st.equals(location.current, "/home/services", "user redirected to /home/services");

        st.end();
    
    });
    
    t.test("if no results, expect api call and no error returned, expect results to be updated", function(st) {
        
        stateParams.id = "hello";
        apiSearch.data = {
            properties: [
                {
                    display: {
                        Name: "hello"      
                    }
                }, {
                    display: {
                        Name: "goodbye"
                    }
                }   
            ]
        };
        scope.results = [];
        st.deepEquals(scope.results, [],"scope.results is empty");
        st.notOk(scope.addMarkersCalled, "scope.addMarkers not called yet");
        
        createController();
        
        st.deepEquals(scope.results, apiSearch.data.properties, "scope.results has been updated with data.properties");
        st.ok(scope.result, "scope.result has been updated");
        st.equals(scope.result, scope.results[0], "scope.result is an element from scope.results");
        st.ok(scope.addMarkersCalled, "scope.addMarkers has been called");
        st.equals(scope.centre.zoom, 10, "scope.centre.zoom has been updated");

        st.end();
    
    });

    t.test("event listeners should be registered", function(st) {
    
        st.ok(scope.hasOwnProperty("leafletDirectiveMarker.click"), "scope.on is listening for leafletDirectiveMarker.click");
        st.equals(typeof scope["leafletDirectiveMarker.click"], "function", "and event handler is registered");
        
        st.ok(scope.hasOwnProperty("leafletDirectiveMap.click"), "scope.on is listening for leafletDirectiveMap.click");
        st.equals(typeof scope["leafletDirectiveMap.click"], "function", "and event handler is registered");
        st.end();

    });

    t.test("if localStorage is supported and location is saved", function(st) {
   
        localStorageService.location = "iamlocation";
        stateParams.service = "library";
        createController();
        st.equals(scope.address, "iamlocation", "scope.address is updated to localStorage value");
        
        st.test("and there is NOT currently an active marker", function(sst) {
            sst.equals(location.current, "/home/library/location/iamlocation", "user redirected to /home/{service}/location/{address}");
            sst.end();
        });

        st.test("and there IS currently an active marker", function(sst) {
            
            localStorageService.location = "iamanewlocation";
            scope.activeMarker = {
                icon: {
                    iconUrl: ""
                }
            };
            createController();
            sst.equals(scope.activeMarker, 0,  "scope.activeMarker updated to 0");
            sst.equals(location.current, "/home/library/location/iamanewlocation", "user redirected to /home/{service}/location/{address}");
            sst.end();
        });

        st.end();
    
    });

    t.test("if localStorage is supported but location isn't saved", function(st) {
    
        localStorageService.location = "";
        location.current = "/";
        scope.activeMarker = true;
        
        createController(); 
       
        st.equals(scope.address, "", "scope.address still empty string"); 
        st.equals(location.current, "/", "user not redirected");
        st.equals(scope.activeMarker, true, "scope.activeMarker not updated");

        st.end();

    });
    
    t.test("if localStorage is not supported", function(st) {
    
        scope.address = "ishouldnotchange";
        localStorageService.isSupported = false;
       
        createController();
        
        st.equals(scope.address, "", "scope.address is not updated");

        st.end();

    });
    
    t.test("scope.search should do nothing if no address", function(st) {
        
        //fake that results already exist 
        scope.results = [{}];
        scope.addMarkersCalled = false; 
        st.notOk(scope.address, "scope.address is empty string");
        
        createController();
        
        st.notOk(scope.error, "scope.error is still an empty string");
        st.notOk(scope.addMarkersCalled, "scope.addMarkers has ot been called");
        

        st.end();

    });

    t.test("if address, scope.search should redirect user if data returned", function(st) {
   
        scope.results = [{}];
        scope.activeMarker = {
            icon: {
                iconUrl: ""
            }  
        };
        localStorageService.isSupported = true;
        localStorageService.location = "iamlocation";
        stateParams.service = "dog"
        scope.centre.zoom = 0;
        createController(); 
        scope.search();
        
        st.deepEquals(scope.results, apiSearch.data.properties, "scope.results has been updated");
        st.deepEquals(scope.result, scope.results[0], "scope.result has been assigned from scope.results");
        st.ok(scope.addMarkersCalled, "scope.addMarkers has been called");
        st.equals(scope.centre.zoom, 10, "scope.centre.zoom has been updated");
        st.equals(location.current, "/home/dog/location/iamlocation", "user has been redirected");

        st.end(); 
    
    });
    
    t.end();
});
