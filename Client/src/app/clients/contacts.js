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