angular.module('makemybooking.appointments', [
  'ngRoute',
  'makemybooking.api'
])

.config(function config($routeProvider) {
  $routeProvider
    .when('/appointments', {
      templateUrl: 'appointments/appointments.html',
      controller: 'AppointmentsCtrl',
      title: 'Appointments'
    });
})

.controller('AppointmentsCtrl', function AppointmentsController($scope, $window, _, $translate, makemybookingapi, flash, moment) {

  function load() {


makemybookingapi.apiRoot.then(function (rootResource) {
      return rootResource.$get('appointments').then(function (appointmentsResource) { 
        return appointmentsResource.$get('appointments').then(function(appointments) { // get embedded appointments
          $scope.upcomingAppointments = _.filter(appointments, function (appointment){
            return moment(appointment.dateAndTime) > moment();
          });
          $scope.pastAppointments = _.filter(appointments, function (appointment){
            return moment(appointment.dateAndTime) <= moment();
          });
        });
      }, function (err) {
        flash.addError(err.data);
      });
    });


makemybookingapi.apiRoot.then(function (rootResource) {
      return rootResource.$get('resources').then(function (resourcesResource) { 
        return resourcesResource.$get('resources').then(function(resources) { // get embedded resources
         $scope.resources=resources;
        });
      }, function (err) {
        flash.addError(err.data);
      });
    });


makemybookingapi.apiRoot.then(function (rootResource) {
      return rootResource.$get('clients').then(function (clientsResource) { 
        return clientsResource.$get('clients').then(function(clients) { // get embedded appointments
          $scope.clients=clients;
        });
      }, function (err) {
        flash.addError(err.data);
      });
    });



  }

  function initAppointment() {
    $scope.newAppointment = {
      title: '',
      dateAndTime: moment().startOf('day').add(1, 'days').add(9, 'hours').toDate(),
      duration: 30,
      remarks: ''
    };
    $scope.editAppointment = null;
  }

  $scope.getEndTime = function (appointment) {
    return moment(appointment.dateAndTime).add(appointment.duration, 'minutes').format('H:mm');
  };

  $scope.createAppointment = function () {
    return makemybookingapi.apiRoot.then(function (rootResource) {
      // Sync endDateAndTime first
      $scope.newAppointment.endDateAndTime = moment($scope.newAppointment.dateAndTime).add($scope.newAppointment.duration, 'minutes');
      return rootResource.$post('appointments', null, $scope.newAppointment).then(function () {
        flash.add($translate.instant('appointment.Created'), 'info');
        initAppointment();
      }, function (err) {
        flash.addError(err.data);
      });
    })
    .then(load);
  };

  $scope.removeAppointment = function (appointmentResource) {
    if ($window.confirm($translate.instant('common.AreYouSure'))) {
      return appointmentResource.$del('self').then(function (result) {
        flash.add(result.message);
      }, function (err) {
        flash.addError(err.data);
      }).then(load);
    }
  };

  $scope.setAppointmentForEdit = function (appointment) {
    $scope.editAppointment = angular.copy(appointment);
  };

  $scope.reschedule = function (newDateTime) {
    if ($scope.editAppointment) {
      $scope.editAppointment.dateAndTime = newDateTime;
      $scope.editAppointment.endDateAndTime = moment($scope.editAppointment.dateAndTime).add($scope.editAppointment.duration, 'minutes').toDate();
      var appointmentResource = _($scope.upcomingAppointments).find({ id: $scope.editAppointment.id });
      return appointmentResource.$patch('self', null, { dateAndTime: $scope.editAppointment.dateAndTime, endDateAndTime: $scope.editAppointment.endDateAndTime }).then(function () {
        flash.add('Appointment is rescheduled');
      }, function (err) {
        flash.addError(err.data);
      }).then(load);
    }
  };

  $scope.beforeRender = function ($view, $dates, $leftDate, $upDate, $rightDate) {
makemybookingapi.apiRoot.then(function (rootResource) {
      return rootResource.$get('appointments').then(function (appointmentsResource) { 
        return appointmentsResource.$get('appointments').then(function(appointments) {
    appointments.forEach(function (appointment){
$dates.forEach(function (date){

if(appointments.filter(
	function (element){ 
		if(date.dateValue+new Date().getTimezoneOffset()*60*1000 >= Date.parse(element.dateAndTime) &&
		   date.dateValue+new Date().getTimezoneOffset()*60*1000 < Date.parse(element.endDateAndTime))
		{	 
			return element;
		}
	}).length>0){
$dates[$dates.indexOf(date)].selectable = false;
}

/*
	if(new Date(date.dateValue+new Date().getTimezoneOffset()*60*1000).valueOf()===new Date(Date.parse(appointment.dateAndTime)).valueOf()){
		if($view=="minute" ||
		 appointment.duration==60 || 
		 appointment.duration==30 && appointments.filter(function (element){ if(Date.parse(element.dateAndTime)-30*60*1000==Date.parse(appointment.dateAndTime)){ return element;}}).length>0 ||

		){
			$dates[$dates.indexOf(date)].selectable = false;
		}
	}
*/


})
    });

	})
       })
})
}
  initAppointment();
  load();
  
});