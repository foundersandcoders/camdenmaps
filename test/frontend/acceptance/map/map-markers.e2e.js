/*************************************************
*   MAP MARKERS E2E TESTS
*   Description: Acceptance tests are written here
*   Use: run tests by gulp acceptance-test
**************************************************/

var leafletmarkers = element.all(by.css('.leaflet-marker-icon'));

(function () {
    "use strict";

	function mapMarkersTests () { 

    	describe("markers ", function () {

	        it("are displayed", function() {
	            
	        	expect(leafletmarkers.isDisplayed()).toBe(true);
	        	expect(leafletmarkers.count()).toBeGreaterThan(1);
	        });

	        describe("if clicked", function() {

	        	it("result page is linked", function() {

	        		leafletmarkers.get(0).click();
	        		//different selector now.
	        		var result = element(by.css('.result'));

	        		expect(result.isDisplayed()).toBe(true);
		        });
	        });

	        describe("if address is entered ", function() {

	        	beforeEach(function () {
	        		var input = element(by.tagName('input'));
					input.sendKeys('NW1 0NE');
					input.sendKeys(protractor.Key.ENTER);
					input.sendKeys(protractor.Key.ENTER);
	        	})

	        	it("position marker appears", function() {

	        		leafletmarkers.get(0).click();

	        		var result = element(by.css('.result'));

	        		expect(result.isDisplayed()).toBe(true);
		        });
	        });
    	});
	}

	module.exports = mapMarkersTests;
}());