app.run(['api', function (api) {
  api.public.getResources().auth.getOperations().session();
}]);
