module.exports = app => {
  var UsersController = app.controllers.users;

  app.post('/users', UsersController.create);
  app.post('/authenticate', UsersController.authenticate);
  app.get('/users/:id', UsersController.getOne);
// app.get('/users', UsersController.retrieve);

}
