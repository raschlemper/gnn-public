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

    return {

        group: function(data, names) {
            return group(data, names);
        },

        keys: function(data, names) {
            var groups = group(data, names);
            var values = [];
            _.map(groups, function(item) {
                if(!_.isEmpty(item.key)) {
                	values.push(item.key);
                };
            });
            return values;
        },

        vals: function(data, names) {
            var groups = group(data, names);
            var values = [];
            _.map(groups, function(item) {
                if(!_.isEmpty(item.vals)) {
                	values.push(item.vals);
                };
            });
            return values;
        },

        pages: function(data, names) {
            var groups = group(data, names);
            return _.map(groups, function(item) {
            	var values = [];
            	_.map(item.vals, function(val) {
                    if(!_.isEmpty(item.key) || !_.isEmpty(val)) {
                    	values.push(_.extend(val, item.key));
                    };
	            });
            	return values;
            });
        }

    }

});
