'use strict';

app.controller('ReportCtrl', function ($scope, $filter, ReportService, JsonService, DataGrouperService) {
	
	// $scope.list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
	// $scope.dadosteste = {"status": "R", "aluno": "Nome do Aluno", "vencimento": "08/05/2015", "pagamento": "08/05/2015", "valor": "100,00"}
    
    var index = 1;
    $scope.data = [];
    $scope.headers = [];
    $scope.details = [];
    $scope.footers = [];
    $scope.rest = [];
    var fields = [];
    var dataFormat = null;

    $scope.report = {
        titulo: 'Relatário de Movimentação Financeira',
        cabecalho: {},
        detalhe: {},
        rodape: {}
    };

    var getData = function(index) {
        ReportService.movimento()
            .then( function(data) {   
                $scope.data = data;  
                $scope.report.data = getDataReport(data);
                $scope.getReport(index);
                getPageValue();
            })
            .catch( function(err) {
                $scope.data = [];
            });
    }

    $scope.getReport = function(index) {
        getFieldHeaderValue($scope.report.data[index].key);
        getFieldDetailValue($scope.report.data[index].vals);
        getFieldFooterValue($scope.report.data[index].vals);
        getFieldRestValue($scope.report.data[index].vals);
    }

    var getDataReport = function(data) {
        var groups = getFieldsGroup($scope.report.cabecalho.fields);        
        return DataGrouperService.report(data, groups); 
    }

    var getFieldsGroup = function(fields) {
        var groups = [];
        _.map(fields, function(field, index) {
            _.map(field.value, function(value, index) {
                groups.push(value.field);  
            }); 
        }); 
        return groups;
    } 

    var removeFieldsGroup = function(group, remove) {
        _.map(remove, function(item){ 
            group = _.without(group, item); 
        });
        return group;
    } 

    var getFieldValue = function(data, fields) {
        dataFormat = angular.copy(data);    
        return _.map(fields, function(field, key) {
            applyFilter(dataFormat, field);
            return { name: field.name, value: getExpressionValue(dataFormat, field.expression) };
        });        
    }  

    var getListFieldValue = function(item, fields) {
        var data = [];
        _.map(item.vals, function(value, index) {
            data.push(getFieldValue(value, fields));
        });
        return data;     
    }  

    var applyFilter = function(data, field) {
        return _.map(field.value, function(item, key) {
            if(!item.filter) return;
            if(item.filter.length == 2) {
                data[item.field] = $filter(item.filter[0])(data[item.field], item.filter[1]); 
            } else if(item.filter.length == 3) {
                data[item.field] = $filter(item.filter[0])(data[item.field], item.filter[1], item.filter[2]); 
            }                
        }); 
    }  

    var getExpressionValue = function(data, expression) {        
        var template = _.template(expression);
        var result = template(data);
        return result;
    }

    var getPageValue = function() {
        $scope.pages = _.map($scope.report.data, function(item) {
            return item.key;
        });
    }   

    var getFields = function() {
        var fields = [];

        fields['instituicao'] = { 
            'name': 'Instituição', 
            'key': ['cd_instituicao_ensino'], 
            'value': [ { 'field': 'nm_instituicao_ensino' } ], 
            'expression': '<%= nm_instituicao_ensino %>' 
        };

        fields['curso'] = { 
            'name': 'Curso', 
            'key': ['cd_tipo_curso'], 
            'value': [ { 'field': 'ds_tipo_curso' } ], 
            'expression': '<%= ds_tipo_curso %>'  
        };

        fields['serie'] = { 
            'name': 'Série', 
            'key': ['cd_curso_instituicao'], 
            'value': [ { 'field': 'cd_curso_instituicao' }, { 'field': 'nm_curso' } ], 
            'expression': '<%= cd_curso_instituicao %> - <%= nm_curso %>'  
        };

        fields['ano'] = { 
            'name': 'Ano/Semestre', 
            'key': ['nr_ano', 'nr_semestre'], 
            'value': [ { 'field': 'nr_ano' }, { 'field': 'nr_semestre' } ], 
            'expression': '<%= nr_ano %> / <%= nr_semestre %>' 
        };

        fields['aluno'] = { 
            'name': 'Aluno', 
            'key': ['cd_aluno'], 
            'value': [ { 'field': 'nm_aluno' } ], 
            'expression': '<%= nm_aluno %>' 
        };

        fields['vencimento'] = { 
            'name': 'Vencimento', 
            'key': ['dt_vencimento'], 
            'value': [ { 'field': 'dt_vencimento', 'filter': ['date', 'dd/MM/yyyy'] } ], 
            'expression': '<%= dt_vencimento %>' 
        };

        fields['pagamento'] = { 
            'name': 'Pagamento', 
            'key': ['dt_pagamento'], 
            'value': [ { 'field': 'dt_pagamento', 'filter': ['date', 'dd/MM/yyyy'] } ], 
            'expression': '<%= dt_pagamento %>' 
        };

        fields['valor'] = { 
            'name': 'Valor', 
            'key': ['previsao_confirmado'], 
            'value': [ { 'field': 'previsao_confirmado', 'filter': ['currency', 'R$ '] } ], 
            'expression': '<%= previsao_confirmado %>'
        };

        fields['saldo'] = angular.copy(fields['valor']);
        fields['saldo'].name = 'Saldo'

        return fields;
    }

    var field = function(field) {
        if(fields.length === 0) { fields = getFields(); }
        return fields[field];
    }

    // HEADER

    $scope.report.cabecalho = {
        'fields': [ field('instituicao'), field('curso'), field('serie') ]
    }

    var getFieldHeaderValue = function(data) { 
        $scope.headers = getFieldValue(data, $scope.report.cabecalho.fields); 
    }  

    // DETAILS

    $scope.report.detalhe = {
        'fields': [ field('ano'), field('aluno'), field('vencimento'), field('pagamento'), field('valor') ]
    }

    var getFieldDetailValue = function(data) {         
        $scope.details = _.map(data, function(item, key) {
            return getFieldValue(item, $scope.report.detalhe.fields);  
        });  
        $scope.details.header = $scope.details[0];
    }

    // FOOTER

    $scope.report.rodape = {
        'fields': [ field('ano'), field('aluno') ],
        'groups': [ field('valor') ]
    }

    var getFieldFooterValue = function(data) {   
        var footers = DataGrouperService.sum(data, getFieldsGroup($scope.report.rodape.fields), 
            getFieldsGroup($scope.report.rodape.groups)); 
        $scope.footers = unionGroupFooter(footers);
        $scope.footers.header = $scope.footers[0];
    }    

    var unionGroupFooter = function(dataGrouper) {
        return _.map(dataGrouper, function(item) {
            var fields = getFieldValue(item.key, $scope.report.rodape.fields);
            var sums = getFieldValue(item.key, $scope.report.rodape.groups);
            return _.union(fields, sums);
        });
    }

    // REST

    $scope.report.saldo = {
        'fields': [ field('ano'), field('aluno') ],
        'groups': [ field('saldo') ]
    }

    var getFieldRestValue = function(data) {   
        var rests = DataGrouperService.rest(data, getFieldsGroup($scope.report.saldo.fields), 
            getFieldsGroup($scope.report.saldo.groups)); 
        $scope.rests = getListFieldValue(rests[index], $scope.report.saldo.groups)
        $scope.rests.header = $scope.rests[0];
    }      

    var unionGroupRest = function(dataGrouper) {
        return _.map(dataGrouper, function(item) {
            return getListFieldValue(item, $scope.report.saldo.groups);
        });
    } 

    getData(index); 

  });
