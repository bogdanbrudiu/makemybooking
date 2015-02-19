angular.module('makemybooking.activities', [
  'ngRoute',
  'makemybooking.api'
])

.config(function config($routeProvider) {
  $routeProvider
    .when('/activities', {
      templateUrl: 'activities/activities.html',
      controller: 'ActivitiesCtrl',
      title: 'Activities'
    });
})

.controller('ActivitiesCtrl', function ActivitiesController($scope, $window, _, $translate, makemybookingapi, flash, moment) {

  function load() {
    return makemybookingapi.apiRoot.then(function (rootActivity) {
      return rootActivity.$get('activities').then(function (activitiesActivity) { 
        return activitiesActivity.$get('activities').then(function(activities) { // get embedded activities
	  $scope.activities=activities;
        });
      }, function (err) {
        flash.addError(err.data);
      });
    });
  }

  function initActivity() {
    $scope.newActivity = {
      displayName: ''
    };
  }


  $scope.createActivity = function () {
    return makemybookingapi.apiRoot.then(function (rootActivity) {
      return rootActivity.$post('activities', null, $scope.newActivity).then(function () {
        flash.add($translate.instant('activity.Created'), 'info');
        initActivity();
      }, function (err) {
        flash.addError(err.data);
      });
    })
    .then(load);
  };

  $scope.removeActivity = function (activityActivity) {
    if ($window.confirm($translate.instant('common.AreYouSure'))) {
      return activityActivity.$del('self').then(function (result) {
        flash.add(result.message);
      }, function (err) {
        flash.addError(err.data);
      }).then(load);
    }
  };




  initActivity();
  load();
  
});