'use strict';

app.directive('block', [function() {
    return {
        restrict: 'AE',
        transclude: true,
        replace: true,
        templateUrl: 'js/directive/ui-blocks/block.template',
        scope: {
            columns: "=",
            offsetRow: "=",
            lines: "=",
            group: "=",
            offsetLine: "=",
            lineHeight: "=",
            component: "=",
            previewBlock: "=",
            verticalAlign: "="
        },
        link: function(scope, element, attrs, ctrls) {

            scope.getColumn = function() {
                return 'col-md-' + scope.columns;
            }

            scope.getRowOffset = function() {
                if (scope.offsetRow) {
                    return "col-md-offset-" + scope.offsetRow;
                }
            }

            scope.getLineOffset = function() {
                if (scope.offsetLine) {
                    return "margin-top:" + (scope.offsetLine * scope.lineHeight) + "px;";
                }
            }

            scope.getHeight = function() {
                if (scope.lines) {
                    return "height:" + (scope.lines * scope.lineHeight) + "px;";
                } else {
                    return "height: 100%;";
                }
            }

            scope.isGroup = function() {
                if (scope.group) {
                    return "display: inline-group;";
                }
            }

            scope.isVerticalAlign = function(){
                if(scope.verticalAlign){
                    return "vertical-align";
                }
            }

            scope.previewPadding = function(){
                if(scope.previewBlock){
                    return "padding: 0px;"
                }
            }

        }
    }
}]);
