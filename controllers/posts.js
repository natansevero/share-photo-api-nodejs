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
                var foto_perfil = u.foto_perfil;
                u.postagens.forEach(p => {
                  var post = {
                    nome: nome,
                    id_user: id_user,
                    foto_perfil: foto_perfil,
                    foto: p.foto,
                    descricao: p.descricao,
                    _id: p._id,
                    data: p.data,
                    curtidas: p.curtidas,
                    comentarios: p.comentarios
                  }

                  users_posts.push(post);
                });
              }
            })
          });

          if(users_posts) return res.status(200).json(users_posts)
        })

      });
    },

    like: (req, res) => {
      var id_usuario = req.body.id_usuario;

      PostsUsers.findOne({ _id: req.body.post.id_user }, (err, user) => {
        if(err) return res.sendStatus(401);

        user.postagens.forEach((p, index) => {
           if(p._id == req.body.post._id) user.postagens[index].curtidas.push(id_usuario);
        });

        user.save((err, result) => {
          if(err) return res.sendStatus(401);
          return res.status(200).json(result);
        })
      });
    },

    comment: (req, res) => {
      var id_usuario = req.body.id_usuario;

      PostsUsers.findOne({ _id: req.body.post.id_user }, (err, user) => {
        if(err) return res.sendStatus(401);

        user.postagens.forEach((p, index) => {
          if(p._id == req.body.post._id) {
            let obj = {
              nome_usuario: req.body.nome_usuario,
              comentario: req.body.comentario
            }
            user.postagens[index].comentarios.push(obj);
          }
        });

        user.save((err, result) => {
          if(err) return res.sendStatus(401);
          return res.status(200).json(result);
        })
      });
    }

  }

  return PostsContoller;
}
