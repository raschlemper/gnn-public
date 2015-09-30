'use strict';

/**
 * @ngdoc function
 * @name exemplosApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the exemplosApp
 */
app.controller('ConfigurationCtrl', ['$scope', '$filter', '$location', '$routeParams', '$window', 'TemplateService', 'JsonService', 'VisioService', 'EntityService', 'MessageService', function($scope, $filter, $location, $routeParams, $window, TemplateService, JsonService, VisioService, EntityService, MessageService) {

    $scope.visio = {};
    $scope.templates = [];
    $scope.campos = [];
    $scope.selection = {};
    $scope.component = {};
    $scope.totalItens = 0;
    $scope.selectedsFiltered = [];
    $scope.groups = [];
    $scope.formats = [];
    $scope.form = {};
    $scope.edit = false;
    $scope.agrupador = {};

    //Código para paginação
    var totalItens = function() {
        if ($scope.component.data) {
            if ($scope.component.data.fields.length) {
                $scope.totalItens = $scope.component.data.fields.length;
            }
        }
    };

   $scope.selectComponent = function(index){  //function that sets the value of selectedRow to current index
     $scope.selectedComponent = index;
    }

    $scope.totalPorPagina = 4;
    $scope.paginaAtual = 1;

    $scope.mudaPagina = function(pagina) {
        $scope.paginaAtual = pagina;
        filtraSelecionados();
    };

    $scope.editComponent = function(component) {
        $scope.component = component;
        if (component.type === 'table' || component.type === 'list') {
            if (!$scope.component.data) {
                $scope.component.data = {
                    'fields': [],
                    'format': {
                        'type': 'list'
                    }
                };
                $scope.selectedsFiltered = [];
            } else {
                $scope.selectedsFiltered = [];
            }
        }
        getCamposMovimento();
    };

    $scope.selectTemplate = function() {
        $scope.visio.layout = $scope.selection.template;
        $scope.visio.layout.templateId = $scope.selection.template._id;
        clear();
    };

    var clear = function() {
        $scope.component = {};
        $scope.selectedComponent = {};
    }

    $scope.saveFields = function() {
        for (var i = 0; i < $scope.visio.layout.containers.length; i++) {
            for (var a = 0; a < $scope.visio.layout.containers[i].components.length; a++) {
                if ($scope.visio.layout.containers[i].components[a]._id === $scope.component._id) {
                    $scope.visio.layout.containers[i].components[a].data.fields === $scope.component.data.fields;
                }
            };
        };
        MessageService.success('Campos salvos com sucesso!');
    };

    var carregaVisio = function() {

        if ($routeParams.hashid) {
            VisioService.service.getByHashid($routeParams.hashid).then(function(data) {
                    $scope.visio = data[0];
                    getTemplates();
                })
                .catch(function(err) {
                    MessageService.danger('Erro ao recuperar visão: ' + err);
                    return console.log(err);
                });
        } else {
            $scope.visio.campos = [];
            $scope.visio.layout = {};
            getTemplates();
        }
    };

    var getTemplates = function() {
        TemplateService.service.getAll()
            .then(function(data) {
                $scope.templates = data;
                if (!$routeParams.hashid) {
                    $scope.selection.template = data[0];
                    $scope.visio.layout = data[0];
                    $scope.visio.layout.templateId = data[0]._id;
                } else {
                    var selecionado = $scope.templates.filter(function(value) {
                        return value._id == $scope.visio.layout.templateId;
                    });
                    $scope.selection.template = selecionado[0];
                }
            })
            .catch(function(err) {
                MessageService.danger('Erro ao recuperar templates: ' + err);
                return console.log(err);
            });
    };
    //define os menus superiores para o wizard
    $scope.menus = [{
        ordem: 1,
        titulo: "Visão"
    }, {
        ordem: 2,
        titulo: "Template"
    }, {
        ordem: 3,
        titulo: "Campos"
    }, {
        ordem: 4,
        titulo: "Resumo"
    }];

    $scope.makePreview = function() {
        TemplateService.service.setOptionPreview($scope.visio.layout);
        $location.path("/preview");
    };

    $scope.isValid = function(booleano) {
        if (booleano === true) {
            return booleano;
        } else {
            return false;
        }
    };


    var getCamposMovimento = function() {
        EntityService.entity()
            .then(function(data) {
                var campos = data;
                if ($scope.component.data) {
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
            })
            .catch(function(err) {
                return console.log(err);
            });
    };

    $scope.addCampo = function(label) {
        if (!label.selected) {
            label.selected = true;
            $scope.component.data.fields.push(label);
        } else {
            label.selected = false;
            $scope.component.data.fields = _.without($scope.component.data.fields, _.findWhere($scope.component.data.fields, {
                _id: label._id
            }));
        }
        $scope.selectedsFiltered = $scope.component.data.fields;
        totalItens();
        filtraSelecionados();
    };

    $scope.removeCampo = function(selected) {
        selected.selected = false;
        $scope.component.data.fields = _.without($scope.component.data.fields, _.findWhere($scope.component.data.fields, {
            _id: selected._id
        }));
        if ($scope.component.data.formulas) {
            removeFieldFromGroup(selected);
        };
        $scope.selectedsFiltered = $scope.component.data.fields;
        totalItens();
        filtraSelecionados();
    };

    $scope.message = function(alert){
        MessageService.success(alert);
    }

    $scope.saveVisio = function() {
        if (!$routeParams.hashid) {
            $scope.visio.createDate = new Date();
            $scope.visio.hashid = Math.floor(10000000000 + Math.random() * 90000000000);
            VisioService.service.addVisio($scope.visio);
        } else {
            VisioService.service.update($scope.visio);
        }
        MessageService.success('Visão salva com sucesso!');
        $location.path("/main");
    };

    var filtraSelecionados = function() {
        var pagina = $scope.paginaAtual - 1;
        $scope.selectedsFiltered = $filter('startPage')($scope.component.data.fields, pagina * $scope.totalPorPagina);
    };

    $scope.tab = 1;

    $scope.addFieldGroup = function(groupSelected) {
        if ($scope.groups.length) {
            var isSelected = _.findWhere($scope.groups, {
                _id: groupSelected._id
            });
            if (!isSelected) {
                $scope.groups.push(groupSelected);
            }
        } else if (groupSelected) {
            $scope.groups.push(groupSelected);
        }
    };

    $scope.addFieldFormat = function(groupSelected) {
        if ($scope.formats.length) {
            var isSelected = _.findWhere($scope.formats, {
                _id: groupSelected._id
            });
            if (!isSelected) {
                $scope.formats.push(groupSelected);
            }
        } else if (groupSelected) {
            $scope.formats.push(groupSelected);
        }
    };

    $scope.removeFieldGroup = function(field) {
        $scope.groups = _.without($scope.groups, _.findWhere($scope.groups, {
            _id: field._id
        }));
    };

    $scope.removeFieldFormat = function(field) {
        $scope.formats = _.without($scope.formats, _.findWhere($scope.formats, {
            _id: field._id
        }));
    };

    $scope.createGrouper = function(groupSelected) {
        if (!$scope.component.data.formulas) {
            $scope.component.data.formulas = [];
        };
        if ($scope.edit) {
            for (var i = $scope.component.data.formulas.length - 1; i >= 0; i--) {
                if ($scope.component.data.formulas[i].alias === $scope.agrupador.alias) {
                    var field = createFieldBasicFormat($scope.agrupador.name, false, true, 'number');
                    field.description = $scope.agrupador.description;
                    $scope.agrupador.field = field;
                    $scope.agrupador.group = groupSelected;
                    $scope.component.data.formulas[i] = $scope.agrupador;
                    break;
                }
            };
        } else {
            $scope.agrupador.alias = "cd_totalizer_" + Math.floor(10000000000 + Math.random() * 90000000000);
            var field = createFieldBasicFormat($scope.agrupador.name, false, true, 'number');
            field.description = $scope.agrupador.description;
            $scope.agrupador.field = field;
            $scope.agrupador.group = groupSelected;
            $scope.component.data.formulas.push($scope.agrupador);
        }
        $scope.groups = [];
        $scope.edit = false;
        $scope.agrupador = {};
        $scope.setTab(1);
    };

    $scope.createFormat = function(format) {
        if (!$scope.component.data.format) {
            $scope.component.data.format = {};
        }
        if ($scope.editFormat) {
            $scope.format = $scope.component.data.format;
            $scope.component.data.format.fields = $scope.formats;
        } else {
            $scope.component.data.format['type'] = format.type;
            $scope.component.data.format['fieldName'] = createFieldBasicFormat(format.fieldName.key.label, true, false, 'text');
            $scope.component.data.format['fieldValue'] = createFieldBasicFormat(format.fieldValue.key.label, false, true, 'number');
            $scope.component.data.format['fields'] = $scope.formats;
        }
        $scope.formats = [];
        $scope.editFormat = false;
        $scope.format = {};
        $scope.setTab(3);
    };

    var createFieldBasicFormat = function(label, isKey, filter, type) {
        var field = {};
        var hash = Math.floor(10000000000 + Math.random() * 90000000000);
        field['key'] = {
            'isKey': false,
            'type': type,
            'label': label
        };
        field['value'] = {
            'isKey': false,
            'type': type,
            'label': label
        };
        if(filter){
            field.key.filter = ["currency", "R$ "];
            field.value.filter = ["currency", "R$ "];
        }
        if(isKey){
            field.key.field = "cd_format_key_" + hash;
            field.value.field = "cd_format_key_" + hash;
        }else{
            field.key.field = "cd_format_value_" + hash;
            field.value.field = "cd_format_value_" + hash;
        }
        field['expression'] = '<%= ' + field.key.field + ' %>';
        field['name'] = label;
        field['selected'] = true;
        return field;
    };

    $scope.updateTotalizer = function(totalizer) {
        $scope.agrupador = totalizer;
        $scope.groups = totalizer.group;
        $scope.groupSelected = totalizer.group;
        console.log($scope.groupSelected);
        $scope.edit = true;
        $scope.setTab(2);
    };

    $scope.updateFormat = function(format) {
        $scope.format = format;
        $scope.formats = format.fields;
        $scope.editFormat = true;
        $scope.setTab(4);
    };

    $scope.setTab = function(tabId, limpaForm) {
        if(limpaForm){
          $scope.formats = [];
          $scope.editFormat = false;
          $scope.format = {};
          $scope.groups = [];
          $scope.edit = false;
          $scope.agrupador = {};
          $scope.groupSelected = {};
        }
        $scope.tab = tabId;
    };

    $scope.closeTableConfig = function(){
      $scope.formats = [];
      $scope.editFormat = false;
      $scope.format = {};
      $scope.groups = [];
      $scope.edit = false;
      $scope.agrupador = {};
      $scope.groupSelected = {};
      MessageService.success('Campos salvos com sucesso!');
    }

    $scope.isSet = function(tabId) {
        return $scope.tab === tabId;
    };

    $scope.removeTotalizer = function(totalizer) {
        $scope.component.data.formulas = _.without($scope.component.data.formulas, _.findWhere($scope.component.data.formulas, {
            alias: totalizer.alias
        }));
    };

    $scope.removeFormatter = function() {
        $scope.component.data.format = {};
    }

    var removeFieldFromGroup = function(field) {
        if ($scope.component.data.formulas.length) {
            for (var i = $scope.component.data.formulas.length - 1; i >= 0; i--) {
                var groups = $scope.component.data.formulas[i].groups;
                groups = _.without(groups, _.findWhere(groups, {
                    _id: field._id
                }));
                $scope.component.data.formulas[i].groups = groups;
            };
        }
    };

    var init = function() {
        carregaVisio();
    };

    init();

}]);
