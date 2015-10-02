app.controller('pageConfigurationModalController', ['$scope', '$modalInstance', 'configuration', function ($scope, $modalInstance, configuration) {

  var init = function () {
	  $scope.configuration = configuration;
  };

  $scope.confirm = function(configuration){
	  $modalInstance.close(configuration);
  };
  
  init();

}]);
