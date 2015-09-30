'use strict';

app.controller('ReportNewCtrl', ['$scope', '$routeParams', 'ReportNewService', 'MovimentoService', 'VisioService', 'JsonService', 'MessageService', function($scope, $routeParams, ReportNewService, MovimentoService, VisioService, JsonService, MessageService) {

    var index = 0;
    var registers = [];
    var visio = {};
    $scope.link = [];
    $scope.page = [];
    $scope.visio = {};

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
/*        JsonService.visioLineTest()*/
            .then(function(data) {
                visio = data[0]; 
                $scope.getLinks();  
            })
            .catch(function(err) {
                MessageService.danger('Erro ao criar relatório: ' + err);
                layout = [];
            });
    }

    $scope.getLinks = function() { 
        $scope.link = ReportNewService.links(registers, visio);
        $scope.getLink($scope.link.selected[0], index);
    }

    $scope.getLink = function(key, index) {
        $scope.link = ReportNewService.link(key, index);              
        var selected = angular.copy($scope.link.selected);
        $scope.getPages(selected, $scope.link.links[0]);
    }

    $scope.getPages = function(selected, link) {            
        var selectedX = angular.copy(selected);
        var filters = link.key;
        _.map(selected, function(item, index) {
            if(index + 1 < selected.length){
            _.extend(filters, item);
            }
        });
        $scope.page = ReportNewService.pages(registers, visio, filters);
        $scope.getPage($scope.page.pages);
    }

    $scope.getPage = function(page) {
        $scope.visio = ReportNewService.page(angular.copy(visio), page);
        console.log($scope.visio);
    }

    createReport();

}]);

