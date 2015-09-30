app.run(['$rootScope', '$http', '$window', 'modalService', function ($rootScope, $http, $window, modalService) {
	
  $rootScope.openLoginModal = function () {
    if ($rootScope.isLoginModalOpened) return;
    modalService.custom('view/loginModal', 'LoginModalController', 'sm', {}, true).then(function () {
      $rootScope.isLoginModalOpened = false;
    });
    $rootScope.isLoginModalOpened = true;
  };

  $rootScope.logout = function () {
    modalService.confirm('Aviso', 'Deseja realmente sair do Vision?', 'warning', 'sm').then(function () {
      $http.get('public/auth/logout').success(function () {
        $window.location.reload();
      });
    }, function () {});
  };
  
  $rootScope.back = function () {
    $window.history.back();
  };
}]);
