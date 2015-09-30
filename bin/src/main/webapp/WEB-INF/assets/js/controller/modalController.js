app.controller('modalController', ['$scope', '$modalInstance', 'title', 'message', 'type', function ($scope, $modalInstance, title, message, type) {

  var init = function () {
    $scope.title = title;
    $scope.message = message;
    $scope.type = type;
  };

  $scope.defineType = function (type) {
    return $scope.type == type;
  };

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.close = function () {
    $modalInstance.dismiss();
  };

  init();

}]);
