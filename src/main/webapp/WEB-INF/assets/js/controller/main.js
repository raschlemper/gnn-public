'use strict';

/**
 * @ngdoc function
 * @name exemplosApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the exemplosApp
 */
app.controller('MainCtrl', ['$scope', '$location', '$filter', 'MessageService', '$routeParams', 'api', 'ConvertUtil', function($scope, $location, $filter, MessageService, $routeParams, api, ConvertUtil) {

    var init = function() {
        if(!$routeParams.modulo){
            $location.path("/");
        }
        $scope.visios = [];
        $scope.totalItens = 0;
        $scope.totalPorPagina = 6;
        $scope.paginaAtual = 1;
        $scope.filtered = [];
        getVisios();
        getModulo();
    }

    $scope.setVisio = function(visio){
        $scope.visio = visio;
    }

    $scope.mudaPagina = function(pagina) {
        $scope.paginaAtual = pagina;
        filtraSelecionados();
    };

    $scope.newVisio = function() {
        $location.path("/vision/configuration");
    };

    $scope.viewReport = function(visio) {
        $location.url('/report').search('hashid', visio.hashid).search('modulo', $routeParams.modulo);
    };

    $scope.updateVisio = function(visio) {
        $location.url('/vision/configuration').search('hashid', visio.hash).search('modulo', $routeParams.modulo);
    }

    var jsonToObject = function(array){
	   	 var convertArray = [];
		 	 for (var i = 0; i < array.length; i++) {
					 var obj = angular.fromJson(array[i].model);
           obj.hash = array[i].hash;
           obj.modulo = array[i].modulo;
					 convertArray.push(obj);
	     };
	     return convertArray;
    };

    var getVisios = function() {
        api.visions.list({'modulo':$routeParams.modulo}).success(
            function(data) {
                $scope.visios = angular.copy(jsonToObject(data));
                $scope.totalItens = data.length;
                filtraSelecionados();
            });
    };

    var getModulo = function(){
      api.modulos.get($routeParams.hashid).success(function(data){
          $scope.modulo = data[0];
      });
    }

    $scope.removeVisio = function(visio) {
        if(visio){
            api.visions.delete(visio.hash);
        }
        setTimeout(function(){ getVisios(); }, 200);
    }

    var filtraSelecionados = function() {
        var pagina = $scope.paginaAtual - 1;
        $scope.filtered = $filter('startPage')($scope.visios, pagina * $scope.totalPorPagina);
    }

    init();
}]);
