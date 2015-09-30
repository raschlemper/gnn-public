app.controller('datasourcesController', [ '$scope', 'fontesDados', 'formularios', 'api', 'modalService', function ($scope, fontesDados, formularios, api, modalService) {

  var selectedTab = 'datasources';

  var init = function () {
    $scope.forms = angular.fromJson(formularios.data);
    $scope.fontes = parseFonteDadosJSON(fontesDados.data);
  };

  $scope.isTabActive = function (tab) {
    return selectedTab === tab;
  };

  var reloadFonts = function () {
    api.datasource.list().success(function (fontes) {
      $scope.fontes = parseFonteDadosJSON(fontes);
    });
  };

  var parseFonteDadosJSON = function (fontes) {
    var fs = angular.copy(fontes);

    angular.forEach(fs, function (fonte) {
      if (fonte.header) fonte.header = JSON.parse(fonte.header);
      if (fonte.converter) fonte.converter = JSON.parse(fonte.converter);
      if (fonte.parameter) fonte.parameter = JSON.parse(fonte.parameter);
    });

    return fs;
  };

  $scope.openNewFonteModal = function (fonte) {
    var resolve = {
      forms: function () {
        return angular.copy($scope.forms) || [];
      },
      fontes: function () {
        return [];
      },
      fonte: function () {
        return angular.copy(fonte) || {};
      }
    };

    modalService.custom('view/datasourcesCreateModal', 'datasourcesModalController', 'lg', resolve, false).then(function (data) {
      reloadFonts();
    }, function (message) {
      console.log(message);
    });
  };

  $scope.openTestFonteModal = function () {
    var resolve = {
      forms: function () {
        return [];
      },
      fontes: function () {
        return angular.copy($scope.fontes) || [];
      },
      fonte: function () {
        return {};
      }
    };

    modalService.custom('view/datasourcesTestModal', 'datasourcesModalController', 'lg', resolve, false).then(function (data) {}, function (message) {
      console.log(message);
    });
  };

  init();

}]);
