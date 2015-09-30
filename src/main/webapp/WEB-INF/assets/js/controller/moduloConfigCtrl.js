app.controller('moduloConfigCtrl', ['$scope', 'api','$routeParams','modalService', 'ConvertUtil', function ($scope, api, $routeParams, modalService, ConvertUtil) {

  var init = function () {
    if(!$routeParams.hashid){
      $scope.modulo = {};
      $scope.modulo.datasources =  [];
    }else{
      api.modulos.get($routeParams.hashid).success(function(data){
        $scope.modulo = data;
        $scope.modulo.datasources = ConvertUtil.convert.parseFonteDadosJSON(data.datasources);
      });
    }
    $scope.fonte = {};
    $scope.editaFonte = false;
    $scope.tab = 1;
  };

  $scope.setTab = function(tabId) {
    if(tabId === 2){
      $scope.editaFonte = false;
    }
    $scope.tab = tabId;
  }

  $scope.openTestFonteModal = function () {
    var resolve = {
      forms: function () {
        return [];
      },
      fontes: function () {
        return angular.copy($scope.modulo.datasources) || [];
      },
      fonte: function () {
        return {};
      }
    };
    modalService.custom('view/datasourcesTestModal', 'datasourcesModalController', 'lg', resolve, false).then(function (data) {}, function (message) {
      console.log(message);
    });
  };

  $scope.save = function (fonte) {
    var entity = angular.copy(fonte);
    // entity = ConvertUtil.convert.stringifyFonteDados(entity);
    $scope.modulo.datasources.push(entity);
    var moduloSave =  angular.copy($scope.modulo);
    if(moduloSave.id){
      $scope.updateModulo(moduloSave);
    }else{
      $scope.saveModulo(moduloSave);
    }
    $scope.backDatasource();
  };

  $scope.saveModulo = function(modulo, back){
    modulo.datasources = ConvertUtil.convert.stringifyFonteDados(modulo.datasources);
    api.modulos.save(modulo).success(function () {
    });
    if(back){
      $scope.back();
    }
  }

  $scope.updateModulo = function(modulo, back){
    modulo.datasources = ConvertUtil.convert.stringifyFonteDados(modulo.datasources);
    api.modulos.update(modulo.id, modulo).success(function () {
    });
    if(back){
      $scope.back();
    }
  }

  var reloadFonts = function () {
    api.datasources.list().success(function (fontes) {
      $scope.fontes = ConvertUtil.convert.parseFonteDadosJSON(fontes);
    });
  };


  $scope.edit = function(fonte){
    if(fonte){
      $scope.fonte = angular.copy(ConvertUtil.convert.parseFonteDadosJSON(fonte));
    }else{
      $scope.fonte = {};
    }
    $scope.editaFonte = true;
  };

  $scope.update = function (fonte) {
    var entity = angular.copy(fonte);
    entity = ConvertUtil.convert.stringifyFonteDados(entity);
    $scope.modulo.datasources.splice($scope.modulo.datasources.indexOf(fonte), 1);
    $scope.modulo.datasources.push(fonte);

    $scope.backDatasource();
  };

  $scope.backDatasource = function(){
    $scope.editaFonte = false;
  }

  $scope.remove = function (fonte) {
    $scope.modulo.datasources.splice($scope.modulo.datasources.indexOf(fonte), 1);
    api.datasources.delete(fonte.id).success(function(){

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

  $scope.removeParameter = function (param, fonte) {
    fonte.parameter.splice(fonte.parameter.indexOf(param), 1);
  };

  /**
  * Converter Tab
  */

  $scope.openCampoModal = function(campo){
    var resolve = {
      fonte: function () {
        return angular.copy($scope.fonte) || {};
      },
      campo: function (){
        return angular.copy(campo) || {};
      }
    };
    modalService.custom('view/camposCreateModal', 'camposCreateModal', 'lg', resolve, false).then(function (data) {
      $scope.fonte.converter = data.converter;
    }, function (message) {
      console.log(message);
    });
  }

  /**
  * Converter Tab
  */

  $scope.openFiltroModal = function(filtro){
    var resolve = {
      fonte: function () {
        return angular.copy($scope.fonte) || {};
      },
      filtro: function (){
        return angular.copy(filtro) || {};
      }
    };
    modalService.custom('view/filtrosCreateModal', 'filtrosCreateModal', 'lg', resolve, false).then(function (data) {
      $scope.fonte.parameter = data.parameter;
    }, function (message) {
      console.log(message);
    });
  }

  $scope.removeConverter = function (converter, fonte) {
    fonte.converter.splice(fonte.converter.indexOf(converter), 1);
  };


  init();

}]);
