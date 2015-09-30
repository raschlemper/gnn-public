'use strict';

/**
 * @ngdoc function
 * @name exemplosApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the exemplosApp
 */
app.controller('HeaderCtrl', [ '$location', '$scope', function( $location, $scope) {

  $scope.getUrl = function(){
    $scope.url = $location.search().modulo;
    if($scope.url){
        return "?modulo=" + $scope.url;
    }else{
        return "";
    }
  }

}]);
