app.controller('datasourcesModalController', ['$scope', '$modalInstance', 'forms', 'fontes', 'fonte', 'api', function ($scope, $modalInstance, forms, fontes, fonte, api) {

  var init = function () {
    $scope.forms = forms || [];
    $scope.fontes = fontes || [];
    $scope.fonte = fonte || {};

    if (fonte.type)
      $scope.nextStep(fonte.type);
    else
      $scope.step1 = true;
  };

  $scope.nextStep = function (step) {
    switch (step) {
      case 'WEBSERVICE':
        $scope.step1 = false;
        $scope.step2WebService = true;
        $scope.step2Form = false;
        $scope.fonte.type = 'WEBSERVICE';
        break;
      case 'FORM':
        $scope.step1 = false;
        $scope.step2WebService = false;
        $scope.step2Form = true;
        $scope.fonte.type = 'FORM';
        break;
    };
  };

  $scope.previousStep = function () {
    $scope.fonte = {};
    $scope.step1 = true;
    $scope.step2WebService = false;
    $scope.step2Form = false;
  };

  $scope.save = function (fonte) {
    var entity = angular.copy(fonte);
    entity.header = JSON.stringify(fonte.header) || '[]';
    entity.converter = JSON.stringify(fonte.converter) || '[]';
    entity.parameter = JSON.stringify(fonte.parameter) || '[]';

    api.datasource.save(entity).success(function () {
      $modalInstance.close();
    });
  };

  $scope.update = function (fonte) {
    var entity = angular.copy(fonte);
    entity.header = JSON.stringify(fonte.header) || '[]';
    entity.converter = JSON.stringify(fonte.converter) || '[]';
    entity.parameter = JSON.stringify(fonte.parameter) || '[]';

    api.datasource.update(entity.id, entity).success(function () {
      $modalInstance.close();
    });
  };

  $scope.remove = function (fonte) {
    api.datasource.delete(fonte.id).success(function () {
      $modalInstance.close();
    });
  };

  $scope.close = function () {
    $modalInstance.dismiss('close');
  };

  $scope.test = function (fonte, params) {
    $scope.emAndamento = true;
    $scope.success = false;
    $scope.error = false;

    api.datasource.getOperations(fonte.hash).test(JSON.stringify(params)).success(function (result) {
      $scope.emAndamento = false;
      $scope.success = true;

      if (fonte.type == 'WEBSERVICE')
        $scope.msgSuccess = JSON.stringify(result.original, null, 2);

      $scope.msgSuccessConverted = JSON.stringify(result.converted, null, 2);
    }).error(function (data, status) {
      $scope.msgError = data;
      $scope.emAndamento = false;
      $scope.error = true;
    });
  };

  $scope.loadParamFields = function (fonte) {
    delete $scope.params;
    delete $scope.success;
    delete $scope.msgSuccess;
    delete $scope.msgSuccessConverted;

    angular.forEach(fonte.parameter, function (parameter) {
      if (!$scope.params) $scope.params = {};
      $scope.params[parameter.from] = '';
    });
  };

  $scope.verifyParams = function (params) {
    var isEmpty = false;

    angular.forEach(params, function (parameter) {
      if (!parameter || parameter === '')
        isEmpty = true;
    });

    return isEmpty;
  };

  /**
   * Header Tab
   */

  $scope.addHeader = function (header, fonte) {
    fonte.header = fonte.header || [];
    fonte.header.push(angular.copy(header));
    header.key = '';
    header.value = '';
  };

  $scope.removeHeader = function (header, fonte) {
    fonte.header.splice(fonte.header.indexOf(header), 1);
  };

  /**
   * Parameter Tab
   */

  $scope.addParameter = function (param, fonte) {
    fonte.parameter = fonte.parameter || [];
    fonte.parameter.push(angular.copy(param));

    param.from = '';
    param.to = '';

    if (param.type)
      param.type = '';
  };

  $scope.removeParameter = function (param, fonte) {
    fonte.parameter.splice(fonte.parameter.indexOf(param), 1);
  };

  /**
   * Converter Tab
   */

  $scope.addConverter = function (converter, fonte) {
    fonte.converter = fonte.converter || [];
    fonte.converter.push(angular.copy(converter));
    converter.key = '';
    converter.value = '';
    converter.from = '';
    converter.to = '';
  };

  $scope.removeConverter = function (converter, fonte) {
    fonte.converter.splice(fonte.converter.indexOf(converter), 1);
  };

  init();

}]);
