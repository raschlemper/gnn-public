app.factory("ReportFunctionService", function(DataGrouperService) {

    var sum = function(register, field, registers) {
        var values = getValues(register, field);
        return _.reduce(values[field], function(memo, value) {
            return Number(memo) + Number(value);
        }, []);
    }

    var rest = function(register, field, registers) {
        var values = getValues(register, field);
        var rest = calculateRest(field, registers);
        var index = _.indexOf(registers, register);
        return rest[index];
    }

    var calculateRest = function(field, registers) {
        var rest = [];
        _.reduce(registers, function(memo, register) {
            var values = getValues(register, field);
            var result = Number(memo) + Number(values[field]);
            rest.push(result);
            return result;
        }, [])
        return rest;
    }
	
    var getValues = function(register, field) {
    	var values = {};
    	values[field] = _.pluck(register, field);
    	return values;
    }

    var calculateFormula = function(fields, register, registers, formulaCallback) {
    	var result = {};
    	_.map(fields, function(field) {
			result[field] = formulaCallback(register, field, registers);
    	});
    	return result;
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

    var calculate = function(formula, fields, register, registers) {
    	var formulaFunction = formulaFactory(formula);
        var result = calculateFormula(fields, register, registers, formulaFunction);
    	return result;
    }

    return {
        calculate: calculate
    }
});