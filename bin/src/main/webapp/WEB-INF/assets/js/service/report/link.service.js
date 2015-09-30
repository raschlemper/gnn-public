app.factory("LinkService", ['DataGrouperService', 'ConvertService', function(DataGrouperService, ConvertService) { 

    var _link = {
        selected: [],
        values: [],
        lists: [],
        links: []
    }; 

    /* *********************************** BREACRUMBS ***************************** */

    var createLists = function() {
        _link.lists = [];
        _link.links = [];
        var values = _link.values;
        _.map(_link.selected, function(value, index) {
            if(index + 1 < _link.selected.length) {
                values = getList(values, value, index);
            }
        });
    }

    var createLinks = function() {        
        var values = _link.values;
        _.map(_link.selected, function(value, index) {
            var selectedIndex = getIndexSelectList(values, value);
            if (index + 1 == _link.selected.length) {
                getLink(values);
            } else { 
                values = values[selectedIndex].values;
            }
        });        
    }

    var getList = function(values, value, index) {         
        var selectedIndex = getIndexSelectList(values, value);
        _link.lists.push({
            'id': index,
            'itens': _.pluck(values, 'item'),
            'selected': values[selectedIndex].item
        });
        return values[selectedIndex].values;
    }

    var getLink = function(values) {
        var itens = _.pluck(values, 'item');
        _link.links = itens;
    }

    /* **************************************************************************** */

    var createListValueSelected = function(data, index, indexModify) {
        if (data) {
            var selectedIndex = getIndexSelectList(data, _link.selected[index]);
            var value = data[selectedIndex]; 
            setValueSelected(value, index, indexModify);           
            if(!value.values) { return; }
            createListValueSelected(value.values, index + 1, indexModify);
        }
    }
    var setValueSelected = function(value, index, indexModify) {
        if(index == 0 ){
            _link.selected[index] = value.item.key;
        } else if (_link.selected[index]) {
            if(index > indexModify) {
                _link.selected[index] = value.item.key;
            }    
        } else {
            _link.selected.push(value.item.key);                
        }
    }

    var getIndexSelectList = function(data, selected) {
        var itens = _.pluck(data, 'item');
        var keys = _.pluck(itens, 'key');
        var selectedIndex = _.indexOf(keys, selected);
        if(selectedIndex < 0) {
            return 0;
        }
        return selectedIndex;
    }

    var formatLinks = function(data, names, index) {
        if (index == names.length) {
            return;
        }
        return _.map(data, function(item, i) {
            var list = formatLinks(item.vals, names, index + 1);
            var obj = {
                'item': ConvertService.formatField(item.key, names[index])
            };
            if (list) {
                _.extend(obj, {
                    'values': list
                });
            }
            return obj;
        });
    }

    var createLink = function(index) {
        createListValueSelected(_link.values, 0, index);
        createLists();
        createLinks();
        return _link;
    }

    var link = function(value, index) {
        _link.selected[index] = value;
        return createLink(index);
    }

    var links = function(registers, filters, fields) {
        var groupers = DataGrouperService.hierarchy(registers, fields);
        _link.values = formatLinks(groupers, filters, 0);
        return _link;        
    }

    return {
        links: links,
        link: link
    }

}]);