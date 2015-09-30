angular.module("date-mask", []);
angular.module("date-mask").directive('dateMask', ['$timeout', 'dateMaskService', function($timeout, dateMaskService) {
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, ctrl) {
         var execute = function () {
             scope.$apply(function () {
                 ctrl.$setViewValue(dateMaskService.fromStringToDate(ctrl.$modelValue));
                 ctrl.$render();
             });
         };
         element.bind('keyup', function () {
             execute();
         });
         
         $timeout(function () { 
             execute();
         }, 500);
      }
   };
}]);
angular.module("date-mask").factory("dateMaskService", [function () {
    var _otherCharacters = /[^0-9]/g;

    var _formatDate = function (string) {
        if (string.length < 3) return string;
        if (string.length < 5) return string.substring(0,2) + "/" + string.substring(2,4);
        return string.substring(0,2) + "/" + string.substring(2,4) + "/" + string.substring(4);
    }
    
    var _removeCharacters = function (string) {
        return string.replace(_otherCharacters, '');
    };

    var _limitTo8Characters = function (string) {
        return string.substring(0,8);
    }

    var _fromStringToDate = function (string) {
        if (!string) return string;
        return _formatDate(_limitTo8Characters(_removeCharacters(string)));
    };
    
    return {
        fromStringToDate: _fromStringToDate
    };
}]);