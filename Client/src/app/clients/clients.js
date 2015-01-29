angular.module('appoints.clients', [
  'ngRoute',
  'appoints.api'
])

.config(function config($routeProvider) {
  $routeProvider
    .when('/clients', {
      templateUrl: 'clients/clients.html',
      controller: 'ClientsCtrl',
      title: 'Clients'
    });
})

.controller('ClientsCtrl', function ClientsController($scope, $window, _, $translate, appointsapi, flash, moment) {

  function load() {
    return appointsapi.apiRoot.then(function (rootClient) {
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
    return appointsapi.apiRoot.then(function (rootClient) {
      return rootClient.$post('clients', null, $scope.newClient).then(function () {
        flash.add('Client created successfully', 'info');
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