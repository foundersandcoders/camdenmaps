;(function(){
	"use strict";

	module.exports = function resetActiveMarker (scope) {
        if(scope.activeMarker) {
            //resets active marker
            scope.activeMarker.icon.iconUrl = "../img/icons/marker-hi.png";
            scope.update("activeMarker", 0);
        }

	};


}());