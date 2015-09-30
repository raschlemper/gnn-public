app.directive('fileChange', function () {
    var linker = function ($scope, element, attributes) {
        element.bind('change', function (event) {
            var files = event.target.files;
            $scope.$apply(function () {
                for (var i = 0, length = files.length; i < length; i++) {
                    $scope.files.push(files[i]);
                }
            });
        });
    };

    return {
        restrict: 'A',
        link: linker
    };

});

app.directive('fileUploader', function () {
    var linker = function ($scope, element, attr) {
        element.bind('change', function (event) {
            $scope.$apply(function () {
            	var file = event.target.files[0];
            	$scope.trigger({file: file});
            	element.val(null);
            });
        });
    };

    return {
        restrict: 'A',
        scope: {
        	trigger: "&"
        },
        link: linker
    };

});