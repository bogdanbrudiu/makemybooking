angular.module("makemybooking.config", [])

.constant("config", {
	"defaultApiEndpoint": "http://localhost:3000"
})

.constant("appName", "makemybooking-client")

.constant("appVersion", "0.0.1")

.constant("appDescription", "MakeMyBooking.co")

;
'use strict';
angular.module("ngLocale", [], ["$provide", function($provide) {
var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
function getDecimals(n) {
  n = n + '';
  var i = n.indexOf('.');
  return (i == -1) ? 0 : n.length - i - 1;
}

function getVF(n, opt_precision) {
  var v = opt_precision;

  if (undefined === v) {
    v = Math.min(getDecimals(n), 3);
  }

  var base = Math.pow(10, v);
  var f = ((n * base) | 0) % base;
  return {v: v, f: f};
}

$provide.value("$locale", {
  "DATETIME_FORMATS": {
    "AMPMS": [
      "AM",
      "PM"
    ],
    "DAY": [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "MONTH": [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    "SHORTDAY": [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat"
    ],
    "SHORTMONTH": [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    "fullDate": "EEEE, MMMM d, y",
    "longDate": "MMMM d, y",
    "medium": "MMM d, y h:mm:ss a",
    "mediumDate": "MMM d, y",
    "mediumTime": "h:mm:ss a",
    "short": "M/d/yy h:mm a",
    "shortDate": "M/d/yy",
    "shortTime": "h:mm a"
  },
  "NUMBER_FORMATS": {
    "CURRENCY_SYM": "$",
    "DECIMAL_SEP": ".",
    "GROUP_SEP": ",",
    "PATTERNS": [
      {
        "gSize": 3,
        "lgSize": 3,
        "maxFrac": 3,
        "minFrac": 0,
        "minInt": 1,
        "negPre": "-",
        "negSuf": "",
        "posPre": "",
        "posSuf": ""
      },
      {
        "gSize": 3,
        "lgSize": 3,
        "maxFrac": 2,
        "minFrac": 2,
        "minInt": 1,
        "negPre": "\u00a4-",
        "negSuf": "",
        "posPre": "\u00a4",
        "posSuf": ""
      }
    ]
  },
  "id": "en",
  "pluralCat": function(n, opt_precision) {  var i = n | 0;  var vf = getVF(n, opt_precision);  if (i == 1 && vf.v == 0) {    return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;}
});
}]);

'use strict';
angular.module("ngLocale", [], ["$provide", function($provide) {
var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
function getDecimals(n) {
  n = n + '';
  var i = n.indexOf('.');
  return (i == -1) ? 0 : n.length - i - 1;
}

function getVF(n, opt_precision) {
  var v = opt_precision;

  if (undefined === v) {
    v = Math.min(getDecimals(n), 3);
  }

  var base = Math.pow(10, v);
  var f = ((n * base) | 0) % base;
  return {v: v, f: f};
}

$provide.value("$locale", {
  "DATETIME_FORMATS": {
    "AMPMS": [
      "a.m.",
      "p.m."
    ],
    "DAY": [
      "duminic\u0103",
      "luni",
      "mar\u021bi",
      "miercuri",
      "joi",
      "vineri",
      "s\u00e2mb\u0103t\u0103"
    ],
    "MONTH": [
      "ianuarie",
      "februarie",
      "martie",
      "aprilie",
      "mai",
      "iunie",
      "iulie",
      "august",
      "septembrie",
      "octombrie",
      "noiembrie",
      "decembrie"
    ],
    "SHORTDAY": [
      "Dum",
      "Lun",
      "Mar",
      "Mie",
      "Joi",
      "Vin",
      "S\u00e2m"
    ],
    "SHORTMONTH": [
      "ian.",
      "feb.",
      "mar.",
      "apr.",
      "mai",
      "iun.",
      "iul.",
      "aug.",
      "sept.",
      "oct.",
      "nov.",
      "dec."
    ],
    "fullDate": "EEEE, d MMMM y",
    "longDate": "d MMMM y",
    "medium": "d MMM y HH:mm:ss",
    "mediumDate": "d MMM y",
    "mediumTime": "HH:mm:ss",
    "short": "dd.MM.y HH:mm",
    "shortDate": "dd.MM.y",
    "shortTime": "HH:mm"
  },
  "NUMBER_FORMATS": {
    "CURRENCY_SYM": "RON",
    "DECIMAL_SEP": ",",
    "GROUP_SEP": ".",
    "PATTERNS": [
      {
        "gSize": 3,
        "lgSize": 3,
        "maxFrac": 3,
        "minFrac": 0,
        "minInt": 1,
        "negPre": "-",
        "negSuf": "",
        "posPre": "",
        "posSuf": ""
      },
      {
        "gSize": 3,
        "lgSize": 3,
        "maxFrac": 2,
        "minFrac": 2,
        "minInt": 1,
        "negPre": "-",
        "negSuf": "\u00a0\u00a4",
        "posPre": "",
        "posSuf": "\u00a0\u00a4"
      }
    ]
  },
  "id": "ro",
  "pluralCat": function(n, opt_precision) {  var i = n | 0;  var vf = getVF(n, opt_precision);  if (i == 1 && vf.v == 0) {    return PLURAL_CATEGORY.ONE;  }  if (vf.v != 0 || n == 0 || n != 1 && n % 100 >= 1 && n % 100 <= 19) {    return PLURAL_CATEGORY.FEW;  }  return PLURAL_CATEGORY.OTHER;}
});
}]);

(function(module) {
try {
  module = angular.module('makemybooking-client-templates');
} catch (e) {
  module = angular.module('makemybooking-client-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('appointments/appointments.html',
    '<div class="row"><div class="col-md-6"><h2>{{ \'appointment.CreateNew\' | translate }}</h2><form role="form" name="form"><div class="form-group"><input class="form-control" id="title" placeholder="{{ \'appointment.DisplayName\' | translate }}" ng-model="newAppointment.title"></div><div class="form-group"><label for="dateAndTime">{{ \'appointment.DateTime\' | translate }}</label><div class="dropdown"><a class="dropdown-toggle" id="dropdown2" role="button" data-toggle="dropdown" data-target="#"><div class="input-group"><p class="form-control-static">{{ newAppointment.dateAndTime | date:\'d MMM, y H:mm\' }}</p></div></a><ul class="dropdown-menu" role="menu" aria-labelledby="dLabel"><datetimepicker ng-model="newAppointment.dateAndTime" datetimepicker-config="{ dropdownSelector: \'#dropdown2\', startView: \'hour\', minuteStep: 15 }"></ul></div></div><div class="form-group"><label for="duration">{{ \'appointment.Duration\' | translate }}</label><select class="form-control" id="duration" ng-model="newAppointment.duration"><option value="15">15 {{ \'appointment.Minutes\' | translate }}</option><option value="30">30 {{ \'appointment.Minutes\' | translate }}</option><option value="60">60 {{ \'appointment.Minutes\' | translate }}</option><option value="90">90 {{ \'appointment.Minutes\' | translate }}</option></select></div><div class="form-group"><label for="client">{{ \'appointment.Client\' | translate }}</label><select class="form-control" id="client" ng-model="newAppointment.client" ng-options="client as client.displayName for client in clients"><option value="">{{ \'appointment.PickClient\' | translate }}</option></select></div><div class="form-group"><label for="resource">{{ \'appointment.Resource\' | translate }}</label><select class="form-control" id="resource" ng-model="newAppointment.resource" ng-options="resource as resource.displayName for resource in resources"><option value="">{{ \'appointment.PickResource\' | translate }}</option></select></div><div class="form-group"><label for="remarks">{{ \'appointment.Remarks\' | translate }}</label><textarea id="remarks" class="form-control" rows="3" ng-model="newAppointment.remarks"> </textarea></div><button type="submit" class="btn btn-default" ng-click="createAppointment()" ng-disabled="form.$invalid">{{ \'common.Create\' | translate }}</button></form></div><div class="col-md-6"><h2>{{ \'appointment.Upcoming\' | translate }}</h2><p ng-if="upcomingAppointments.length === 0">-- {{ \'common.None\' | translate }} --</p><ul class="list-group"><li class="list-group-item" ng-repeat="appointment in upcomingAppointments"><div><div class="dropdown"><a href="" class="pull-right" ng-click="removeAppointment(appointment)" title="{{ \'common.Remove\' | translate }}"><span class="glyphicon glyphicon-remove"></span></a> <a class="dropdown-toggle" role="button" data-toggle="dropdown" data-target="#" title="{{ \'appointment.Reschedule\' | translate }}" id="appointment{{$index}}" href="" ng-click="setAppointmentForEdit(appointment)"><span class="glyphicon glyphicon-time"></span></a><ul class="dropdown-menu" role="menu"><datetimepicker data-ng-model="editAppointment.dateAndTime" data-datetimepicker-config="{ dropdownSelector: \'#appointment{{$index}}\', startView: \'hour\', minuteStep: 15 }" on-set-time="reschedule(newDate, oldDate)"></ul></div></div><h4 class="list-group-item-heading">{{appointment.title}} <small>{{appointment.dateAndTime | date:\'d MMM, y H:mm\'}}-{{appointment.endDateAndTime | date:\'H:mm\'}}, duration {{appointment.duration}} mins</small></h4><p class="list-group-item-text">{{appointment.remarks}}</p></li></ul><h2>{{ \'appointment.Past\' | translate }}</h2><p ng-if="pastAppointments.length === 0">-- {{ \'common.None\' | translate }} --</p><ul class="list-group"><li class="list-group-item" ng-repeat="appointment in pastAppointments"><div><a href="" class="pull-right" ng-click="removeAppointment(appointment)" title="{{ \'common.Remove\' | translate }}"><span class="glyphicon glyphicon-remove"></span></a></div><h4 class="list-group-item-heading">{{appointment.title}} <small>{{appointment.dateAndTime | date:\'d MMM, y H:mm\'}}-{{appointment.endDateAndTime | date:\'H:mm\'}}, duration {{appointment.duration}} mins</small></h4><p class="list-group-item-text">{{appointment.remarks}}</p></li></ul></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('makemybooking-client-templates');
} catch (e) {
  module = angular.module('makemybooking-client-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('auth/login.html',
    '<h2>Login</h2><p>Appoints doesn\'t store user credentials such as usernames and passwords. It\'s required to use one of the providers below.</p><p></p><form novalidate class="simple-form">Username: <input ng-model="user.username"><br>Password: <input type="password" ng-model="user.password"><br><input type="submit" ng-click="loginLocal(user)" value="Login"></form>');
}]);
})();

(function(module) {
try {
  module = angular.module('makemybooking-client-templates');
} catch (e) {
  module = angular.module('makemybooking-client-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('clients/clients.html',
    '<div class="row"><div class="col-md-6"><h2>{{ \'client.CreateNew\' | translate }}</h2><form role="form" name="form"><div class="form-group"><label for="displayName">{{ \'client.DisplayName\' | translate }}</label><input class="form-control" id="displayName" placeholder="{{ \'client.DisplayName\' | translate }}" ng-model="newClient.displayName"></div><div class="form-group"><label for="phone">{{ \'client.Phone\' | translate }}</label><input class="form-control" id="phone" placeholder="{{ \'client.Phone\' | translate }}" ng-model="newClient.phone"></div><button type="submit" class="btn btn-default" ng-click="createClient()" ng-disabled="form.$invalid">{{ \'common.Create\' | translate }}</button></form></div><div class="col-md-6"><h2>{{ \'client.Clients\' | translate }}</h2><p ng-if="clients.length === 0">-- {{ \'common.None\' | translate }} --</p><ul class="list-group"><li class="list-group-item" ng-repeat="client in clients"><div><div class="dropdown"><a href="" class="pull-right" ng-click="removeClient(client)" title="{{ \'common.Remove\' | translate }}"><span class="glyphicon glyphicon-remove"></span></a></div></div><h4 class="list-group-item-heading">{{client.displayName}} <small>{{client.phone}}</small></h4></li></ul></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('makemybooking-client-templates');
} catch (e) {
  module = angular.module('makemybooking-client-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('home/home.html',
    '<footer class="pull-right">{{ \'home.appName\' | translate }} version {{version}} - &copy; 2015</footer>');
}]);
})();

(function(module) {
try {
  module = angular.module('makemybooking-client-templates');
} catch (e) {
  module = angular.module('makemybooking-client-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('resources/resources.html',
    '<div class="row"><div class="col-md-6"><h2>{{ \'resource.CreateNew\' | translate }}</h2><form role="form" name="form"><div class="form-group"><label for="displayName">{{ \'resource.DisplayName\' | translate }}</label><input class="form-control" id="displayName" placeholder="{{ \'resource.DisplayName\' | translate }}" ng-model="newResource.displayName"></div><button type="submit" class="btn btn-default" ng-click="createResource()" ng-disabled="form.$invalid">{{ \'common.Create\' | translate }}</button></form></div><div class="col-md-6"><h2>{{ \'resource.Resources\' | translate }}</h2><p ng-if="resources.length === 0">-- {{ \'common.None\' | translate }} --</p><ul class="list-group"><li class="list-group-item" ng-repeat="resource in resources"><div><div class="dropdown"><a href="" class="pull-right" ng-click="removeResource(resource)" title="{{ \'common.Remove\' | translate }}"><span class="glyphicon glyphicon-remove"></span></a></div></div><h4 class="list-group-item-heading">{{resource.displayName}}</h4></li></ul></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('makemybooking-client-templates');
} catch (e) {
  module = angular.module('makemybooking-client-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('shared/flash.html',
    '<section ng-controller="FlashCtrl" class="flashcontainer"><div ng-repeat="flashMessage in flashMessages" ng-class="getMessageClass(flashMessage.level)"><button type="button" class="close" data-dismiss="alert" ng-click="dismiss(flashMessage)">&times;</button> {{flashMessage.message}}<ul ng-if="flashMessage.details.errors"><li ng-repeat="error in flashMessage.details.errors">{{error.message}}</li></ul></div></section>');
}]);
})();

(function(module) {
try {
  module = angular.module('makemybooking-client-templates');
} catch (e) {
  module = angular.module('makemybooking-client-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('users/users.html',
    '<div class="row"><div class="col-md-6"><h2>{{ \'user.CreateNew\' | translate }}</h2><form role="form" name="form"><div class="form-group"><label for="displayName">{{ \'user.DisplayName\' | translate }}</label><input class="form-control" id="displayName" placeholder="{{ \'user.DisplayName\' | translate }}" ng-model="newUser.displayName"></div><div class="form-group"><label for="email">{{ \'user.Email\' | translate }}</label><input class="form-control" id="email" placeholder="{{ \'user.Email\' | translate }}" ng-model="newUser.email"></div><div class="form-group"><label for="provider">{{ \'user.Provider\' | translate }}</label><input class="form-control" id="provider" placeholder="{{ \'user.Provider\' | translate }}" ng-model="newUser.provider"></div><div class="form-group"><label for="password">{{ \'user.Password\' | translate }}</label><input type="password" class="form-control" id="password" placeholder="{{ \'user.Password\' | translate }}" ng-model="newUser.password"></div><button type="submit" class="btn btn-default" ng-click="createUser()" ng-disabled="form.$invalid">{{ \'common.Create\' | translate }}</button></form></div><div class="col-md-6"><h2>{{ \'user.Users\' | translate }}</h2><p ng-if="users.length === 0">-- {{ \'common.None\' | translate }} --</p><ul class="list-group"><li class="list-group-item" ng-repeat="user in users"><div><div class="dropdown"><a href="" class="pull-right" ng-click="removeUser(user)" title="{{ \'common.Remove\' | translate }}"><span class="glyphicon glyphicon-remove"></span></a></div></div><h4 class="list-group-item-heading">{{user.displayName}} <small>{{user.provider}}</small></h4><p class="list-group-item-text">{{user.email}}</p><p class="list-group-item-text">{{user.roles.join(\', \')}}</p></li></ul></div></div>');
}]);
})();

