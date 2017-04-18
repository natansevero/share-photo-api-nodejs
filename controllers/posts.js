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
      
    }

  }

  return PostsContoller;
}
