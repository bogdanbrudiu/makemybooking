var User = require('../models/user');

function mapUser(dbUser) {
  var halUser = {
    _links: {
      self: { href: '/api/users/' + dbUser.id }
    },
    id: dbUser.id,
    displayName: dbUser.displayName,
    email: dbUser.email,
    provider: dbUser.provider,
    roles: dbUser.roles,
    allowsPublic: dbUser.allowsPublic  
};
  return halUser;
}

exports.create = function (req, res) {
  var newUser = new User(req.body);
  newUser.userId=newUser.email;
  newUser.save(function (err, savedUser) {
    if (err) {
      if (err.name === 'ValidationError') {
        res.status(422).send(err);
      }else if(err.name === 'MongoError' && err.code==11000){
	res.status(409).send({message:'Email and Provider already exist!'});
      }else {
        res.status(400).send(err);
      }
      return;
    }
    res.set('Location', '/api/users/' + savedUser.id);
    res.status(201).send(mapUser(savedUser));
  });
};

exports.getById = function (req, res) {
  var id = req.params.id;
  User.findById(id, function(err, dbUser) {
    if (err) {
      throw err;
    }
    if (dbUser === null) {
      res.status(404).send({ message: 'User can not be found' });
    } 
    else {
      res.status(200).send(mapUser(dbUser));
    }
  });
};

exports.getAll = function (req, res) {
  var result = {
    _links: {
      self: { href: '/api/users' }
    },
    _embedded: {
      users: []
    },
    count: 0
  };
  User
    .find()
    .exec(function (err, users) {
      if (err) {
        throw err;
      }
      result.count = users.length;
      for (var i = 0; i < result.count; i++) {
        result._embedded.users.push(mapUser(users[i]));
      }
      res.status(200).send(result);
    });  
};

exports.update = function (req, res) {
  var id = req.params.id;
  User.findById(id, function(err, dbUser) {
    if (err) {
      throw err;
    }
    if (dbUser === null) {
      res.status(404).send({ message: 'User can not be found' });
    } 
    else {
      // maybe we should add a check for a complete object in case of a PUT request?
      dbUser.set(req.body) // updated object values from request body.
      dbUser.save(function (err, updatedDbUser) {
        if (err) {
          if (err.name === 'ValidationError') {
            res.status(422).send(err);
          }
          else {
            res.status(400).send(err);
          }
          return;
        }
        res.status(200).send(mapUser(updatedDbUser));
      })
    }
  });
};

exports.delete = function (req, res) {
  var id = req.params.id;
  User.findById(id, function(err, dbUser) {
    if (err) {
      throw err;
    }
    if (dbUser === null) {
      res.status(404).send({ message: 'User can not be found' });
    } 
    else {
      dbUser.remove(function (err) {
        if (err) {
          res.status(400).send(err);
          return;
        }
        res.status(200).send({ message: 'User deleted' } );
      })
    }
  });
};

