app.factory('loginInterceptor', ['$rootScope', '$q', function ($rootScope, $q) {
  return {
    responseError: function (rejection) {
      if (rejection.status === 401) {
        $rootScope.openLoginModal();
        $rootScope.loading = true;
      }
      return $q.reject(rejection);
    }
  };
}]);

app.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.interceptors.push('loginInterceptor');
}]);