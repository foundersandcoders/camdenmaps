/*************************************************
*   MAP LANDING E2E TESTS
*   Description: Acceptance tests are written here
*   Use: run tests by gulp acceptance-test
**************************************************/


(function () {
    "use strict";

	function mapLandingTests () { 

    	describe("map loads ", function () {

	        it("and is displayed", function() {
	        	browser.pause();

	        	var leaflet = element(by.tagName('svg')).get(0);

            	expect(leaflet.isDisplayed()).toBe(true);
	        });

	        it("with no markers", function() {
	        	var leafletmarkers = element(by.css('.leaflet-marker-pane'));

            	expect(leafletmarkers.isDisplayed()).toBe(false);
	        });
    	});
	}

	module.exports = mapLandingTests;
}());