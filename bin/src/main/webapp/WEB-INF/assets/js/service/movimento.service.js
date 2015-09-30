'use strict';

app.factory("MovimentoService", ['$http', '$q',  function($http, $q){

    return {

        movimento: function(callback) {
	        var cb = callback || angular.noop;
	        var deferred = $q.defer();
	        $http.get('/financeiro/movimento')
	        	.success(function(data) {
	            	deferred.resolve(data);
					return cb();
		        })
		        .error(function(err) {
	            	deferred.reject(err);
					return cb(err);
		        }.bind(this));
	        return deferred.promise;
      	},

        movimentoByHeader: function(fields, callback) {
	        var cb = callback || angular.noop;
	        var deferred = $q.defer();
	        $http.post('/financeiro/movimento/field/header', {
	        		'fields': fields 
	        	})
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