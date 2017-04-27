module.exports = app => {
  var PostsController = app.controllers.posts;

  app.post('/posts', PostsController.create);
  /*
    Posts para o usuário ver, ou seja, só os posts de quem ele segue.
    Necessário enviar o id do usuario.
  */
  app.get('/posts/feed/:id_usuario', PostsController.retrieve);

  /*
    {
      id_usuario: xxx // Id de quem curti
      post: {
        id_user: xxx, // Id do usuario dono do post
        _id: xxx      // Id do post
      }
    }
  */
  app.post('/posts/like', PostsController.like);

  /*
    {
      nome_usuario: xxx // Nome de usuario de quem fez o comentario
      comentario: xxx   // Texto do comentario
      post: {
        id_user: xxx    // Id do usuario dono do post
        _id: xxx        // Id do post
      }
    }
  */
  app.post('/posts/comment', PostsController.comment);
}
