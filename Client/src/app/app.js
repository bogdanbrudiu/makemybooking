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

.controller('AppCtrl', function AppController ($scope, $rootScope, $location, $translate, tmhDynamicLocale, usersession) {
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
    $rootScope.langKey=langKey;
  };
  $scope.langKey=$translate.proposedLanguage();
  $rootScope.langKey=$scope.langKey;
});