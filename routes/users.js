module.exports = app => {
  var UsersController = app.controllers.users;

  app.post('/users', UsersController.create);
  app.post('/authenticate', UsersController.authenticate);
}
