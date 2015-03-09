/*************************************
*   SCROLL ELEMENT SERVICE.JS
*
*************************************/

;(function () {
    "use strict";

    module.exports = [
        function () {

            //First time you click on marker, doesn't activate
            this.toTop = function (outerElement, innerElement) {
                
                var activeItem = innerElement.position().top;
                
                outerElement.scrollTop(0);

                outerElement.animate({
                    scrollTop: activeItem
                },500);  
            };
        }
    ];

})();
