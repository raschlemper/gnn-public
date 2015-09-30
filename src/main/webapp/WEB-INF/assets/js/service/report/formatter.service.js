app.factory("FormatterService", ['DataGrouperService', function(DataGrouperService) {

    var getValueKey = function(registers, keys) {
        var obj = {};
        _.map(keys, function(key) {
            var field = _.pick(registers, key.field);  
            _.extend(obj, field);       
        });
        return obj;
    }

    var getExpressionValue = function(registers, expression) {
        var template = _.template(expression);
        var result = template(registers);
        return result;
    }

    var applyFilter = function(registers, field) {
        return _.map(field.value, function(item, key) {
            if (!item.filter) return;
            if (item.filter.length == 2) {
                registers[item.field] = $filter(item.filter[0])(registers[item.field], item.filter[1]);
            } else if (item.filter.length == 3) {
                registers[item.field] = $filter(item.filter[0])(registers[item.field], item.filter[1], item.filter[2]);
            }
        });
    }

    var getFieldValue = function(registers, field) {
        applyFilter(registers, field);
        return {
            name: field.name,
            key: getValueKey(registers, field.key),
            value: getExpressionValue(registers, field.expression),
            order: field.order
        };
    }

    var getFieldsValue = function(registers, fields) {
        registersFormat = angular.copy(registers);
        return _.map(fields, function(field, key) {
            return getFieldValue(registersFormat, field)
        });
    }

    var formatField = function(registers, field) {
        return getFieldValue(registers, field);
    }

    var formatFields = function(registers, fields) {
        return getFieldsValue(registers, fields);
    }

    return {
        formatField: formatField,
        formatFields: formatFields
    }
}]);