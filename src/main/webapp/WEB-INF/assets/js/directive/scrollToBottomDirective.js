app.directive('scrollToBottom', function(){
    return {
        link: function(scope, element, attrs, ctrl) {
        	function scrollToBottom(){
        		console.log("Scrolling to " + element[0].scrollHeight);
        		element[0].scrollTop = element[0].scrollHeight;
        	}
        	scope.$watch(attrs.ngModel, function (newValue, oldValue) {
        		scrollToBottom();
        	}, true);
        }
    };
});