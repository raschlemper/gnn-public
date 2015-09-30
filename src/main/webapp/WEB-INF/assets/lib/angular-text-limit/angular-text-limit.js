angular.module("text-limit", []);
angular.module("text-limit").directive("textLimit", function ($timeout, textLimitService) {
	return {
		require: "ngModel",
		link: function (scope, element, attrs, ctrl) {
			if (!scope.$eval(attrs.textLimit)) return;
			
			var lastText = "";
			
			var execute = function () {
	        	scope.$apply(function () {
	            	ctrl.$setViewValue(textLimitService.limitText(ctrl.$modelValue, parseInt(scope.$eval(attrs.textLimit))));
	                ctrl.$render();
	                lastText = ctrl.$modelValue;
	            });
	        };
	        
	        element.bind('keyup', function () {
	        	if (lastText !== ctrl.$modelValue) execute();
	        });
	         
	        $timeout(function () { 
	            execute();
	        }, 100);
		}
	};
});
angular.module("text-limit").factory("textLimitService", function () {
	var _limitText = function (text, size) {
		if (text) return text.substring(0,size);
	};

	return {
		limitText: _limitText
	};
});