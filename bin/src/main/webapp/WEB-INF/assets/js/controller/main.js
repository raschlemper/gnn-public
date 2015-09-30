'use strict';

/**
 * @ngdoc function
 * @name exemplosApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the exemplosApp
 */
app.controller('MainCtrl', ['$scope', '$location', '$filter', 'VisioService', 'MessageService', function($scope, $location, $filter, VisioService, MessageService) {

    $scope.visios = [];
    $scope.totalItens = 0;
    $scope.totalPorPagina = 6;
    $scope.paginaAtual = 1;
    $scope.filtered = [];

    $scope.setVisio = function(visio){
        $scope.visio = visio;
    }

    $scope.mudaPagina = function(pagina) {
        $scope.paginaAtual = pagina;
        filtraSelecionados();
    };

    $scope.newVisio = function() {
        $location.path("/configuration");
    };

    $scope.viewReport = function(visio) {
        $location.url('/report').search('hashid', visio.hashid);
    };

    $scope.updateVisio = function(visio) {
        $location.url('/configuration').search('hashid', visio.hashid);
    }

    var getVisios = function() {
        VisioService.service.getAll()
            .then(function(data) {
                $scope.visios = data;
                $scope.totalItens = data.length;
                filtraSelecionados();
            })
            .catch(function(err) {
                MessageService.danger('Erro ao carregar visões: ' + err);
                return console.log(err);
            });
    };


    $scope.removeVisio = function() {
        if($scope.visio){
            VisioService.service.remove($scope.visio);
        }
        $scope.visio = {};
        getVisios();
    }

    var init = function() {
        getVisios();
    }();


    var filtraSelecionados = function() {
        var pagina = $scope.paginaAtual - 1;
        $scope.filtered = $filter('startPage')($scope.visios, pagina * $scope.totalPorPagina);
    }
}]);