angular.module('appoints.directives', []);
angular.module('appoints.flash', []) 
.factory('flash', function ($rootScope, $timeout) {
  var flashes = [];

  function add (message, level, details) {
    level = level || 'info';

    var flash = {
      message: message,
      level: level,
      details: details
    };
    flashes.push(flash);
    $timeout(function () {
      remove(flash);
    }, 5000);
    $rootScope.$broadcast('event:flash.add', flash);
  }

  function addError (err) {
    if (err.message) {
      add(err.message, 'error', err);
    }
    else {
      add(err, 'error');
    }
  }

  function all () {
    return flashes;
  }

  function remove (flashMessage) {
    var index = flashes.indexOf(flashMessage);
    flashes.splice(index, 1);
    $rootScope.$broadcast('event:flash.remove', flashMessage);
  }

  function clear () {
    flashes = [];
    $rootScope.$broadcast('event:flash.clear', true);
  }

  return {
    add: add,
    addError: addError,
    all: all,
    remove: remove,
    clear: clear
  };
})

.controller('FlashCtrl', function ($scope, flash) {
  $scope.flashMessages = [];

  $scope.getMessageClass = function(level) {
    if (level === 'error') {
      level = 'danger';
    }
    return 'alert alert-' + level;
  };

  $scope.dismiss = function (flashMessage) {
    flash.remove(flashMessage);
  };

  $scope.$on('event:flash.add', function() {
    $scope.flashMessages = flash.all();
  });

  $scope.$on('event:flash.remove', function() {
    $scope.flashMessages = flash.all();
  });

  $scope.$on('event:flash.clear', function() {
    $scope.flashMessages = [];
    $scope.$apply();
  });
})

