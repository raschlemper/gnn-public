app.factory("ComponentService", ['DataGrouperService', 'PageService', 'FormatService', 
    'ConvertService', 'FormulaService', function(DataGrouperService, PageService, FormatService, 
    ConvertService, FormulaService) {     

    // TODO: Criar um service para colocar os métodos de recuperação e tratamento de campos 
    
    var getFields = function(values) {
        var fields = [];
        _.map(values, function(value) {
            fields = _.union(fields, _.pluck(value, 'field'));
        });
        return fields;
    } 

    /* ******************************************************************************** */

    var formatWithoutFields = function(values) {   
        var rows = [];     
        rows.push(values);
        return rows;
    }

    var createComponentWithoutField = function(component) {
        if(component.data.fields || component.data.groups) return;
        component.data = formatWithoutFields(component.data);
        return component;
    }

    var convertExpression = function(register, fields) {
        return _.map(fields, function(field) {
            return ConvertService.formatField(register, field);
        });
    }

    var applyExpression = function(component) {      
        var data = [];
        var fields = _.where(component.data.fields, { "selected": true });
        _.map(component.data.registers, function(register) {
            data.push(convertExpression(register, fields));
        });
        component.data = data;
        return component;
    }

    var applyFormula = function(component) {
        if(!component.data.fields) return component;
        component.data = FormulaService.calculate(component.data);
        return component;
    }

    var applyFormat = function(groups, component) {
        if(!component.data.fields) return component;
        component.data = FormatService.apply(groups, component.data); 
        return component;
    }

    var createGroups = function(registers, component) {
        if(!component.data.fields) return registers;
        var keys = getFields(_.pluck(component.data.fields, 'key'));
        var values = getFields(_.pluck(component.data.fields, 'value'));
        return DataGrouperService.group(registers, _.union(keys, values));
    }

    var createComponentField = function(registers, component) {
        var groups = createGroups(registers, component);        
        // Deve formatar cada registro dos fields acima, conforme sua orientação. Ex. inline ou inblock
        component = applyFormat(groups, component); 
        // Deve acrescentar a cada registro dos fields acima, o field da formula
        component = applyFormula(component); 
        // Deve converter as expression de cada field
        component = applyExpression(component);
        return component;
    }

    var componentFactory = function(registers, component) {
        if(!component.data) return;
        if(!component.data.fields) { 
            return createComponentWithoutField(component); 
        }
        return createComponentField(registers, component);
    }

    var create = function(page, component) {
        return componentFactory(page, component);
    }

    return {
        create: create
    }

}]);