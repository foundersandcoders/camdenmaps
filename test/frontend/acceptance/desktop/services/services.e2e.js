/*************************************************
*   SERVICES AND CATEGORIES TESTS
*   Description: Acceptance tests are written here
*   Use: run tests by gulp acceptance-test
**************************************************/

var Config,
	categories,
	categoriesRepeater,
	buttons,
	servicesTypeaheadTests;

Config = require('../../config.js');
category = Config.category;
categoriesRepeater = element.all(by.repeater('category in serviceCategories'));
buttons = element.all(by.repeater('button in buttons'));
servicesTypeaheadTests = require('../../typeahead/servicestypeahead.e2e.js');

(function () {
    "use strict";

    describe("Once a category has been selected ", function () {

		beforeEach(function () {
   			browser.get(Config.path.home);
			buttons.get(0).click();
		});

		servicesTypeaheadTests();

		describe("Home bar appears ", function() {

	        describe("containing 'Home' button ", function() {
	        	var home = element(by.id('backhome'));

	        	it("is displayed", function() {

		        	expect(home.isDisplayed()).toBe(true);
		        });
		        it("when clicked takes you path to home", function() {
		        	home.click();
		        	
		        	var url = browser.getCurrentUrl();

		        	expect(url).toBe(Config.path.main + Config.path.home);
		        });
	        });

	        it("containing correct text", function() {

	        	var elem = element(by.tagName('h3'));
	        	var text = elem.getText();

	        	var testText = 'Search a service or select one category from below';

	        	expect(text).toEqual(testText);
	        });

	        it("containing an input box", function() {

	        	var input = element(by.tagName('input'));

	        	expect(input.isDisplayed()).toBe(true);
	        });

	    });

	    // it(" close button works", function () {
        // 	var currentCat = element(by.id("category-title-of-services"));

        // });

    	var i,
    		length = category.length;

    	function catTests(j) {

        	describe(category[j].title, function () {
        		beforeEach(function(){
        			categoriesRepeater.get(j).click();
        		});

	            it(" title is correct", function () {
	            	var currentCat = element(by.id("category-title-of-services"));
	            	var title = element.all(by.tagName('h4')).get(j).getText();

	            	expect(title).toEqual(category[j].title);
	            });
	            it(" image is correct", function () {
	            	var currentCat = element(by.id("category-title-of-services"));
	            	var image = currentCat.element(by.tagName('img'));
		    		var src = image.getAttribute('src');
	            	var testImg = category[j].img.slice(3);

	            	expect(src).toEqual(Config.path.main + testImg);
	            });
	            

            	var h,
					testServices = Config.servicesByCat(category[j].title),
					serviceslength = testServices.length;

            	function runServicesTest (g) {

            		describe(" services are all listed", function () {

	            		it(testServices[g].title + " has the correct title", function () {
			            	var service = element.all(by.repeater('service in services')).get(g);
			            	var text = service.element(by.tagName('h4')).getText();

			            	expect(text).toEqual(testServices[g].title);
			            });
		            });
            	}

            	for (h = 0; h < serviceslength; h++) {
	        		runServicesTest(h);
	        	};
	        });
    	}

    	for (i = 0; i < 1; i++) {
    		catTests(i);
    	};
	});

}());