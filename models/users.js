var mongoose = require('mongoose');

module.exports = app => {
  var db = app.libs.db;
  var Schema = mongoose.Schema;

  var UserSchema = new Schema({
    email: { type: String, required: true, index: { unique: true } },
    nome: { type: String, required: true },
    nome_usuario: { type: String, required: true },
    senha: { type: String, required: true },
    sexo: { type: String, required: true }
  });

  return db.model("users", UserSchema);
}
