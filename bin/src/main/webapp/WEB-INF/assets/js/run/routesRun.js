app.run(['$rootScope', 'api', function ($rootScope, api) {
  $rootScope.$on('$routeChangeStart', function(event, currentRoute, previousRoute) {
    if (currentRoute.originalPath === "/formulario/:idFormulario" || currentRoute.originalPath === "/formulario/:idFormulario/resposta/:idResposta" || currentRoute.originalPath === "/comprovante/:idResposta") {
      $rootScope.hideMenu = true;
    } else {
      $rootScope.hideMenu = false;
      if (!$rootScope.configs) {
        api.config.list().success(function (config) {
          $rootScope.configs = config;
        });
      }
    }
    $rootScope.loading = true;
  });
  $rootScope.$on('$routeChangeSuccess', function(event, currentRoute, previousRoute){
    $rootScope.loading = false;
  });
}]);