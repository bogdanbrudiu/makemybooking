var Resource = require('../models/resource');

function mapResource(dbResource) {
  var halResource = {
    _links: {
      self: { href: '/api/resources/' + dbResource.id },
      user: { href: '/api/users/' + dbResource.user.id, title: dbResource.user.displayName }
    },
    id: dbResource.id,
    displayName: dbResource.displayName
  };
  return halResource;
}

exports.create = function (req, res) {
  var newResource = new Resource(req.body);
  newResource.user.id = req.user.id;
  newResource.user.displayName = req.user.displayName;
  newResource.save(function (err, savedResource) {
    if (err) {
      if (err.name === 'ValidationError') {
        res.status(422).send(err);
      }
      else {
        res.status(400).send(err);
      }
      return;
    }
    res.set('Location', '/api/resources/' + savedResource.id);
    res.status(201).send(mapResource(savedResource));
  });
};

exports.getById = function (req, res) {
  var id = req.params.id;
  Resource.findById(id, function(err, dbResource) {
    if (err) {
      throw err;
    }
    if (dbResource === null) {
      res.status(404).send({ message: 'Resource can not be found' });
    } 
    else {
      res.status(200).send(mapResource(dbResource));
    }
  });
};

exports.getByUser = function (req, res) {
  var result = {
    _links: {
      self: { href: '/api/resources' }
    },
    _embedded: {
      resources: []
    },
    count: 0
  };
  var userId = req.user.id;
  Resource
    .find({ 'user.id': userId })
    .exec(function (err, resources) {
      if (err) {
        throw err;
      }
      result.count = resources.length;
      for (var i = 0; i < result.count; i++) {
        result._embedded.resources.push(mapResource(resources[i]));
      }
      res.status(200).send(result);
    });  
};

exports.update = function (req, res) {
  var id = req.params.id;
  Resource.findById(id, function(err, dbResource) {
    if (err) {
      throw err;
    }
    if (dbResource === null) {
      res.status(404).send({ message: 'Resource can not be found' });
    } 
    else {
      // maybe we should add a check for a complete object in case of a PUT request?
      dbResource.set(req.body) // updated object values from request body.
      dbResource.save(function (err, updatedDbResource) {
        if (err) {
          if (err.name === 'ValidationError') {
            res.status(422).send(err);
          }
          else {
            res.status(400).send(err);
          }
          return;
        }
        res.status(200).send(mapResource(updatedDbResource));
      })
    }
  });
};

exports.delete = function (req, res) {
  var id = req.params.id;
  Resource.findById(id, function(err, dbResource) {
    if (err) {
      throw err;
    }
    if (dbResource === null) {
      res.status(404).send({ message: 'Resource can not be found' });
    } 
    else {
      dbResource.remove(function (err) {
        if (err) {
          res.status(400).send(err);
          return;
        }
        res.status(200).send({ message: 'Resource deleted' } );
      })
    }
  });
};

