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
            beforeEach(function() {
                var input = element(by.tagName('input'));

                input.sendKeys('NW1 0NE');
                input.sendKeys(protractor.Key.ENTER);
                input.sendKeys(protractor.Key.ENTER);
            });

    		it("is displayed", function() {
    			var neighbourhoodInfo = element(by.id('neighbourhood-info'));
    			expect(neighbourhoodInfo.isDisplayed()).toBe(true);
	        });

	        it("position marker appears ", function () {
	        	var position = element(by.css('[src="../img/icons/location-marker.png"]'));

	        	expect(position.isDisplayed()).toBe(true);
	        });
            
            it("given that polling station is clicked and isn't currently displaying, its corresponding marker appears", function() {
                var pollingStation = element(by.css('[ng-click="togglePollingStation()"]'));

                pollingStation.click();

	        	var pollingMarker = element(by.css('[src="../img/icons/marker-hi.png"]'));

                expect(pollingStation.isDisplayed()).toBe(true);

                pollingStation.click();

	        	expect(element(by.css('[src="../img/icons/marker-hi.png"]')).isPresent()).toBe(false);
            });
    	});
	}

	module.exports = neighbourhoodAddressFound;
}());
