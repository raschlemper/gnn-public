'use strict';

/**
 * @ngdoc function
 * @name exemplosApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the exemplosApp
 */
app.controller('ConfigurationCtrl2', ['$scope', '$routeParams', 'api', 'ConvertUtil', 'modalService', '$location', 'TemplateService', function($scope, $routeParams, api, ConvertUtil, modalService, $location, TemplateService) {

    var init = function() {
        $scope.vision = {};
        $scope.templates = [];
        $scope.datasources = [];
        $scope.selection = {};
        carregaVision();
    };
    var margin = 4;

    $scope.setTab = function(tabId) {
        $scope.tab = tabId;
    }

    $scope.makePreview = function(vision) {
        TemplateService.service.setOptionPreview(vision);
        $location.path("/preview");
    };

    $scope.gridsterOpts = {
        columns: 3,
        rowHeight: (40 + margin).toString(),
        margins: [margin, margin]
    };


    var carregaVision = function() {
        if ($routeParams.modulo) {
            api.modulos.get($routeParams.modulo).success(function(data) {
                $scope.datasources = ConvertUtil.convert.parseFonteDadosJSON(data.datasources);
                $scope.modulo = data;
            });
        };
        if ($routeParams.hashid) {
            api.visions.get($routeParams.hashid).success(function(data) {
                $scope.vision = ConvertUtil.convert.visionFromEntity(angular.copy(data));
                var datasource = $scope.datasources.filter(function(datasource) {
                    return datasource.id === $scope.vision.datasource.id;
                });
                $scope.vision.datasource = datasource[0];
                getTemplates();
            });
        } else {
            $scope.vision.layout = {};
            getTemplates();
        }
    };

    $scope.removeWidget = function(component, container) {
        container.components.splice(container.components.indexOf(component), 1);
    }

    $scope.editWidget = function(component, container) {
        console.log(component, container);
    }


    var getTemplates = function() {
        api.templates.list().success(function(data) {
            $scope.templates = ConvertUtil.convert.jsonToObject(angular.copy(data));
            if (!$routeParams.hashid) {
                var selected = $scope.templates[0];
                $scope.selection.template = selected;
                $scope.vision.layout = selected;
                $scope.vision.layout.templateId = selected._id;
            } else {
                var selecionado = $scope.templates.filter(function(value) {
                    return value._id == $scope.vision.layout.templateId;
                });
                $scope.selection.template = selecionado[0];
            }
        });
    };

    $scope.newComponente = function(container) {
        var resolve = {
            fonte: function() {
                return angular.copy($scope.vision.datasource) || {};
            },
            container: function() {
                return angular.copy(container);
            }
        };
        modalService.custom('view/componenteCreateModal', 'componenteCreateCtrl', 'lg', resolve, false).then(function(data) {
            updateContainer(data);
        }, function(message) {

        });
    }

    var updateContainer = function(containerUpdate) {
        var container = _.findWhere($scope.vision.layout.containers, {
            _id: containerUpdate._id
        });
        var componentUpdate = containerUpdate.components[0];
        if (container.components.length) {
            var existComponent = _.findWhere(container.components, {
                hash: componentUpdate.hash
            });
            if (existComponent) {
                container = _.without(container.components, existComponent);
            } else {
                container.components.push(componentUpdate);
            }
        } else {
            container.components.push(componentUpdate);
        }

        $scope.vision.layout.containers = _.without($scope.vision.layout.containers, container);
        $scope.vision.layout.containers.push(container);
    }

    $scope.saveVision = function(vision) {
        var entity = ConvertUtil.convert.stringfyToEntity(vision);
        entity.hash = entity.hashid;
        delete entity.hashid;
        entity.modulo = angular.copy($scope.modulo);
        if (!$routeParams.hashid) {
            api.visions.save(entity);
        } else {
            api.visions.update(entity.hash, entity);
        }
        setTimeout(function() {
            $location.url('/vision').search('modulo', $routeParams.modulo);
        }, 200);
    };

    $scope.selectTemplate = function() {
        $scope.vision.layout = $scope.selection.template;
        $scope.vision.layout.templateId = $scope.selection.template._id;
        clear();
    };


    var clear = function() {
        $scope.component = {};
        $scope.selectedComponent = {};
    }

    init();

}]);
