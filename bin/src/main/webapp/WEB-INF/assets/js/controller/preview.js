'use strict';

/**
 * @ngdoc function
 * @name exemplosApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the exemplosApp
 */
app.controller('PreviewCtrl', ['$scope', 'TemplateService', '$location', '$routeParams', function($scope, TemplateService, $location, $routeParams) {

    $scope.option = {};
    $scope.visio = {};
    $scope.visio.layout = TemplateService.service.getOptionPreview();

    $scope.columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    $scope.backConfiguration = function(){
        $location.url('/configuration').search('hashid', $routeParams.hashid);
    }

    $scope.dadosteste = {
        "status": "R",
        "aluno": "Nome do Aluno",
        "vencimento": "08/05/2015",
        "pagamento": "08/05/2015",
        "valor": "100,00"
    }
}]);
