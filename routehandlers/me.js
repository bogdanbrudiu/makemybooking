module.exports = function (req, res) {
  var user = req.user;
  var result = {
    _links: {
      self: { href: '/api/users/' + user.id }
    },
    userId: user.id,
    provider: user.provider,
    email: user.email,
    displayName: user.displayName,
    roles: user.roles,
    allowsPublic: user.allowsPublic
  };
  res.status(200).send(result);
}