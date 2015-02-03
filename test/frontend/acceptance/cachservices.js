/*************************************************
*   SINGLE VIEW TESTS
*   Description: Acceptance tests are written here
*   Use: run tests by npm test
**************************************************/
// var menu = require("../../../server/angular/menu.json");

// (function () {
//     "use strict";

//     describe("caching service", function () {

//         beforeEach(function() {
//             return browser.ignoreSynchronization = true;
//         });

//         function runTest (j) {
//             it("service cached" + menu[j].title, function () {

//                 browser.get("/services/" + menu[j].title );
//                 console.log()

//                 expect(browser.driver.getCurrentUrl()).toContain('services');
//             });

//         }

//         for (var i = 0; i < 172 ; i++ ) {
//             if (menu[i].type === 'service') {
//                 runTest(i);

//             }
//         }
//     });

// }());