/*************************************************
*   test.js
*   Description: Acceptance tests are written here
*   Use: run tests by npm test
*
**************************************************/

(function () {
    "use strict";

/**********************************************
	Wheres my Nearest Specific Tests go here
***********************************************/

    describe("As a user, I want to be able to enter a Camden postcode so that I can find the nearest point of interest to me.", function () {

        beforeEach("Given that", function () {
        	browser.get(baseUrl);
        });
        it("a postcode is entered, then it is validated to ensure it is a valid Camden postcode.", function () {
        	//Need to test
        });
        it("an invalid postcode is entered, then a message informs the user that the postcode is either not correct or in Camden.", function () {
        	//Need to test
        });
        it("a postcode and service are searched, then a list of nearby services is displayed, arranged by distance and with information about: name, address, distance from postcode.", function () {
        	//Need to test
        });
        it("an item in the list of nearby services is clicked, then the map is centered on the corresponding pin and its information box opens.", function () {

        });
        it("a pin on the map is clicked, then the map centres the pin on the map and highlights it in the list and displays its information box the on map.", function () {

        });
        it("the information box is displayed, then it contains contains its information for example: phone number, website, description, opening hours, (?).", function () {

        });
        it("a service category is not selected but postcode has been entered, then a message appears to prompt the user to select a service category.", function () {

        });
        it("the enter key is pressed, then the search criteria are submitted.", function () {

        });
        it("the map is clicked and dragged, then it moves to reveal more nearby pins.", function () {

        });

    });
	
	describe("As a user, I want to be able to enter a Camden areacode so that I can find the nearest point of interest to me.", function () {

        beforeEach("Given that", function () {
        	browser.get('http://www.angularjs.org');
        });

        it("a areacode is entered, then it is validated to ensure it is a valid Camden areacode.", function () {

        });
        it("an invalid areacode is entered, then a message informs the user that the areacode is either not correct or in Camden.", function () {

        });
        it("a areacode and service are searched, then a list of nearby services is displayed, arranged by distance and with information about: name, address, distance from areacode.", function () {

        });
        it("an item in the list of nearby services is clicked, then the map is centered on the corresponding pin and its information box opens.", function () {

        });
        it("a pin on the map is clicked, then the map centres the pin on the map and highlights it in the list and displays its information box the on map.", function () {

        });
        it("the information box is displayed, then it contains contains its information for example: phone number, website, description, opening hours, (?).", function () {

        });
        it("a service category is not selected but areacode has been entered, then a message appears to prompt the user to select a service category.", function () {

        });
        it("the enter key is pressed, then the search criteria are submitted.", function () {

        });
        it("the map is clicked and dragged, then it moves to reveal more nearby pins.", function () {

        });

    });

	describe("As a user, I want to be able to enter a Camden street name so that I can find the nearest point of interest to me.", function () {

        beforeEach("Given that", function () {
        	browser.get('http://www.angularjs.org');
        });

        it("a street name is entered, then it is validated to ensure it is a valid Camden street name.", function () {

        });
        it("an invalid street name is entered, then a message informs the user that the street name is either not correct or in Camden.", function () {

        });
        it("a street name and service are searched, then a list of nearby services is displayed, arranged by distance and with information about: name, address, distance from street name.", function () {

        });
        it("an item in the list of nearby services is clicked, then the map is centered on the corresponding pin and its information box opens.", function () {

        });
        it("a pin on the map is clicked, then the map centres the pin on the map and highlights it in the list and displays its information box the on map.", function () {

        });
        it("the information box is displayed, then it contains contains its information for example: phone number, website, description, opening hours, (?).", function () {

        });
        it("a service category is not selected but street name has been entered, then a message appears to prompt the user to select a service category.", function () {

        });
        it("the enter key is pressed, then the search criteria are submitted.", function () {

        });
        it("the map is clicked and dragged, then it moves to reveal more nearby pins.", function () {

        });

    });
	
    describe("As a user I want to select multiple service categories from a scolling list", function () {

        beforeEach("Given that", function () {
        	browser.get();
        });
///////////////////////////////////////////
        it("the drop down menu for services is selected, then there are 86 services to choose from", function () {
        	// optgroup = 10
        	var servicesList = element.all(by.repeater('match in matches'));

        	expect(servicesList.count()).toEqual(86);
        });
        it("the drop down menu for services is selected, then there are 10 service categories to choose from", function () {
        	// option = 86
        	var serviceCategories = element.all(by.repeater('match in matches'));

        	expect(serviceCategories.count()).toEqual(10);
        });
        it("one service is selected, then the list of nearby service items are displayed as well as their corresponding pins on the map.", function () {
        	//helper function to select option from dropdown list
        	var selectDropdownbyNum = function ( element, optionNum ) {
			  	if (optionNum){
			    	var options = element.findElements(by.tagName('option'))   
			      	.then(function(options){
			        	options[optionNum].click();
			      	});
			  	}
			};
        });
        it("multiple services are selected, the list of all these nearby service items are displayed simultaneously as well as their corresponding pins on the map.", function () {

        });
        it("multiple services are selected, the list of services are colour coded depending on their category and this colour coding is repeated on their pins on the map.", function () {

        });
        it("a selected service is unselected, its corresponding items and pins disappear from their corresponding displays.", function () {

        });

    });

    describe("As a user, I want to find contact information for service items so that I can contact them easily.", function () {

        beforeEach("Given that", function () {
        	browser.get('http://www.angularjs.org');
        });

        it("a phone number is clicked on a mobile device, the number is dialled automatically.", function () {

        });
        it("the service name is clicked, the service's website is opened in a new tab or window.", function () {

        });

    });x

}());