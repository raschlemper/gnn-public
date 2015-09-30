'use strict';

app.directive('blockClick', function() {

    return function(scope, element, attrs) {
		$(element).click(function(event) {
			event.stopPropagation();
		});
	}
})