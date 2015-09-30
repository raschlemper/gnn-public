app.controller('LoginModalController', ['$scope', '$http', '$modalInstance', 'api', 'notificationService', '$route', '$rootScope', function ($scope, $http, $modalInstance, api, notificationService, $route, $rootScope) {
  $scope.logo = 'static/img/logo.png';

  $scope.login = function (loginForm) {
    $http.get('public/auth/login?txt_IdTipoUsuario=1&txt_IdModulo=1&txt_CdInstituicao=' + loginForm.instituicao + '&j_username=' + loginForm.usuario + '&j_password=' + loginForm.senha + '&txt_DsRespostaSecreta=' + loginForm.resposta).success(function(data) {
      delete $scope.loginForm;
      $route.reload();
      $modalInstance.close();
    }).error(function () {
      $scope.errorMessage = "Falha na autenticação, tente novamente!";
    });
  };
}]);
