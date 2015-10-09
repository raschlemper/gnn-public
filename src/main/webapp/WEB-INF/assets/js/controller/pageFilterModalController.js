app.controller('pageFilterModalController', ['$scope', '$modalInstance', 'DataGrouperService', 'fieldsFilters', 'registers', 'filters', 
                                             function ($scope, $modalInstance, DataGrouperService, fieldsFilters, registers, filters) {

	var init = function () {
        $scope.filters = [];
        $scope.opened = [];
        $scope.date = {};
        initFilter();
	};
	
	var initFilterValues = function(filter) {
		if(filter.type == 'date') {
			$scope.opened[filter.key] = false;
		}
	}
    
    var resetForm = function(form) {
        form.$setPristine();
        $scope.submitted = false;
    } 
 
	var initFilter = function() {
		_.map(fieldsFilters, function(fieldFilter) {
			var filter = getFilter(fieldFilter);
			if(!filter) { filter = createFilter(fieldFilter); }
			$scope.filters.push(filter); 
			initFilterValues(filter);
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
		return { 'key': fieldFilter.to, 'values': values, 'label': fieldFilter.label, 'type': type, 'required': fieldFilter.required }
	}
	
	var getFilterType = function(fieldFilter, groupers) {
		var type = 'text';
		if(!_.isEmpty(groupers)) { type = 'dropdown'; }
		else { type = fieldFilter.format }
		return type;
	}
    
    var getFilterValue = function(fieldFilter, groupers) {
		if(_.isEmpty(groupers)) return null;
    	return _.map(groupers, function(grouper) {
    		return { 'value': grouper[fieldFilter.to], 'label': grouper[fieldFilter.to], 'checked': true };
    	})
    }
    
    $scope.open = function(key, $event) {
        $event.preventDefault();
        $event.stopPropagation();
    	if($scope.opened[key]){
    		$scope.opened[key] = false;
    	} else {
    		$scope.opened[key] = true;
    	}
    }
    
	$scope.filter = function(form){
        $scope.submitted = true;
        if (form.$valid) {   
        	resetForm(form);
        	$modalInstance.close($scope.filters);
        }
	};

	init();

}]);
