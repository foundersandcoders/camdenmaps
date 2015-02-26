/*************************************
*   FIND IN MENU SERVICE.JS
*
*************************************/

;(function () {
    "use strict";

    module.exports = [
        function () {

            var menu = require("../menu.json");

            this.servicesById = function (catId) {
                var services = menu.filter(function (item) {
                    if (item.parentId === catId) {
                        return item;
                    }
                });

                return services;
            };

            this.serviceImg = function (service) {
                var services = menu.filter(function (item) {
                    var name = item.title;
                    if (name.toLowerCase() === service.toLowerCase()) {
                        return item;
                    }
                });

                return services[0].img;
            };

            this.category = function (categoryTitle) {
                var category = menu.filter(function (item) {
                    if (item.title === categoryTitle) {
                        return item;
                    }
                });

                return category[0];
            };

            this.categories = function () {
                return menu.filter(function (item) {
                    if (item.type === "category") {
                        return  item;
                    }
                });
            };

            this.categoryByService = function (service) {
                var parentId,
                    categoryId,
                    category;

                parentId = menu.filter(function (item) {
                    if(service === item.title) {
                        return item;
                    }
                });

                categoryId = parentId[0].parentId;

                category = menu.filter (function (item) {
                    if (categoryId === item.id){
                        return item;
                    } 
                });

                return category[0];
            };
        }
    ];

})();
