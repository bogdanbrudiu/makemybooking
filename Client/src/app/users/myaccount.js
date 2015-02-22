angular.module('makemybooking.myaccount', [
  'ngRoute',
  'makemybooking.api'
])

.config(function config($routeProvider) {
  $routeProvider
    .when('/myaccount', {
        templateUrl: 'users/myaccount.html',
        controller: 'MyAccountCtrl',
        title: 'MyAccount'
    });
})

.controller('MyAccountCtrl', function UsersController($scope, $window, _, $translate, makemybookingapi, flash) {

  function load() {
    return makemybookingapi.apiRoot.then(function (rootUser) {
        return rootUser.$get('me').then(function (userResource) {
            return userResource.$get('self').then(function (myUser) { // get embedded resources
                $scope.myUserResource = myUser;
                $scope.myUser = angular.copy(myUser);
               

                //init values
                if ($scope.myUser.settings == null) {
                    $scope.myUser.settings = {};
                }
                if ($scope.myUser.settings.fwdays == null) {
                    $scope.myUser.settings.fwdays = 4;
                }
                if ($scope.myUser.settings.whours == null) {
                    $scope.myUser.settings.whours = 10;
                }
                if ($scope.myUser.settings.granularity == null) {
                    $scope.myUser.settings.granularity = 10;
                }
                if ($scope.myUser.settings.startingh == null) {
                    $scope.myUser.settings.startingh = 8;
                }
            });
      }, function (err) {
        flash.addError(err.data);
      });
    });
  }



  $scope.updateUser = function () {
      return makemybookingapi.apiRoot.then(function (rootUser) {
          if ($scope.myUser.password == "") {
              //password did not change so delete it
              delete $scope.myUser;
          }
          return $scope.myUserResource.$put('self', null, $scope.myUser).then(function () {
        flash.add($translate.instant('user.Updated'), 'info');
      }, function (err) {
        flash.addError(err.data);
      });
    })
    .then(load);
  };


  load();
  
});