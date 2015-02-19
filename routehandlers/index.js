exports.index = function(req, res){
  res.send({
    message: 'Appoints service API',
    details: 'This is a REST api where you can schedule appointments for <insert business here>',
    _links: {
      self: { href: '/api/' },
      me: { href: '/api/me' },
      appointments: { href: '/api/appointments' },
      users: { href: '/api/users' },
      resources: { href: '/api/resources' },
      clients: { href: '/api/clients' },
      activities: { href: '/api/activities' },
      publicappointments: { href: '/api/publicappointments/{userId}', 'templated': true  },
      publicresources: { href: '/api/publicresources/{userId}', 'templated': true  },
      publicactivities: { href: '/api/publicactivities/{userId}', 'templated': true  },
      localauth: { href: '/api/auth/local?username={username}&password={password}', 'templated': true }
    }
  })
};