app.factory("PageService", ['DataGrouperService', function(DataGrouperService) { 

    var _page = {
        values: [],
        pages: [],
        page: {}
    }; 

    var dividePageByNumberLines = function() {
        _page.pages = angular.copy(_page.values);
    }

    var applyFilter = function(filterKey, filterValues, registers) {
        if(!filterKey) { return registers; }
        return _.filter(registers, function(register) {
        	var objRegister = _.pick(register, filterKey);
        	var valuesRegister = _.values(objRegister);
        	if(!valuesRegister) return false;
        	return _.contains(filterValues, valuesRegister[0]);
        });
    };

    var page = function(page) {
        _page.page = page;
        return _page;
    };

    var pages = function(filters, registers) {
    	_.map(filters, function(filter, key){ 
    		registers = applyFilter(key, filter, registers);
    	});
        _page.values = registers;
        dividePageByNumberLines();
        return _page;
    };

    return {
        pages: pages,
        page: page
    }

}]);