/*************************************************
*   SERVICES AND CATEGORIES TESTS
*   Description: Acceptance tests are written here
*   Use: run tests by gulp acceptance-test
**************************************************/

var Config,
	categories,
	categoriesRepeater,
	buttons,
	servicesTypeaheadTests,
	addressTypeaheadTests,
	addressSearchListTests;

Config = require('../../config.js');
category = Config.category;
categoriesRepeater = element.all(by.repeater('category in serviceCategories'));
buttons = element.all(by.repeater('button in buttons'));
servicesTypeaheadTests = require('../../typeahead/servicestypeahead.e2e.js');
addressTypeaheadTests = require('../../typeahead/addresstypeahead.e2e.js');
addressSearchListTests = require('../../list/address-search-list.e2e.js');

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
	        	var elem = element.all(by.tagName('h3')).get(0);
	        	var text = elem.getText();

	        	var testText = 'Search a service or select one category from below';

	        	expect(text).toEqual(testText);
	        });

	        it("containing an input box", function() {
	        	var input = element(by.tagName('input'));

	        	expect(input.isDisplayed()).toBe(true);
	        });

	    });

    	var i,
    		length = category.length;

    	function catTests(j) {

        	describe(category[j].title, function () {

        		beforeEach(function(){
        			browser.get(Config.path.home);
					buttons.get(0).click();
        			categoriesRepeater.get(j).click();
        		});

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

	            it(" title is correct", function () {
	            	var currentCat = element(by.id("category-title-of-services"));
	            	var title = element.all(by.tagName('h4')).get(0).getText();

	            	expect(title).toEqual(category[j].title);
	            });

	            it(" image is correct", function () {
	            	var currentCat = element(by.id("category-title-of-services"));
	            	var image = currentCat.element(by.tagName('img'));
		    		var src = image.getAttribute('src');
	            	var testImg = category[j].img.slice(3);

	            	expect(src).toEqual(Config.path.main + testImg);
	            });

	           	it(" close button works", function () {
		        	var close = element(by.css('[ng-click="returnToCategories()"]'));
		        	close.click();
		        	var currentUrl = browser.getCurrentUrl();

		        	expect(currentUrl).toContain('services');
		        });

            	var h,
					testServices = Config.servicesByCat(category[j].title),
					serviceslength = testServices.length;

            	function runServicesTest (g) {

            		var currentService = element.all(by.repeater('service in services')).get(g);

            		describe(" services are all listed", function () {

	            		it(testServices[g].title + " has the correct title", function () {
			            	var text = currentService.element(by.tagName('h4')).getText();

			            	expect(text).toEqual(testServices[g].title);
			            });
			            it(testServices[g].title + " has the correct img", function () {
			            	var imgSrc = currentService.element(by.tagName('img')).getAttribute('src');
			            	var testImg = testServices[g].img.slice(3);

			            	expect(imgSrc).toEqual(Config.path.main + testImg);
			            });
		            });

            		describe(" once a service has been clicked", function () {

            			beforeEach(function(){
		        			currentService.click();
		        		});

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

					        	var testText = 'Please enter your location.';

					        	expect(text).toEqual(testText);
					        });

					        it("containing an input box", function() {

					        	var input = element(by.tagName('input'));

					        	expect(input.isDisplayed()).toBe(true);
					        });

					    });
						
						describe("Category ", function () {

							it("has correct text: " + category[j].title, function() {

								var currentCat = element(by.id("category-title-of-services"));
				            	var title = element.all(by.tagName('h4')).get(0).getText();

				            	expect(title).toEqual(category[j].title);
					        });

					        it("has correct img: " + category[j].title, function() {

					        	var currentCat = element(by.id("category-title-of-services"));
				            	var image = currentCat.element(by.tagName('img'));
					    		var src = image.getAttribute('src');
				            	var testImg = category[j].img.slice(3);

				            	expect(src).toEqual(Config.path.main + testImg);
					        });

					        it(" close button works", function () {

					        	var close = element(by.css('[ng-click="returnToCategories()"]'));
					        	close.click();
					        	
					        	var currentUrl = browser.getCurrentUrl();

					        	expect(currentUrl).toContain('services');
					        });
						});

						describe("Service ", function () {

							it("has correct text: " + testServices[g].title, function() {

								var currentService = element(by.id("service-title-of-results"));
				            	var title = currentService.element(by.tagName('h4')).getText();

				            	expect(title).toEqual(testServices[g].title);
					        });

					        it("has correct img: " + testServices[g].title, function() {

					        	var currentService = element(by.id("service-title-of-results"));
				            	var image = currentService.element(by.tagName('img'));
					    		var src = image.getAttribute('src');
				            	var testImg = testServices[g].img.slice(3);

				            	expect(src).toEqual(Config.path.main + testImg);
					        });

					        it(" close button works services", function () {

					        	var close = element(by.css('[ng-click="returnToServices()"]'));
					        	close.click();

					        	var currentUrl = browser.getCurrentUrl();

					        	expect(currentUrl).toContain(category[j].title + '/service');
					        });
						});

						describe(" (imported tests) ", function () {
	        				addressTypeaheadTests();
		            		addressSearchListTests();
		            		// TODO: put map tests here
		            	});
		            });
            	}
            	//To run for all services, please change 3 to 0 and 5 to servicelength
            	for (h = 0; h < 1; h++) {
	        		runServicesTest(h);
	        	};
	        });
    	}

    	for (i = 0; i < 1; i++) {
    		catTests(i);
    	};
	});

}());