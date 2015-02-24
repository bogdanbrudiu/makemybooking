var Appointment = require('../models/appointment');
var Client = require('../models/client');


function mapAppointment(dbAppointment) {
  var halAppointment = {
    _links: {
      self: { href: '/api/appointments/' + dbAppointment.id },
      user: { href: '/api/users/' + dbAppointment.user.id, title: dbAppointment.user.displayName }
    },
    id: dbAppointment.id,
    title: dbAppointment.title,
    dateAndTime: dbAppointment.dateAndTime,
    endDateAndTime: dbAppointment.endDateAndTime,
    duration: dbAppointment.duration,
    remarks: dbAppointment.remarks,
    resource: dbAppointment.resource,
    status: dbAppointment.status,
    client: dbAppointment.client
  };
  if(dbAppointment.resource){
	  halAppointment._links.resource = { href: '/api/resources/' + dbAppointment.resource.id, title: dbAppointment.resource.displayName };
  }
  if(dbAppointment.client){
	  halAppointment._links.client = { href: '/api/clients/' + dbAppointment.client.id, title: dbAppointment.client.displayName };
  }
  return halAppointment;
}

function mapPublicAppointment(dbAppointment) {
  var halAppointment = {
    _links: {
      self: { href: '/api/appointments/' + dbAppointment.id },
      user: { href: '/api/users/' + dbAppointment.user.id, title: dbAppointment.user.displayName }
    },
    id: dbAppointment.id,
    title: dbAppointment.title,
    dateAndTime: dbAppointment.dateAndTime,
    endDateAndTime: dbAppointment.endDateAndTime,
    duration: dbAppointment.duration,
    resource: dbAppointment.resource,
    status: dbAppointment.status
  };
  if(dbAppointment.resource){
	  halAppointment._links.resource = { href: '/api/publicresources/' + dbAppointment.resource.id, title: dbAppointment.resource.displayName };
  }
  return halAppointment;
}

exports.create = function (req, res) {
  var newAppointment = new Appointment(req.body);
  newAppointment.user.id = req.user.id;
  newAppointment.user.displayName = req.user.displayName;
  if ((newAppointment.client.displayName != "" ||
    newAppointment.client.phone != "" ||
    newAppointment.client.email != "") &&
      newAppointment.client.id == undefined
      ) {
      //we have inline Client Add

      var newClient = new Client();
      newClient.user.id = req.user.id;
      newClient.user.displayName = req.user.displayName;

      newClient.displayName = newAppointment.client.displayName;
      newClient.phone = newAppointment.client.phone;
      newClient.email = newAppointment.client.email;

      newClient.save(function (err, savedClient) {
          if (err) {
              if (err.name === 'ValidationError') {
                  res.status(422).send(err);
              }
              else {
                  res.status(400).send(err);
              }
              return;
          }
          newAppointment.client = savedClient;
          saveAppointment(req, res, newAppointment);
      });
  } else {

      saveAppointment(req, res, newAppointment);
  }
};
function saveAppointment(req, res, newAppointment) {
    newAppointment.save(function (err, savedAppointment) {
        if (err) {
            if (err.name === 'ValidationError') {
                res.status(422).send(err);
            }
            else {
                res.status(400).send(err);
            }
            return;
        }
        res.set('Location', '/api/appointments/' + savedAppointment.id);
        res.status(201).send(mapAppointment(savedAppointment));
    });
}
exports.getById = function (req, res) {
  var appointmentId = req.params.id;
  Appointment.findById(appointmentId, function(err, dbAppointment) {
    if (err) {
      throw err;
    }
    if (dbAppointment === null) {
      res.status(404).send({ message: 'Appointment can not be found' });
    } 
    else {
      res.status(200).send(mapAppointment(dbAppointment));
    }
  });
};

exports.getByUser = function (req, res) {
  var result = {
    _links: {
      self: { href: '/api/appointments' }
    },
    _embedded: {
      appointments: []
    },
    count: 0
  };
  var userId = req.user.id;
  Appointment
    .find({ 'user.id': userId })
    .sort('-dateAndTime')
    .exec(function (err, appointments) {
      if (err) {
        throw err;
      }
      result.count = appointments.length;
      for (var i = 0; i < result.count; i++) {
        result._embedded.appointments.push(mapAppointment(appointments[i]));
      }
      res.status(200).send(result);
    });  
};

