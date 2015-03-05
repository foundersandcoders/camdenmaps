/*************************************************
*   NEIGHBOUDHOOD ADDRESS FOUND E2E TESTS
*   Description: Acceptance tests are written here
*   Use: run tests by gulp acceptance-test
**************************************************/

var headings = element.all(by.tagName('h4'));
var information = element.all(by.tagName('p'));

(function () {
    "use strict";

	function neighbourhoodAddressFound () { 

    	describe("neighbourhood information ", function () {
    		it("is displayed", function() {
    			var neighbourhoodInfo = element(by.id('neighbourhood-info'));
    			expect(neighbourhoodInfo.isDisplayed()).toBe(true);
	        });
	        it("position marker appears ", function () {
	        	var position = element(by.css('[src="../img/icons/location-marker.png"]'));

	        	expect(position.isDisplayed()).toBe(true);
	        });
    	});
	}

	module.exports = neighbourhoodAddressFound;
}());