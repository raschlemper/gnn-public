app.factory("DataGrouperService", function(){

    var has = function(obj, target) {
        return _.any(obj, function(value) {
            return _.isEqual(value, target);
        });
    };

    var keys = function(data, names) {
        return _.reduce(data, function(memo, item) {
            var key = _.pick(item, names);
            if (!has(memo, key)) {
                memo.push(key);
            }
            return memo;
        }, []);
    };

    var vals = function(data, stem, names) {
        return _.map(_.where(data, stem), function(item) {
            return _.omit(item, names);
        });
    };

    var group = function(data, names, group_names) {
        var stems = keys(data, names);
        return _.map(stems, function(stem) {
            var val = vals(data, stem, names);
            var val_sum = [];
            return {
                key: stem,
                vals: val
            };
        });
    };

    var toKey = function(item, values, group_names) {
        _.map(group_names, function(name) {
            item.key[name] = values[name];
        });
        return item; 
    };

    var toVals = function(item, values, group_names) {
        _.map(values, function(value, index) {
            _.map(group_names, function(name) {
                item.vals[index][name] = value[name];
            });
        });
        return item; 
    };

    // Method Privade

    var sum = function(values, names) {
        var data = {};
        _.map(names, function(name) {
            data[name] = _.reduce(values, function(memo, item) {
                return memo + Number(_.property(name)(item));
            }, 0); 
        });     
        return data;
    };

    var rest = function(values, names) {
        var rest = [];
        _.map(names, function(name) {            
            _.reduce(values, function(memo, item, index) {
                var data = {};
                var val_rest = memo + Number(_.property(name)(item));
                data[name] = val_rest;
                rest[index] = data;
                return val_rest;
            }, 0); 
        });     
        return rest;
    };


    // Method Public

    return {

        report: function(data, names) {
            var groups = group(data, names);
            return _.map(groups, function(item) {
                return item;
            });
        },

        sum: function(data, names, group_names) {
            var groups = group(data, names);
            return _.map(groups, function(item) {
                var val_sum = sum(item.vals, group_names);
                return toKey(item, val_sum, group_names);
            });
        },

        rest: function(data, names, group_names) {
            var groups = group(data, names);
            return _.map(groups, function(item) {
                var val_rest = rest(item.vals, group_names);
                return toVals(item, val_rest, group_names);
            });
        }

    }

});