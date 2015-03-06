/*************************************************
*   CAMDEN SERVICE CATEGORIES TESTS
*   Description: Acceptance tests are written here
*   Use: run tests by gulp acceptance-test
**************************************************/

var Config,
	categories,
	servicesTypeaheadTests,
	buttons,
	categoriesRepeater,
	menuBarTests,
	homeUrl;

Config = require('../../config.js');
category = Config.category;					
categoriesRepeater = element.all(by.repeater('category in serviceCategories'));
button = element.all(by.repeater('button in buttons')).get(0);
servicesTypeaheadTests = require('../../typeahead/servicestypeahead.e2e.js');
menuBarTests = require('../../menubar/menubar.e2e.js');
homeUrl = Config.path.home;

(function () {
    "use strict";

    describe("If the button 'Camden Services' is clicked ", function () {

    	beforeEach(function(){
			browser.get(homeUrl);
			button.element(by.tagName('h4')).click();
		});

    	menuBarTests();
        servicesTypeaheadTests();

		describe("List of Service categories ", function() {

	        it("appears", function() {

	        	expect(categoriesRepeater.get(0).isDisplayed()).toBe(true);
	        });

	        it("is the right number", function() {

	        	expect(categoriesRepeater.count()).toEqual(category.length);
	        });

	    });

        describe("category ", function() {

        	var i,
        		length = category.length;

        	function runTest(j) {

        		var currentCat = categoriesRepeater.get(j);

	            it("title " + category[j].title + " is correct", function() {

	            	var title = currentCat.getText();

		        	expect(title).toEqual(category[j].title + category[j].text);
		        });

		        it("Image " + category[j].title + " is correct", function() {

		        	var img = currentCat.element(by.tagName('img'));
		        	var src = img.getAttribute("src");
		        	var testImg = category[j].img.slice(3);

		        	expect(src).toEqual(Config.path.main + testImg);
		        });
        	}

        	for (i = 0; i < length; i++) {
        		runTest(i);
        	};
        });
    });
}());