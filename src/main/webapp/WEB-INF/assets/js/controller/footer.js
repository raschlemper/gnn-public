 app.controller('FooterCtrl', ['$scope', 'VERSION', function($scope, VERSION) {

             $scope.version = VERSION;
             $scope.footer = "Vision-"+$scope.version+"  by Gennera";

             //O Vision é um produto da Gennera © Todos os direitos reservados

         }]);
