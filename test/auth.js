/* global describe, it, before, after */
var should = require('should');
var request = require('supertest');
var app = require('../app').app;
var security = require('../infrastructure/security');
var mongoose = require('mongoose');
var User = require('../models/user');
var config = require('../config');


var testUserData = {
		userId : 'test user id',
		email : 'validusername',
		password : 'validpassword',
		displayName : 'Test user',
		provider : 'Test'
	};

describe(
		'Authentication tests',
		function() {
			before(function(done) {
				mongoose.connect(config.settings.db.connectionString);
				User.remove({}, function(err) {
					done();
				});

			});

			describe('GET /api/auth/facebook', function() {

				it('returns a 302 redirect to facebook for authentication',
						function(done) {
							request(app).get('/api/auth/facebook').expect(302).end(
									function(err, res) {
										should.not.exist(err);
										res.header.location.should
												.include('facebook');
										done();
									});
						});

			});

			describe('GET /api/auth/google', function() {

				it('returns a 302 redirect to google for authentication',
						function(done) {
							request(app).get('/api/auth/google').expect(302).end(
									function(err, res) {
										should.not.exist(err);
										res.header.location.should
												.include('google');
										done();
									});
						});

			});
/*
			describe('POST /api/auth/local', function() {

				it('returns a 401 when an invalid local user/pass are sent',
						function(done) {
							request(app).post('/api/auth/local').set('Accept',
									'application/json').send({
								username : 'an invalid username',
								password : 'an invalid password'
							}).expect(401).end(function(err, res) {
								should.not.exist(err);
								done();
							});
						});

			});
*/
			describe('GET /api/auth/local', function() {

				it('returns a 401 when an invalid local user/pass are sent',
						function(done) {
							request(app).get('/api/auth/local').send({
								username : 'an invalid username',
								password : 'an invalid password'
							}).expect(401).end(function(err, res) {
								should.not.exist(err);
								done();
							});
						});

			});

			before(function(done) {


					User.create(testUserData, function(err, dbUser) {
						if (err) {
							throw err;
						}
						console.log("user created");
						done();
					});

			});
/*
			describe('POST /api/auth/local', function() {
				it('returns a 200 when an valid local user/pass are sent',
						function(done) {
							request(app).post('/api/auth/local').set('Accept',
									'application/json').send({
								username : 'validusername',
								password : 'validpassword'
							}).expect(200).end(function(err, res) {
								should.not.exist(err);
								done();
							});
						});

			});
*/
			describe('GET /api/auth/local', function() {
				it('returns a 200 when an valid local user/pass are sent',
						function(done) {
							request(app).get('/api/auth/local').send({
								username : 'validusername',
								password : 'validpassword'
							}).expect(200).end(function(err, res) {
								should.not.exist(err);
								done();
							});
						});

			});
			describe('POST /api/auth/facebook', function() {

				it('returns a 401 when an invalid facebook token is sent',
						function(done) {
							request(app).post('/api/auth/facebook').set('Accept',
									'application/json').send({
								token : 'an invalid token'
							}).expect(401).end(
									function(err, res) {
										should.not.exist(err);
										res.body.message.should
												.startWith('Access denied');
										done();
									});
						});

			});

			describe('POST /api/auth/google', function() {

				it('returns a 401 when an invalid google token is sent',
						function(done) {
							request(app).post('/api/auth/google').set('Accept',
									'application/json').send({
								token : 'an invalid token'
							}).expect(401).end(
									function(err, res) {
										should.not.exist(err);
										res.body.message.should
												.startWith('Access denied');
										done();
									});
						});

			});

			describe(
					'GET /api/me',
					function() {
						 var user = {};

						    before(function (done) {

						      var dbUser = new User({ provider: 'Test', userId: 'Test userId', email: 'test@test.com', displayName: 'Test user' } );
						      dbUser.save(function(err, savedUser) {
						        user = savedUser;
						        done();
						      });
						    });

						it(
								'returns a 401 response when no authorization header is set',
								function(done) {
									request(app)
											.get('/api/me')
											.set('Accept', 'application/json')
											.expect(401)
											.end(
													function(err, res) {
														should.not.exist(err);
														res.body.details.should
																.equal('No Authorization header was found. Format is Authorization: Bearer [token]');
														done();
													})
								});

						it(
								'returns a 401 response when an invalid header is set',
								function(done) {
									request(app)
											.get('/api/me')
											.set('Accept', 'application/json')
											.set('authorization', 'blahblah')
											.expect(401)
											.end(
													function(err, res) {
														should.not.exist(err);
														res.body.details.should
																.equal('Invalid header. Format is Authorization: Bearer [token]');
														done();
													})
								});

						it(
								'returns a 401 response when an invalid authorization token is set',
								function(done) {
									request(app)
											.get('/api/me')
											.set('Accept', 'application/json')
											.set('authorization',
													'Bearer blahblah')
											.expect(401)
											.end(
													function(err, res) {
														should.not.exist(err);
														res.body.details.should
																.equal('Invalid or expired token');
														done();
													})
								});

						it(
								'returns a 401 response when an expired authorization token is set',
								function(done) {
									var expiredToken = security
											.createTokenForUser(user, -1);

									request(app)
											.get('/api/me')
											.set('Accept', 'application/json')
											.set('authorization',
													'Bearer ' + expiredToken)
											.expect(401)
											.end(
													function(err, res) {
														should.not.exist(err);
														res.body.details.should
																.equal('Invalid or expired token');
														done();
													})
								});

						it(
								'returns a 200 response with the user properties when a proper authorization token is set',
								function(done) {
									var token = security.createTokenForUser(
											user, 60);

									request(app)
											.get('/api/me')
											.set('Accept', 'application/json')
											.set('authorization',
													'Bearer ' + token)
											.expect(200)
											.end(
													function(err, res) {
														should.not.exist(err);
														res.body.provider.should
																.equal(user.provider);
												
														res.body.email.should
																.equal(user.email);
														res.body.displayName.should
																.equal(user.displayName);
														done();
													})
								});

						after(function(done) {

							User.remove({}, function(err) {
								mongoose.disconnect();
								if (err) {
									throw err;
								}
								done();
							});
						});

					});

		});
