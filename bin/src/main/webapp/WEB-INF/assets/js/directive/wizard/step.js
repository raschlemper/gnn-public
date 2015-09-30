app.directive("step", function() {
    return {
        templateUrl: 'static/js/directive/wizard/views/steptemplate.html',
        restrict: "E",
        replace: true,
        transclude: true,
        require: ['^wizard'],
        scope: {
            ordem: "=",
            title:"=",
            minHeight: "="
        },
        link: function(scope, element, attrs, ctrls) {
            scope.wizardCtrl = ctrls[0];
            scope.mostraAtual = function() {
                return scope.wizardCtrl.mostraAtual();
            };

            scope.isActive = function(){
            	if(scope.ordem === scope.mostraAtual()){
            		return true;
            	}
            };
            
            scope.getMinHeight = function(){
                if(scope.minHeight){
                    return "min-height:"+scope.minHeight+"px;";
                }
            }
        }
    }
});
