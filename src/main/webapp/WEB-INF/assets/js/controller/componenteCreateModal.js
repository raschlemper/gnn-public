app.controller('componenteCreateCtrl', ['$scope', 'fonte', 'container', '$filter', '$modalInstance', function($scope, fonte, container, $filter, $modalInstance) {

    var init = function() {
        $scope.type = '';
        $scope.container = container || {};
        $scope.component = {
            data: {

            }
        };
        $scope.fonte = fonte || {};
        if (fonte) {
            getCamposMovimento();
            selecionaListaFiltros(fonte.parameter);
        }
    }

    $scope.totalPorPagina = 6;
    $scope.paginaAtual = 1;

    $scope.mudaPagina = function(pagina) {
        $scope.paginaAtual = pagina;
        filtraSelecionados();
    };

    var getCamposMovimento = function() {
        var campos = angular.copy($scope.fonte.converter);
        // if ($scope.component.data) {
        //     campos.filter(function(campo) {
        //         if ($scope.component.data.fields.length) {
        //             for (var i = 0; i < $scope.component.data.fields.length; i++) {
        //                 if (campo._id === $scope.component.data.fields[i]._id) {
        //                     $scope.component.data.fields[i].selected = true;
        //                     campo.selected = true;
        //                 }
        //             };
        //             $scope.selectedsFiltered = $scope.component.data.fields;
        //         }
        //     });
        // };
        $scope.campos = campos;
    };

    $scope.select = function(type) {
        $scope.type = type || '';
        $scope.component = {};
        $scope.component.type = type;
        $scope.selectedsFiltered = [];
        if (type === 'list' || 'table') {
            getCamposMovimento();
        }
    }

    $scope.addCampo = function(label) {
        if (!$scope.component.data) {
            $scope.component.data = {};
        }
        if (!$scope.component.data.fields) {
            $scope.component.data.fields = [];
        }
        if (!label.selected) {
            label.selected = true;
            $scope.component.data.fields.push(label);
        } else {
            label.selected = false;
            $scope.component.data.fields = _.without($scope.component.data.fields, _.findWhere($scope.component.data.fields, {
                expression: label.expression
            }));
        }
        $scope.selectedsFiltered = $scope.component.data.fields;
        totalItens();
        filtraSelecionados();
    };

    var totalItens = function() {
        if ($scope.component.data) {
            if ($scope.component.data.fields.length) {
                $scope.totalItens = $scope.component.data.fields.length;
            }
        }
    };

    $scope.close = function() {
        $modalInstance.dismiss('close');
    };

    var filtraSelecionados = function() {
        var pagina = $scope.paginaAtual - 1;
        $scope.selectedsFiltered = $filter('startPage')($scope.component.data.fields, pagina * $scope.totalPorPagina);
    };

    var selecionaListaFiltros = function(filtros) {
        filtros = filtros.filter(function(filtro) {
            return filtro.required == '1';
        })
        $scope.filtros = filtros;
    }

    $scope.addFilterVision = function(filtro) {
        $scope.filtros.push(filtro);
    }

    $scope.confirmar = function() {
        var container = angular.copy($scope.container);
        container.components = [];
        var component = angular.copy($scope.component);
        component.hash = Math.random().toString(36).substr(2, 9) + 
        Math.random().toString(36).substr(2, 12) + 
        Math.random().toString(36).substr(2, 15);
        container.components.push(component);
        $modalInstance.close(container);
    };

    init();

}]);
