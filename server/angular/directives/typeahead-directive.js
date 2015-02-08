/*************************************
*   SERVICES DIRECTIVE.JS
*	use: to show or hide title based
*		on what has been rendered
*************************************/

var menu = require("../menu.json");

;(function () {
    "use strict";

    module.exports = [
        function () {
        	return {
        		restrict: 'AEC',
            transclude: true,
        		template: '<input type="text" ng-model="selected" typeahead="service.title for service in typeaheadServicesList | filter:$viewValue | limitTo:8" class="form-control">',
            controller: 'typeahead'
        	}
        }
    ];
}());
