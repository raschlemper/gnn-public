'use strict';

app.factory("CampoService", ['$http', '$q', function($http, $q){

    return {

        campo: function(callback) {
	        var cb = callback || angular.noop;
	        var deferred = $q.defer();
	        $http.get('/financeiro/campo')
	        	.success(function(data) {
	            	deferred.resolve(data);
					return cb();
		        })
		        .error(function(err) {
	            	deferred.reject(err);
					return cb(err);
		        }.bind(this));
	        return deferred.promise;
      	}

    }
}]);