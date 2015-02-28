/*************************************************
*   ADDRESS TYPEAHEAD E2E TESTS
*   Description: Acceptance tests are written here
*   Use: run tests by gulp acceptance-test
**************************************************/

var Config,
	categories,
	dropDownList, 
	testList;

Config = require('../../config.js');
category = Config.category;
							
var categoriesRepeater = element.all(by.repeater('category in serviceCategories'));
var servicesRepeater = element.all(by.repeater('service in services'));
var buttons = element.all(by.repeater('button in buttons'));

(function () {
    "use strict";

    describe("If the button 'Camden Services' is clicked services typeahead ", function () {

    	beforeEach(function(){
			browser.get(Config.path.home);
			buttons.get(0).click();
			categoriesRepeater.get(0).click();
			servicesRepeater.get(0).click();
		});

        it("is displayed", function() {

        	
        });

     //    describe("when type starts ", function () {

	    //     it("dropdown menu is displayed", function() {

	    //     });

	    //     it("and changse as you keep typing", function() {

	    //     });
	    // });

    });
}());