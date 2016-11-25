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

var testUserData = {
  userId: '1234567890',
  email: 'massagecustomer@test.com',
  displayName: 'Jane Doe',
  provider: 'Test',
  password: 'test'
};

var user = null;
var token = null;
var dateBaseline = moment().startOf('day'); // Date baseline for tests = today, 0:00

describe('Activity tests', function () {

  before(function (done) {
    mongoose.connect(config.settings.db.connectionString);
    User.remove({}, function (err) {
      User.create(testUserData, function (err, dbUser) {
        if (err) {
          throw err;
        }
        user = dbUser;
        token = security.createTokenForUser(dbUser, 10);
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

  describe('GET /api/activities', function () {
    
    beforeEach(function (done) {  



      var activities = [{
    	  displayName: 'tuns',
    	  duration: 40,
    	  price: 10,
        user: { 
          id: user.id,
          displayName: user.displayName
        },
      }, {
    	  displayName: 'frezat',
    	  duration: 15,
	  price: 10,
        user: { 
          id: user.id,
          displayName: user.displayName
        },
      }];  


    Activity.create(activities, function(err) {
        if (err) {
          throw err;
        }
        done(); 
      });
     
    });

    it('returns a 401 when not authenticated', function (done) {
      request(app)
        .get('/api/activities')
        .expect(401)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 200 with an list of activities.', function (done) {
      request(app)
        .get('/api/activities')
        .set('Accept', 'application/json')
        .set('authorization', 'Bearer ' + token)
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

  describe('POST /api/activities', function () {

    var testActivity = {
    		displayName: 'spalat',
    		duration: 10,
		price: 10
    }

    it('returns a 401 when not authenticated', function (done) {
      request(app)
        .post('/api/activities')
        .send(testActivity)
        .expect(401)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 201 with location header set when a proper client is sent', function (done) {
      request(app)
        .post('/api/activities')
        .set('Accept', 'application/json')
        .set('authorization', 'Bearer ' + token)
        .send(testActivity)
        .expect(201)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.displayName.should.equal('spalat');
          res.header.location.should.startWith('/api/activities');
          done();
        });
    });

    it('returns a 422 when an invalid client is sent', function (done) {
      request(app)
        .post('/api/activities')
        .set('authorization', 'Bearer ' + token)
        .send({ title: 'Invalid client without some required properties.' } )
        .expect(422)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });
  });

  describe('PUT /api/activities/:id', function () {
    var existingActivity = null;
    beforeEach(function (done) {
 // Create one client in the database that is to be updated. 
      var client = {
    		  displayName: 'tuns',
    		  duration: 40,
                  price: 10,
        user: { 
          id: user.id,
          displayName: user.displayName
        }
      }
      Activity.create(client, function(err, dbActivity) {
        if (err) {
          throw err;
        }

        existingActivity = {
          id: dbActivity.id,
          displayName: dbActivity.displayName,
          duration: dbActivity.duration
        }

        done();
      })
     
    });

    it('returns a 401 response when not authenticated', function (done) {
      request(app)
        .put('/api/activities/' + existingActivity.id)
        .send(existingActivity)
        .expect(401)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 404 response when the client is not found', function (done) {
      request(app)
        .put('/api/activities/537e0a6795e2ee32ab736b1a') // bogus identifier
        .set('authorization', 'Bearer ' + token)
        .send(existingActivity)
        .expect(404)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

   

    it('returns a 200 response with the updated client', function (done) {
    	existingActivity.displayName="new name";
      request(app)
        .put('/api/activities/' + existingActivity.id)
        .set('Accept', 'application/json')
        .set('authorization', 'Bearer ' + token)
        .send(existingActivity)
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.displayName.should.equal("new name");
          done();
        });
    });

  });

  describe('PATCH /api/activities/:id', function () {
    var existingActivityId  = null;
   
    beforeEach(function (done) {
      // Create one client in the database that is to be updated. 
      var client = {
    		  displayName: 'tuns',
    		  duration: 40,
		  price: 10,
        user: { 
          id: user.id,
          displayName: user.displayName
        }
      };

      Activity.create(client, function(err, dbActivity) {
        if (err) {
          throw err;
        }
        existingActivityId = dbActivity.id;
        done();
      })
    });

    it('returns a 401 response when not authenticated', function (done) {
      request(app)
        .patch('/api/activities/' + existingActivityId)
        .send({ displayName: "new display name" })
        .expect(401)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 404 response when the client is not found', function (done) {
      request(app)
        .patch('/api/activities/537e0a6795e2ee32ab736b1a') // bogus identifier
        .set('authorization', 'Bearer ' + token)
        .send({ displayName: "new display name", duration: "duration" })
        .expect(404)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 422 response when updating with invalid data', function (done) {
      request(app)
        .patch('/api/activities/' + existingActivityId)
        .set('authorization', 'Bearer ' + token)
        .send({ user:{id:''} })
        .expect(422)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 200 response with the updated client', function (done) {
      request(app)
        .patch('/api/activities/' + existingActivityId)
        .set('Accept', 'application/json')
        .set('authorization', 'Bearer ' + token)
        .send({ displayName: "new display name", duration: "11", price: "22" })
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.displayName.should.equal('new display name');
          res.body.duration.should.equal(11);
          res.body.price.should.equal(22);
          done();
        });
    });

    it('returns a 200 response with the updated and sanitized client', function (done) {
      request(app)
        .patch('/api/activities/' + existingActivityId)
        .set('Accept', 'application/json')
        .set('authorization', 'Bearer ' + token)
        .send({ displayName: '<script>alert("p0wned");</script> content that should not be cleaned' })
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.displayName.should.equal(' content that should not be cleaned');
          done();
        });
    });

  });

  describe('DELETE /api/activities/:id', function () {
    var existingActivityId = null;

    beforeEach(function (done) {
      // Create one client in the database that is to be updated. 
      var client = {
    		  displayName: 'tuns',
    		  duration: 40,
		  price: 10,
        user: { 
          id: user.id,
          displayName: user.displayName
        }
      };

      Activity.create(client, function(err, dbActivity) {
        if (err) {
          throw err;
        }
        existingActivityId = dbActivity.id;
        done();
      })
    });

    it('returns a 401 response when not authenticated', function (done) {
      request(app)
        .delete('/api/activities/' + existingActivityId)
        .expect(401)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 404 response when the client is not found', function (done) {
      request(app)
        .delete('/api/activities/537e0a6795e2ee32ab736b1a') // bogus identifier
        .set('authorization', 'Bearer ' + token)
        .expect(404)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 200 response with a confirmation message when successful', function (done) {
      request(app)
        .delete('/api/activities/' + existingActivityId)
        .set('Accept', 'application/json')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.should.have.property('message');
          // there should be no activities in the database
          Activity.find({}, function(err, activities) {
            should.not.exist(err);
            activities.should.be.empty;
            done();
          });
        });
    });

  });

  after(function (done) {
    mongoose.disconnect();
    done();
  });

});