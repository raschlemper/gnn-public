app.factory("ReportComponentService", function(DataGrouperService, ReportFunctionService) {

    var createRow = function(register, result) {
        if (!result) {
            return register.key;
        }
        return _.extend(register.key, result);
    }

    var getValues = function(field) {
        var values = {};
        values[field] = _.pluck(field.value, 'field');
        return values;
    }

    var getGroupValues = function(registers) {
        return _.pluck(registers, 'vals');
    }

    var applyFormula = function(field, register, registers) {
        var formula = field.formula;
        return ReportFunctionService.calculate(formula, getValues(field), register.vals,
            getGroupValues(registers));
    }

    var getFieldsToGrouper = function(data) {
        var fields = getFields(_.pluck(data.fields, 'value'));
        var groups = getFields(_.pluck(data.groups, 'value'));
        var resultFields = angular.copy(fields);
        _.map(groups, function(group) {            
            resultFields = _.without(resultFields, group);
        })
        return fields;
    }

    var groupRegister = function(registers, data) {
        var fields = getFieldsToGrouper(data);
        return DataGrouperService.group(registers, fields);
    }

    var getFields = function(values) {
        var fields = [];
        _.map(values, function(value) {
            fields = _.union(fields, _.pluck(value, 'field'));
        });
        return fields;
    }

    var getData = function(fields, groups) {
        return {
            fields: fields,
            groups: groups
        }
    }

    var createComponentWithoutField = function(registers, component) {
        if (component.data.fields || component.data.groups) {
            return;
        }
        return component.data;
    }

    var createRowField = function(data, registers) {
        var rows = [];
        _.map(registers, function(register) {
            rows.push(createRow(register, null));
        });
        return rows;
    }

    var createComponentField = function(registers, component) {
        var groupers = groupRegister(registers, component.data);
        return createRowField(component.data, groupers);
    }

    var createRowGroup = function(data, registers) {
        var rows = [];
        _.map(data.groups, function(field) {
            _.map(registers, function(register) {
                var result = applyFormula(field, register, registers);
                rows.push(createRow(register, result));
            });
        });
        return rows;
    }

    var createComponentGroup = function(registers, component) {
        var groupers = groupRegister(registers, component.data);
        return createRowGroup(component.data, groupers);
    }
    
    return {
        createComponentWithoutField: createComponentWithoutField,
        createComponentField: createComponentField,
        createComponentGroup: createComponentGroup

    }
});
