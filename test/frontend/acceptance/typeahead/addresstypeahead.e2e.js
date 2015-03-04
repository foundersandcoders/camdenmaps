/*************************************************
*   Address TYPEAHEAD E2E TESTS
*   Description: Acceptance tests are written here
*   Use: run tests by gulp acceptance-test
**************************************************/

var Config,
	categories,
	dropDownList, 
	testList,
	categoriesRepeater,
	buttons,
	addressFoundListTests;

Config = require('../config.js');
category = Config.category;
categoriesRepeater = element.all(by.repeater('category in serviceCategories'));
buttons = element.all(by.repeater('button in buttons'));
addressFoundListTests = require('../list/address-found-list.e2e.js');

(function () {
    "use strict";

	function addressTypeaheadTests () { 

    	describe("address typeahead ", function () {

	        it("is displayed", function() {

	        	var input = element(by.tagName('input'));

	        	expect(input.isDisplayed()).toBe(true);
	        });

	        it("has correct placeholder text", function() {

	        	var input = element(by.tagName('input'));
	        	var placeholderText = input.getAttribute('placeholder');

	        	expect(placeholderText).toBe('Enter an address');
	        });

	        describe("when type starts ", function () {

		        it("dropdown menu is displayed", function() {
		        	var input = element(by.tagName('input'));
	            	input.sendKeys('w');

	            	var dropDown = element(by.css("ul.dropdown-menu"));
	            	dropDownList = element.all(by.repeater('match in matches'));
		        	
		        	expect(dropDown.isDisplayed()).toBe(true);
		        	expect(dropDownList.count()).toBeGreaterThan(1);
		        });

		        it("and changes as you keep typing", function() {
					var input = element(by.tagName('input'));
					input.sendKeys('w');
					dropDownList = element.all(by.repeater('match in matches'));
					var testTextOne = dropDownList.get(0).getText();

	            	input.sendKeys('ell road');
	            	testList = element.all(by.repeater('match in matches'));
					var testTextTwo = testList.get(0).getText();

	            	expect(testTextOne).toNotEqual(testTextTwo);
		        });

		        describe("if a wrong service has been entered ", function() {
		        	
		        	it("error message appears", function() {
			        	var input = element(by.tagName('input'));
						input.sendKeys('bytctrdvre');
						input.sendKeys(protractor.Key.ENTER);

						var errorMessage = element(by.css('.errormessage'));

						expect(errorMessage.isDisplayed()).toBe(true);
			        });

		        	it("with the correct text", function() {
		        		var input = element(by.tagName('input'));
						input.sendKeys('gtydresewst');
						input.sendKeys(protractor.Key.ENTER);

		        		var errorMessageText = element(by.css('.errormessage')).getText();

			        	expect(errorMessageText).toEqual("Sorry, gtydresewst could not be found within Camden");
			        });
		        });

		        describe("when full Post Code has been entered", function() {
		        	
		        	afterEach(function () {
		        		browser.executeScript('window.localStorage.clear();');
		        	})
		        	//Does not work for streetworks
		        	it("pressing the search button works", function() {
			        	var input = element(by.tagName('input'));
						input.sendKeys('NW1 0NE');

						var searchButton = element.all(by.tagName('button')).get(0);
						searchButton.click();
		       			
		       			var currentUrl = browser.getCurrentUrl();

			        	expect(currentUrl).toContain("location/NW1%200NE");
			        });

		        	it("pressing enter also works", function() {
			        	var input = element(by.tagName('input'));
						input.sendKeys('NW1 0NE');
						input.sendKeys(protractor.Key.ENTER);
						input.sendKeys(protractor.Key.ENTER);

						var currentUrl = browser.getCurrentUrl();

			        	expect(currentUrl).toContain("location/NW1%200NE");
			        });

			        addressFoundListTests();
		        });

				describe("when full Street Name has been entered", function() {
		        	
		        	afterEach(function () {
		        		browser.executeScript('window.localStorage.clear();');
		        	})
		        	//Does not work for streetworks
		        	it("pressing the search button works", function() {
			        	var input = element(by.tagName('input'));
						input.sendKeys('Kingdon Road');

						var searchButton = element.all(by.tagName('button')).get(0);
						searchButton.click();
		       			
		       			var currentUrl = browser.getCurrentUrl();

			        	expect(currentUrl).toContain("location/Kingdon%20Road");
			        });

		        	it("pressing enter also works", function() {
			        	var input = element(by.tagName('input'));
						input.sendKeys('Kingdon Road');
						input.sendKeys(protractor.Key.ENTER);
						input.sendKeys(protractor.Key.ENTER);

						var currentUrl = browser.getCurrentUrl();

			        	expect(currentUrl).toContain("location/NW6%201QU");
			        });

			        addressFoundListTests();
		        });

                describe("when an address has been searched using the typeahead", function() {
           
                    beforeEach(function() {
                        var input = element(by.tagName('input'));
                        
                        input.sendKeys('NW1 0NE');
                        input.sendKeys(protractor.Key.ENTER);
                        input.sendKeys(protractor.Key.ENTER);

                        browser.getCurrentUrl().then(function (url) {
                    		if (url.indexOf('streetworks') > -1) {
	                        	var home = element(by.id('backhome'));
	                        	home.click();
	                        	buttons.get(2).click();
	                        } else {
		                        var returnToServices = element(by.css('[ng-click="returnToServices()"]'));
		                        returnToServices.click();
		                        var nextService = element.all(by.repeater("service in services")).get(0);
	                       		nextService.click();
		                    }
                    	});
                    });
					
					afterEach(function () {
		        		browser.executeScript('window.localStorage.clear();');
		        	});

		        	it("it should be remembered for the next search", function() {
                        var currentUrl = browser.getCurrentUrl();

			        	expect(currentUrl).toContain("/NW1%200NE");
			        });

		        });
				
				describe("when an address has been searched using a string", function() {
           
                    beforeEach(function() {
                        var input = element(by.tagName('input')),
                        	searchButton = element.all(by.tagName('button')).get(0);
                        
                        input.sendKeys('NW1 0NE');

						searchButton.click();


                        browser.getCurrentUrl().then(function (url) {
                    		if (url.indexOf('streetworks') > -1) {
	                        	var home = element(by.id('backhome'));
	                        	home.click();
	                        	buttons.get(2).click();
	                        } else {
		                        var returnToServices = element(by.css('[ng-click="returnToServices()"]'));
		                        returnToServices.click();
		                        var nextService = element.all(by.repeater("service in services")).get(0);
	                       		nextService.click();
		                    }
                    	});
                    });
					
					afterEach(function () {
		        		browser.executeScript('window.localStorage.clear();');
		        	});

		        	it("it should be remembered for the next search", function() {
                        var currentUrl = browser.getCurrentUrl();

			        	expect(currentUrl).toContain("/NW1%200NE");
			        });

		        });
		    });
    	});
	}

module.exports = addressTypeaheadTests;

}());
