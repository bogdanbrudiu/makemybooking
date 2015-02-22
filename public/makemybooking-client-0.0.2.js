angular.module('makemybooking.contacts', ["googleApi"])
    .config(function(googleLoginProvider) {
        googleLoginProvider.configure({
            clientId: '390294162018-trdjjr9s1vhb2qdnn3gi7gm3kq8ucc97.apps.googleusercontent.com',
            scopes: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/plus.login", "https://www.googleapis.com/auth/contacts.readonly"]
        });
    }).service("googleContacts", function(googleApiBuilder, $rootScope) {

 
       var self = this;

        var itemExtractor = function(resp) { return resp.items; };


        googleApiBuilder.afterClientLoaded(function() {
 
           var authParams = gapi.auth.getToken() // from Google oAuth

authParams.alt = 'json';

 self.listContacts = function(itemExtractor) {



return $.ajax({
  url: 'https://www.google.com/m8/feeds/contacts/default/full',
  dataType: 'jsonp',
  data: authParams
}).fail(function (err){
	console.log(err);
});


}


        });


    }) 
    .controller('ContactsController', ['$scope', 'googleLogin', 'googleCalendar', 'googlePlus', 'googleContacts', function ($scope, googleLogin, googleCalendar, googlePlus, googleContacts) {

        $scope.login = function () {
            googleLogin.login();
        };

        $scope.$on("googlePlus:loaded", function() {
          googlePlus.getCurrentUser().then(function(user) {
            $scope.currentUser = user;
          });
        })
        $scope.currentUser = googleLogin.currentUser;

        $scope.loadEvents = function() {
            googleCalendar.listEvents({calendarId: this.selectedCalendar.id}).then(function (calendarItems){
			$scope.calendarItems = calendarItems;
		});
        }

        $scope.loadCalendars = function() {
            googleCalendar.listCalendars().then(function (calendars){
			$scope.calendars = calendars;
		});
        }
	$scope.loadContacts = function() {
            googleContacts.listContacts().then(function (contactItems){
			$scope.contactItems = contactItems;
		});
        }
    }]);
angular.module("makemybooking.config", [])

.constant("config", {
	"defaultApiEndpoint": "/api"
})

.constant("appName", "makemybooking-client")

