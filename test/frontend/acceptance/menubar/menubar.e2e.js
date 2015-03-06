/*************************************************
*   MENU BAR E2E TESTS
*   Description: Acceptance tests are written here
*   Use: run tests by gulp acceptance-test
**************************************************/


var Config;

Config = require('../config.js');

(function () {
    "use strict";

	function menuBarTests () { 

    	describe("Home bar appears ", function() {

    		beforeEach(function () {
		        this.addMatchers({
		            toBeCorrectText: function () {
		                var actual = this.actual;

		                this.message = function () {
		                    return "Expected " + actual + " to be either either text";
		                };

		                return actual === 'Search a service or select one category from below' || 'Please enter your location';
		            }

		        });
		    });

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

	        	expect(text).toBeCorrectText();
	        });

	        it("containing an input box", function() {
	        	var input = element(by.tagName('input'));

	        	expect(input.isDisplayed()).toBe(true);
	        });

	        it("the search button is visible", function() {
	        	var searchButton = element(by.className("glyphicon-search"));
			
				expect(searchButton.isDisplayed()).toBe(true);
			});

	    });
	}

	module.exports = menuBarTests;
}());