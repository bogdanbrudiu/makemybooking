/*jshint expr: true*/
/* global describe, it, before, beforeEach, after, afterEach */
var should = require('should');
var request = require('supertest');
var app = require('../app').app;
var mongoose = require('mongoose');
var User = require('../models/user');
var Client = require('../models/client');
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

describe('Client tests', function () {

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
	  Client.remove({}, function (err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  describe('GET /api/clients', function () {
    
    beforeEach(function (done) {  



      var clients = [{
    	  displayName: 'diana blonda',
    	  phone: 'phone 1',
        user: { 
          id: user.id,
          displayName: user.displayName
        },
      }, {
    	  displayName: 'roscata',
    	  phone: 'phone 2',
        user: { 
          id: user.id,
          displayName: user.displayName
        },
      }];  


    Client.create(clients, function(err) {
        if (err) {
          throw err;
        }
        done(); 
      });
     
    });

    it('returns a 401 when not authenticated', function (done) {
      request(app)
        .get('/api/clients')
        .expect(401)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 200 with an list of clients.', function (done) {
      request(app)
        .get('/api/clients')
        .set('Accept', 'application/json')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.should.have.property('count', 2);
          res.body._embedded.clients.should.have.a.lengthOf(2);
          res.body._embedded.clients[0].displayName.should.equal('diana blonda');
          done();
        });
    });

  });

  describe('POST /api/clients', function () {

    var testClient = {
    		displayName: 'Popescu',
    		phone: 'phone'
    }

    it('returns a 401 when not authenticated', function (done) {
      request(app)
        .post('/api/clients')
        .send(testClient)
        .expect(401)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 201 with location header set when a proper client is sent', function (done) {
      request(app)
        .post('/api/clients')
        .set('Accept', 'application/json')
        .set('authorization', 'Bearer ' + token)
        .send(testClient)
        .expect(201)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.displayName.should.equal('Popescu');
          res.header.location.should.startWith('/api/clients');
          done();
        });
    });

    it('returns a 422 when an invalid client is sent', function (done) {
      request(app)
        .post('/api/clients')
        .set('authorization', 'Bearer ' + token)
        .send({ title: 'Invalid client without some required properties.' } )
        .expect(422)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });
  });

  describe('PUT /api/clients/:id', function () {
    var existingClient = null;
    beforeEach(function (done) {
 // Create one client in the database that is to be updated. 
      var client = {
    		  displayName: 'Testclient 1',
    		  phone: 'phone 1',
        user: { 
          id: user.id,
          displayName: user.displayName
        }
      }
      Client.create(client, function(err, dbClient) {
        if (err) {
          throw err;
        }

        existingClient = {
          id: dbClient.id,
          displayName: dbClient.displayName,
          phone: dbClient.phone
        }

        done();
      })
     
    });

    it('returns a 401 response when not authenticated', function (done) {
      request(app)
        .put('/api/clients/' + existingClient.id)
        .send(existingClient)
        .expect(401)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 404 response when the client is not found', function (done) {
      request(app)
        .put('/api/clients/537e0a6795e2ee32ab736b1a') // bogus identifier
        .set('authorization', 'Bearer ' + token)
        .send(existingClient)
        .expect(404)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

   

    it('returns a 200 response with the updated client', function (done) {
    	existingClient.displayName="new name";
      request(app)
        .put('/api/clients/' + existingClient.id)
        .set('Accept', 'application/json')
        .set('authorization', 'Bearer ' + token)
        .send(existingClient)
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.displayName.should.equal("new name");
          done();
        });
    });

  });

  describe('PATCH /api/clients/:id', function () {
    var existingClientId  = null;
   
    beforeEach(function (done) {
      // Create one client in the database that is to be updated. 
      var client = {
    		  displayName: 'Testclient 1',
    		  phone: 'phone 1',
        user: { 
          id: user.id,
          displayName: user.displayName
        }
      };

      Client.create(client, function(err, dbClient) {
        if (err) {
          throw err;
        }
        existingClientId = dbClient.id;
        done();
      })
    });

    it('returns a 401 response when not authenticated', function (done) {
      request(app)
        .patch('/api/clients/' + existingClientId)
        .send({ displayName: "new display name" })
        .expect(401)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 404 response when the client is not found', function (done) {
      request(app)
        .patch('/api/clients/537e0a6795e2ee32ab736b1a') // bogus identifier
        .set('authorization', 'Bearer ' + token)
        .send({ displayName: "new display name", phone: "phone" })
        .expect(404)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 422 response when updating with invalid data', function (done) {
      request(app)
        .patch('/api/clients/' + existingClientId)
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
        .patch('/api/clients/' + existingClientId)
        .set('Accept', 'application/json')
        .set('authorization', 'Bearer ' + token)
        .send({ displayName: "new display name", phone: "new phone" })
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.displayName.should.equal('new display name');
          res.body.phone.should.equal('new phone');
          done();
        });
    });

    it('returns a 200 response with the updated and sanitized client', function (done) {
      request(app)
        .patch('/api/clients/' + existingClientId)
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

  describe('DELETE /api/clients/:id', function () {
    var existingClientId = null;

    beforeEach(function (done) {
      // Create one client in the database that is to be updated. 
      var client = {
    		  displayName: 'Testclient 1',
    		  phone: 'phone 1',
        user: { 
          id: user.id,
          displayName: user.displayName
        }
      };

      Client.create(client, function(err, dbClient) {
        if (err) {
          throw err;
        }
        existingClientId = dbClient.id;
        done();
      })
    });

    it('returns a 401 response when not authenticated', function (done) {
      request(app)
        .delete('/api/clients/' + existingClientId)
        .expect(401)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 404 response when the client is not found', function (done) {
      request(app)
        .delete('/api/clients/537e0a6795e2ee32ab736b1a') // bogus identifier
        .set('authorization', 'Bearer ' + token)
        .expect(404)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 200 response with a confirmation message when successful', function (done) {
      request(app)
        .delete('/api/clients/' + existingClientId)
        .set('Accept', 'application/json')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.should.have.property('message');
          // there should be no clients in the database
          Client.find({}, function(err, clients) {
            should.not.exist(err);
            clients.should.be.empty;
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