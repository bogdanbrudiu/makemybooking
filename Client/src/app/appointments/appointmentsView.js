angular.module('makemybooking.appointmentsView', [
  'ngRoute',
  'makemybooking.api'
])

.config(function config($routeProvider) {
  $routeProvider
    .when('/appointmentsView', {
      templateUrl: 'appointments/appointmentsView.html',
      controller: 'AppointmentsViewCtrl',
      title: 'AppointmentsView'
    });
})

.controller('AppointmentsViewCtrl', function AppointmentsViewController($scope, $window, _, $translate, makemybookingapi, flash, moment) {

    function load() {





        makemybookingapi.apiRoot.then(function (rootResource) {
            return rootResource.$get('resources').then(function (resourcesResource) { 
                return resourcesResource.$get('resources').then(function (resources) { // get embedded resources
                    if (!angular.equals($scope.resources, resources)) {
                        $scope.resources = resources;
                    }
                });
            }, function (err) {
                flash.addError(err.data);
            });
        });


        makemybookingapi.apiRoot.then(function (rootResource) {
            return rootResource.$get('clients').then(function (clientsResource) { 
                return clientsResource.$get('clients').then(function (clients) { // get embedded appointments
                    if (!angular.equals($scope.clients, clients)) {
                        $scope.clients = clients;
                    }
                });
            }, function (err) {
                flash.addError(err.data);
            });
        });

        $scope.appointmentsPromise = makemybookingapi.apiRoot.then(function (rootResource) {
            return rootResource.$get('appointments').then(function (appointmentsResource) {
                return appointmentsResource.$get('appointments').then(function (appointments) { // get embedded appointments
                    $scope.appointments = appointments;
                    $scope.refreshBusy(appointments);
                    return appointments;
                });
            }, function (err) {
                flash.addError(err.data);
            });
        });
        return $scope.appointmentsPromise;

    }
    $scope.updateDuration = function () {
        total = 0;
        $scope.newAppointment.remarks.forEach(function (activity) {
            total += activity.duration;
        });
        $scope.newAppointment.duration = total;
    }

    $scope.refreshBusy = function (appointments) {
        //$('.bootstraptable').bootstrapTable('destroy');
        $('td').removeClass("isbusy");
        appointments.forEach(function (appointment) {
            if (appointment.resource) {
                appDate = new Date(appointment.dateAndTime);
                appDate.setHours(0, 0, 0, 0);
                today = new Date();
                today.setHours(0, 0, 0, 0);
                day = (appDate - today) / (1000 * 60 * 60 * 24);

                for (i = 0; i < appointment.duration / 15; i++) {
                    min = new Date(appointment.dateAndTime).getMinutes() + i * 15;
                    hour = new Date(appointment.dateAndTime).getHours() + Math.floor(min / 60);
                    time = hour + "-" + (min % 60 == 0 ? "00" : min % 60);
                    
                    $('td[id^="cell_' + day + '_' + time + '_' + (appointment.resource ? appointment.resource.id : '') + '"]').addClass("isbusy");
                }
            }
        });
    }


    $scope.refreshCandidate = function () {
        if ($scope.newAppointment == null || $scope.newAppointment.resource == null) {
            return;
        }
        $('td').removeClass("iscandidate");
        appDate = new Date($scope.newAppointment.dateAndTime);
        appDate.setHours(0, 0, 0, 0);
        today = new Date();
        today.setHours(0, 0, 0, 0);
        day = (appDate - today) / (1000 * 60 * 60 * 24);
                
        for (i = 0; i < $scope.newAppointment.duration / 15; i++) {
            min=new Date($scope.newAppointment.dateAndTime).getMinutes() + i*15;
            hour=new Date($scope.newAppointment.dateAndTime).getHours()+Math.floor(min/60);
            time = hour + "-" + (min % 60 == 0 ? "00" : min % 60);

            $('td[id^="cell_' + day + '_' + time + '_' + $scope.newAppointment.resource.id + '"]').addClass("iscandidate");
        }
    }

    $scope.$watch(function (scope) { return scope.newAppointment.dateAndTime; }, function () { $scope.refreshCandidate(); });
    $scope.$watch(function (scope) { return scope.newAppointment.duration; }, function () { $scope.refreshCandidate();  });
    $scope.$watchCollection(function (scope) { return scope.newAppointment.remarks; }, function () { $scope.updateDuration(); });

    function initAppointment() {
        $scope.newAppointment = {
            title: '',
            dateAndTime: moment().startOf('day').add(1, 'days').add(9, 'hours').toDate(),
            duration: 30,
            remarks: [$scope.activities[0]]
        };
        $scope.editAppointment = null;
    }

    $scope.getEndTime = function (appointment) {
        return moment(appointment.dateAndTime).add(appointment.duration, 'minutes').format('H:mm');
    };
  
    $scope.setDate = function (day, time, resource) {
        $scope.newAppointment.dateAndTime = new Date();
        $scope.newAppointment.dateAndTime.setDate($scope.newAppointment.dateAndTime.getDate() + parseInt(day));
        $scope.newAppointment.dateAndTime.setHours(parseInt(time.split(':')[0]), parseInt(time.split(':')[1]), 0, 0);
        $scope.resources.forEach(function (loopResource) {
            if (loopResource.id === resource) {
                $scope.newAppointment.resource = loopResource;
                return;
            }
        });
      
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

    $scope.activities = [{ id: 1, displayName: "tuns", duration: 30 },
        { id: 2, displayName: "frezat", duration: 15 },
        { id: 3, displayName: "volpsit", duration: 45 }
    ];

    $scope.fwdays = 3;
    $scope.whours = 10;
    var today = new Date();
    $scope.days = [today.getDay() % 7,
                  (today.getDay() + 1) % 7,
                  (today.getDay() + 2) % 7,
                  (today.getDay() + 3) % 7,
                  (today.getDay() + 4) % 7,
                  (today.getDay() + 5) % 7,
                  (today.getDay() + 6) % 7];
    $scope.times = [];
    for (var i = 0; i < $scope.whours * 60; i = i + 15) {
        $scope.times.push(((i - (i % 60)) / 60) + 8 + ":" + (i % 60==0?"00":i%60));
    }
    $scope.updateResource = function (resource) {
        $scope.newAppointment.resource = resource;
    }

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


                        })
                    });

                })
            })
        })
    }
    initAppointment();
    $scope.appointmentsPromise = load();
  
})
 .directive('bootstraptable', ['$timeout', function (timer) {
    /* Note the injection of the $timeout service */
    return {
        link: function (scope, elem, attrs, ctrl) {
            var bootstrapTable = function () {
                scope.appointmentsPromise.then(function () {
                    if (!angular.element(elem).hasClass("bootstrapTable")) {
                        angular.element(elem).bootstrapTable();
                        angular.element(elem).addClass("bootstrapTable");
                        angular.element(elem).find('td:not(:first-child):not(.isbusy)').click(function () {
                            cellid = this.id;
                            cellid = cellid.substr(5);
                            day = cellid.split("_")[0];
                            time = cellid.split("_")[1].replace("-", ":");
                            resource = cellid.split("_")[2];

                            scope.setDate(day, time, resource);
                        });
                    }
                });
            }
            // hello();
            timer(bootstrapTable, 0);
            // It works even with a delay of 0s
        }
    }   
 }])
 