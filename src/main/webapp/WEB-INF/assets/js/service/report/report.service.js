app.factory("ReportService", ['ComponentService', 'LinkService', 'PageService', function( ComponentService, LinkService, PageService) {

    var report = {};
    var link = {
        selected: [],
        values: [],
        lists: [],
        links: []
    };


//    var getValueFields = function(filters) {
//        var values = _.pluck(filters, 'to');
//        var keys = _.pluck(filters, 'key');
//        return _.map(keys, function(key, index) {
//            var valueField = _.pluck(values[index], 'field');
//            var keyField = _.pluck(key, 'field');
//            return _.union(valueField, keyField);
//        }, []);
//    }

//    var getValueField = function(field) {
//        var values = field.value;
//        return _.map(values, function(value) {
//            return value.field;
//        }, []);
//    }

//    var link = function(value, index) {
//        return LinkService.link(value, index);
//    }
//
//    var links = function(registers, visio) {
//        var filters = xt.getReportFilter(visio.layout);
//        var fields = _.pluck(filters, 'to');
//        return LinkService.links(registers, filters, fields);
//    }

  var filters = function(registers, visio) {
      return LinkService.links(registers, vision);
  }

    var formatComponents = function(containers, page) {
         _.map(containers, function(container) {
             container.components = _.map(container.components, function(component) {
                return ComponentService.create(page, component);
            })
        });
        return containers;
    }

    var page = function(visio, page) {
        visio.layout.containers = formatComponents(visio.layout.containers, page);
        return visio;
    }

    var pages = function(registers, visio, selected) {
        return PageService.pages(selected, registers);
    }

    return {
//        links: links,
//        link: link,
    	filters: filters,
        pages: pages,
        page: page
    }
}]);
