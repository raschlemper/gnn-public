 app.controller('FooterCtrl', ['$scope', 'VERSION', function($scope, VERSION) {

             $scope.version = VERSION;
             $scope.footer = "Portal Financeiro-"+$scope.version+"  by Gennera";

         }]);
