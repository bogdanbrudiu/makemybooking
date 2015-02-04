var config = require('./config');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('./models/user');
var mongoose = require('mongoose');

function handleProviderResponse(provider, userId, email, displayName, accessToken, refreshToken, callback) {
  User.findByUserIdAndProvider(userId, provider, function (err, dbUser) {
    if (! dbUser) {
      dbUser = new User({
        provider: provider,
        userId: userId,
        email: email, 
        displayName: displayName || email
      });
    }

    dbUser.providerAccessToken = accessToken;
    dbUser.providerRefreshToken = refreshToken;
    dbUser.lastAuthenticated = new Date();

    dbUser.save(function (err, dbUser) {
      if (err) {
        throw err;
      }
      callback(null, dbUser);
    });
  });
}

exports.configure = function () {

  passport.use(new FacebookStrategy({
      clientID: config.settings.authProviders.facebook.clientId,
      clientSecret: config.settings.authProviders.facebook.clientSecret,
      callbackURL: config.settings.authProviders.facebook.callbackUrl
    },
    function(accessToken, refreshToken, profile, done) {
      return handleProviderResponse('facebook', profile.id, profile.emails[0].value, profile.displayName, accessToken, refreshToken, done);
    }
  ));

  passport.use(new GoogleStrategy({
      clientID: config.settings.authProviders.google.clientId,
      clientSecret: config.settings.authProviders.google.clientSecret,
      callbackURL: config.settings.authProviders.google.callbackUrl
    },
    function(accessToken, refreshToken, profile, done) {
      return handleProviderResponse('google', profile.id, profile.emails[0].value, profile.displayName, accessToken, refreshToken, done);
    }
  ));


//create first user if not exist

	admin = {
		userId : 'admin@makemybooking.co',
                email : 'admin@makemybooking.co',
                password : 'adminP@44',
                displayName : 'Administrator',
                provider : 'local',
		roles: ["admin", "customer"]
        };

	User.findOne({email: admin.email}, function(err,user){
		if(!user){
			//user not found so create it
  			User.create(admin, function(err, dbUser) {
                        	if (err) {
                                	throw err;
                                }
                                console.log("Admin user created");
                        });
		}
	});

  passport.use(new LocalStrategy(
   function(username, password, done) {
    User.findOne({ email: username, password: password }, function(err, user) {
    	if(user){
    		return handleProviderResponse('local', user.userId, user.email, user.displayName, "", "", done);
    	}
    	done(null,false ,{message:'Bad username or password'});
    });
  }
  ));

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

}
