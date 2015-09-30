'use strict';

app.directive('breadcrumbs', [ function() {

    return {
        restrict: 'E',
        templateUrl: 'js/directive/breadcrumbs/breadcrumbs.html',
        scope: {
            data: "="
        },
        link: function(scope, element, attrs, ctrls) {
            scope.lists = [];

            scope.$watch('data', function(newValue, oldValue) {
                if(newValue == oldValue) return;
                createListValuesDefault();
                createList();
            });

            var createList = function() {
                scope.lists = [];
                var values = [];
                _.map(scope.values, function(value, index) {
                    if(index == 0) {
                        values = getList(scope.data, value, index);
                    } else {
                        values = getList(values, value, index);
                    }
                });
            }

            var getList = function(values, value, index) {
                var itens = _.pluck(values, 'item');
                var selected = itens[value];
                scope.lists.push({ 'id': index, 'itens': itens, 'selected': selected });
                return values[value].values;
            }

            scope.setValue = function(value, index) {
                scope.values[index] = value;
                createList();
            }

            var createListValuesDefault = function() {
                if(scope.values) return;
                scope.values = [];
                setValueDefault(scope.data[0]);
            }
            var setValueDefault = function(data) {
                var values = data.values;
                if(values) {
                    scope.values.push(0);
                    setValueDefault(values[0]);
                }
            }

        }
    }
}]);
