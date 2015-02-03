/*************************************************
*   CACHING TESTS
*   Description: Acceptance tests are written here
*   Use: run tests by npm test
**************************************************/

var menu = require("../../../server/angular/menu.json");

var errorMessage = '{"statusCode":500,"error":"Internal Server Error","message":"An internal server error occurred"}';

(function () {
    "use strict";

    describe("caching service", function () {

        beforeEach(function() {
            return browser.ignoreSynchronization = true;
        });

        function runTest (j) {
            it("service cached" + menu[j].title, function () {

                browser.get("/services/" + menu[j].title );
    			var text = element(by.tagName("pre")).getText();

                expect(text).toNotEqual(errorMessage);
            });

        }

        for (var i = 0; i < menu.length ; i++ ) {
            if (menu[i].type === 'service') {
                runTest(i);

            }
        }
    });

}());
