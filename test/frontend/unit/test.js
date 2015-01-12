;(function () {
     "use strict";    

     describe("Just a walk in the park", function () {

         beforeEach("walk", function () {
             var app = angular.module("testapp");
            
             app.controller("test", require("server/public/angular/controllers/landing-controller.js"))
             /*inject(function(){
                 
             });
             */
         });

         it("ehue", function (done) {
            
             done()
         });

     });

}());
