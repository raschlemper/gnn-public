app.controller('pageFilterModalController', ['$scope', '$modalInstance', 'DataGrouperService', 'fieldsFilters', 'registers', 'filters', 
                                             function ($scope, $modalInstance, DataGrouperService, fieldsFilters, registers, filters) {

	var init = function () {
        $scope.filters = [];
        initFilter();
	};

	var initFilter = function() {
		_.map(fieldsFilters, function(fieldFilter) {
			var filter = getFilter(fieldFilter);
			if(filter) { $scope.filters.push(filter); } 
			else { $scope.filters.push(createFilter(fieldFilter)); }
		});
	}
	
	var getFilter = function(fieldFilter) {
		var obj;
		_.map(filters, function(filter) {
			if(_.isEqual(filter.key, fieldFilter.to)) {
				obj = filter;
			}
		})
		return obj;
	}

	var createFilter = function(fieldFilter) {
		var groupers = DataGrouperService.keys(registers, fieldFilter.to);
		var type = getFilterType(fieldFilter, groupers);
		var values = getFilterValue(fieldFilter, groupers);
		return { 'key': fieldFilter.to, 'values': values, 'label': fieldFilter.label, 'type': type }
	}
	
	var getFilterType = function(fieldFilter, groupers) {
		var type = 'input';
		if(!_.isEmpty(groupers)) { type = 'dropdown'; }
		return type;
	}
    
    var getFilterValue = function(fieldFilter, groupers) {
		if(_.isEmpty(groupers)) return null;
    	return _.map(groupers, function(grouper) {
    		return { 'value': grouper[fieldFilter.to], 'label': grouper[fieldFilter.to], 'checked': true };
    	})
    }

	$scope.filter = function(filters){
		$modalInstance.close(filters);
	};

	init();

}]);
