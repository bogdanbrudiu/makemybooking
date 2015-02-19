/*jshint expr: true*/
/* global describe, it, before, beforeEach, after, afterEach */
var should = require('should');
var request = require('supertest');
var app = require('../app').app;
var mongoose = require('mongoose');
var User = require('../models/user');
var Appointment = require('../models/appointment');
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

describe('Public Appointment tests', function () {

  before(function (done) {
    mongoose.connect(config.settings.db.connectionString);
    User.remove({}, function (err) {
      User.create(testUserData, function (err,dbUser, dbUserAllows) {
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
    Appointment.remove({}, function (err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  describe('GET /api/publicappointments/:userId', function () {
    
    beforeEach(function (done) {  



      var appointments = [{
        title: 'Testappointment 1',
        user: { 
          id: userAllows.id,
          displayName: userAllows.displayName
        },
        dateAndTime: dateBaseline.clone().add(1,'days').add(16,'hours').toDate(),
        endDateAndTime: dateBaseline.clone().add(1,'days').add(16,'hours').add(16,'minutes').toDate()
      }, {
        title: 'Testappointment 2',
        user: { 
          id: userAllows.id,
          displayName: userAllows.displayName
        },
        dateAndTime: dateBaseline.clone().add(3,'days').add(9,'hours').toDate(),
        endDateAndTime: dateBaseline.clone().add(3,'days').add(9,'hours').add(45,'minutes').toDate()
      }];  


    Appointment.create(appointments, function(err) {
        if (err) {
          throw err;
        }
        done(); 
      });
     
    });

    it('returns a 401 when user does not allow public access', function (done) {
      request(app)
        .get('/api/publicappointments/'+user.id)
        .expect(401)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 200 with an list of appointments ordered by date and time in descending order.', function (done) {
      request(app)
        .get('/api/publicappointments/'+userAllows.id)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.should.have.property('count', 2);
          res.body._embedded.appointments.should.have.a.lengthOf(2);
          res.body._embedded.appointments[0].title.should.equal('Testappointment 2');
          done();
        });
    });

  });

  describe('POST /api/publicappointments/:userId', function () {
beforeEach(function (done) {
    testAppointment = {
      title: 'Regular full massage',
      dateAndTime: dateBaseline.clone().add(1,'days').add(16,'hours').toISOString(),
      endDateAndTime: dateBaseline.clone().add(1,'days').add(17,'hours').toISOString(),
      remarks: 'I\'d like the same oil as last time.',
	client: {
		email: 'secret@Email'
	},
	user:{
		id: userAllows.id
	}
    }
done();
});
    it('returns a 401 when user does not allow public access', function (done) {
      request(app)
        .post('/api/publicappointments/'+user.id)
        .send(testAppointment)
        .expect(401)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 201 with location header set when a proper appointment is sent', function (done) {
      request(app)
        .post('/api/publicappointments/'+userAllows.id)
        .set('Accept', 'application/json')
        .send(testAppointment)
        .expect(201)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.title.should.equal('Regular full massage');
          res.header.location.should.startWith('/api/publicappointments');
          done();
        });
    });

    it('returns a 422 when an invalid appointment is sent', function (done) {
      request(app)
        .post('/api/publicappointments/'+userAllows.id)
        .send({ title: 'Invalid appointment without some required properties.' } )
        .expect(422)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 422 when an appointment with past date is sent', function (done) {
      testAppointment.dateAndTime = dateBaseline.clone().add(-1,'days').toISOString();
      request(app)
        .post('/api/publicappointments/'+userAllows.id)
        .set('Accept', 'application/json')
        .send(testAppointment)
        .expect(422)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

  });


  describe('PUT /api/publicappointments/:userId/:email/:id', function () {
    beforeEach(function (done) {
 // Create one appointment in the database that is to be updated. 
      var appointment = [{
        title: 'Testappointment !Allows',
        user: { 
          id: user.id,
          displayName: user.displayName
        },
	client: {
	  email: 'secret@Email'
	},
        dateAndTime: dateBaseline.clone().add(1,'days').add(15, 'hours').add(15, 'minutes').toDate(),
        endDateAndTime: dateBaseline.clone().add(1,'days').add(15, 'hours').add(15, 'minutes').toDate()
      },{
        title: 'Testappointment Allows',
        user: { 
          id: userAllows.id,
          displayName: userAllows.displayName
        },
	client: {
	  email: 'secret@Email'
	},
        dateAndTime: dateBaseline.clone().add(2,'days').add(15, 'hours').add(15, 'minutes').toDate(),
        endDateAndTime: dateBaseline.clone().add(2,'days').add(15, 'hours').add(15, 'minutes').toDate()
      }];

      Appointment.create(appointment, function(err, dbAppointment, dbAppointmentAllows) {
        if (err) {
          throw err;
        }
        existingAppointment = dbAppointment;
	existingAppointmentAllows = dbAppointmentAllows;
        done();
      })
     
    });

    it('returns a 401 response when user does not allow public access', function (done) {
      request(app)
        .put('/api/publicappointments/'+user.id +'/secret@Email/'+ existingAppointment.id)
        .send(existingAppointment)
        .expect(401)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 401 response when secret is wrong', function (done) {
      request(app)
        .put('/api/publicappointments/'+userAllows.id +'/crocodil@stirb/'+ existingAppointmentAllows.id)
        .send(existingAppointment)
        .expect(401)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 401 response when the appointment is not found', function (done) {
      request(app)
        .put('/api/publicappointments/'+userAllows.id +'/secret@Email/537e0a6795e2ee32ab736b1a') // bogus identifier
        .set('authorization', 'Bearer ' + token)
        .send(existingAppointment)
        .expect(401)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 422 response when updating with invalid data', function (done) {
      existingAppointment.dateAndTime = ''; // required field
      request(app)
        .put('/api/publicappointments/'+userAllows.id +'/secret@Email/' + existingAppointmentAllows.id)
        .set('authorization', 'Bearer ' + token)
        .send(existingAppointment)
        .expect(422)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 200 response with the updated appointment', function (done) {
      var newDateAndTime = dateBaseline.clone().add(1,'days').add(15, 'hours').add(15, 'minutes').toISOString(); // ISO date because this is the value we're going to PUT
      existingAppointmentAllows.dateAndTime =  newDateAndTime 
      request(app)
        .put('/api/publicappointments/'+userAllows.id +'/secret@Email/' + existingAppointmentAllows.id)
        .set('Accept', 'application/json')
        .set('authorization', 'Bearer ' + token)
        .send(existingAppointmentAllows)
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.title.should.equal('Testappointment Allows');
          res.body.dateAndTime.should.equal(newDateAndTime);
          done();
        });
    });

  });

  describe('PATCH /api/publicappointments/:userId/:email/:id', function () {
    var newAppointmentDate = dateBaseline.clone().add(2, 'days').add(13, 'hours').add(45, 'minutes').toISOString();
    var newAppointmentEndDate = dateBaseline.clone().add(2, 'days').add(14, 'hours').add(15, 'minutes').toISOString();

    beforeEach(function (done) {
      // Create one appointment in the database that is to be updated. 
      var appointment = [{
        title: 'Testappointment !Allows',
        user: { 
          id: user.id,
          displayName: user.displayName
        },
	client: {
	  email: 'secret@Email'
	},
        dateAndTime: dateBaseline.clone().add(1,'days').add(15, 'hours').add(15, 'minutes').toDate(),
        endDateAndTime: dateBaseline.clone().add(1,'days').add(15, 'hours').add(15, 'minutes').toDate()
      },{
        title: 'Testappointment Allows',
        user: { 
          id: userAllows.id,
          displayName: userAllows.displayName
        },
	client: {
	  email: 'secret@Email'
	},
        dateAndTime: dateBaseline.clone().add(2,'days').add(15, 'hours').add(15, 'minutes').toDate(),
        endDateAndTime: dateBaseline.clone().add(2,'days').add(15, 'hours').add(15, 'minutes').toDate()
      }];

      Appointment.create(appointment, function(err, dbAppointment, dbAppointmentAllows) {
        if (err) {
          throw err;
        }
        existingAppointment = dbAppointment;
	existingAppointmentAllows = dbAppointmentAllows;
        done();
      })
    });

    it('returns a 401 response when user does not allow public access', function (done) {
      request(app)
        .patch('/api/publicappointments/'+user.id +'/secret@Email/'+ existingAppointment.id)
        .send({ dateAndTime: newAppointmentDate }, { endDateAndTime: newAppointmentEndDate })
        .expect(401)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 401 response when secret is wrong', function (done) {
      request(app)
        .patch('/api/publicappointments/'+userAllows.id +'/crocodil@stirb/'+ existingAppointmentAllows.id)
        .send({ dateAndTime: newAppointmentDate }, { endDateAndTime: newAppointmentEndDate })
        .expect(401)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 401 response when the appointment is not found', function (done) {
      request(app)
        .patch('/api/publicappointments/'+userAllows.id +'/secret@Email/537e0a6795e2ee32ab736b1a') // bogus identifier
        .set('authorization', 'Bearer ' + token)
        .send({ dateAndTime: newAppointmentDate }, { endDateAndTime: newAppointmentEndDate })
        .expect(401)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 422 response when updating with invalid data', function (done) {
      request(app)
        .patch('/api/publicappointments/'+userAllows.id +'/secret@Email/' + existingAppointmentAllows.id)
        .set('authorization', 'Bearer ' + token)
        .send({ dateAndTime: '' })
        .expect(422)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 200 response with the updated appointment', function (done) {
      request(app)
        .patch('/api/publicappointments/'+userAllows.id +'/secret@Email/' + existingAppointmentAllows.id)
        .set('Accept', 'application/json')
        .set('authorization', 'Bearer ' + token)
        .send({ dateAndTime: newAppointmentDate, endDateAndTime: newAppointmentEndDate })
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.title.should.equal('Testappointment Allows');
          res.body.dateAndTime.should.equal(newAppointmentDate);
          res.body.endDateAndTime.should.equal(newAppointmentEndDate);
          res.body.duration.should.equal(30);
          done();
        });
    });

    it('returns a 200 response with the updated and sanitized appointment', function (done) {
      request(app)
        .patch('/api/publicappointments/'+userAllows.id +'/secret@Email/' + existingAppointmentAllows.id)
        .set('Accept', 'application/json')
        .set('authorization', 'Bearer ' + token)
        .send({ title: '<script>alert("p0wned");</script> content that should not be cleaned' })
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.title.should.equal(' content that should not be cleaned');
          done();
        });
    });

  });

  describe('DELETE /api/publicappointments/:userId/:email/:id', function () {


    beforeEach(function (done) {
      // Create one appointment in the database that is to be updated. 
      var appointment = [{
        title: 'Testappointment !Allows',
        user: { 
          id: user.id,
          displayName: user.displayName
        },
	client: {
	  email: 'secret@Email'
	},
        dateAndTime: dateBaseline.clone().add(1,'days').add(15, 'hours').add(15, 'minutes').toDate(),
        endDateAndTime: dateBaseline.clone().add(1,'days').add(15, 'hours').add(15, 'minutes').toDate()
      },{
        title: 'Testappointment Allows',
        user: { 
          id: userAllows.id,
          displayName: userAllows.displayName
        },
	client: {
	  email: 'secret@Email'
	},
        dateAndTime: dateBaseline.clone().add(2,'days').add(15, 'hours').add(15, 'minutes').toDate(),
        endDateAndTime: dateBaseline.clone().add(2,'days').add(15, 'hours').add(15, 'minutes').toDate()
      }];

      Appointment.create(appointment, function(err, dbAppointment, dbAppointmentAllows) {
        if (err) {
          throw err;
        }
        existingAppointment = dbAppointment;
	existingAppointmentAllows = dbAppointmentAllows;
        done();
      })
    });

    it('returns a 401 response user does not allow public access', function (done) {
      request(app)
        .delete('/api/publicappointments/'+user.id +'/secret@Email/'+ existingAppointment.id)
        .expect(401)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 401 response when secret is wrong', function (done) {
      request(app)
        .delete('/api/publicappointments/'+userAllows.id +'/crocodil@stirb/'+ existingAppointmentAllows.id)
        .expect(401)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 401 response when the appointment is not found', function (done) {
      request(app)
        .delete('/api/publicappointments/'+userAllows.id +'/secret@Email/537e0a6795e2ee32ab736b1a') // bogus identifier
        .expect(401)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('returns a 200 response with a confirmation message when successful', function (done) {
      request(app)
        .delete('/api/publicappointments/'+userAllows.id +'/secret@Email/' + existingAppointmentAllows.id)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.should.have.property('message');
          // there should be no appointments in the database
          Appointment.find({}, function(err, appointments) {
            should.not.exist(err);
            appointments.should.have.a.lengthOf(1);
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