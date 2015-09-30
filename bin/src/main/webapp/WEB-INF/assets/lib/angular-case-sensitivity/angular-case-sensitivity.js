angular.module('case-sensitivity', [])

  .directive('caseSensitivity', ["$timeout", function ($timeout) {

    var convertToCase = function (text, convert) {
      if (!text) return;
      switch (convert) {
        case 'UPPER':
          return text.toUpperCase();
        case 'LOWER':
          return text.toLowerCase();
        case 'PROPER':
          return toProperCase(text);
      }
    };

    var toProperCase = function (text) {
      return text.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    };

    return {
    	  require: "ngModel",
	      link: function (scope, element, attrs, ctrl) {
	    	  if (!scope.$eval(attrs.caseSensitivity)) return;
	    	  
	    	  var lastText = "";  
	    	
			var execute = function () {
	        	scope.$apply(function () {
	            	ctrl.$setViewValue(convertToCase(ctrl.$modelValue, scope.$eval(attrs.caseSensitivity)));
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
  }]);