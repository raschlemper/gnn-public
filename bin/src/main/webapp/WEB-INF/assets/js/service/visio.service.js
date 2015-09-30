app.factory("VisioService", ['$http', '$q', 'SERVER', function($http, $q, SERVER) {
    var _visioService = {};

    _visioService.addVisio = function(visio, callback) {
    	var cb = callback || angular.noop;
        var deferred = $q.defer();
        $http.post('/financeiro/visio', visio)
            .success(function(data) {
                deferred.resolve(data);
                return cb();
            })
            .error(function(err) {
                deferred.reject(err);
                return cb(err);
            }.bind(this));
    };

    _visioService.remove = function(visio, callback) {
        var deferred = $q.defer();
        $http.post('/financeiro/visio/remove', visio)
            .error(function(err) {
                deferred.reject(err);
                return cb(err);
            }.bind(this));
    };

    _visioService.update = function(visio, callback) {
        var deferred = $q.defer();
        $http.put('/financeiro/visio', visio)
            .error(function(err) {
                deferred.reject(err);
                return cb(err);
            }.bind(this));
    };
    
    _visioService.getAll = function(callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        $http.get('/financeiro/visio')
            .success(function(data) {
                deferred.resolve(data);
                return cb();
            })
            .error(function(err) {
                deferred.reject(err);
                return cb(err);
            }.bind(this));
        return deferred.promise;
    };

    _visioService.getByHashid = function(hashid, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        $http.get('/financeiro/visio/' + hashid, {})
            .success(function(data) {
                deferred.resolve(data);
                return cb();
            })
            .error(function(err) {
                deferred.reject(err);
                return cb(err);
            }.bind(this));
        return deferred.promise;
    };
    return {
        service: _visioService
    }
}]);
