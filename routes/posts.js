module.exports = app => {
  var PostsController = app.controllers.posts;

  app.post('/posts', PostsController.create);
}
