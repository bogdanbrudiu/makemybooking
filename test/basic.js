/* global describe, it */
var should = require('should'); 
var request = require('supertest');  
var app = require('../app').app;

describe('Basic route tests', function () {
  describe('GET /api/', function () {
   
    it('returns a json response with message, details and a links collection', function (done) {
      request(app)
        .get('/api/')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.should.have.property('message');
          res.body.should.have.property('details');
          res.body.should.have.property('_links');
          done();
        });
    });

  });

  describe('GET /api/me (without authorization header)', function () {

    it('returns a 401 response with message, details and a links collection ', function (done) {
      request(app)
        .get('/api/me')
        .set('Accept', 'application/json')
        .expect(401)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.should.have.property('message');
          res.body.should.have.property('details');
          res.body.should.have.property('_links');
          done();
        })    
    });

  });
});
