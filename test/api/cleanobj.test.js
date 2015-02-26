var test = require("tape");
var clean = require("../../server/lib/cleanobj.js");

test("cleanobj.js should contain a function", function(t) {

    t.equals(typeof clean, "function", "cleanobj.js is a function");
    t.end();

});

test("String.prototype should have method 'contains'", function(t) {

    t.ok(String.prototype.hasOwnProperty("contains"), "String.prototype.contains exists");
    t.equals(typeof String.prototype.contains, "function", "String.prototype.contains is a function");
    t.end();

});


test("String.prototype.contains should return true if string contains input", function(t) {

    t.equals("HELLO".contains("O"), true, "'HELLO'.contains('O') is true");
    t.equals("eeee".contains(9), false, "'eeee'.contains(9) is false");
    t.end();

});


test("cleanobj should only change properties that are strings and don't contain http://", function(t) {

    var obj = {
        hello: ["heueu", 334], 
        dog: true,
        url: "http://euaoeuaou",
        cat: 93939
    };

    Object.keys(obj).map(function(k) {
        t.equals(clean(obj)[k], obj[k], "obj." + k + " is unchanged");
    });

    t.end();

});


test("cleanobj should change all / to 'and' in string properties", function(t) {

    var obj = {
        yes: "eaosuh/aouea",
        no: "eaosuh/aouea/euaoeu",
        maybe: "aueoths/"
    };
    var objProcessed = {
        yes: "eaosuh and aouea",
        no: "eaosuh and aouea and euaoeu",
        maybe: "aueoths and "
    };

    Object.keys(obj).map(function(k) {
        t.equals(clean(obj)[k], objProcessed[k], "obj." + k + " has been changed");
    });
    
    t.end();


});


test("String.prototype.contains should not be overwritten if it exists", function(t) {

    String.prototype.contains = function() {
        return true;
    };
    clean = require("../../server/lib/cleanobj.js");
    t.equals("".contains(), true, "String.prototype.contains has not been overwritten");
    t.end();

});
