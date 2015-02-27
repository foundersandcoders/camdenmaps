/*************************************************
*   SERVICES AND CATEGORIES TESTS
*   Description: Acceptance tests are written here
*   Use: run tests by npm test
**************************************************/

var Config,
	categories;

Config = require('../../config/testConfig.js');
category = Config.category;
							
var categoriesRepeater = element.all(by.repeater('category in serviceCategories'));
var buttons = element.all(by.repeater('button in buttons'));

(function () {
    "use strict";

    describe("Once a category has been ", function () {


		describe("category ", function() {
			beforeEach(function(){
	   			browser.get(Config.path.home);
				buttons.get(0).click();
			});

        	var i,
        		length = category.length;

        	function catTests(j) {

	        	describe(category[j].title, function () {
	        		beforeEach(function(){
	        			categoriesRepeater.get(j).click();
	        		});

		            it(" title is correct", function () {
		            	var currentCat = element(by.id("category-title-of-services"));
		            	var title = currentCat.element(by.tagName('h4')).getText();

		            	expect(title).toEqual(category[j].title);
		            });
		            it(" image is correct", function () {
		            	var currentCat = element(by.id("category-title-of-services"));
		            	var image = currentCat.element(by.tagName('img'));
			    		var src = image.getAttribute('src');
		            	var testImg = category[j].img.slice(3);

		            	expect(src).toEqual(Config.path.main + testImg);
		            });
		            describe(" services are all listed", function () {

		            	var h,
        					testServices = Config.servicesByCat(category[j].title),
        					serviceslength = testServices.length;

        					console.log(testServices[0].title);

		            	function runTest(g) {

		            		it(testServices[g].title, function () {
				            	var service = element.all(by.repeater('service in services')).get(0);
				            	var text = service.element(by.tagName('h4')).getText();

				            	expect(text).toEqual(testServices);
				            });
		            	}

		            	for (i = 0; i < 1; i++) {
			        		runTest(h);
			        	};

		            });
		            // it(" close button works", function () {
		            	// var currentCat = element(by.id("category-title-of-services"));

		            // });
		        });
        	}

        	for (i = 0; i < 1; i++) {
        		catTests(i);
        	};
        });
	});

}());