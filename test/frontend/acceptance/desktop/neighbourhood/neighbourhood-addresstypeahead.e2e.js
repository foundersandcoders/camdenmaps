/*************************************************
*   NEIGHBOUDHOOD ADDRESS TYPEAHEAD E2E TESTS
*   Description: Acceptance tests are written here
*   Use: run tests by gulp acceptance-test
**************************************************/

var Config,
	categories,
	dropDownList, 
	testList,
	categoriesRepeater,
	buttons,
	neighbourhoodAddressFound;

Config = require('../../config.js');
buttons = element.all(by.repeater('button in buttons'));
neighbourhoodAddressFound = require('./neighbourhood-addressfound.e2e.js');

(function () {
    "use strict";

	function neighbourhoodAddressTypeahead () { 

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
		        	beforeEach(function () {
				        this.addMatchers({
				            toBeCorrectText: function () {
				                var actual = this.actual;

				                this.message = function () {
				                    return "Expected " + actual + " to be either either text";
				                };
				                return actual === 'Sorry, gtydresewst could not be found within Camden' || 'Sorry, something went wrong';
				            }
				        });
				    });

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

			        	expect(errorMessageText).toBeCorrectText();
			        });
		        });

		        describe("when full Post Code has been entered", function() {
		        	
		        	afterEach(function () {
		        		browser.executeScript('window.localStorage.clear();');
		        	});

		        	it("pressing enter works", function() {
			        	var input = element(by.tagName('input'));
						input.sendKeys('NW1 0NE');
						input.sendKeys(protractor.Key.ENTER);
						input.sendKeys(protractor.Key.ENTER);

						var currentUrl = browser.getCurrentUrl();

			        	expect(currentUrl).toContain("5048636");
			        });

		        	it("pressing the search button also works", function() {
			        	var input = element(by.tagName('input'));
						input.sendKeys('NW1 0NE');

						var dropDownList = element.all(by.repeater('match in matches'));
						var searchButton = element.all(by.tagName('button')).get(0);

						dropDownList.get(0).click();
						searchButton.click();
		       			
		       			var currentUrl = browser.getCurrentUrl();

			        	expect(currentUrl).toContain("5048636");
			        });
		        });

				describe("when full Street Name has been entered", function() {
		        	
		        	afterEach(function () {
		        		browser.executeScript('window.localStorage.clear();');
		        	});
		        	
		        	it("pressing enter works", function() {
			        	var input = element(by.tagName('input'));
						input.sendKeys('Kingdon Road');
						input.sendKeys(protractor.Key.ENTER);
						input.sendKeys(protractor.Key.ENTER);

						var currentUrl = browser.getCurrentUrl();

			        	expect(currentUrl).toContain("5021380");
			        });

			        it("pressing the search button also works", function() {
			        	var input = element(by.tagName('input'));
						input.sendKeys('Kingdon Road');

						var dropDownList = element.all(by.repeater('match in matches'));
						var searchButton = element.all(by.tagName('button')).get(0);

						dropDownList.get(0).click();
						searchButton.click();
		       			
		       			var currentUrl = browser.getCurrentUrl();

			        	expect(currentUrl).toContain("5021380");
			        });
		        });

                describe("when an address has been searched using the typeahead", function() {
           
                    beforeEach(function() {
                        var input = element(by.tagName('input'));
                        var home = element(by.id('backhome'));

                        input.sendKeys('NW1 0NE');
                        input.sendKeys(protractor.Key.ENTER);
                        input.sendKeys(protractor.Key.ENTER);

                    	home.click();
                    	buttons.get(1).click();
                    });
					
					afterEach(function () {
		        		browser.executeScript('window.localStorage.clear();');
		        	});

		        	it("it should be remembered for the next search", function() {
                        var currentUrl = browser.getCurrentUrl();
                        var expectedUrl = "/5048636";

			        	expect(currentUrl).toContain(expectedUrl);
			        });

		        	neighbourhoodAddressFound();
		        });
		    });
    	});
	}

	module.exports = neighbourhoodAddressTypeahead;
}());