'use strict'

app.directive('ngRepeatEnd', ['$timeout', function ($timeout) {
    return function(scope, element, attrs) {
        if (scope.$last) {
            console.log('done');
        }
    };
}]);