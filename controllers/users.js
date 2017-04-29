var crypto = require('crypto');

module.exports = app => {
  var Users = app.models.users;

  var UsersController = {
    create: (req, res) => {

      req.body.senha = crypto.createHash('md5')
                             .update(req.body.senha)
                             .digest('hex');

      Users.create(req.body, (err, result) => {
        if(err) return res.status(412).json({ msg: err });
        res.status(200).json(result);
      })
    },

    authenticate: (req, res) => {
      if(req.body.nome_usuario && req.body.senha){

        req.body.senha = crypto.createHash('md5')
                               .update(req.body.senha)
                               .digest('hex');

        Users.findOne(req.body, (err, result) => {
          if(err) return res.sendStatus(401);
          else if(!result) return res.sendStatus(401);
          res.status(200).json(result._id);
        });
      } else {
        res.sendStatus(401);
      }
    },

    retrieve: (req, res) => {
      Users.find({}, { _id: 1, nome_usuario: 1 }, (err, result) => {
        if(err) return res.sendStatus(401);
        return res.status(200).json(result);
      })
    },

    getOne: (req, res) => {
      Users.findOne({ _id: req.params.id }, (err, result) => {
        if(err) return res.sendStatus(401);
        res.status(200).json(result);
      });
    },

    follow: (req, res) => {
      var id_usuario = req.body.id_usuario;
      var id_seguir = req.body.id_seguir;
      var results = [];
      // Usuario seguindo outro
      Users.update({ _id: id_usuario }, { $push: { seguindo: id_seguir } }, (err, result) => {
        if(err) return res.sendStatus(401);
        else results.push(result);
      });

      // Usuario sendo seguido por outro
      Users.update({ _id: id_seguir }, { $push: { seguidores: id_usuario } }, (err, result) => {
        if(err) return res.sendStatus(401);
        else results.push(result);
      });

      return res.status(200).json(results);
    },

    update: (req, res) => {
      var id = req.params.id;

      if(req.body.senha) {
        req.body.senha = crypto.createHash('md5')
                               .update(req.body.senha)
                               .digest('hex');
      }

      var dados = req.body;

      Users.update({ _id: id }, { $set: dados }, (err, result) => {
        if(err) return res.sendStatus(401);
        return res.status(200).json(result);
      })
    },

    delete: (req, res) => {
      if(req.body.email && req.body.senha) {
        req.body.senha = crypto.createHash('md5')
                               .update(req.body.senha)
                               .digest('hex');

        Users.remove({ email: req.body.email, senha: req.body.senha }, (err, result) => {
          if(err) return res.sendStatus(401);
          return res.status(200).json(result);
        });
      } else {
        return res.sendStatus(401)
      }
    }

  }

  return UsersController;
}
