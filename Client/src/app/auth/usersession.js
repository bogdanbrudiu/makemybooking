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