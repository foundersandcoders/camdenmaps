;(function(){
	"use strict";

	module.exports = function storageInUse(localStorageService){

        var stringStored = localStorageService.get("S-USER-LOCATION"),
        	typeaheadStored = localStorageService.get("USER-LOCATION");

        if (stringStored !== null || typeaheadStored !== null ){
        	return true;
        } else {
        	return false;
        }

	};

}());