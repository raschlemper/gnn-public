app.factory("FormulaService", ['DataGrouperService', function(DataGrouperService) {

    var addfieldsFormula = function(data) {
        var fields = data.fields;
        if(!data.formulas) return fields;
        _.map(data.formulas, function(formula) {
        	formula.field.selected = true;
            fields.push(formula.field);
        })
        return fields;
    }

    var sum = function(register, field, registers) {
        var values = getValues(register, field);
        return _.reduce(values[field], function(memo, value) {
            return Number(memo) + Number(value);
        }, []);
    }

    var rest = function(register, field, registers) {
        var rest = calculateRest(field, registers);
        var index = _.indexOf(registers, register);
        return rest[index];
    }

    var calculateRest = function(field, registers) {
        var rest = [];
        _.reduce(registers, function(memo, register) {
            var value = _.pick(register, field);
            var result = Number(memo) + Number(_.property(field)(value));
            rest.push(result);
            return result;
        }, [])
        return rest;
    }
	
    var getValues = function(register, field) {
    	var values = {};
    	values[field] = _.pick(register, field);
    	return values;
    }  

    var getValuesFieldFormula = function(field) {
        var values = {};
        values[field] = _.pluck(field.value, 'field');
        return values;
    }

    var calculateFormula = function(fieldFormula, fieldsValues, register, registers, formulaCallback) {
        var fieldName = fieldFormula.key.field;
    	_.map(fieldsValues, function(field) {
            var obj = {};
			obj[fieldName] = formulaCallback(register, field, registers);           
            register = _.extend(obj, register);
    	});
    	return register;
    }

    var formulaFactory = function(formula) {
    	switch(formula) {
            case "sum":
                return sum;
                break;
            case "rest":
                return rest;
                break;
            default:
                return '';
        }
    }

    var calculate = function(data) {
        data.fields = addfieldsFormula(data);
        _.map(data.formulas, function(formula) {
            var registers = data.registers;
            //aqui está o problema do agrupador
            data.registers = _.map(registers, function(register) {
            	var formulaFunction = formulaFactory(formula.type);
                var values = getValuesFieldFormula(formula.group);
                return calculateFormula(formula.field, values, register, registers, formulaFunction);
            });
        });
        return data;
    }

    return {
        calculate: calculate
    }
}]);