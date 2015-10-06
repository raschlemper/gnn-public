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
				},
				datasources: {
					operations: {
						test: {
							method: "post"
						},
						prod: {
							method: "post"
						}
					}
				},
				modulos:{
					operations: {
						datasources: {
							method: "get"
						}
					}
				},
				visions:{
				},
				templates:{
					
				}
			}
	};
	apiProvider.setConfig(config);
}]);
