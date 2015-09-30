'use strict';

/**
 * @ngdoc function
 * @name exemplosApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the exemplosApp
 */
app.controller('ModuloCtrl', ['$scope', 'modulos', '$location', '$filter', 'MessageService', 'modalService','api', function($scope, modulos, $location, $filter, MessageService, modalService, api) {

    $scope.totalItens = 0;
    $scope.totalPorPagina = 6;
    $scope.paginaAtual = 1;
    $scope.filtered = [];

    var init = function () {
      $scope.modulos = modulos.data;
    };

    $scope.setModulo = function(modulo){
        $scope.modulo = modulo;
    }

    $scope.mudaPagina = function(pagina) {
        $scope.paginaAtual = pagina;
        filtraSelecionados();
    };

    $scope.newModulo = function() {
        $location.path("/modulo/configuration");
    };

    $scope.getVisions = function(modulo) {
        $location.url('/vision').search('modulo', modulo.hash);
    };

    $scope.updateModulo = function(modulo) {
        $location.url('/modulo/configuration').search('hashid', modulo.hash);
    }

    $scope.createModulo = function () {
        $location.url('/modulo/configuration');
    };

    $scope.removeModulo = function(modulo) {
        if(modulo){
          api.modulos.delete(modulo.id).success(function () {

          });
        }
        setTimeout(function(){ getModulos(); }, 200);
    }

    var filtraSelecionados = function() {
        var pagina = $scope.paginaAtual - 1;
        $scope.filtered = $filter('startPage')($scope.modulos, pagina * $scope.totalPorPagina);
    }

    var getModulos = function(){
        api.modulos.list().success(function(data){
            $scope.modulos = data;
        });
        filtraSelecionados();
    };

    init();
}]);
