app.controller('filtrosCreateModal', ['$scope', 'fonte', 'filtro', '$modalInstance', function($scope, fonte, filtro, $modalInstance) {

    var init = function() {
        $scope.fonte = fonte || {};
        $scope.param = filtro || {};
        $scope.edita = filtro.type ? true : false;
    };


    /**
     * Parameter Tab
     */

    var addFilter = function(param) {
        if (param.format === 'date') {
            param.filter = ['date', 'dd/MM/yyyy'];
        }
        if (param.format === 'currency') {
            param.filter = ['currency', 'R$'];
        }
        return param;
    }

    $scope.addParameter = function(param, fonte) {
        param = addFilter(param);
        console.log(param);
        fonte.parameter = fonte.parameter || [];
        fonte.parameter.push(angular.copy(param));

        param.from = '';
        param.to = '';

        if (param.type)
            param.type = '';
    };

    $scope.updateParameter = function(param, fonte) {
        fonte.parameter = fonte.parameter || [];
        fonte.parameter = _.without(fonte.parameter, _.findWhere(fonte.parameter, {
            from: param.from
        }));
        fonte.parameter.push(angular.copy(param));
    };

    $scope.removeParameter = function(param, fonte) {
        fonte.parameter.splice(fonte.parameter.indexOf(param), 1);
    };


    $scope.confirmar = function(fonte) {
        $modalInstance.close(fonte);
    };

    init();

}]);
