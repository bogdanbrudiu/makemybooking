/*jshint expr: true*/
/* global describe, it, before, beforeEach, after, afterEach */
var should = require('should');
var request = require('supertest');
var app = require('../server').app;
var mongoose = require('mongoose');
var User = require('../models/user');
var Resource = require('../models/resource');
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

describe('Resource tests', function () {

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
	  Resource.remove({}, function (err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  describe('GET /api/resources', function () {
    
    beforeEach(function (done) {  



      var resources = [{
    	  displayName: 'Testresource 1',
        user: { 
          id: user.id,
          displayName: user.displayName
        },
      }, {
    	  displayName: 'Testresources 2',
        user: { 
          id: user.id,
          displayName: user.displayName
        },
      }];  


    Resource.create(resources, function(err) {
        if (err) {
          throw err;
        }
        done(); 
      });
     
    });

    it('returns a 401 when not authenticated', function (done) {
      request(app)
        .get('/api/resources')
        .expect(401)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 200 with an list of resources.', function (done) {
      request(app)
        .get('/api/resources')
        .set('Accept', 'application/json')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.should.have.property('count', 2);
          res.body._embedded.resources.should.have.a.lengthOf(2);
          res.body._embedded.resources[0].displayName.should.equal('Testresource 1');
          done();
        });
    });

  });

  describe('POST /api/resources', function () {

    var testResource = {
    		displayName: 'Regular full massage'
    }

    it('returns a 401 when not authenticated', function (done) {
      request(app)
        .post('/api/resources')
        .send(testResource)
        .expect(401)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 201 with location header set when a proper resource is sent', function (done) {
      request(app)
        .post('/api/resources')
        .set('Accept', 'application/json')
        .set('authorization', 'Bearer ' + token)
        .send(testResource)
        .expect(201)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.displayName.should.equal('Regular full massage');
          res.header.location.should.startWith('/api/resources');
          done();
        });
    });

    it('returns a 422 when an invalid resource is sent', function (done) {
      request(app)
        .post('/api/resources')
        .set('authorization', 'Bearer ' + token)
        .send({ title: 'Invalid resource without some required properties.' } )
        .expect(422)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });
  });

  describe('PUT /api/resources/:id', function () {
    var existingResource = null;
    beforeEach(function (done) {
 // Create one resource in the database that is to be updated. 
      var resource = {
    		  displayName: 'Testresource 1',
        user: { 
          id: user.id,
          displayName: user.displayName
        }
      }
      Resource.create(resource, function(err, dbResource) {
        if (err) {
          throw err;
        }

        existingResource = {
          id: dbResource.id,
          displayName: dbResource.displayName
        }

        done();
      })
     
    });

    it('returns a 401 response when not authenticated', function (done) {
      request(app)
        .put('/api/resources/' + existingResource.id)
        .send(existingResource)
        .expect(401)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 404 response when the resource is not found', function (done) {
      request(app)
        .put('/api/resources/537e0a6795e2ee32ab736b1a') // bogus identifier
        .set('authorization', 'Bearer ' + token)
        .send(existingResource)
        .expect(404)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

   

    it('returns a 200 response with the updated resource', function (done) {
    	existingResource.displayName="new name";
      request(app)
        .put('/api/resources/' + existingResource.id)
        .set('Accept', 'application/json')
        .set('authorization', 'Bearer ' + token)
        .send(existingResource)
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.displayName.should.equal("new name");
          done();
        });
    });

  });

  describe('PATCH /api/resources/:id', function () {
    var existingResourceId  = null;
   
    beforeEach(function (done) {
      // Create one resource in the database that is to be updated. 
      var resource = {
    		  displayName: 'Testresource 1',
        user: { 
          id: user.id,
          displayName: user.displayName
        }
      };

      Resource.create(resource, function(err, dbResource) {
        if (err) {
          throw err;
        }
        existingResourceId = dbResource.id;
        done();
      })
    });

    it('returns a 401 response when not authenticated', function (done) {
      request(app)
        .patch('/api/resources/' + existingResourceId)
        .send({ displayName: "new display name" })
        .expect(401)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 404 response when the resource is not found', function (done) {
      request(app)
        .patch('/api/resources/537e0a6795e2ee32ab736b1a') // bogus identifier
        .set('authorization', 'Bearer ' + token)
        .send({ displayName: "new display name" })
        .expect(404)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 422 response when updating with invalid data', function (done) {
      request(app)
        .patch('/api/resources/' + existingResourceId)
        .set('authorization', 'Bearer ' + token)
        .send({ user:{id:''} })
        .expect(422)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 200 response with the updated resource', function (done) {
      request(app)
        .patch('/api/resources/' + existingResourceId)
        .set('Accept', 'application/json')
        .set('authorization', 'Bearer ' + token)
        .send({ displayName: "new display name" })
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.displayName.should.equal('new display name');
          done();
        });
    });

    it('returns a 200 response with the updated and sanitized resource', function (done) {
      request(app)
        .patch('/api/resources/' + existingResourceId)
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

  describe('DELETE /api/resources/:id', function () {
    var existingResourceId = null;

    beforeEach(function (done) {
      // Create one resource in the database that is to be updated. 
      var resource = {
    		  displayName: 'Testresource 1',
        user: { 
          id: user.id,
          displayName: user.displayName
        }
      };

      Resource.create(resource, function(err, dbResource) {
        if (err) {
          throw err;
        }
        existingResourceId = dbResource.id;
        done();
      })
    });

    it('returns a 401 response when not authenticated', function (done) {
      request(app)
        .delete('/api/resources/' + existingResourceId)
        .expect(401)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 404 response when the resource is not found', function (done) {
      request(app)
        .delete('/api/resources/537e0a6795e2ee32ab736b1a') // bogus identifier
        .set('authorization', 'Bearer ' + token)
        .expect(404)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 200 response with a confirmation message when successful', function (done) {
      request(app)
        .delete('/api/resources/' + existingResourceId)
        .set('Accept', 'application/json')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.should.have.property('message');
          // there should be no resources in the database
          Resource.find({}, function(err, resources) {
            should.not.exist(err);
            resources.should.be.empty;
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