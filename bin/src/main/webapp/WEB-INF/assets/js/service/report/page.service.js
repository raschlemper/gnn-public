app.factory("PageService", ['DataGrouperService', function(DataGrouperService) { 

    var _page = {
        values: [],
        pages: [],
        page: {}
    }; 

    var dividePageByNumberLines = function() {
        _page.pages = angular.copy(_page.values);
    }


    var applyFilter = function(filters, registers) {
        if(!filters) { return registers; }
        return _.where(registers, filters);
    };

    var page = function(page) {
        _page.page = page;
        return _page;
    };

    var pages = function(filters, registers) {
        var values = applyFilter(filters, registers);
        _page.values = values;
        dividePageByNumberLines();
        return _page;
    };

    return {
        pages: pages,
        page: page
    }

}]);