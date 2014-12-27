/*******************************************
*   SERVICES-CONTROLLER.JS
*
*
********************************************/

;(function () {
    "use strict";

    module.exports = [

        function () {
            
            //stores current menu items
            var visualMenu = [],
                //stores menu and menu functions
                menuControl = (function createReloader () {
                //currentMenu position accessible only to menuControl
                var menuSize = 4;
                    currentMenu = "root";
                return {
                    //function loads first 4 items of current menu
                    reloadMenu: function reloadMenu () {
                        var i;
                        for (i = 0; i < menuSize; i += 1) {
                            visualMenu[i] = currentMenu[i];
                        } 
                    },
                    changeCurrent: function changeCurrent (newMenu) {
                        currentMenu += "." + newMenu + ".content";
                    },
                    backMenu: function backMenu () {
                        if (currentMenu === "root") {
                            return;
                        } else {
                            currentMenu = currentMenu
                                            .split(".")
                                            .slice(0, currentMenu.split(".").length-2)
                                            .join(".");
                        }
                    }
                }
            }());

            //TODO: service/category data structure

            //TODO: currently displaying service/category
           
            //TODO: left and right button handlers

            //TODO: service/category button handlers
            function addHandler (item) {
                return function () {
                    if (item.type === "service") {
                        var path = "/" + item.name + "/search"
                        $location.path(path);
                    } else if (item.type === "category") {
                        //TODO: Change current directory
                        menuControl.changeCurrent(item.name);
                        //reload items
                        menuControl.reloadMenu();
                    }
                }
            }



        }
    ];

    function intoCategory (newCurrent) {
        currentMenu = newCurrent;
    }

    function loadVisualMenu () {
        //return array of items in current menu
        var i,
            currentMenuItems = fullMenu.filter(function (item) {
                return item.parentId === currentMenu;
            });
        for ( i = 0; i < menuSize; i += 1 ) {
            visualMenu[i] = currentMenuItems[i];
        } 
    }

}());
