module.exports = app => {
  var Users = app.models.users;

  var UsersController = {
    create: (req, res) => {
      Users.create(req.body, (err, result) => {
        if(err) return res.status(412).json({ msg: err });
        return res.status(200).json(result);
      })
    }
  }

  return UsersController;
}
