app.directive('money', ['$timeout', 'moneyService', function($timeout, moneyService) {
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, ctrl) {
    	 var execute = function () {
             scope.$apply(function () {
            	 ctrl.$setViewValue(moneyService.fromStringToMoney(ctrl.$modelValue));
            	 ctrl.$render();
             });
    	 };
    	 
    	 $(element).bind('keyup', function(e) {
    		 execute();
    	 });
    	 
    	 $timeout(function () {
    		 execute();
    	 }, 500);
	  }
   };
}]);