var express = require('express');
var passport = require('passport');

var middleware = require('./routehandlers/middleware');
var index = require('./routehandlers/index');
var auth = require('./routehandlers/auth');
var me = require('./routehandlers/me');
var appointments = require('./routehandlers/appointments');
var resources = require('./routehandlers/resources');
var clients = require('./routehandlers/clients');
var activities = require('./routehandlers/activities');
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


router.route('/api/publicappointments/:userId')
  .all(middleware.ensureAllowsPublic)
  .get(appointments.publicgetByUser)
  .post(middleware.sanitizeRequestBody, appointments.publiccreate);

router.route('/api/publicappointments/:userId/:email/:id')
  .all(middleware.ensureAllowsPublic)
  .get(appointments.publicgetById)
  .put(middleware.ensureKnowsSecret, middleware.sanitizeRequestBody, appointments.publicupdate)
  .patch(middleware.ensureKnowsSecret, middleware.sanitizeRequestBody, appointments.publicupdate)
  .delete(middleware.ensureKnowsSecret,appointments.publicdelete);

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

router.route('/api/publicresources/:userId')
  .all(middleware.ensureAllowsPublic)
  .get(resources.getByUser);

router.route('/api/publicresources/:userId/:id')
  .all(middleware.ensureAllowsPublic)
  .get(resources.getById);

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

//Activities
router.route('/api/activities')
  .all(middleware.ensureAuthenticated)
  .get(activities.getByUser)
  .post(middleware.sanitizeRequestBody, activities.create);

router.route('/api/activities/:id')
  .all(middleware.ensureAuthenticated)
  .get(activities.getById)
  .put(middleware.sanitizeRequestBody, activities.update)
  .patch(middleware.sanitizeRequestBody, activities.update)
  .delete(activities.delete);


router.route('/api/publicactivities/:userId')
  .all(middleware.ensureAllowsPublic)
  .get(activities.getByUser);

router.route('/api/publicactivities/:userId/:id')
  .all(middleware.ensureAllowsPublic)
  .get(activities.getById);

//Users
router.route('/api/users')
  .all(middleware.ensureAuthenticated)
  .all(middleware.ensureIsAdmin)
  .get(users.getAll)
  .post(middleware.sanitizeRequestBody, users.create);

router.route('/api/users/:id')
  .all(middleware.ensureAuthenticated)
  .get(middleware.ensureIsAdminOrSelf, users.getById)
  .put(middleware.ensureIsAdminOrSelf, middleware.sanitizeRequestBody, users.update)
  .patch(middleware.ensureIsAdminOrSelf, middleware.sanitizeRequestBody, users.update)
  .delete(middleware.ensureIsAdmin, users.delete);

// --
module.exports.router = router;