module.exports = app => {
  var PostsController = app.controllers.posts;

  app.post('/posts', PostsController.create);
  /*
    Posts para o usuário ver, ou seja, só os posts de quem ele segue.
    Necessário enviar o id do usuario.
  */
  app.get('/posts/feed/:id_usuario', PostsController.retrieve);
}
