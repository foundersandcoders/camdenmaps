/*************************************************
*   MOBILE LANDING TESTS
*   Description: Acceptance tests are written here
*   Use: run tests by gulp acceptance-test
**************************************************/

var Config,
	landing,
	buttons,
	buttonTitles;

Config = require('../config.js');
landing = Config.landing;
buttons = element.all(by.css('[ng-click="executeFn(button.handler)"]'));

(function () {
    "use strict";

    describe("On mobile as a user, I want to have clear call to actions when I arrive on the landing page", function () {

    	beforeEach(function(){
            browser.manage().window().setSize(320, 480);
			browser.get(Config.path.home);
		});

        it("title to be Camden Council: Find Your Nearest", function() {

            var title = browser.getTitle();

            expect(title).toEqual('Camden Council: Find Your Nearest');

        });

        it("The header includes Camden Logo and correct alternate text", function() {

            var logo = element(by.id('camden-logo'));
            var alt = logo.getAttribute("alt");

            expect(logo.isDisplayed()).toBe(true);
            expect(alt).toBe('Camden');
        });

        describe("There are three call to actions buttons, ", function() {

        	var i,
        		length = landing.buttons.title.length;

        	function runTest(j) {

        		it("text is correct for: " + landing.buttons.title[j], function () {

	        		var text = buttons.get(j).getText();
	                
	                expect(text).toEqual(landing.buttons.title[j]);
	            });

	            it("images are correct for: " + landing.buttons.title[j], function () {

	        		var img = buttons.get(j).element(by.tagName('img'));
	        		var src = img.getAttribute('src');
	                
	                expect(src).toEqual(Config.path.main + landing.buttons.imgSrc[j]);
	            });

	            it("alt text for images are correct for: " + landing.buttons.title[j], function () {

	        		var img = buttons.get(j).element(by.tagName('img'));
	        		var alt = img.getAttribute('alt');
	                
	                expect(alt).toEqual(landing.buttons.title[j]);
	            });
        	}

        	for (i = 0; i < length; i++) {
        		runTest(i);
        	};
        });
    });
}());