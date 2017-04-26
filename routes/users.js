module.exports = app => {
  var UsersController = app.controllers.users;

  app.post('/users', UsersController.create);
  app.post('/authenticate', UsersController.authenticate);
  app.get('/users', UsersController.retrieve);
  app.get('/users/:id', UsersController.getOne);

  /*
    POST/
      {
        id_usuario: xxxx,
        id_seguir: xxxx
      }
  */
  app.post('/users/follow', UsersController.follow);
}
