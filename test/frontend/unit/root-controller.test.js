var test = require("tape");
var path = require("path");
var controllerDir = path.join(__dirname, "../../../server/angular/controllers/");
var controller = require(path.join(controllerDir, "root-controller.js"));

controller = controller.filter(function(c) {
    return typeof c === "function";
})[0];

//***MOCKS****
var buttonHandlers = {
    searchAgain: function() {
        return function() {} 
    }
}

var markers = {
    addMarkers: function() {
        return function() {}
    }
}

var scope = {};
//***********

controller(scope, markers, buttonHandlers);

test("root-controller.js should exist", function(t) {

    t.ok(controller, "root controller exists");


    t.test("scope should have the following methods", function(st) {

        
        st.ok(scope.hasOwnProperty("locationSelected"), "scope.locationSelected exists");
        st.deepEquals(scope.locationSelected, {}, "scope.locationSelected is an empty object");

        st.ok(scope.hasOwnProperty("results"), "scope.results exists");
        st.deepEquals(scope.results, [], "scope.results is an empty array");

        st.ok(scope.hasOwnProperty("activeMarker"), "scope.activeMarker exists");
        st.equals(scope.activeMarker, 0, "scope.activemarkers is 0");

        st.ok(scope.hasOwnProperty("updateResults"), "scope.updateResults exists");
        st.equals(typeof scope.updateResults, "function", "scope.updateResults is a function");

        st.ok(scope.hasOwnProperty("update"), "scope.update exists");
        st.equals(typeof scope.update, "function", "scope.update is a function");

        st.ok(scope.hasOwnProperty("centre"), "scope.centre exists");
        st.equals(typeof scope.centre, "object", "scope.centre is an object");

        st.ok(scope.hasOwnProperty("maxbounds"), "scope.maxbounds exists");
        st.equals(typeof scope.maxbounds, "object", "scope.maxbounds is an object");
        
        st.ok(scope.hasOwnProperty("defaults"), "scope.defaults exists");
        st.equals(typeof scope.defaults, "object", "scope.defaults is an object");
        
        st.ok(scope.hasOwnProperty("markers"), "scope.markers exists");
        st.equals(typeof scope.markers, "object", "scope.markers is an object");
        
        st.ok(scope.hasOwnProperty("geojson"), "scope.geojson exists");
        st.equals(typeof scope.geojson, "object", "scope.geojson is an object");

        st.ok(scope.hasOwnProperty("sendHome"), "scope.sendHome exists");
        st.equals(typeof scope.sendHome, "function", "scope.sendHome is a function");
        
        st.ok(scope.hasOwnProperty("addMarkers"), "scope.addMarkers exists");
        st.equals(typeof scope.addMarkers, "function", "scope.addMarkers is a function");
        
        st.end();

    });

    test("scope.updateResults should change scope.results", function(st) {

        st.deepEquals(scope.results, [], "scope.results is empty" )
        scope.updateResults([{display: "heuo"}]);
        st.deepEquals(scope.results, [{display: "heuo"}], "scope.results has been updated");
        st.end(); 

    });


    test("scope.update should update scope", function(st) {

        st.deepEquals(scope.markers, {}, "scope.markers is empty");
        scope.update("markers", {h: 10});
        st.deepEquals(scope.markers, {h: 10}, "scope.markers has been updated");
        st.end();

    });

    t.end();

});
