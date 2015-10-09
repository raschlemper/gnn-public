app.directive('filterValidate',function($compile){

    return {
        restrict: 'A',
        link: function(scope, element, attrs, ctrls) {
        	
        	var init = function() {
        		var filter = scope.$parent.filter;    
        		setFilterValidate(filter);
        		setFilterError(filter);
        	}
        	
        	var setFilterValidate = function(filter) {
        		if(element.attr('class').indexOf('filter-validate') < 0) return;
        		if(existFilterValidateRequired(filter)) return;
        		setFilterValidateRequired(filter);
				$compile(element)(scope);
        	}
        	
        	var setFilterError = function(filter) {
        		if(element.attr('class').indexOf('filter-error') < 0) return;
        		if(existFilterErrorRequired(filter)) return;
        		setFilterErrorRequired(filter);
				$compile(element)(scope);
        	}
        	
        	var existFilterValidateRequired = function(filter) {
            	if(filter.required != 1) return true;
            	if(element.attr('required')) return true;
            	return false;
        	}
        	
        	var existFilterErrorRequired = function(filter) {
            	if(filter.required != 1) return true;
            	if(element.attr('class').indexOf('filter-required') > -1) return true;
            	return false;
        	}
        	
        	var setFilterValidateRequired = function(filter) {
        		attrs.$set("required", true);
        	}
        	
        	var setFilterErrorRequired = function(filter) {
        		setError(getErrorRequired(filter));
        		element.addClass('filter-required');
        	}
        	
        	var setError = function(error) {
        		element.append(error);
        	}
        	
        	var getErrorRequired = function(filter) {
        		return '<p class="text-danger" ng-if="form.' + filter.key + '.$error.required && form.$submitted">O campo ' + filter.label + ' deve ser preenchido.</p>';
        	}
        	
        	init();
        }
    }
    
});