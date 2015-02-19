/*jshint expr: true*/
/* global describe, it, before, beforeEach, after, afterEach */
var should = require('should');
var request = require('supertest');
var app = require('../app').app;
var mongoose = require('mongoose');
var User = require('../models/user');
var Activity = require('../models/activity');
var config = require('../config');
var security = require('../infrastructure/security');
var moment = require('moment');

var testUserData = [{
  userId: '1234567890',
  email: 'massagecustomer@test.com',
  displayName: 'Jane Doe',
  provider: 'Test',
  password: 'test'
}, {
  userId: '0987654321',
  email: 'massagecustomer@test.com',
  displayName: 'Jane Doe',
  provider: 'Test',
  password: 'test',
  allowsPublic: true
}];

var user = null;
var token = null;
var dateBaseline = moment().startOf('day'); // Date baseline for tests = today, 0:00

describe('Public Activity tests', function () {

  before(function (done) {
    mongoose.connect(config.settings.db.connectionString);
    User.remove({}, function (err) {
      User.create(testUserData, function (err, dbUser, dbUserAllows) {
        if (err) {
          throw err;
        }
        user = dbUser;
	userAllows = dbUserAllows;
        done();
      });
    });
  });

  beforeEach(function (done) {
	  Activity.remove({}, function (err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  describe('GET /api/publicactivities/:userId', function () {
    
    beforeEach(function (done) {  



      var activities = [{
    	  displayName: 'tuns',
    	  duration: 40,
        user: { 
          id: userAllows.id,
          displayName: userAllows.displayName
        },
      }, {
    	  displayName: 'frezat',
    	  duration: 15,
        user: { 
          id: userAllows.id,
          displayName: userAllows.displayName
        },
      }];  


    Activity.create(activities, function(err) {
        if (err) {
          throw err;
        }
        done(); 
      });
     
    });

    it('returns a 401 when user does not allow public access', function (done) {
      request(app)
        .get('/api/publicactivities/'+user.id)
        .expect(401)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 200 with an list of activities.', function (done) {
      request(app)
        .get('/api/publicactivities/'+userAllows.id)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.should.have.property('count', 2);
          res.body._embedded.activities.should.have.a.lengthOf(2);
          res.body._embedded.activities[0].displayName.should.equal('tuns');
          done();
        });
    });

  });

  

  after(function (done) {
    mongoose.disconnect();
    done();
  });

});