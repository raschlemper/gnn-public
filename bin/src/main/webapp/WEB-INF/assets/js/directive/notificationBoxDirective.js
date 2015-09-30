app.directive('notificationBox', ['$rootScope', '$animate', function ($rootScope, $animate) {
  var _template = '<div ng-show="notificationStack && notificationStack.length > 0" class="notification-box example-animate-container"><div class="row animate-repeat" ng-repeat="notification in notificationStack"><div class="col-md-12"><div class="notification-item" ng-class="notification.class"><div class="row"><div class="col-md-10"><span class="notification-title"><i class="notification-icon fa {{notification.icon}}"></i>{{notification.title}}</span></div><div class="col-md-2"><span ng-show="notification.close" class="notification-item-close pull-right" ng-click="close()">x</span></div></div><div class="row"><div class="col-md-12"><div style="padding: 0px 10px 10px 10px;line-height: 20px;"><span>{{notification.message}}</span></div></div></div></div></div></div></div>';
  return {
    template: _template,
    link: function ($scope) {
      $scope.close = function () {
        delete $rootScope.notification;
      };
    }
  };
}]);

app.service('notificationService', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
  $rootScope.notificationStack = [];
  $rootScope.removed = 0;

  var addNotification = function (notification) {
    var index = $rootScope.notificationStack.length;
    if (index == 0) $rootScope.removed = 0;
    $rootScope.notificationStack.push(notification);
    $timeout(function () {
      if ((index - $rootScope.removed) <= 0) {
        $rootScope.notificationStack.splice(0, 1);
      } else {
        $rootScope.notificationStack.splice(index - $rootScope.removed, 1);
      }
      $rootScope.removed++;
    }, notification.duration);
  };

  var _success = function (message, duration) {
    addNotification({ title: 'Sucesso', message: message, class: 'success', icon: 'fa-check-circle', close: true, duration: duration || 2000 });
  };

  var _info = function (message, duration) {
    addNotification({ title: 'Aviso', message: message, class: 'info', icon: 'fa-info-circle', close: true, duration: duration || 2000 });
  };

  var _error = function (message, duration) {
    addNotification({ title: 'Cuidado', message: message, class: 'danger', icon: 'fa-ban', close: true, duration: duration || 10000 });
  };

  var _warning = function (message, duration) {
    addNotification({ title: 'Atenção', message: message, class: 'warning', icon: 'fa-exclamation-triangle', close: true, duration: duration || 10000 });
  };

  return {
    success: _success,
    info: _info,
    error: _error,
    warning: _warning
  };
}]);
