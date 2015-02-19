var Activity = require('../models/activity');

function mapActivity(dbActivity) {
  var halActivity = {
    _links: {
      self: { href: '/api/activities/' + dbActivity.id },
      user: { href: '/api/users/' + dbActivity.user.id, title: dbActivity.user.displayName }
    },
    id: dbActivity.id,
    displayName: dbActivity.displayName,
    duration: dbActivity.duration
  };
  return halActivity;
}

exports.create = function (req, res) {
  var newActivity = new Activity(req.body);
  newActivity.user.id = req.user.id;
  newActivity.user.displayName = req.user.displayName;
  newActivity.user.email = req.user.email;
  newActivity.user.phone = req.user.phone;
  newActivity.save(function (err, savedActivity) {
    if (err) {
      if (err.name === 'ValidationError') {
        res.status(422).send(err);
      }
      else {
        res.status(400).send(err);
      }
      return;
    }
    res.set('Location', '/api/activities/' + savedActivity.id);
    res.status(201).send(mapActivity(savedActivity));
  });
};

exports.getById = function (req, res) {
  var id = req.params.id;
  Activity.findById(id, function(err, dbActivity) {
    if (err) {
      throw err;
    }
    if (dbActivity === null) {
      res.status(404).send({ message: 'Activity can not be found' });
    } 
    else {
      res.status(200).send(mapActivity(dbActivity));
    }
  });
};

exports.getByUser = function (req, res) {
  var result = {
    _links: {
      self: { href: '/api/activities' }
    },
    _embedded: {
      activities: []
    },
    count: 0
  };
  var userId = req.user.id;
  Activity
    .find({ 'user.id': userId })
    .exec(function (err, activities) {
      if (err) {
        throw err;
      }
      result.count = activities.length;
      for (var i = 0; i < result.count; i++) {
        result._embedded.activities.push(mapActivity(activities[i]));
      }
      res.status(200).send(result);
    });  
};

exports.update = function (req, res) {
  var id = req.params.id;
  Activity.findById(id, function(err, dbActivity) {
    if (err) {
      throw err;
    }
    if (dbActivity === null) {
      res.status(404).send({ message: 'Activity can not be found' });
    } 
    else {
      // maybe we should add a check for a complete object in case of a PUT request?
      dbActivity.set(req.body) // updated object values from request body.
      dbActivity.save(function (err, updatedDbActivity) {
        if (err) {
          if (err.name === 'ValidationError') {
            res.status(422).send(err);
          }
          else {
            res.status(400).send(err);
          }
          return;
        }
        res.status(200).send(mapActivity(updatedDbActivity));
      })
    }
  });
};

exports.delete = function (req, res) {
  var id = req.params.id;
  Activity.findById(id, function(err, dbActivity) {
    if (err) {
      throw err;
    }
    if (dbActivity === null) {
      res.status(404).send({ message: 'Activity can not be found' });
    } 
    else {
      dbActivity.remove(function (err) {
        if (err) {
          res.status(400).send(err);
          return;
        }
        res.status(200).send({ message: 'Activity deleted' } );
      })
    }
  });
};

