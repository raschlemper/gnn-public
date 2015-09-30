'use strict';

app.controller('ReportCtrl', ['$scope', '$filter', '$routeParams', '$location',
    'ReportService', 'MovimentoService', 'VisioService',
    'JsonService', 'MessageService', function($scope, $filter, $routeParams, $location,
    ReportService, MovimentoService, VisioService,
    JsonService, MessageService) {

    var index = 0;
    var registers = [];
    var visio = {};
    $scope.pages = [];
    $scope.visio = {};
    $scope.pageSelected = {};
    $scope.selectedIndex = 0;

    $scope.select = function(i, page) {
        $scope.selectedIndex = i;
        $scope.pageSelected = page;
    };

    var createReport = function() {
        getData();
    }

    var getData = function() {
        MovimentoService.movimento()
            .then(function(data) {
                registers = data;
                getVisio();
            })
            .catch(function(err) {
                MessageService.danger('Erro ao recuperar dados do relatório: ' + err);
                data = [];
            });
    }

    var getVisio = function() {
        VisioService.service.getByHashid($routeParams.hashid)
/*        JsonService.visioTest()*/
            .then(function(data) {
                visio = data[0];
                $scope.visio = angular.copy(visio);
                $scope.pages = ReportService.pages(registers, $scope.visio.layout);
                $scope.getPage($scope.pages[index]);
                $scope.pageSelected = $scope.pages[index];
            })
            .catch(function(err) {
                MessageService.danger('Erro ao carregar relatório: ' + err);
                layout = [];
            });
    }

    $scope.getPage = function(page) {
        $scope.visio = angular.copy(visio);
        ReportService.page(page, registers, $scope.visio.layout);
    }

    createReport();

}]);