.constant("appVersion", "0.0.2")

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
  $templateCache.put('activities/activities.html',
    '<div class="row"><div class="col-md-6"><h2>{{ \'activity.CreateNew\' | translate }}</h2><form role="form" name="form"><div class="form-group"><label for="displayName">{{ \'activity.DisplayName\' | translate }}</label><input class="form-control" id="displayName" placeholder="{{ \'activity.DisplayName\' | translate }}" ng-model="newActivity.displayName"></div><div class="form-group"><label for="duration">{{ \'activity.Duration\' | translate }}</label><input class="form-control" id="duration" placeholder="{{ \'activity.Duration\' | translate }}" ng-model="newActivity.duration"></div><button type="submit" class="btn btn-default" ng-click="createActivity()" ng-disabled="form.$invalid">{{ \'common.Create\' | translate }}</button></form></div><div class="col-md-6"><h2>{{ \'activity.Activities\' | translate }}</h2><p ng-if="activities.length === 0">-- {{ \'common.None\' | translate }} --</p><ul class="list-group"><li class="list-group-item" ng-repeat="activity in activities"><div><div class="dropdown"><a href="" class="pull-right" ng-click="removeActivity(activity)" title="{{ \'common.Remove\' | translate }}"><span class="glyphicon glyphicon-remove"></span></a></div></div><h4 class="list-group-item-heading">{{activity.displayName}} <small>{{activity.duration}}</small></h4></li></ul></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('makemybooking-client-templates');
} catch (e) {
  module = angular.module('makemybooking-client-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('appointments/appointments.html',
    '<div class="row"><div class="col-md-6"><h2>{{ \'appointment.CreateNew\' | translate }}</h2><form role="form" name="form"><div class="form-group"><input class="form-control" id="title" placeholder="{{ \'appointment.DisplayName\' | translate }}" ng-model="newAppointment.title"></div><div class="form-group"><label for="resource">{{ \'appointment.Resource\' | translate }}</label><select class="form-control" id="resource" ng-model="newAppointment.resource" ng-options="resource as resource.displayName for resource in resources"><option value="">{{ \'appointment.PickResource\' | translate }}</option></select></div><div class="form-group"><label for="dateAndTime">{{ \'appointment.DateTime\' | translate }}</label><div class="dropdown"><a class="dropdown-toggle" id="dropdown2" role="button" data-toggle="dropdown" data-target="#"><div class="input-group"><p class="form-control-static">{{ newAppointment.dateAndTime | date:\'d MMM, y H:mm\' }}</p></div></a><ul class="dropdown-menu" role="menu" aria-labelledby="dLabel"><datetimepicker ng-model="newAppointment.dateAndTime" data-before-render="beforeRender($view, $dates, $leftDate, $upDate, $rightDate)" datetimepicker-config="{ dropdownSelector: \'#dropdown2\', startView: \'hour\', minuteStep: 15 }"></ul></div></div><div class="form-group"><label for="duration">{{ \'appointment.Duration\' | translate }}</label><select class="form-control" id="duration" ng-model="newAppointment.duration"><option value="15">15 {{ \'appointment.Minutes\' | translate }}</option><option value="30">30 {{ \'appointment.Minutes\' | translate }}</option><option value="60">60 {{ \'appointment.Minutes\' | translate }}</option><option value="90">90 {{ \'appointment.Minutes\' | translate }}</option></select></div><div class="form-group"><label for="client">{{ \'appointment.Client\' | translate }}</label><select class="form-control" id="client" ng-model="newAppointment.client" ng-options="client as client.displayName for client in clients"><option value="">{{ \'appointment.PickClient\' | translate }}</option></select></div><div class="form-group"><label for="remarks">{{ \'appointment.Remarks\' | translate }}</label><textarea id="remarks" class="form-control" rows="3" ng-model="newAppointment.remarks"> </textarea></div><button type="submit" class="btn btn-default" ng-click="createAppointment()" ng-disabled="form.$invalid">{{ \'common.Create\' | translate }}</button></form></div><div class="col-md-6"><h2>{{ \'appointment.Upcoming\' | translate }}</h2><p ng-if="upcomingAppointments.length === 0">-- {{ \'common.None\' | translate }} --</p><ul class="list-group"><li class="list-group-item" ng-repeat="appointment in upcomingAppointments"><div><div class="dropdown"><a href="" class="pull-right" ng-click="removeAppointment(appointment)" title="{{ \'common.Remove\' | translate }}"><span class="glyphicon glyphicon-remove"></span></a> <a class="dropdown-toggle" role="button" data-toggle="dropdown" data-target="#" title="{{ \'appointment.Reschedule\' | translate }}" id="appointment{{$index}}" href="" ng-click="setAppointmentForEdit(appointment)"><span class="glyphicon glyphicon-time"></span></a><ul class="dropdown-menu" role="menu"><datetimepicker data-ng-model="editAppointment.dateAndTime" data-datetimepicker-config="{ dropdownSelector: \'#appointment{{$index}}\', startView: \'hour\', minuteStep: 15 }" on-set-time="reschedule(newDate, oldDate)"></ul></div></div><h4 class="list-group-item-heading">{{appointment.title}} <small>{{appointment.dateAndTime | date:\'d MMM, y H:mm\'}}-{{appointment.endDateAndTime | date:\'H:mm\'}}, duration {{appointment.duration}} mins</small></h4><p class="list-group-item-text">{{appointment.remarks}}</p></li></ul><h2>{{ \'appointment.Past\' | translate }}</h2><p ng-if="pastAppointments.length === 0">-- {{ \'common.None\' | translate }} --</p><ul class="list-group"><li class="list-group-item" ng-repeat="appointment in pastAppointments"><div><a href="" class="pull-right" ng-click="removeAppointment(appointment)" title="{{ \'common.Remove\' | translate }}"><span class="glyphicon glyphicon-remove"></span></a></div><h4 class="list-group-item-heading">{{appointment.title}} <small>{{appointment.dateAndTime | date:\'d MMM, y H:mm\'}}-{{appointment.endDateAndTime | date:\'H:mm\'}}, duration {{appointment.duration}} mins</small></h4><p class="list-group-item-text">{{appointment.remarks}}</p></li></ul></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('makemybooking-client-templates');
} catch (e) {
  module = angular.module('makemybooking-client-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('appointments/appointmentsView.html',
    '<div class="row"><div class="col-md-6"><h2>{{ \'appointment.CreateNew\' | translate }}</h2><form role="form" name="form"><div class="form-group"><input class="form-control" id="title" placeholder="{{ \'appointment.DisplayName\' | translate }}" ng-model="newAppointment.title"></div><tabset justified="true"><tab ng-repeat="resource in resources" heading="{{resource.displayName}}" ng-click="updateResource(resource)"><table id="{{resource.id}}" data-toggle="table" data-height="300" data-classes="table table-ultracondensed" bootstraptable><thead><tr><th>Hour</th><th ng-repeat=" day in days.slice(0,fwdays) ">{{ [\'Sun\', \'Mon\', \'Tue\', \'Wed\', \'Thu\', \'Fri\', \'Sat\'][day] }}</th></tr></thead><tr id="tr_id{{$index}}" ng-repeat="time in times"><td>{{time}}</td><td id="cell_{{$index}}_{{time.replace(\':\',\'-\')}}_{{resource.id}}" ng-repeat=" day in days.slice(0,fwdays) " day="{{$index}}" time="{{time}}" resource="{{resource.id}}" is-busy>&nbsp;</td></tr></table></tab></tabset><button type="submit" class="btn btn-default" ng-click="createAppointment()" ng-disabled="form.$invalid">{{ \'common.Create\' | translate }}</button></form></div><div class="col-md-6"><div class="form-group"><label for="dateAndTime">{{ \'appointment.DateTime\' | translate }}</label><div class="dropdown"><a class="dropdown-toggle" id="dropdown2" role="button" data-toggle="dropdown" data-target="#"><div class="input-group"><p class="form-control-static">{{ newAppointment.dateAndTime | date:\'d MMM, y H:mm\' }}</p></div></a><ul class="dropdown-menu" role="menu" aria-labelledby="dLabel"><datetimepicker ng-model="newAppointment.dateAndTime" data-before-render="beforeRender($view, $dates, $leftDate, $upDate, $rightDate)" datetimepicker-config="{ dropdownSelector: \'#dropdown2\', startView: \'hour\', minuteStep: 15 }"></ul></div></div><div class="form-group"><label for="duration">{{ \'appointment.Duration\' | translate }}</label><select class="form-control" id="duration" ng-model="newAppointment.duration"><option value="15">15 {{ \'appointment.Minutes\' | translate }}</option><option value="30">30 {{ \'appointment.Minutes\' | translate }}</option><option value="45">45 {{ \'appointment.Minutes\' | translate }}</option><option value="60">60 {{ \'appointment.Minutes\' | translate }}</option><option value="75">75 {{ \'appointment.Minutes\' | translate }}</option><option value="90">90 {{ \'appointment.Minutes\' | translate }}</option></select></div><div class="form-group"><label for="client">{{ \'appointment.Client\' | translate }}</label><select class="form-control" id="client" ng-model="newAppointment.client" ng-options="client as client.displayName for client in clients"><option value="">{{ \'appointment.PickClient\' | translate }}</option></select></div><div class="form-group"><div class="checkbox" ng-repeat="activity in activities"><label><input type="checkbox" checklist-model="newAppointment.remarks" checklist-value="activity"> {{activity.displayName}} {{activity.duration}}</label></div></div></div></div>');
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
    '<div class="row"><div class="col-md-6"><h2>{{ \'home.Login\' | translate }}</h2><form role="form" name="form"><div class="form-group"><label for="username">{{ \'user.Email\' | translate }}:</label><input id="username" class="form-control" ng-model="user.username"></div><div class="form-group"><label for="password">{{ \'user.Password\' | translate }}:</label><input id="password" class="form-control" type="password" ng-model="user.password"></div><button type="submit" ng-click="loginLocal(user)" class="btn btn-default">{{ \'home.Login\' | translate }}</button><br><br><a href="" ng-click="loginGoogle()">Login with Google</a></form></div></div>');
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
    '<div class="row"><div class="col-md-6"><h2>{{ \'client.CreateNew\' | translate }}</h2><form role="form" name="form"><div class="form-group"><label for="displayName">{{ \'client.DisplayName\' | translate }}</label><input class="form-control" id="displayName" placeholder="{{ \'client.DisplayName\' | translate }}" ng-model="newClient.displayName"></div><div class="form-group"><label for="phone">{{ \'client.Phone\' | translate }}</label><input class="form-control" id="phone" placeholder="{{ \'client.Phone\' | translate }}" ng-model="newClient.phone"></div><div class="form-group"><label for="email">{{ \'client.Email\' | translate }}</label><input class="form-control" id="email" placeholder="{{ \'client.Email\' | translate }}" ng-model="newClient.email"></div><button type="submit" class="btn btn-default" ng-click="createClient()" ng-disabled="form.$invalid">{{ \'common.Create\' | translate }}</button></form></div><div class="col-md-6"><h2>{{ \'client.Clients\' | translate }}</h2><p ng-if="clients.length === 0">-- {{ \'common.None\' | translate }} --</p><ul class="list-group"><li class="list-group-item" ng-repeat="client in clients"><div><div class="dropdown"><a href="" class="pull-right" ng-click="removeClient(client)" title="{{ \'common.Remove\' | translate }}"><span class="glyphicon glyphicon-remove"></span></a></div></div><h4 class="list-group-item-heading">{{client.displayName}} <small>{{client.phone}}</small></h4></li></ul></div></div>');
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
    '<p translate="{{ \'home.home\' | translate }}"></p><footer class="pull-right">{{ \'home.appName\' | translate }} version {{version}} - &copy; Bogdan-Ioan BRUDIU 2015</footer>');
}]);
})();

