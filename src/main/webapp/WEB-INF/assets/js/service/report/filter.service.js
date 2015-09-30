app.factory("FilterService", [ function() { 

    var applyFilter = function(filterKey, filterValues, registers) {
        if(!filterKey) { return registers; }
        return _.filter(registers, function(register) {
        	var objRegister = _.pick(register, filterKey);
        	var valuesRegister = _.values(objRegister);
        	if(!valuesRegister) return false;
        	return _.contains(filterValues, valuesRegister[0]);
        });
    };

    var filter = function(filters, registers) {
    	_.map(filters, function(filter, key){ 
    		registers = applyFilter(key, filter, registers);
    	});
        return registers;
    };

    return {
    	filter: filter
    }

}]);