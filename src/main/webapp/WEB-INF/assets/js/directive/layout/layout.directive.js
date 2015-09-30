'use strict';

app.directive('layout', [function () {
    return {
        restrict: 'E',
        transclude: true,
        replace:true,
        templateUrl: 'js/directive/layout/html/layout.template',
        scope: {
        	configuration: "=",
            preview: "=",
            minHeight: "=",
            blocks: "="
        },
        link: function(scope){
            scope.getHeight = function(){
                if(scope.minHeight){
                    return "min-height:"+scope.minHeight+"px;";
                }
            }
            scope.previewStyle = function(){
                if(scope.preview){
                    return "layout layout-border";
                }
            }
        }
    }
}]);
