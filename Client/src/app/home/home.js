angular.module('makemybooking.home', [
  'makemybooking.config',
  'ngRoute'
])

.config(function config($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home/home.html',
      controller: 'HomeCtrl',
      title: 'Home'
    });
})

.controller('HomeCtrl', function HomeController($scope, appVersion) {
  $scope.version = appVersion;
});