.directive('apHideFlash', function(flash) {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.bind('click', function(e){
        // Clear flash messages when the user clicks anywhere in the element where this directive is applied to.
        var target = angular.element(e.target);
        if (! target.parents().hasClass('flashcontainer')) {
          flash.clear();
        }
      });
    }
  };
});
angular.module('appoints.home', [
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
angular.module('appoints.api', [
  'angular-hal',
  'makemybooking.config'
]) 

.factory('appointsapi', function (halClient, config) {

  var apiRoot = halClient.$get(config.defaultApiEndpoint);

  return {
      apiRoot: apiRoot
  };
  
});
angular.module('appoints.appointments', [
  'ngRoute',
  'appoints.api'
])

.config(function config($routeProvider) {
  $routeProvider
    .when('/appointments', {
      templateUrl: 'appointments/appointments.html',
      controller: 'AppointmentsCtrl',
      title: 'Appointments'
    });
})

.controller('AppointmentsCtrl', function AppointmentsController($scope, $window, _, $translate, appointsapi, flash, moment) {

  function load() {


appointsapi.apiRoot.then(function (rootResource) {
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


appointsapi.apiRoot.then(function (rootResource) {
      return rootResource.$get('resources').then(function (resourcesResource) { 
        return resourcesResource.$get('resources').then(function(resources) { // get embedded resources
         $scope.resources=resources;
        });
      }, function (err) {
        flash.addError(err.data);
      });
    });


appointsapi.apiRoot.then(function (rootResource) {
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
    return appointsapi.apiRoot.then(function (rootResource) {
      // Sync endDateAndTime first
      $scope.newAppointment.endDateAndTime = moment($scope.newAppointment.dateAndTime).add($scope.newAppointment.duration, 'minutes');
      return rootResource.$post('appointments', null, $scope.newAppointment).then(function () {
        flash.add('Appointment created successfully', 'info');
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

  initAppointment();
  load();
  
});
angular.module('appoints.usersession', [
  'appoints.api',
  'appoints.flash',
  'makemybooking.config'
])

.factory('usersession', function ($rootScope, $window, config, flash, appointsapi, _) {

  var defaultSession = {
    userId: '',
    displayName: '',
    isAuthenticated: false,
    roles: [],
    isInRole: function(roleName) {
      return this.isAuthenticated && _(this.roles).contains(roleName);
    },
    isAdmin: function() { 
      return this.isInRole('admin');
    },
    isCustomer: function() {
      return this.isInRole('customer');
    }
  };

  function Session() {
    // always start with a default instance.
    return angular.copy(defaultSession, this);
  }

  var currentSession = new Session();

  function login(token) {
    // Authenticate the user from the given authorization token
    $window.localStorage.setItem('access_token', token);
    return appointsapi.apiRoot.then(function (rootResource) {
      return rootResource.$get('me').then(function (userResource) {
        currentSession.isAuthenticated = true;
        currentSession.userId = userResource.userId;
        currentSession.displayName = userResource.displayName;
        currentSession.roles = userResource.roles;
        $rootScope.$broadcast('event:loggedin', currentSession);
      }, function (err) {
        flash.add(err.message, 'error');
      });
    });
  }

  function logout() {
    $window.localStorage.removeItem('access_token');
    currentSession = new Session();
    $rootScope.$broadcast('event:loggedout', currentSession);
  }

  var returnTo = '';

  return {
    current: currentSession,
    login: login,
    logout: logout,
    returnTo: returnTo
  };
})

.run(function ($window, $rootScope, $log, appointsapi, usersession) {
  // Automatically try to login the user when starting up this module
  if ($window.localStorage.getItem('access_token') !== null) {
    appointsapi.apiRoot.then(function (rootResource) {
      rootResource.$get('me').then(function (userResource) {
        usersession.current.isAuthenticated = true;
        usersession.current.userId = userResource.userId;
        usersession.current.displayName = userResource.displayName;
        usersession.current.roles = userResource.roles;
        $rootScope.$broadcast('event:loggedin', usersession.current);
      }, function (err) {
        $log.info('Unable to login automatically: ' + err.message);
      });    
    });
  }
});
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
angular.module('appoints.resources', [
  'ngRoute',
  'appoints.api'
])

.config(function config($routeProvider) {
  $routeProvider
    .when('/resources', {
      templateUrl: 'resources/resources.html',
      controller: 'ResourcesCtrl',
      title: 'Resources'
    });
})

.controller('ResourcesCtrl', function ResourcesController($scope, $window, _, $translate, appointsapi, flash) {

  function load() {
    return appointsapi.apiRoot.then(function (rootResource) {
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
    return appointsapi.apiRoot.then(function (rootResource) {
      return rootResource.$post('resources', null, $scope.newResource).then(function () {
        flash.add('Resource created successfully', 'info');
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
angular.module('appoints.authinterceptor', [
  'appoints.usersession'
])

.factory('authInterceptor', function ($rootScope, $q, $window, $location, $log, $injector) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.localStorage.getItem('access_token')) {
        config.headers.Authorization = 'Bearer ' + $window.localStorage.getItem('access_token');
      }
      return config;
    },
    response: function (response){
      if (response.status === 401) {
        $log.warn("Response 401");
      }
      return response || $q.when(response);
    },
    responseError: function (rejection) {
      if (rejection.status === 401) {
        var usersession = $injector.get('usersession'); // usersession via injector because of circular dependencies with $http
        $log.info("Response Error 401", rejection);
        usersession.logout();
        var returnTo = $location.path();
        $location.path('/login').search('returnTo', returnTo);
      }
      return $q.reject(rejection);
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
angular.module('appoints.login', [
  'makemybooking.config',
  'appoints.usersession',
  'appoints.api',
  'ngRoute'
])

.config(function config($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'auth/login.html',
      controller: 'LoginCtrl',
      title: 'Login'
    });
})

.run(function ($window, $rootScope, $location, config, usersession) {
	$rootScope.authLogin= function authLogin(token) {
  
	usersession.login(token)
      		.then(function () {
        		if ($rootScope.loginPopup) {
          			$rootScope.loginPopup.close();
          			delete $rootScope.loginPopup;
        		}
        		if (usersession.returnTo) {
          			$location.url(usersession.returnTo);
        		}
        		else {
          			$location.url('/');
        		}
      		});  

}	
  $window.addEventListener('message', function (event) {
    if (event.origin !== config.defaultApiEndpoint) {
      return;
    }
    $rootScope.authLogin(event.data);
  }, false);
})
 

.controller('LoginCtrl', function LoginController($scope, $rootScope, $window, $location, config, usersession, appointsapi) {

  usersession.returnTo = $location.search().returnTo;

  $scope.loginFacebook = function () {
    return authWindow(config.defaultApiEndpoint + '/auth/facebook');
  };

  $scope.loginGoogle = function () {
    return authWindow(config.defaultApiEndpoint + '/auth/google');
  };

  $scope.loginLocal = function (user) {
      appointsapi.apiRoot.then(function (rootResource) {
 return rootResource.$get('localauth', {
              username: user.username,
              password: user.password
          }).then(function(authData) {$rootScope.authLogin(authData.token);});

      });
  };

  function authWindow(authUrl) {
    $rootScope.loginPopup = popupCenterWindow(authUrl, 'authenticate', 640, 500);
    return false;
  }

  function popupCenterWindow(url, title, w, h) {
    var left = (screen.width/2)-(w/2);
    var top = (screen.height/2)-(h/2);
    return $window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
  } 

});
angular.module('appoints', [
  'ngRoute',
  'pascalprecht.translate',
  'tmh.dynamicLocale',
  'ui.bootstrap.datetimepicker',
  'appoints.directives',
  'appoints.flash',
  'appoints.usersession',
  'appoints.authinterceptor',
  'appoints.home',
  'appoints.login',
  'appoints.appointments',
  'appoints.resources',
  'appoints.clients',
  'appoints.users',
  'makemybooking-client-templates'
])

// allow DI for use in controllers, unit tests
.constant('_', window._)
.constant('moment', window.moment)

.config(function($httpProvider, $translateProvider, tmhDynamicLocaleProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $translateProvider.preferredLanguage('en');
  $translateProvider.useStaticFilesLoader({
    'prefix': '/i18n/',
    'suffix': '.json'
  });

  tmhDynamicLocaleProvider.defaultLocale('en');
  tmhDynamicLocaleProvider.localeLocationPattern('/i18n/angular-locale_{{locale}}.js');
})

.controller('AppCtrl', function AppController ($scope, $location, $translate, tmhDynamicLocale, usersession) {
  var defaultPageTitle = 'Appoints';

  $scope.pageTitle = defaultPageTitle;

  $scope.$on('$routeChangeSuccess', function (ev, currentRoute) {
    $scope.pageTitle = currentRoute.title || defaultPageTitle;
  });

  $scope.user = usersession.current;

  $scope.routeIs = function(routeName) {
    return $location.path() === routeName;
  };

  $scope.logout = function () {
    usersession.logout();
    $location.url('/');
  };

  $scope.$on('event:loggedin', function (ev, currentSession) {
    $scope.user = currentSession;
  });

  $scope.$on('event:loggedout', function (ev, currentSession) {
    $scope.user = currentSession;
  });

  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
    tmhDynamicLocale.set(langKey);
  };
  $scope.langKey=$translate.proposedLanguage();

});