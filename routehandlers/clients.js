var Client = require('../models/client');

function mapClient(dbClient) {
  var halClient = {
    _links: {
      self: { href: '/api/clients/' + dbClient.id },
      user: { href: '/api/users/' + dbClient.user.id, title: dbClient.user.displayName }
    },
    id: dbClient.id,
    displayName: dbClient.displayName,
    email: dbClient.email,
    phone: dbClient.phone
  };
  return halClient;
}

exports.create = function (req, res) {
  var newClient = new Client(req.body);
  newClient.user.id = req.user.id;
  newClient.user.displayName = req.user.displayName;
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
    res.set('Location', '/api/clients/' + savedClient.id);
    res.status(201).send(mapClient(savedClient));
  });
};

exports.getById = function (req, res) {
  var id = req.params.id;
  Client.findById(id, function(err, dbClient) {
    if (err) {
      throw err;
    }
    if (dbClient === null) {
      res.status(404).send({ message: 'Client can not be found' });
    } 
    else {
      res.status(200).send(mapClient(dbClient));
    }
  });
};

exports.getByUser = function (req, res) {
  var result = {
    _links: {
      self: { href: '/api/clients' }
    },
    _embedded: {
      clients: []
    },
    count: 0
  };
  var userId = req.user.id;
  Client
    .find({ 'user.id': userId })
    .exec(function (err, clients) {
      if (err) {
        throw err;
      }
      result.count = clients.length;
      for (var i = 0; i < result.count; i++) {
        result._embedded.clients.push(mapClient(clients[i]));
      }
      res.status(200).send(result);
    });  
};

exports.update = function (req, res) {
  var id = req.params.id;
  Client.findById(id, function(err, dbClient) {
    if (err) {
      throw err;
    }
    if (dbClient === null) {
      res.status(404).send({ message: 'Client can not be found' });
    } 
    else {
      // maybe we should add a check for a complete object in case of a PUT request?
      dbClient.set(req.body) // updated object values from request body.
      dbClient.save(function (err, updatedDbClient) {
        if (err) {
          if (err.name === 'ValidationError') {
            res.status(422).send(err);
          }
          else {
            res.status(400).send(err);
          }
          return;
        }
        res.status(200).send(mapClient(updatedDbClient));
      })
    }
  });
};

exports.delete = function (req, res) {
  var id = req.params.id;
  Client.findById(id, function(err, dbClient) {
    if (err) {
      throw err;
    }
    if (dbClient === null) {
      res.status(404).send({ message: 'Client can not be found' });
    } 
    else {
      dbClient.remove(function (err) {
        if (err) {
          res.status(400).send(err);
          return;
        }
        res.status(200).send({ message: 'Client deleted' } );
      })
    }
  });
};

