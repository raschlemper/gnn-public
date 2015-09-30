app.factory('loadingInterceptor', ['$rootScope', '$q', '$timeout', function ($rootScope, $q, $timeout) {
  return {
    request: function(config) {
      $rootScope.requestInProgress = $rootScope.requestInProgress || 0;
      $rootScope.requestInProgress++;
      return config;
    },
    requestError: function(rejection) {
      $timeout(function () {
        $rootScope.requestInProgress--;        
      }, 500);
      return $q.reject(rejection);
    },
    response: function(response) {
      $timeout(function () {
        $rootScope.requestInProgress--;
      }, 500);
      return response;
    },
    responseError: function(rejection) {
      $timeout(function () {
        $rootScope.requestInProgress--;
      }, 500);
      return $q.reject(rejection);
    }
  };
}]);

app.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.interceptors.push('loadingInterceptor');
}]);