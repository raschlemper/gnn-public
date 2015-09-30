app.controller('camposCreateModal', ['$scope', 'fonte', 'campo', '$modalInstance', function ($scope, fonte, campo, $modalInstance) {

  var init = function () {
    $scope.fonte = fonte || {};
    $scope.converter = campo || {};
    $scope.edita = campo.type ? true : false;
    if($scope.edita){
      campo.expression = convertExpression(campo.expression);
    }
  };

  var cleanForm = function(converter){
      converter.value = '';
      converter.from = '';
      converter.to = '';
      converter.label = '';
      converter.expression = '';
      converter.type = '';
  }

  var addFilter = function(converter){
    if(converter.type === 'date'){
        converter.filter = ['date','dd/MM/yyyy'];
    }
    if(converter.type === 'currency'){
        converter.filter = ['currency','R$'];
    }
    return converter;
  }

  var convertExpression = function(expression){
    expression = expression.replace('<%=', '');
    return expression.replace('%>', '');
  }

  $scope.addConverter = function (converter, fonte) {
    converter = addFilter(converter);
    converter.expression = '<%= ' + converter.expression + ' %>';
    fonte.converter = fonte.converter || [];
    fonte.converter.push(angular.copy(converter));
    cleanForm(converter);
  };

  $scope.updateConverter = function (converter, fonte) {
    if(converter.expression.indexOf("<%=") > -1){
      converter.expression = convertExpression(converter.expression);
    }
    converter = addFilter(converter);
    converter.expression = '<%= ' + converter.expression + ' %>';
    fonte.converter = fonte.converter || [];
    fonte.converter =  _.without(fonte.converter, _.findWhere(fonte.converter, {
        from: converter.from
    }));
    fonte.converter.push(angular.copy(converter));
  };

  $scope.removeConverter = function (converter, fonte) {
    fonte.converter.splice(fonte.converter.indexOf(converter), 1);
  };

  $scope.confirmar = function(fonte){
    $modalInstance.close(fonte);
  };

  init();

}]);
