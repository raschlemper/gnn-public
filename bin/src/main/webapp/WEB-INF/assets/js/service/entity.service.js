'use strict';

app.factory("EntityService", ['$http', '$q',  function($http, $q) {

    return {

        entity: function(callback) {
            var cb = callback || angular.noop;
            var deferred = $q.defer();
            $http.get('/financeiro/entity')
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

        create: function(visio, callback) {
            var cb = callback || angular.noop;
            var deferred = $q.defer();
            $http.post('/financeiro/entity', visio)
                .success(function(data) {
                    deferred.resolve(data);
                    return cb();
                })
                .error(function(err) {
                    deferred.reject(err);
                    return cb(err);
                }.bind(this));
        }

    }
}]);
