module.exports = app => {
  var Users = app.models.users;

  var UsersController = {
    create: (req, res) => {
      Users.create(req.body)
        .then(result => {
          return res.status(200).json(result);
        })
        .catch(err => {
          return res.status(412).json({ msg: err.erros });
        });
    }
  }

  return UsersController;
}
