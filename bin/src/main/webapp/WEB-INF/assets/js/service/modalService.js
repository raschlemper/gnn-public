app.factory('modalService', ['$modal', function ($modal) {

  var _makeCustomModal = function (template, controller, size, resolve, animation) {
    return {
      animation: animation,
      templateUrl: template,
      controller: controller,
      size: size,
      resolve: resolve
    };
  };

  var _makeDefaultResolve = function (title, message, type) {
    return {
      title: function () {
        return title;
      },
      message: function () {
        return message;
      },
      type: function () {
        return type; // success, info, alert, danger or default
      }
    };
  };

  return {
    custom: function (template, controller, size, resolve, animation) {
      return $modal.open(_makeCustomModal(template, controller, size, resolve, animation)).result;
    },
    confirm: function (title, message, type, size) {
      return $modal.open(_makeCustomModal('view/confirmModal', 'modalController', size, _makeDefaultResolve(title, message, type), false)).result;
    },
    alert: function (title, message, type, size) {
      return $modal.open(_makeCustomModal('view/alertModal', 'modalController', size, _makeDefaultResolve(title, message, type), false)).result;
    }
  };

}]);
