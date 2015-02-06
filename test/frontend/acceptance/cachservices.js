/*************************************************
*   CACHING TESTS
*   Description: Acceptance tests are written here
*   Use: run tests by npm test
**************************************************/

// var menu = require("../../../server/angular/menu.json");

// var errorMessage = '{"statusCode":500,"error":"Internal Server Error","message":"An internal server error occurred"}';

// (function () {
//     "use strict";

//For catching 500 errors
    // describe("caching service", function () {

    //     beforeEach(function() {
    //         return browser.ignoreSynchronization = true;
    //     });

    //     function runTest (j) {
    //         it("service cached" + menu[j].title, function () {

    //             browser.get("/services/" + menu[j].title );
    // 			var text = element(by.tagName("pre")).getText();

    //             expect(text).toNotEqual(errorMessage);
    //         });

    //     }

    //     for (var i = 0; i < menu.length ; i++ ) {
    //         if (menu[i].type === 'service') {
    //             runTest(i);

    //         }
    //     }
    // });


//For catching results if 5 or 10.
//     describe("caching service", function () {

//         beforeEach(function() {
//             return browser.ignoreSynchronization = true;
//         });

//         var i;

//         for (i = 0; i < menu.length ; i++ ) {
//             if (menu[i].type === 'service') {
//                 runTest(i);

//             }
//         }

//         function runTest (j) {
//             it("service cached" + menu[j].title, function () {

//                 browser.get("/services/" + menu[j].title );

//                 var mytext = element(by.tagName("pre")).getText();

//                 mytext.then(function (text) {
//                     parse(text);
//                 });

//                 function parse(jsonString) {
//                     var obj = JSON.parse(jsonString);

//                     last(obj.properties.length)
//                 }

//                 function last(num) {
//                     expect(num).toNotEqual(10);
//                 }

//             });

//         }
//     });

// }());
