/*************************************
*   FETCH-TOKEN.JS
*
*************************************/

//TODO: Make sure caching applies across states so requests aren't made twice

;(function () {
    "use strict";

    module.exports = [
        "$http",
        function ($http) {

            this.getToken = function getToken () {
            	return $http.get('http://camdenmaps.herokuapp.com/auth_token').then(function(response){
            		console.log(response);
            	})
                
            }


        }
    ];
}());
