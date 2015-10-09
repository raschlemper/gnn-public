'use strict';

app.controller('ReportCtrl', ['$scope', '$routeParams', 'ComponentService', 'FilterService', 'DataGrouperService', 'modalService', 'api', 'MessageService', 'ConvertUtil', 
                              function($scope, $routeParams, ComponentService, FilterService, DataGrouperService, ModalService, api, MessageService, ConvertUtil) {

	var visio = {};
	var registers = [];
	var filters = [];

	var init = function() {
		$scope.pages = [];
		$scope.visio = [];
		$scope.pagination = {};
		$scope.searching = true;
		$scope.configuration = { page: { layout: "portrait", size: "a4" } };
		getVisio();
	}

	var getVisio = function() {
		if(!$routeParams.hashid) return;
		api.visions.get($routeParams.hashid)
		.success(function(data) {
			visio = ConvertUtil.convert.visionFromEntity(angular.copy(data));	
			$scope.openPageFilterModal();
		})
		.error(function(err) {
			MessageService.danger('Erro ao criar relatÛrio: ' + err);
		});          
	}

	var filter = function() { 
		var params = getParams();
		api.datasources.getOperations(visio.datasource.hash).prod(JSON.stringify(params))
		.success(function (data) {
			registers = data;	
			getPages();
			$scope.searching = false;
		})
		.error(function (err) {
			MessageService.danger('Erro ao recuperar dados do relatÛrio: ' + err);
			registers = [];
			$scope.searching = false;
		});
	}

	//TODO: colocar uma verificaÁ„o pelo camplos e valores selecionados
	var getParams = function() {
		var params = {};
		_.map(filters, function(filter) {
			if(verifyParamFromUrl(filter)) {
				params[filter.key] = filter.values;
			}
		});
		return params;
	}

	var verifyParamFromUrl = function(filter) {
		var paramUrl = _.pluck(visio.datasource.parameter, 'to');
		return (_.contains(paramUrl, filter.key));
	}

	var getPages = function(selected) {
		var selected = getFilterSelected();
		var registersSelected = FilterService.filter(selected, registers);
		var groups = createGroups(registersSelected, xt.getReportFilter(visio.layout)); 
		createPages(groups);
		$scope.getPage(1);
	}

	var getFilterSelected = function() {
		var selecteds = {};
		_.map(filters, function(filter) {
			if(verifyParamFromUrl(filter)) return;
			var values = [];
			_.map(filter.values, function(value) {
				if(value.checked) { values.push(value.value); }
			});
			var obj = {};
			obj[filter.key] = values;
			_.extend(selecteds, obj);
		});
		return selecteds;
	}

	var createGroups = function(registers, filters) {
		if(!filters) return registers;
		var keys = _.pluck(filters, 'to');
		return DataGrouperService.pages(registers, keys);
	}

	var createPages = function(groups) {
		$scope.pagination = {
				"groups": groups,
				"totalItens": groups.length,
				"currentPage": 1,
				"totalByPage": 1
		}
	}

	$scope.getPage = function(page) {
		$scope.pagination.currentPage = page;
		$scope.visio = angular.copy(visio);
		$scope.visio.layout.containers = formatComponents(angular.copy(visio.layout.containers), $scope.pagination.groups[page - 1]);
	}

	var formatComponents = function(containers, page) {
		_.map(containers, function(container) {
			container.components = _.map(container.components, function(component) {
				return ComponentService.create(page, component);
			})
		});
		return containers;
	}

	var getFieldsFilters = function() {
		var filters = [];
		filters = _.union(filters, visio.datasource.parameter);
		if(!_.isEmpty(registers)) { 
			filters = _.union(filters, xt.getReportFilter(visio.layout)); 
		}
		return filters;
	}

	$scope.openPageConfigurationModal = function () {
		var resolve = {
			configuration: function () {
				return $scope.configuration;
			}
		};
		ModalService.custom('view/pageConfigurationModal', 'pageConfigurationModalController', 'lg', resolve, false)
		.then(function (data) {
			$scope.configuration = data;
		}, function (message) {
			console.log(message);
		});
	};

	$scope.openPageFilterModal = function () {
		var resolve = {
				fieldsFilters: function() {
					return getFieldsFilters();
				},
				registers: function() {
					return registers;
				},
				filters: function() {
					return filters;
				}
		};
		$scope.searching = true;
		ModalService.custom('view/pageFilterModal', 'pageFilterModalController', 'lg', resolve, false)
		.then(function (data) {
			filters = data;
			filter();
		}, function (message) {
			console.log(message);
			$scope.searching = false;
		});
	};


	$scope.existRegisters = function() {
		return $scope.pagination.totalItens > 0;
	}


	/* **************************************************************************** */

	/* TODO: Colocar esta m√©todo no momento em que o layout esta sendo criado. para identificar a quebra de p·gina */

	var xt = {};

	xt.orderBy = function(fields) {
		return _.sortBy(fields, function(item) {
			return item.order;
		})
	}

	xt.createComponents = function(container) {
		var components = [];
		_.map(container.components, function(component) {
			if (!component.data) {
				component.data = {};
			}
			components.push({
				'containerType': container.type,
				'code': component._id,
				'type': component.type,
				'data': component.data
			});
		});
		return components;
	}

	xt.getComponents = function(layout) {
		var componentsList = [];
		_.map(layout.containers, function(container) {
			var components = xt.createComponents(container);
			componentsList = _.union(componentsList, components);
		})
		return componentsList;
	}

	xt.getReportFilter = function(layout) {
		var components = xt.getComponents(layout);
		var headerComponents = _.where(components, {
			'containerType': 'header'
		});
		var filters = _.reduce(headerComponents, function(memo, component) {
			if (component.data) {
				return _.union(memo, component.data.fields);
			}
		}, []);
		return xt.orderBy(filters);
	}

	/* **************************************************************************** */

	init();

}]);
