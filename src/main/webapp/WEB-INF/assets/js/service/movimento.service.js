'use strict';

app.factory("MovimentoService", ['$http', '$q',  function($http, $q){
	
	var options = {
			headers: { 'X-token': 'H4sIAAAAAAAAAFvzloG1hEHeMTjA2drIwMDQ2snFAEz7+DtbG+hZmlkaGhmYAwA08kkDJgAAAA==' },
            params: { inicio: '2015-08-01', fim: '2015-08-15' }
    };


    return {

        movimento: function(callback) {
	        var cb = callback || angular.noop;
	        var deferred = $q.defer();
	        $http.get('http://localhost:8080/api/service/financeiro/instituicao/246', options)
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