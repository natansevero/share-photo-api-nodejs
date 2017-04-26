module.exports = app => {
  var PostsUsers = app.models.users;

  var PostsContoller = {

    create: (req, res) => {
      PostsUsers.findById(req.body.id, (err, user) => {
        if(err) return res.status(404).json({ msg: err });

        user.postagens.push({
          foto: req.body.foto,
          descricao: req.body.descricao
        });

        user.save((err, result) => {
          if(err) return res.status(500).json({ msg: err });
          return res.status(200).json(result);
        });
      });
    },

    retrieve: (req, res) => {
      // ID do usuário que tá vendo o feed
      var id_usuario = req.params.id_usuario;
      PostsUsers.findOne({ _id: id_usuario }, (err, user) => {
        if(err) return res.sendStatus(401);

        var users_posts = [];
        PostsUsers.find({}, (err, users) => {
          if(err) return res.sendStatus(401);

          user.seguindo.forEach(seguindo => {
            users.forEach(u => {
              if(seguindo == u._id) {
                var id_user = u._id;
                var nome = u.nome;
                // var foto_perfil = u.foto_perfil;
                u.postagens.forEach(p => {
                  var post = {
                    nome: nome,
                    id_user: id_user,
                    foto: p.foto,
                    descricao: p.descricao,
                    _id: p._id,
                    data: p.data
                  }

                  users_posts.push(post);
                });
              }
            })
          });

          if(users_posts) return res.status(200).json(users_posts)
        })

      });
    }

  }

  return PostsContoller;
}
