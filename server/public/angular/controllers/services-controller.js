/*******************************************
*   SERVICES-CONTROLLER.JS
*
*
********************************************/

//TODO: Write menu JSON
//TODO: Write service to access menu
//TODO: Preload visible items in a resolve

;(function () {
    "use strict";

    module.exports = [
            "$scope",
            "$location",
            "$http",
            function ($scope, $location, $http) {
         

                //***************** Initialize menu and variables **************
               
                //current index of visibleItems within currentCategory
                var currentIndex = 0, 
                //number of items visible in menu
                    numberOfItems = 3,
                //current position in the menu
                    currentPosition = 0,
                //all items in current category
                    currentCategory = [],
                //stores full menu
                    menu = [];
                //stores currently visible items
                $scope.visibleItems = [];
               
               
                //****************** Menu population functions ***************** 
                
                //makes visible 3 items from current category
                function getVisibleItems(index) {
                    $scope.visibleItems = currentCategory[index];
                }

                // console.log('item', item);
                // console.log('img', item.img);
                
                //handler that either redirects user or opens new category 
                function clickHandler (item) {
                    if (item.type === "service") {
                        var path = "/home/" + item.title + item.text + "/search";
                        $location.path(path);
                    } else if (item.type === "category") {
                        currentIndex = 0;
                        currentPosition = item.id;
                        getCurrentCategory(currentPosition, numberOfItems);
                        getVisibleItems(currentIndex);
                    }
                }
                
                //adds click handler functions to menu items
                function addClickHandler (item) {
                    return function () {
                        clickHandler(item);
                    };
                }
                
                //populates currentCategory with items in current position in menu
                function getCurrentCategory(positionInMenu, amountPerPage) {
                    currentCategory = [];
                    var fullCategory = menu.filter(function (item) {
                        return Number(item.parentId) === Number(positionInMenu);
                    });
                    var i, index = 0;
                    for (i = 0; i < fullCategory.length; i += 1) {
                        if (i && i % amountPerPage === 0) {
                            index = i / amountPerPage;
                            currentCategory[index] = [];
                        } else if (!i) {
                            currentCategory[index] = [];
                        }
                        fullCategory[i].handler = addClickHandler(fullCategory[i]);
                        currentCategory[index].push(fullCategory[i]);
                    }
                }
              
                var menu = require("../menu.json");
                getCurrentCategory(currentPosition, numberOfItems);
                getVisibleItems(currentIndex); 
                
                //********************* Menu control functions ******************
               
                //loads next page of items
                $scope.nextItems = function nextItems () {
                    if (currentIndex === currentCategory.length-1) {
                        return;
                    } else {
                        currentIndex += 1;
                        getVisibleItems(currentIndex);
                    }
                };
                //loads previous page of items
                $scope.prevItems = function prevItems () {
                    if (currentIndex === 0) {
                        return;
                    } else {
                        currentIndex -= 1;
                        getVisibleItems(currentIndex);
                    }
                };
                //loads parent category
                $scope.backOneCategory = function backOneCategory () {
                    if (Number(currentPosition) === 0) {
                        $location.path("/home");
                    } else {
                        currentPosition = menu.filter(function(item){
                            return Number(item.id) === Number(currentPosition);
                        })[0].parentId;
                        getCurrentCategory(currentPosition, numberOfItems);
                        getVisibleItems(currentIndex);
                    }
                };
               
                //execute function to solve scoping issues with ng-repeat & ng-click
                $scope.execute = function execute (fn) {
                    fn();
                };

            }
        ];

}());
