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