exports.update = function (req, res) {
  var appointmentId = req.params.id;
  Appointment.findById(appointmentId, function(err, dbAppointment) {
    if (err) {
      throw err;
    }
    if (dbAppointment === null) {
      res.status(404).send({ message: 'Appointment can not be found' });
    } 
    else {
      // maybe we should add a check for a complete object in case of a PUT request?
      dbAppointment.set(req.body) // updated object values from request body.
      dbAppointment.save(function (err, updatedDbAppointment) {
        if (err) {
          if (err.name === 'ValidationError') {
            res.status(422).send(err);
          }
          else {
            res.status(400).send(err);
          }
          return;
        }
        res.status(200).send(mapAppointment(updatedDbAppointment));
      })
    }
  });
};

exports.delete = function (req, res) {
  var appointmentId = req.params.id;
  Appointment.findById(appointmentId, function(err, dbAppointment) {
    if (err) {
      throw err;
    }
    if (dbAppointment === null) {
      res.status(404).send({ message: 'Appointment can not be found' });
    } 
    else {
      dbAppointment.remove(function (err) {
        if (err) {
          res.status(400).send(err);
          return;
        }
        res.status(200).send({ message: 'Appointment deleted' } );
      })
    }
  });
};

exports.publiccreate = function (req, res) {
  var newAppointment = new Appointment(req.body);
  newAppointment.user.id = req.user.id;
  newAppointment.user.displayName = req.user.displayName;
  newAppointment.status = "NotYetAccepted";

try{
  if(req.body.client == undefined || req.body.client.email == undefined ){
	res.status(422).send({"message":"Client email is mandatory for public appointment!"});
	return;
  }
}catch(ex){console.log(ex)}
  newAppointment.client.email = req.body.client.email;
  newAppointment.save(function (err, savedAppointment) {
    if (err) {
      if (err.name === 'ValidationError') {
        res.status(422).send(err);
      }
      else {
        res.status(400).send(err);
      }
      return;
    }
    res.set('Location', '/api/publicappointments/' + savedAppointment.id);
    res.status(201).send(mapPublicAppointment(savedAppointment));
  });
};

exports.publicgetById = function (req, res) {
  var appointmentId = req.params.id;
  Appointment.findById(appointmentId, function(err, dbAppointment) {
    if (err) {
      throw err;
    }
    if (dbAppointment === null) {
      res.status(404).send({ message: 'Appointment can not be found' });
    } 
    else {
      res.status(200).send(mapPublicAppointment(dbAppointment));
    }
  });
};

exports.publicgetByUser = function (req, res) {
  var result = {
    _links: {
      self: { href: '/api/publicappointments' }
    },
    _embedded: {
      appointments: []
    },
    count: 0
  };
  var userId = req.params.userId;
  Appointment
    .find({ 'user.id': userId })
    .sort('-dateAndTime')
    .exec(function (err, appointments) {
      if (err) {
        throw err;
      }
      result.count = appointments.length;
      for (var i = 0; i < result.count; i++) {
        result._embedded.appointments.push(mapPublicAppointment(appointments[i]));
      }
      res.status(200).send(result);
    });  
};

exports.publicupdate = function (req, res) {
  var appointmentId = req.params.id;
  Appointment.findById(appointmentId, function(err, dbAppointment) {
    if (err) {
      throw err;
    }
    if (dbAppointment === null) {
      res.status(404).send({ message: 'Appointment can not be found' });
    } 
    else {
      // maybe we should add a check for a complete object in case of a PUT request?
      dbAppointment.set(req.body) // updated object values from request body.
      dbAppointment.save(function (err, updatedDbAppointment) {
        if (err) {
          if (err.name === 'ValidationError') {
            res.status(422).send(err);
          }
          else {
            res.status(400).send(err);
          }
          return;
        }
        res.status(200).send(mapPublicAppointment(updatedDbAppointment));
      })
    }
  });
};

exports.publicdelete = function (req, res) {
  var appointmentId = req.params.id;
  Appointment.findById(appointmentId, function(err, dbAppointment) {
    if (err) {
      throw err;
    }
    if (dbAppointment === null) {
      res.status(404).send({ message: 'Appointment can not be found' });
    } 
    else {
      dbAppointment.remove(function (err) {
        if (err) {
          res.status(400).send(err);
          return;
        }
        res.status(200).send({ message: 'Appointment deleted' } );
      })
    }
  });
};

