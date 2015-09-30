app.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {

	$httpProvider.defaults.useXDomain = true;
	$httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost';
	$httpProvider.defaults.headers.common['Access-Control-Allow-Methods'] = ['GET, POST, OPTIONS, PUT, PATCH, DELETE'];
	$httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = 'X-Requested-With,content-type';
	$httpProvider.defaults.headers.common['Access-Control-Allow-Credentials'] = true;

	$routeProvider
	.when('/', {
		templateUrl: 'view/modulo',
		controller: 'ModuloCtrl',
		resolve : {
			modulos : [ 'api', function(api) {
				return api.modulos.list();
			}]
		}
	})
	.when('/vision', {
		templateUrl: 'view/main',
		controller: 'MainCtrl'
	})
	.when('/vision/configuration', {
		templateUrl: 'view/configuration',
		controller: 'ConfigurationCtrl'
	})
	.when('/report', {
		templateUrl: 'view/report',
		controller: 'ReportCtrl'
	})
	.when('/preview', {
		templateUrl: 'view/preview',
		controller: 'PreviewCtrl'
	})
	.when('/modulo', {
		templateUrl: 'view/modulo',
		controller: 'ModuloCtrl',
		resolve : {
			modulos : [ 'api', function(api) {
				return api.modulos.list();
			}]
		}
	})
	.when('/modulo/configuration', {
		templateUrl: 'view/moduloCreate',
		controller: 'moduloConfigCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});

	$httpProvider.interceptors.push('menuInterceptor');
}])

.factory('menuInterceptor', ['$location', function ($location) {
	return {
		// Active menu
		request: function (config) {
			config.headers = config.headers || {};
			var menu = $location.path();
			chooseMenu(menu);
			return config;
		}
	};
}])

function chooseMenu(menu) {
	var menus = angular.element("#menu").children();
	for(var i=0; i<menus.length; i++) {
		var elementMenu = angular.element(menus[i]);
		var link = angular.element(elementMenu).children();
		var href = (angular.element(link).attr('href')).replace('#','');
		if(menu === href) { angular.element(elementMenu).addClass('active'); }
		else { angular.element(elementMenu).removeClass('active'); }
	}
}
