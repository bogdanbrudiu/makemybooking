angular.module('makemybooking.public', [
  'makemybooking.config',
  'makemybooking.api',
  'makemybooking.flash',
  'ngRoute'
])

.config(function config($routeProvider) {
  $routeProvider
    .when('/public', {
      templateUrl: 'public/public.html',
      controller: 'PublicCtrl',
      title: 'Public'
    });
})

.controller('PublicCtrl', function PublicController($scope,flash, makemybookingapi) {
  makemybookingapi.apiRoot.then(function (rootResource) {
      return rootResource.$get('me').then(function (userResource) {
       $scope.user=userResource;
      }, function (err) {
        flash.addError(err.data);
      });
});

});
