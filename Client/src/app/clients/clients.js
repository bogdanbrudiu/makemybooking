angular.module('makemybooking.clients', [
  'ngRoute',
  'makemybooking.api'
])

.config(function config($routeProvider) {
  $routeProvider
    .when('/clients', {
      templateUrl: 'clients/clients.html',
      controller: 'ClientsCtrl',
      title: 'Clients'
    });
})

.controller('ClientsCtrl', function ClientsController($scope, $window, _, $translate, makemybookingapi, flash, moment) {

  function load() {
    return makemybookingapi.apiRoot.then(function (rootClient) {
      return rootClient.$get('clients').then(function (clientsClient) { 
        return clientsClient.$get('clients').then(function(clients) { // get embedded clients
	  $scope.clients=clients;
        });
      }, function (err) {
        flash.addError(err.data);
      });
    });
  }

  function initClient() {
    $scope.newClient = {
      displayName: ''
    };
  }


  $scope.createClient = function () {
    return makemybookingapi.apiRoot.then(function (rootClient) {
      return rootClient.$post('clients', null, $scope.newClient).then(function () {
        flash.add($translate.instant('client.Created'), 'info');
        initClient();
      }, function (err) {
        flash.addError(err.data);
      });
    })
    .then(load);
  };

  $scope.removeClient = function (clientClient) {
    if ($window.confirm($translate.instant('common.AreYouSure'))) {
      return clientClient.$del('self').then(function (result) {
        flash.add(result.message);
      }, function (err) {
        flash.addError(err.data);
      }).then(load);
    }
  };




  initClient();
  load();
  
});