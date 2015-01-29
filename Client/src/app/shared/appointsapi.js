angular.module('appoints.api', [
  'angular-hal',
  'makemybooking.config'
]) 

.factory('appointsapi', function (halClient, config) {

  var apiRoot = halClient.$get(config.defaultApiEndpoint);

  return {
      apiRoot: apiRoot
  };
  
});