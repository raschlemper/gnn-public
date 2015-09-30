app.factory("TemplateService", ['$http', '$q',  function($http, $q) {
    var _optionPreview = {};
    var _configuration = {};
    var _templateService = {};

    _templateService.getOptionPreview = function() {
        return _optionPreview;
    };

    _templateService.setOptionPreview = function(preview) {
        _optionPreview = preview;
    };
    _templateService.getConfiguration = function() {
        return _configuration;
    };
    _templateService.setConfiguration = function(config) {
        _configuration = config;
    };
    _templateService.getAll = function(callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        $http.get('/financeiro/template')
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

    _templateService.getById = function(id, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        $http.get('/financeiro/template/'+id, {params:{id:id}})
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
        service: _templateService
    }
}]);
