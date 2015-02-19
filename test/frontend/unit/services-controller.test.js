var test = require("tape");
var path = require("path");
var controllerDir = path.join(__dirname, "../../../server/angular/controllers/");
var controller = require(path.join(controllerDir, "services-controller.js"));

controller = controller.filter(function(c) {
    return typeof c === "function";
})[0];

//***MOCKS***
var window = {
    innerWidth: 1000
}

var location = {
    value: "",
    path: function (val) {
        this.value = val;
    }
}

var scope = {
    update: function(name, value) {
        this[name] = value;
    }
};
//***********

controller(scope, location, window);

test("services-controller.js should exist", function (t) {

    var viInitial, pInitial; 
    
    
    t.ok(controller, "services-controller exists");

    
    t.test("scope should have the following properties", function(st) {
    
        st.ok(scope.visibleItems, "scope.visibleItems exists"); 
        st.equals(typeof scope.visibleItems, "object", "scope.visibleItems is an array");

        st.ok(scope.hasOwnProperty("page"), "scope.page exists");
        st.equals(typeof scope.page, "number", "scope.page is a number");

        st.ok(scope.hasOwnProperty("nextItems"), "scope.nextItems exists");
        st.equals(typeof scope.nextItems, "function", "scope.nextItems is a function");

        st.ok(scope.hasOwnProperty("prevItems"), "scope.prevItems exists");
        st.equals(typeof scope.prevItems, "function", "scope.prevItems is a function");

        st.ok(scope.hasOwnProperty("backOneCategory"), "scope.backOneCategory exists");
        st.equals(typeof scope.backOneCategory, "function", "scope.backOneCategory is a function");

        st.ok(scope.hasOwnProperty("execute"), "scope.execute exists");
        st.equals(typeof scope.execute, "function", "scope.execute is a function");

        st.end();

    });

    
    t.test("scope.nextItems should change page and update visible items", function(st) {
       
        viInitial = scope.visibleItems;
        pInitial = scope.page;
        
        scope.nextItems();
        
        st.notEquals(viInitial, scope.visibleItems, "scope.visibleItems has been updated");
        st.notEquals(pInitial, scope.page, "scope.page has been updated");
        st.equals(typeof scope.visibleItems, "object", "scope.visibleItems is still an array");
        st.equals(typeof scope.page, "number", "scope.page is still an number");
        
        st.end();

    });

    
    t.test("scope.prevItems should change page and update visible items", function(st) {
       
        viInitial = scope.visibleItems;
        pInitial = scope.page;
        
        scope.prevItems();
        
        st.notEquals(viInitial, scope.visibleItems, "scope.visibleItems has been updated");
        st.notEquals(pInitial, scope.page, "scope.page has been updated");
        st.equals(typeof scope.visibleItems, "object", "scope.visibleItems is still an array");
        st.equals(typeof scope.page, "number", "scope.page is still an number");
        
        st.end();

    });


    t.test("item handlers should change categories and update visile items if item is category", function(st) {
        
        viInitial = scope.visibleItems;
        
        st.equals(scope.visibleItems[0].type, "category", "item is a category");
        
        scope.visibleItems[0].handler();

        st.notEquals(viInitial, scope.visibleItems, "scope.visibleItems has been updated");
        st.equals(typeof scope.visibleItems, "object", "scope.visibleItems is still an array");

        st.end();

    });

    
    t.test("scope.backOneCategory should load previous category", function(st) {
    
        viInitial = scope.visibleItems;

        scope.backOneCategory();

        st.notEquals(viInitial, scope.visibleItems, "scope.visibleItems has been updated");

        st.end();
    
    });
    
    
    t.test("scope.execute should invoke its parameter", function(st) {
   
        var test = false;
        
        scope.execute(function(){
            test = true;
        });

        st.equals(test, true, "parameter should have been invoked");
        
        st.end();

    });
    
    
    t.end();

});

