'use strict';

app.factory("JsonService", ['$http', '$q',  function($http, $q) {

    return {

        movimento: function(callback) {
            var cb = callback || angular.noop;
            var deferred = $q.defer();
            $http.get('data/movimento.json')
                .success(function(data) {
                    deferred.resolve(data);
                    return cb(data);
                }).error(function(err) {
                    deferred.reject(err);
                    return cb(err);
                }.bind(this));
            return deferred.promise;
        },

        visioTest: function(callback) {
            var cb = callback || angular.noop;
            var deferred = $q.defer();
            $http.get('data/test/visio.json')
                .success(function(data) {
                    deferred.resolve(data);
                    return cb(data);
                }).error(function(err) {
                    deferred.reject(err);
                    return cb(err);
                }.bind(this));
            return deferred.promise;
        },

        visioLineTest: function(callback) {
            var cb = callback || angular.noop;
            var deferred = $q.defer();
            $http.get('data/test/visio_line.json')
                .success(function(data) {
                    deferred.resolve(data);
                    return cb(data);
                }).error(function(err) {
                    deferred.reject(err);
                    return cb(err);
                }.bind(this));
            return deferred.promise;
        },

        layoutTest: function(callback) {
            var cb = callback || angular.noop;
            var deferred = $q.defer();
            $http.get('data/test/layout.json')
                .success(function(data) {
                    deferred.resolve(data);
                    return cb(data);
                }).error(function(err) {
                    deferred.reject(err);
                    return cb(err);
                }.bind(this));
            return deferred.promise;
        },

        camposTest: function(callback) {
            var cb = callback || angular.noop;
            var deferred = $q.defer();
            $http.get('data/test/campos.json')
                .success(function(data) {
                    deferred.resolve(data);
                    return cb(data);
                }).error(function(err) {
                    deferred.reject(err);
                    return cb(err);
                }.bind(this));
            return deferred.promise;
        },
        
        campos: function(callback) {
            var cb = callback || angular.noop;
            var deferred = $q.defer();
            $http.get('data/campos_movimento.json')
                .success(function(data) {
                    deferred.resolve(data);
                    return cb(data);
                }).error(function(err) {
                    deferred.reject(err);
                    return cb(err);
                }.bind(this));
            return deferred.promise;
        }
    }
}]);
