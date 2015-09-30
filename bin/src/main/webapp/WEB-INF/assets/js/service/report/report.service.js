app.factory("ReportNewService", ['ComponentService', 'LinkService', 'PageService', function( ComponentService, LinkService, PageService) {

    var report = {};
    var link = {
        selected: [],
        values: [],
        lists: [],
        links: []
    };

    /* **************************************************************************** */

    /* TODO: Colocar esta método no momento em que o layout esta sendo criado. */

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


    var getValueFields = function(filters) {
        var values = _.pluck(filters, 'value');
        var keys = _.pluck(filters, 'key');
        return _.map(keys, function(key, index) {
            var valueField = _.pluck(values[index], 'field');
            var keyField = _.pluck(key, 'field');
            return _.union(valueField, keyField);
        }, []);
    }

    var getValueField = function(field) {
        var values = field.value;
        return _.map(values, function(value) {
            return value.field;
        }, []);
    }

    var link = function(value, index) {
        return LinkService.link(value, index);
    }

    var links = function(registers, visio) {
        var filters = xt.getReportFilter(visio.layout);
        var fields = getValueFields(filters);
        return LinkService.links(registers, filters, fields);
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
        links: links,
        link: link,
        pages: pages,
        page: page
    }
}]);
