'use strict';

app.controller('ReportCtrl', ['$scope', '$routeParams', 'ComponentService', 'FilterService', 'DataGrouperService', 'api', 'MessageService', 'ConvertUtil', 
                              function($scope, $routeParams, ComponentService, FilterService, DataGrouperService, api, MessageService, ConvertUtil) {

	var visio = {};
	var registers = [];
    $scope.filters = [];
    $scope.pages = [];
    $scope.pagination = {};

//	var index = 0;
//    $scope.link = [];
//    $scope.page = [];
//    $scope.visio = {};
    
//    var params = {instituicao: "246", inicio: "2015-08-01", fim: "2015-08-30"};

    var createReport = function() {
    	getVisio();
    }

    var getVisio = function() {
        if(!$routeParams.hashid) return;
        api.visions.get($routeParams.hashid)
            .success(function(data) {
            	visio = ConvertUtil.convert.visionFromEntity(angular.copy(data));	     
//                getFilters();   	
            	getFilterUrl(visio.datasource.parameter, 'input');
            })
            .error(function(err) {
                MessageService.danger('Erro ao criar relatório: ' + err);
            });          
    }
    
    $scope.filter = function() { 
    	console.log($scope.filters);
    	var params = getParams();
    	api.datasources.getOperations(visio.datasource.hash).prod(JSON.stringify(params))
	    	.success(function (data) {
	    		if(_.isEmpty(registers)) { getFilterUrl(xt.getReportFilter(visio.layout), 'dropdown'); }
	            registers = data;	
	            setFilterValue();
	            getPages();
	    	})
	    	.error(function (err) {
	            MessageService.danger('Erro ao recuperar dados do relatório: ' + err);
	            registers = [];
		    });
    }

    var getFilters = function() {
    	getFilterUrl(visio.datasource.parameter, 'input');
    	getFilterUrl(xt.getReportFilter(visio.layout), 'dropdown');
    }
    
    var getFilterUrl = function(filters, type) {
    	 _.map(filters, function(filter) {
    		$scope.filters.push(getItem(filter, type));
    	});
    }
    
    var getItem = function(filter, type) {
    	return { 'key': filter.to, 'value': null, 'label': filter.label, 'checked': true, 'type': type }
    }

    var getParams = function() {
    	var params = {};
    	_.map($scope.filters, function(filter) {
    		params[filter.key] = filter.value;
    	});
    	return params;
    }
    
    var setFilterValue = function() {
    	_.map($scope.filters, function(filter) {
    		if(filter.type === 'dropdown') {
    			if(filter.value) { return; }
    			filter.value = [];
    			var values = DataGrouperService.keys(registers, filter.key);
    	    	_.map(values, function(value) {
    	    		filter.value.push({ 'key': value[filter.key], 'label': value[filter.key], 'checked': true });
    	    	})
    		}
    	})
    }

    var getPages = function(selected) {
    	var selected = getFilterSelected();
    	var registersSelected = FilterService.filter(selected, registers);
    	var groups = createGroups(registersSelected, xt.getReportFilter(visio.layout)); 
    	createPages(groups);
        $scope.getPage(1);
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
    
    var getFilterSelected = function() {
    	var filters = {};
    	_.map($scope.filters, function(filter) {
    		if(filter.type !== 'dropdown') return;
    		var values = [];
    		_.map(filter.value, function(item) {
    			if(item.checked) { values.push(item.key); }
    		});
    		var obj = {};
    		obj[filter.key] = values;
    		_.extend(filters, obj);
    	});
    	return filters;
    }

    var createGroups = function(registers, filters) {
        if(!filters) return registers;
        var keys = _.pluck(filters, 'to');
        return DataGrouperService.pages(registers, keys);
    }
    
    
    
    
    

//    $scope.getLinks = function() {
//        $scope.link = ReportService.links(registers, visio);
//        $scope.getLink($scope.link.selected[0], index);
//    }
//
//    $scope.getLink = function(key, index) {
//        $scope.link = ReportService.link(key, index);
//        var selected = angular.copy($scope.link.selected);
//        $scope.getPages(selected, $scope.link.links[0]);
//    }
//
//    $scope.getPages = function(selected, link) {
//        var selected = angular.copy(selected);
//        var filters = link.key;
//        _.map(selected, function(item, index) {
//            if(index + 1 < selected.length){
//            _.extend(filters, item);
//            }
//        });
//        $scope.page = ReportService.pages(registers, visio, filters);
//        $scope.getPage($scope.page.pages);
//    }
//
//    $scope.getPage = function(page) {
//        $scope.visio = ReportService.page(angular.copy(visio), page);
//        console.log($scope.link);
//    }
//  
  


	  /* **************************************************************************** */
	
	  /* TODO: Colocar esta mÃ©todo no momento em que o layout esta sendo criado. */
	
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

    createReport();

}]);