(function(module) {
try {
  module = angular.module('makemybooking-client-templates');
} catch (e) {
  module = angular.module('makemybooking-client-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('public/public.html',
    '<p translate="{{ \'home.Public\' | translate }}"></p><p>&lt;iframe src="#/publicappointments/{{user.userId}}"/&gt;</p>');
}]);
})();

(function(module) {
try {
  module = angular.module('makemybooking-client-templates');
} catch (e) {
  module = angular.module('makemybooking-client-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('publicappointments/publicappointments.html',
    '<div class="row"><div class="col-md-6"><h2>{{ \'appointment.CreateNew\' | translate }}</h2><form role="form" name="form"><div class="form-group"><label for="title">{{ \'appointment.DisplayName\' | translate }}</label><input class="form-control" id="title" placeholder="{{ \'appointment.DisplayName\' | translate }}" ng-model="newAppointment.title"></div><div class="form-group"><label for="email">{{ \'appointment.Email\' | translate }}</label><input class="form-control" id="email" placeholder="{{ \'client.Email\' | translate }}" ng-model="newAppointment.client.email"></div><tabset justified="true"><tab ng-repeat="resource in resources" heading="{{resource.displayName}}" ng-click="updateResource(resource)"><table id="{{resource.id}}" data-toggle="table" data-height="300" data-classes="table table-ultracondensed" bootstraptable><thead><tr><th>Hour</th><th ng-repeat=" day in days.slice(0,fwdays) ">{{ [\'Sun\', \'Mon\', \'Tue\', \'Wed\', \'Thu\', \'Fri\', \'Sat\'][day] }}</th></tr></thead><tr id="tr_id{{$index}}" ng-repeat="time in times"><td>{{time}}</td><td id="cell_{{$index}}_{{time.replace(\':\',\'-\')}}_{{resource.id}}" ng-repeat=" day in days.slice(0,fwdays) " day="{{$index}}" time="{{time}}" resource="{{resource.id}}" is-busy>&nbsp;</td></tr></table></tab></tabset><button type="submit" class="btn btn-default" ng-click="createAppointment()" ng-disabled="form.$invalid">{{ \'common.Create\' | translate }}</button></form></div><div class="col-md-6"><div class="form-group"><label for="dateAndTime">{{ \'appointment.DateTime\' | translate }}</label><div class="dropdown"><a class="dropdown-toggle" id="dropdown2" role="button" data-toggle="dropdown" data-target="#"><div class="input-group"><p class="form-control-static">{{ newAppointment.dateAndTime | date:\'d MMM, y H:mm\' }}</p></div></a><ul class="dropdown-menu" role="menu" aria-labelledby="dLabel"><datetimepicker ng-model="newAppointment.dateAndTime" data-before-render="beforeRender($view, $dates, $leftDate, $upDate, $rightDate)" datetimepicker-config="{ dropdownSelector: \'#dropdown2\', startView: \'hour\', minuteStep: 15 }"></ul></div></div><div class="form-group"><div class="checkbox" ng-repeat="activity in activities"><label><input type="checkbox" checklist-model="newAppointment.remarks" checklist-value="activity"> {{activity.displayName}} {{activity.duration}}</label></div></div></div></div>');
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
  $templateCache.put('users/myaccount.html',
    '<div class="row"><div class="col-md-6"><h2>{{ \'home.MyAccount\' | translate }}</h2><form role="form" name="form"><div class="form-group"><label for="displayName">{{ \'user.DisplayName\' | translate }}</label><input class="form-control" id="displayName" placeholder="{{ \'user.DisplayName\' | translate }}" ng-model="myUser.displayName"></div><div class="form-group"><label for="email">{{ \'user.Email\' | translate }}</label><input class="form-control" id="email" placeholder="{{ \'user.Email\' | translate }}" ng-model="myUser.email"></div><div class="form-group"><label for="password">{{ \'user.Password\' | translate }}</label><input type="password" class="form-control" id="password" placeholder="{{ \'user.Password\' | translate }}" ng-model="myUser.password"></div><div class="form-group"><label for="allowsPublic"><input type="checkbox" id="allowsPublic" ng-model="myUser.allowsPublic"> {{ \'user.AllowsPublic\' | translate }}</label></div><hr><div class="form-group"><label for="fwdays">{{ \'user.fwdays\' | translate }}</label><input class="form-control" id="fwdays" placeholder="{{ \'user.fwdays\' | translate }}" ng-model="myUser.settings.fwdays"></div><div class="form-group"><label for="whours">{{ \'user.whours\' | translate }}</label><input class="form-control" id="whours" placeholder="{{ \'user.whours\' | translate }}" ng-model="myUser.settings.whours"></div><div class="form-group"><label for="granularity">{{ \'user.granularity\' | translate }}</label><input class="form-control" id="granularity" placeholder="{{ \'user.granularity\' | translate }}" ng-model="myUser.settings.granularity"></div><div class="form-group"><label for="startingh">{{ \'user.startingh\' | translate }}</label><input class="form-control" id="startingh" placeholder="{{ \'user.startingh\' | translate }}" n ng-model="myUser.settings.startingh"></div><button type="submit" class="btn btn-default" ng-click="updateUser()" ng-disabled="form.$invalid">{{ \'common.Update\' | translate }}</button></form></div></div>');
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
    '<div class="row"><div class="col-md-6"><h2>{{ \'user.CreateNew\' | translate }}</h2><form role="form" name="form"><div class="form-group"><label for="displayName">{{ \'user.DisplayName\' | translate }}</label><input class="form-control" id="displayName" placeholder="{{ \'user.DisplayName\' | translate }}" ng-model="newUser.displayName"></div><div class="form-group"><label for="email">{{ \'user.Email\' | translate }}</label><input class="form-control" id="email" placeholder="{{ \'user.Email\' | translate }}" ng-model="newUser.email"></div><div class="form-group"><label for="provider">{{ \'user.Provider\' | translate }}</label><input class="form-control" id="provider" placeholder="{{ \'user.Provider\' | translate }}" ng-model="newUser.provider"></div><div class="form-group"><label for="password">{{ \'user.Password\' | translate }}</label><input type="password" class="form-control" id="password" placeholder="{{ \'user.Password\' | translate }}" ng-model="newUser.password"></div><div class="form-group"><label for="allowsPublic"><input type="checkbox" id="allowsPublic" ng-model="newUser.allowsPublic"> {{ \'user.AllowsPublic\' | translate }}</label></div><button type="submit" class="btn btn-default" ng-click="createUser()" ng-disabled="form.$invalid">{{ \'common.Create\' | translate }}</button></form></div><div class="col-md-6"><h2>{{ \'user.Users\' | translate }}</h2><p ng-if="users.length === 0">-- {{ \'common.None\' | translate }} --</p><ul class="list-group"><li class="list-group-item" ng-repeat="user in users"><div><div class="dropdown"><a href="" class="pull-right" ng-click="removeUser(user)" title="{{ \'common.Remove\' | translate }}"><span class="glyphicon glyphicon-remove"></span></a></div></div><h4 class="list-group-item-heading">{{user.displayName}} <small>{{user.provider}}</small></h4><p class="list-group-item-text">{{user.email}}</p><p class="list-group-item-text">{{user.roles.join(\', \')}}</p></li></ul></div></div>');
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

angular.module('makemybooking.directives', []);
angular.module('makemybooking.flash', []) 
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
angular.module('makemybooking.api', [
  'angular-hal',
  'makemybooking.config'
]) 

.factory('makemybookingapi', function (halClient, config) {

  var apiRoot = halClient.$get(config.defaultApiEndpoint);

  return {
      apiRoot: apiRoot
  };
  
});
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

    $scope.fwdays = 3;
    $scope.whours = 10;
    $scope.granularity = 10;
    $scope.celsMerge = 3;
    var today = new Date();
    $scope.days = [today.getDay() % 7,
                  (today.getDay() + 1) % 7,
                  (today.getDay() + 2) % 7,
                  (today.getDay() + 3) % 7,
                  (today.getDay() + 4) % 7,
                  (today.getDay() + 5) % 7,
                  (today.getDay() + 6) % 7];
    $scope.times = [];
    for (var i = 0; i < $scope.whours * 60; i = i + $scope.granularity) {
        $scope.times.push(((i - (i % 60)) / 60) + 8 + ":" + (i % 60 == 0 ? "00" : i % 60));
    }

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

        makemybookingapi.apiRoot.then(function (rootResource) {
            return rootResource.$get('activities').then(function (activitiesResource) {
                return activitiesResource.$get('activities').then(function (activities) { // get embedded appointments
                    if (!angular.equals($scope.activities, activities)) {
                        $scope.activities = activities;
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
            total += parseInt(activity.duration);
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

                for (i = 0; i < appointment.duration / $scope.granularity; i++) {
                    min = new Date(appointment.dateAndTime).getMinutes() + i * $scope.granularity;
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
                
        for (i = 0; i < $scope.newAppointment.duration / $scope.granularity; i++) {
            min = new Date($scope.newAppointment.dateAndTime).getMinutes() + i * $scope.granularity;
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
            remarks: []
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
        
 $scope.appointmentsPromise.then(function(appointments) {
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
    });
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
                        scope.times.forEach(function (time, index, times) {
                            if (index % scope.celsMerge ==1) {
                                angular.element(elem).bootstrapTable('mergeCells', {
                                    index: index - 1,
                                    field: 0,
                                    rowspan: scope.celsMerge
                                });
                                if (index % (60 / scope.granularity) == 1) {
                                    angular.element(elem).find('#tr_id' + (index - 1)).addClass('highlighthour');
                                } else {
                                    angular.element(elem).find('#tr_id' + (index - 1)).addClass('highlight');
                                }
                            }
                           
                        });
                       


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
 
angular.module('makemybooking.usersession', [
  'makemybooking.api',
  'makemybooking.flash',
  'makemybooking.config'
])

.factory('usersession', function ($rootScope, $window, config, flash, makemybookingapi, _) {

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
    },
    allowsPublic: false
  };

  function Session() {
    // always start with a default instance.
    return angular.copy(defaultSession, this);
  }

  var currentSession = new Session();

  function login(token) {
    // Authenticate the user from the given authorization token
    $window.localStorage.setItem('access_token', token);
    return makemybookingapi.apiRoot.then(function (rootResource) {
      return rootResource.$get('me').then(function (userResource) {
        currentSession.isAuthenticated = true;
        currentSession.userId = userResource.userId;
        currentSession.displayName = userResource.displayName;
        currentSession.roles = userResource.roles;
        currentSession.allowsPublic = userResource.allowsPublic;
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

.run(function ($window, $rootScope, $log, makemybookingapi, usersession) {
  // Automatically try to login the user when starting up this module
  if ($window.localStorage.getItem('access_token') !== null) {
    makemybookingapi.apiRoot.then(function (rootResource) {
      rootResource.$get('me').then(function (userResource) {
        usersession.current.isAuthenticated = true;
        usersession.current.userId = userResource.userId;
        usersession.current.displayName = userResource.displayName;
        usersession.current.roles = userResource.roles;
        usersession.current.allowsPublic = userResource.allowsPublic;
        $rootScope.$broadcast('event:loggedin', usersession.current);
      }, function (err) {
        $log.info('Unable to login automatically: ' + err.message);
      });    
    });
  }
});
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

angular.module('makemybooking.publicappointments', [
  'ngRoute',
  'makemybooking.api'
])

.config(function config($routeProvider) {
  $routeProvider
    .when('/publicappointments/:userId', {
      templateUrl: 'publicappointments/publicappointments.html',
      controller: 'PublicAppointmentsCtrl',
      title: 'PublicAppointments'
    });
})

.controller('PublicAppointmentsCtrl', function AppointmentsViewController($scope, $window, _, $translate, makemybookingapi, flash, moment) {

    $scope.fwdays = 7;
    $scope.whours = 10;
    $scope.granularity = 10;
    $scope.celsMerge = 3;
    var today = new Date();
    $scope.days = [today.getDay() % 7,
                  (today.getDay() + 1) % 7,
                  (today.getDay() + 2) % 7,
                  (today.getDay() + 3) % 7,
                  (today.getDay() + 4) % 7,
                  (today.getDay() + 5) % 7,
                  (today.getDay() + 6) % 7];
    $scope.times = [];
    for (var i = 0; i < $scope.whours * 60; i = i + $scope.granularity) {
        $scope.times.push(((i - (i % 60)) / 60) + 8 + ":" + (i % 60 == 0 ? "00" : i % 60));
    }

    function load() {


        makemybookingapi.apiRoot.then(function (rootResource) {
            return rootResource.$get('publicresources', {'userId':$scope.$parent.currentRoute.params.userId}).then(function (resourcesResource) { 
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
            return rootResource.$get('publicactivities', {'userId':$scope.$parent.currentRoute.params.userId}).then(function (activitiesResource) {
                return activitiesResource.$get('activities').then(function (activities) { // get embedded appointments
                    if (!angular.equals($scope.activities, activities)) {
                        $scope.activities = activities;
                    }
                });
            }, function (err) {
                flash.addError(err.data);
            });
        });

        $scope.appointmentsPromise = makemybookingapi.apiRoot.then(function (rootResource) {
            return rootResource.$get('publicappointments', {'userId':$scope.$parent.currentRoute.params.userId}).then(function (appointmentsResource) {
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
            total += parseInt(activity.duration);
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

                for (i = 0; i < appointment.duration / $scope.granularity; i++) {
                    min = new Date(appointment.dateAndTime).getMinutes() + i * $scope.granularity;
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
                
        for (i = 0; i < $scope.newAppointment.duration / $scope.granularity; i++) {
            min = new Date($scope.newAppointment.dateAndTime).getMinutes() + i * $scope.granularity;
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
            remarks: []
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
            return rootResource.$post('publicappointments', { "userId": $scope.$parent.currentRoute.params.userId, "email": $scope.newAppointment.client.email }, $scope.newAppointment).then(function () {
                flash.add($translate.instant('appointment.Created'), 'info');
                initAppointment();
            }, function (err) {
                flash.addError(err.data);
            });
        })
        .then(load);
    };

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
        
       $scope.appointmentsPromise.then(function(appointments) {
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
    });
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
                        scope.times.forEach(function (time, index, times) {
                            if (index % scope.celsMerge ==1) {
                                angular.element(elem).bootstrapTable('mergeCells', {
                                    index: index - 1,
                                    field: 0,
                                    rowspan: scope.celsMerge
                                });
                                if (index % (60 / scope.granularity) == 1) {
                                    angular.element(elem).find('#tr_id' + (index - 1)).addClass('highlighthour');
                                } else {
                                    angular.element(elem).find('#tr_id' + (index - 1)).addClass('highlight');
                                }
                            }
                           
                        });
                       


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
 
angular.module('makemybooking.resources', [
  'ngRoute',
  'makemybooking.api'
])

.config(function config($routeProvider) {
  $routeProvider
    .when('/resources', {
      templateUrl: 'resources/resources.html',
      controller: 'ResourcesCtrl',
      title: 'Resources'
    });
})

.controller('ResourcesCtrl', function ResourcesController($scope, $window, _, $translate, makemybookingapi, flash) {

  function load() {
    return makemybookingapi.apiRoot.then(function (rootResource) {
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
    return makemybookingapi.apiRoot.then(function (rootResource) {
      return rootResource.$post('resources', null, $scope.newResource).then(function () {
        flash.add($translate.instant('resource.Created'), 'info');
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
angular.module('makemybooking.users', [
  'ngRoute',
  'makemybooking.api'
])

.config(function config($routeProvider) {
  $routeProvider
    .when('/users', {
      templateUrl: 'users/users.html',
      controller: 'UsersCtrl',
      title: 'Users'
    });
})

.controller('UsersCtrl', function UsersController($scope, $window, _, $translate, makemybookingapi, flash) {

  function load() {
    return makemybookingapi.apiRoot.then(function (rootUser) {
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
    return makemybookingapi.apiRoot.then(function (rootUser) {
      return rootUser.$post('users', null, $scope.newUser).then(function () {
        flash.add($translate.instant('user.Created'), 'info');
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
angular.module('makemybooking.authinterceptor', [
  'makemybooking.usersession'
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
angular.module('makemybooking.login', [
  'makemybooking.config',
  'makemybooking.usersession',
  'makemybooking.api',
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
      if (event.origin+"/api" !== config.defaultApiEndpoint) {
          console.log("Origin:" + event.origin);
          console.log("DefaultApiEndpoint" + config.defaultApiEndpoint);
      return;
    }
    $rootScope.authLogin(event.data);
  }, false);
})
 

.controller('LoginCtrl', function LoginController($scope, $rootScope, $window, $location, config, usersession, makemybookingapi) {

  usersession.returnTo = $location.search().returnTo;

  $scope.loginFacebook = function () {
    return authWindow(config.defaultApiEndpoint + '/auth/facebook');
  };

  $scope.loginGoogle = function () {
    return authWindow(config.defaultApiEndpoint + '/auth/google');
  };

  $scope.loginLocal = function (user) {
      makemybookingapi.apiRoot.then(function (rootResource) {
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
angular.module('makemybooking', [
  'ngRoute',
  'pascalprecht.translate',
  'tmh.dynamicLocale',
  'ui.bootstrap.datetimepicker',
  'ui.bootstrap',
  'checklist-model',
  'ngResource',
  'makemybooking.directives',
  'makemybooking.flash',
  'makemybooking.usersession',
  'makemybooking.authinterceptor',
  'makemybooking.home',
  'makemybooking.login',
  'makemybooking.public',
  'makemybooking.publicappointments',
  'makemybooking.appointmentsView',
  'makemybooking.resources',
  'makemybooking.clients',
  'makemybooking.users',
  'makemybooking.myaccount',
  'makemybooking.activities',
  'makemybooking.contacts',
  'makemybooking-client-templates'
])

// allow DI for use in controllers, unit tests
.constant('_', window._)
.constant('moment', window.moment)

.config(function ($httpProvider, $translateProvider, tmhDynamicLocaleProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $translateProvider.preferredLanguage('en');
    $translateProvider.useStaticFilesLoader({
        'prefix': '/i18n/',
        'suffix': '.json'
    });

    tmhDynamicLocaleProvider.defaultLocale('en');
    tmhDynamicLocaleProvider.localeLocationPattern('/i18n/angular-locale_{{locale}}.js');
    var $http, interceptor = ['$q', '$injector', function ($q, $injector) {
        var error;

        function success(response) {
            // get $http via $injector because of circular dependency problem
            $http = $http || $injector.get('$http');
            if($http.pendingRequests.length < 1) {
                $('#spinner').hide();
            }
            return response;
        }

        function error(response) {
            // get $http via $injector because of circular dependency problem
            $http = $http || $injector.get('$http');
            if($http.pendingRequests.length < 1) {
                $('#spinner').hide();
            }
            return $q.reject(response);
        }

        return function (promise) {
            $('#spinner').show();
            return promise.then(success, error);
        }
    }];

    $httpProvider.interceptors.push(interceptor);
 
})

.controller('AppCtrl', function AppController($scope, $rootScope, $location, $translate, tmhDynamicLocale, usersession) {
    var defaultPageTitle = 'MakeMyBooking';
    $scope.pageTitle = defaultPageTitle;

    $scope.$on('$routeChangeSuccess', function (ev, currentRoute) {
        $scope.currentRoute = currentRoute;
        $scope.pageTitle = currentRoute.title || defaultPageTitle;
    });

    $scope.user = usersession.current;

    $scope.routeIs = function (routeName) {
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
        $rootScope.langKey = langKey;
    };
    $scope.langKey = $translate.proposedLanguage();
    $rootScope.langKey = $scope.langKey;
});