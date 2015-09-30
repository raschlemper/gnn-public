app.directive("wizard", function() {
    return {
        templateUrl: 'static/js/directive/wizard/views/wizardtemplate.html',
        restrict: "E",
        transclude: true,
        controllerAs: 'wizard',
        scope: {
            configuracao: "=",
            steps: "=",
            valid: "="
        },
        controller: ['$scope', function($scope) {
            $scope.atual = 1;
            $scope.finished = [];

            $scope.proximo = function() {
                if ($scope.atual < $scope.steps) {
                    $scope.finished.push($scope.atual);
                    $scope.atual = $scope.atual + 1;
                }
            };

            $scope.isCompleted = function(order) {
                if (order < $scope.atual) {
                    return true;
                } else {
                    return false;
                }
            }

            $scope.anterior = function() {
                if ($scope.atual <= $scope.steps) {
                    var index = $scope.finished.indexOf($scope.atual);
                    $scope.finished.splice(index);
                    $scope.atual = $scope.atual - 1;
                }
            };

            $scope.updateAtual = function(order) {
                if ($scope.isCompleted(order)) {
                    var completeds = [];
                    for (var i = 1; i < order; i++) {
                        completeds.push(i);
                        $scope.finished = completeds;
                    };
                    $scope.finished = completeds;
                    if (!$scope.isAtual(order)) {
                        $scope.atual = order;
                    }
                }
            };

            $scope.isAtual = function(order) {
                if (order === $scope.atual) {
                    return true;
                } else {
                    return false;
                }
            };

            this.isAtualGlobal = function(order) {
                if (order == $scope.atual) {
                    return true;
                }
            };

            this.mostraAtual = function() {
                return $scope.atual;
            };

        }]
    }
});
