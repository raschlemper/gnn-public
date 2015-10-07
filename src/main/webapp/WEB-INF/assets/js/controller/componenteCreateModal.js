app.controller('componenteCreateCtrl', ['$scope', 'fonte', 'container', '$filter', '$modalInstance', 'component', 'edita', function($scope, fonte, container, $filter, $modalInstance, component, edita) {

    var init = function() {
        $scope.edita = false || edita;
        $scope.container = container || {};
        $scope.component = component || {};
        if (component && component.type) {
            $scope.type = $scope.component.type;
        } else {
            $scope.type = '';
        };
        $scope.fonte = fonte || {};
        if (fonte) {
            if($scope.edita && !($scope.type === 'list' || $scope.type === 'table')){
                return ;
            }
            getCamposMovimento();
            selecionaListaFiltros(fonte.parameter);
        };
    }

    $scope.totalPorPagina = 6;
    $scope.paginaAtual = 1;

    $scope.mudaPagina = function(pagina) {
        $scope.paginaAtual = pagina;
        filtraSelecionados();
    };

    var getCamposMovimento = function() {
        var campos = angular.copy($scope.fonte.converter);
        if ($scope.edita && $scope.component.data) {
            campos.filter(function(campo) {
                if ($scope.component.data.fields.length) {
                    for (var i = 0; i < $scope.component.data.fields.length; i++) {
                        if (campo._id === $scope.component.data.fields[i]._id) {
                            $scope.component.data.fields[i].selected = true;
                            campo.selected = true;
                        }
                    };
                    $scope.selectedsFiltered = $scope.component.data.fields;
                }
            });
        };
        $scope.campos = campos;
    };

    $scope.removeCampo = function(selected) {
        selected.selected = false;
        $scope.component.data.fields = _.without($scope.component.data.fields, _.findWhere($scope.component.data.fields, {
            expression: selected.expression
        }));
        $scope.selectedsFiltered = $scope.component.data.fields;
        totalItens();
        filtraSelecionados();
    };

    $scope.select = function(type, typename) {
        $scope.type = type || '';
        $scope.component = {};
        $scope.component.typename = typename || '';
        $scope.component.type = type;
        if($scope.edita){
            $scope.component.data = {};
        };
        $scope.component.sizeX = 2;
        $scope.component.sizeY = 3;
        $scope.component.row = 0;
        $scope.component.col = container.components.length;
        $scope.selectedsFiltered = [];
        if (type === 'list' || 'table') {
            if (type === 'list') {
                $scope.component.data.format = 'list'
            };
            if (type === 'table') {
                $scope.component.data.format = 'grid'
            };
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
        if (!$scope.edita) {
            component.hash = Math.random().toString(36).substr(2, 9) +
                Math.random().toString(36).substr(2, 12) +
                Math.random().toString(36).substr(2, 15);
        };
        container.components.push(component);
        $modalInstance.close(container);
    };

    init();

}]);
