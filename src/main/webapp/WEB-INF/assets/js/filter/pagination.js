app.filter('startPage', function() {
	return function(input, start) {
		if (angular.isArray(input)) {
			var st = parseInt(start, 10);
			if (isNaN(st))
				st = 0;
			return input.slice(st);
		}
		return input;
	};
});
