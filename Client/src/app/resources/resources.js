angular.module('makemybooking.resources', [
  'ngRoute',
  'makemybooking.api'
])

.config(function config($routeProvider) {
  $routeProvider
    .when('/resources', {
      templateUrl: 'resources/resources.html',
      controller: 'ResourcesCtrl',
      title: 'Resources'
    });
})

.controller('ResourcesCtrl', function ResourcesController($scope, $window, _, $translate, makemybookingapi, flash) {

  function load() {
    return makemybookingapi.apiRoot.then(function (rootResource) {
      return rootResource.$get('resources').then(function (resourcesResource) { 
        return resourcesResource.$get('resources').then(function(resources) { // get embedded resources
	  $scope.resources=resources;
        });
      }, function (err) {
        flash.addError(err.data);
      });
    });
  }

  function initResource() {
    $scope.newResource = {
      displayName: ''
    };
  }


  $scope.createResource = function () {
    return makemybookingapi.apiRoot.then(function (rootResource) {
      return rootResource.$post('resources', null, $scope.newResource).then(function () {
        flash.add($translate.instant('resource.Created'), 'info');
        initResource();
      }, function (err) {
        flash.addError(err.data);
      });
    })
    .then(load);
  };

  $scope.removeResource = function (resourceResource) {
    if ($window.confirm($translate.instant('common.AreYouSure'))) {
      return resourceResource.$del('self').then(function (result) {
        flash.add(result.message);
      }, function (err) {
        flash.addError(err.data);
      }).then(load);
    }
  };



  initResource();
  load();
  
});