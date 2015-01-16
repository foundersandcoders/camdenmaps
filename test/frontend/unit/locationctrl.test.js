;(function () {
     "use strict";    

     describe("LocationController", function () {
        var scope, createController, $controller;
       

        beforeEach(function(){
        
            var app = angular.module("testapp", []); 
            app.controller("LocationController", require("../../../server/public/angular/controllers/landing-controller.js"));
            window.module("testapp");

            inject(function (_$controller_) {
                $controller = _$controller_;
                scope = {};
                createController = function createController () {
                    return $controller("LocationController", {
                        "$scope": scope
                    });
                }
            });
            
        });

        it("should be initialized with 3 buttons", function () {
             var ctrl = createController();
             expect(scope.buttons.length).toBe(3);
        });

     });

}());
