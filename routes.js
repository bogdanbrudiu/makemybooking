var express = require('express');
var passport = require('passport');

var middleware = require('./routehandlers/middleware');
var index = require('./routehandlers/index');
var auth = require('./routehandlers/auth');
var me = require('./routehandlers/me');
var appointments = require('./routehandlers/appointments');
var resources = require('./routehandlers/resources');
var clients = require('./routehandlers/clients');
var users = require('./routehandlers/users');


var router = express.Router();

// Index
router.get('/api/', index.index);

// Me
router.get('/api/me', middleware.ensureAuthenticated, me)

  // Authentication provider routes
router.get('/api/auth/local', 
  passport.authenticate('local'),
  auth.localtoken
);

router.get('/api/auth/facebook', 
  passport.authenticate('facebook', { scope: 'email' })
);

router.get('/api/auth/facebook/callback', 
  passport.authenticate('facebook', { scope: 'email' }),
  auth.externalcallback
);

router.post('/api/auth/facebook', auth.facebooktoken);

router.get('/api/auth/google', 
  passport.authenticate('google', { scope: ['openid', 'email', 'profile'] })
);

router.get('/api/auth/google/callback', 
  passport.authenticate('google', { scope: ['openid', 'email', 'profile'] }),
  auth.externalcallback
);

router.post('/api/auth/google', auth.googletoken);

router.get('/api/auth/loggedin', auth.loggedin);

// Appointments
router.route('/api/appointments')
  .all(middleware.ensureAuthenticated)
  .get(appointments.getByUser)
  .post(middleware.sanitizeRequestBody, appointments.create);

router.route('/api/appointments/:id')
  .all(middleware.ensureAuthenticated)
  .get(appointments.getById)
  .put(middleware.sanitizeRequestBody, appointments.update)
  .patch(middleware.sanitizeRequestBody, appointments.update)
  .delete(appointments.delete);

//Resources
router.route('/api/resources')
  .all(middleware.ensureAuthenticated)
  .get(resources.getByUser)
  .post(middleware.sanitizeRequestBody, resources.create);

router.route('/api/resources/:id')
  .all(middleware.ensureAuthenticated)
  .get(resources.getById)
  .put(middleware.sanitizeRequestBody, resources.update)
  .patch(middleware.sanitizeRequestBody, resources.update)
  .delete(resources.delete);

//Clients
router.route('/api/clients')
  .all(middleware.ensureAuthenticated)
  .get(clients.getByUser)
  .post(middleware.sanitizeRequestBody, clients.create);

router.route('/api/clients/:id')
  .all(middleware.ensureAuthenticated)
  .get(clients.getById)
  .put(middleware.sanitizeRequestBody, clients.update)
  .patch(middleware.sanitizeRequestBody, clients.update)
  .delete(clients.delete);



//Users
router.route('/api/users')
  .all(middleware.ensureAuthenticated)
  .all(middleware.ensureIsAdmin)
  .get(users.getAll)
  .post(middleware.sanitizeRequestBody, users.create);

router.route('/api/users/:id')
  .all(middleware.ensureAuthenticated)
  .all(middleware.ensureIsAdmin)
  .get(users.getById)
  .put(middleware.sanitizeRequestBody, users.update)
  .patch(middleware.sanitizeRequestBody, users.update)
  .delete(users.delete);

// --
module.exports.router = router;