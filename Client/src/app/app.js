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