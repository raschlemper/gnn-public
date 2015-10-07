'use strict';

/**
 * @ngdoc function
 * @name exemplosApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the exemplosApp
 */
app.controller('PreviewCtrl', ['$scope', 'TemplateService', '$location', '$routeParams', function($scope, TemplateService, $location, $routeParams) {

    var init = function() {
        $scope.vision = {};
        $scope.vision = TemplateService.service.getOptionPreview();
    }

    $scope.backConfiguration = function() {
        $location.url('/vision').search('modulo', $routeParams.modulo);
    }

    init();

}]);
