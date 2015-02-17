angular.module('makemybooking.api', [
  'angular-hal',
  'makemybooking.config'
]) 

.factory('makemybookingapi', function (halClient, config) {

  var apiRoot = halClient.$get(config.defaultApiEndpoint);

  return {
      apiRoot: apiRoot
  };
  
});