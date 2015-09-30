app.factory("FormatService", ['DataGrouperService', function(DataGrouperService) {

    var addfieldsFormat = function(data) {
        var fields = data.fields;
        if(data.format.fieldName) {
            fields.push(data.format.fieldName);
        }
        if(data.format.fieldValue) {
            fields.push(data.format.fieldValue);
        }
        return fields;
    }

    var getFieldValue = function(field) {
        var fields = [];
        var values = field.value;
        _.map(values, function(value) {
            fields.push(value.field);
        });
        return fields;
    }

    var list = function(keys, value, format) {
        var result = [];
        result.push(keys);
        return result;
    }

    var column = function(keys, value, format) {
        var result = [];
        var fieldNameFormat = format.fieldName.key.field;
        var fieldValueFormat = format.fieldValue.key.field;
        _.map(format.fields, function(field) {
            var fieldsValue = getFieldValue(field);
            var object = _.map(fieldsValue, function(fieldValue) {
                var valueField = _.pick(value, fieldValue);
                var obj = angular.copy(keys); 
                obj[fieldNameFormat] = field.name; 
                obj[fieldValueFormat] = _.property(fieldValue)(valueField);
                return obj;
            });
            result = _.union(result, object);
        });
        return result;
    }

    // TODO: criar o método quando houver necessidade, hj ele ta fazendo qq coisa q não tenho certeza
    var line = function(keys, value, format) {
        var register = [];
        var obj = angular.copy(keys); 
        _.map(format.fields, function(field) {
            var fieldsValue = getFieldValue(field);
            _.map(fieldsValue, function(fieldValue) {
                var valueField = _.pick(value, fieldValue);
                _.extend(obj, valueField);
            });
        });
        register.push(obj);
        return register;
    }

    var applyFormat = function(groups, format, formatCallback) {
        if(!format) return;  
        var registers = [];    
        _.map(groups, function(group) {
            var keys = group.key;
            _.map(group.vals, function(value) {
                var list = formatCallback(keys, value, format); 
                registers = _.union(registers, list);
            });  
        });
        return registers;
    }

    var formatFactory = function(format) {        
        switch(format) {
            case "column":
                return column;
                break;
            case "line":
                return line;
                break;
            default:
                return list;
        }
    }

    var apply = function(groups, data) {
        var formatFunction = formatFactory(data.format.type);
        data.fields = addfieldsFormat(data);
        data.registers = applyFormat(groups, data.format, formatFunction);
        return data;
    }

    return {
        apply: apply
    }
}]);