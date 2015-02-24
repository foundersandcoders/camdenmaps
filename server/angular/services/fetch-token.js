/*************************************
*   FETCH-TOKEN.JS
* 	
*************************************/

;(function () {
    "use strict";

    module.exports = [
        "$http",
        function ($http) {

            this.getToken = function getToken () {
                
                return $http({method:"GET", url:"http://camdenmaps-beta.herokuapp.com/auth_token"});
                
            }
        }
    ];
}());
