/*************************************************
*   SERVICES TYPEAHEAD E2E TESTS
*   Description: Acceptance tests are written here
*   Use: run tests by gulp acceptance-test
**************************************************/

var Config,
	categories,
	dropDownList, 
	testList,
	categoriesRepeater,
	buttons;

Config = require('../../config.js');
category = Config.category;
categoriesRepeater = element.all(by.repeater('category in serviceCategories'));
buttons = element.all(by.repeater('button in buttons'));

(function () {
    "use strict";

	function servicesTypeaheadTests () { 

    	describe("services typeahead ", function () {

	        it("is displayed", function() {

	        	var input = element(by.tagName('input'));

	        	expect(input.isDisplayed()).toBe(true);
	        });

	        describe("when type starts ", function () {

		        it("dropdown menu is displayed", function() {

		        	var input = element(by.tagName('input'));
	            	input.sendKeys('p');

	            	var dropDown = element(by.css("ul.dropdown-menu"));
	            	dropDownList = element.all(by.repeater('match in matches'));
		        	
		        	expect(dropDown.isDisplayed()).toBe(true);
		        	expect(dropDownList.count()).toBeGreaterThan(1);
		        });

		        it("and changse as you keep typing", function() {

					var input = element(by.tagName('input'));
					input.sendKeys('p');
					dropDownList = element.all(by.repeater('match in matches'));
					var testTextOne = dropDownList.get(0).getText();

	            	input.sendKeys('po');
	            	testList = element.all(by.repeater('match in matches'));
					var testTextTwo = testList.get(0).getText();

	            	expect(testTextOne).toNotEqual(testTextTwo);
		        });

		        describe("if a wrong service has been entered ", function() {
		        	it("error message appears", function() {
			        	var input = element(by.tagName('input'));
						input.sendKeys('hello world');
						input.sendKeys(protractor.Key.ENTER);

						var errorMessage = element(by.css('.errormessage'));

						expect(errorMessage.isDisplayed()).toBe(true);
			        });
		        	it("with the correct text", function() {
		        		var input = element(by.tagName('input'));
						input.sendKeys('hello world');
						input.sendKeys(protractor.Key.ENTER);

		        		var errorMessageText = element(by.css('.errormessage')).getText();

			        	expect(errorMessageText).toEqual("Sorry, it looks like that isn't a valid camden service");
			        });
		        });

		        describe("when full address has been entered", function() {
		        	it("pressing the search button works", function() {
			        	var input = element(by.tagName('input'));
						input.sendKeys('Post office');

						var searchButton = element.all(by.tagName('button')).get(0);

						searchButton.click();
		       			
		       			var currentUrl = browser.getCurrentUrl();

			        	expect(currentUrl).toEqual(Config.path.main + Config.path.home + "/post%20office/search");
			        });
		        	it("pressing enter also works", function() {
			        	var input = element(by.tagName('input'));
						input.sendKeys('post');
						input.sendKeys(protractor.Key.ENTER);
						input.sendKeys(protractor.Key.ENTER);

						var currentUrl = browser.getCurrentUrl();

			        	expect(currentUrl).toEqual(Config.path.main + Config.path.home + "/post%20office/search");
			        });
		        });
		    });
    	});
	}

module.exports = servicesTypeaheadTests;

}());