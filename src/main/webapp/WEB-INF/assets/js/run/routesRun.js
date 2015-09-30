app.run(['$rootScope', 'api', function ($rootScope, api) {
  $rootScope.$on('$routeChangeStart', function(event, currentRoute, previousRoute) {
    $rootScope.loading = true;
  });
  $rootScope.$on('$routeChangeSuccess', function(event, currentRoute, previousRoute){
    $rootScope.loading = false;
  });
}]);