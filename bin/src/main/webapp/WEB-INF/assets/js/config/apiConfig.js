app.config(['apiProvider', function (apiProvider) {
	var config = {
			baseUrl: "",
			nocache: true,
			resources: {
			  public: {
			    resources: {
    			    auth: {
    			      operations: {
    			        session: {
    			          method: "get"
    			        }
    			      }
    			    }
			    }
			  }
			}
	};
	apiProvider.setConfig(config);
}]);