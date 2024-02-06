module.exports = (app) => {
  app.get('/api/v1/users/me', (req, res) => {
    const { user, userRoles } = req;
    res.json(user);
  });
};
