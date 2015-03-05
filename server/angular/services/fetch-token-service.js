/*************************************
*   FETCH-TOKEN.JS
* 	
*************************************/

;(function () {
    "use strict";

    module.exports = [
        "$http",
        function ($http) {

            this.tokenIssued = false;

            this.getToken = function getToken () {
                if(!this.tokenIssued) {
                    this.tokenIssued = true;
                    return $http({method:"GET", url:"http://camdenmaps.herokuapp.com/auth_token"});
                } else {
               
                    return {
                        success: function(cb) {
                            cb();
                        }
                    };
                }
            };
        }
    ];
}());
