'use strict';

app.directive('widget', [function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'js/directive/widget/widget.template',
        scope: {
            data: "=",
            type: "="
        },
        link: ['scope', 'element', 'attrs', 'ctrls', function(scope, element, attrs, ctrls) {

            var isTable = function() {
                if (scope.type === 'table') {
                    scope.table = true;
                }
            };

            var isText = function() {
                if (scope.type === 'text') {
                    scope.text = true;
                    if(Object.keys(scope.data[0]).length === 0 ){
                        scope.data[0] = "";
                    }
                }
            }

            var isImage = function() {
                if (scope.type === 'image') {
                    scope.image = true;
                }
            }

            var isTitle = function() {
                if (scope.type === 'title') {
                    scope.title = true;
                }
            }

            var isList = function() {
                if (scope.type === 'list') {
                    scope.list = true;
                }
            }

            isTable();
            isText();
            isImage();
            isTitle();
            isList();
        }]
    }
}]);
