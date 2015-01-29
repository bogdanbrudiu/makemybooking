angular.module('appoints.users', [
  'ngRoute',
  'appoints.api'
])

.config(function config($routeProvider) {
  $routeProvider
    .when('/users', {
      templateUrl: 'users/users.html',
      controller: 'UsersCtrl',
      title: 'Users'
    });
})

.controller('UsersCtrl', function UsersController($scope, $window, _, $translate, appointsapi, flash) {

  function load() {
    return appointsapi.apiRoot.then(function (rootUser) {
      return rootUser.$get('users').then(function (usersUser) { 
        return usersUser.$get('users').then(function(users) { // get embedded users
	  $scope.users=users;
        });
      }, function (err) {
        flash.addError(err.data);
      });
    });
  }

  function initUser() {
    $scope.newUser = {
      displayName: '',
      email: '',
      password: '',
      provider: 'local'
    };
  }


  $scope.createUser = function () {
    return appointsapi.apiRoot.then(function (rootUser) {
      return rootUser.$post('users', null, $scope.newUser).then(function () {
        flash.add('User created successfully', 'info');
        initUser();
      }, function (err) {
        flash.addError(err.data);
      });
    })
    .then(load);
  };

  $scope.removeUser = function (userUser) {
    if ($window.confirm($translate.instant('common.AreYouSure'))) {
      return userUser.$del('self').then(function (result) {
        flash.add(result.message);
      }, function (err) {
        flash.addError(err.data);
      }).then(load);
    }
  };




  initUser();
  load();
  
});