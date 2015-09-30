app.factory("DataGrouperService", function() {

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

    var group = function(data, names) {
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

    var pages = function(data, names) {
        var stems = keys(data, names);
        return _.map(stems, function(stem) {
            var val = vals(data, stem, names);
            return _.map(val, function(vals) {
            	return _.extend(stem, vals);
            })
        });
    };

    return {

        group: function(data, names) {
            return group(data, names);
        },

        keys: function(data, names) {
            var groups = group(data, names);
            return _.map(groups, function(item) {
                return item.key;
            });
        },

        vals: function(data, names) {
            var groups = group(data, names);
            return _.map(groups, function(item) {
                return item.vals;
            });
        },

        pages: function(data, names) {
            var groups = group(data, names);
            return _.map(groups, function(item) {
            	return _.map(item.vals, function(val) {
            		return _.extend(item.key, val);
	            });
            });
        }

    }

});
