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
          res.status(200).json(JSON.parse(result._id));
        });
      } else {
        res.sendStatus(401);
      }
    }

  }

  return UsersController;
}
