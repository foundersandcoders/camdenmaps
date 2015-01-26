/*************************************************
*   SERVICES AND CATEGORIES TESTS
*   Description: Acceptance tests are written here
*   Use: run tests by npm test
**************************************************/


// (function () {
//     "use strict";

//     describe("As a user, I want to find a specific service ", function () {

//         describe("Find Your Nearest option is clicked", function () {
//             it("services section is revealed", function () {

//                 browser.get('#/home');

//                 element(by.id('findYourNearest')).click();

//                 var services = element(by.id('find-your-nearest'));

//                 expect(services.isDisplayed()).toBe(true);
//             });

//             it("with 11 service categories, only 3 visible", function () {

//                 var serviceCategories = element.all(by.repeater('item in visibleItems'));

//                 expect(serviceCategories.count()).toBe(3);
//             });
//         });

//         describe("navigation arrows are functioning:", function () {
//             it("back arrow ", function () {

//                 var serviceCategories = element(by.repeater('item in visibleItems'));
//                 var text = serviceCategories.element(by.tagName('h4')).getText();

//                 element(by.css('[ng-click="execute(item.handler)"]')).click();
//                 element(by.css('[ng-click="backOneCategory()"]')).click();

//                 var serviceCategories2 = element(by.repeater('item in visibleItems'));
//                 var text2 = serviceCategories.element(by.tagName('h4')).getText();

//                 expect(text).toEqual(text2);

//             });
//             it("and carousal arrows", function () {

//                 var firstServiceCategories = element(by.repeater('item in visibleItems')).element(by.tagName('h4')).getText();
//                 element(by.css('[ng-click="nextItems()"]')).click();
//                 var secondServiceCategories = element(by.repeater('item in visibleItems')).element(by.tagName('h4')).getText();

//                 expect(firstServiceCategories).not.toEqual(secondServiceCategories);

//                 element(by.css('[ng-click="prevItems()"]')).click();
//                 var thirdServiceCategories = element(by.repeater('item in visibleItems')).element(by.tagName('h4')).getText();

//                 expect(firstServiceCategories).toEqual(thirdServiceCategories);
//             });
//         });
//         describe("Once a service is selected", function () {

//             it("first step options disappear", function () { 

//                 element(by.css('[ng-click="execute(item.handler)"]')).click();
//                 element(by.css('[ng-click="execute(item.handler)"]')).click();

//                 expect(element(by.id('first-level-options')).isPresent()).toBe(false);
//             });
//             it("name of selected service with icon are displayed", function () { 

//                 var container = element(by.id('address-search'))

//                 var imgsrc = container.element(by.tagName('img')).getAttribute("ng-src");
//                 var text = container.element(by.tagName('h2')).getText();

//                 expect(imgsrc).toEqual("../img/nearestservice/lunchclub.png")
//                 expect(text).toEqual("Lunch club")
//             });
//             it("input field and search button are displayed", function () { 

//                 var postcodeInput = element(by.id('postcode-input')).element(by.tagName('input'));

//                 expect(postcodeInput.isPresent()).toBe(true);
//             });
//             it("search again and list results buttons are displayed", function () { 

//                 var buttons = element.all(by.tagName('button')).getText();

//                 expect(buttons).toEqual(['', 'Search again', 'List results']);
//             });
//         });

//         it("When Search again button is clicked, you go back to the beginning", function () { 

//             element(by.css('[ng-click="searchAgain()"]')).click();

//             expect(browser.getCurrentUrl()).toContain('/#/home');
//         });
// 	});

// }());