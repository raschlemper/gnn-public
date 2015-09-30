app.factory("ConvertUtil", function() {
	var _convertUtil = {};

		_convertUtil.jsonToObject = function(array){
	   	 var convertArray = [];
		 	 for (var i = 0; i < array.length; i++) {
					 var obj = angular.fromJson(array[i].model);
					 convertArray.push(obj);
	     };
	     return convertArray;
    };

		_convertUtil.parseFonteDadosJSON = function(fontes){
			var fs = angular.copy(fontes);
	    if(fontes instanceof Array){
	      angular.forEach(fs, function (fonte) {
	        if (fonte.header && typeof fonte.header === 'string') fonte.header = JSON.parse(fonte.header);
	        if (fonte.converter && typeof fonte.converter === 'string') fonte.converter = JSON.parse(fonte.converter);
	        if (fonte.parameter && typeof fonte.parameter === 'string') fonte.parameter = JSON.parse(fonte.parameter);
	      });
	    }else{
	      if (fs.header && typeof fs.header === 'string') fs.header = JSON.parse(fs.header);
	      if (fs.converter && typeof fs.converter === 'string') fs.converter = JSON.parse(fs.converter);
	      if (fs.parameter && typeof fs.parameter === 'string') fs.parameter = JSON.parse(fs.parameter);
	    }
	    return fs;
		};

		_convertUtil.stringifyFonteDados = function(fontes){
			var fs = angular.copy(fontes);
	    if(fontes instanceof Array){
	      angular.forEach(fs, function (fonte) {
	        fonte.header = JSON.stringify(fonte.header) || '[]';
	        fonte.converter = JSON.stringify(fonte.converter) || '[]';
	        fonte.parameter = JSON.stringify(fonte.parameter) || '[]';
	      });
	    }else{
	      fs.header = JSON.stringify(fs.header) || '[]';
	      fs.converter = JSON.stringify(fs.converter) || '[]';
	      fs.parameter = JSON.stringify(fs.parameter) || '[]';
	    }
	    return fs;
		}

		_convertUtil.stringfyToEntity = function(model){
				var entity = {};
				entity.model = angular.toJson(model);
				entity.hashid= model.hashid;
				entity.id= model.id;
				return entity;
		}

		_convertUtil.visionFromEntity = function(model){
				var entity = {};
				entity = angular.fromJson(model.model);
				entity.hashid= model.hash;
				entity.id = model.id;
				return entity;
		}

    return {
    	convert: _convertUtil
    }
});
