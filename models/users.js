var mongoose = require('mongoose');

module.exports = app => {
  var db = app.libs.db;
  var Schema = mongoose.Schema;

  var CommentPostSchema = new Schema({
    nome_usuario: { type: String },
    comentario: { type: String }
  });

  var PostsSchema = new Schema({
    foto: { type: String, required: true },
    descricao: { type: String, required: true },
    curtidas: [ String ],
    comentarios: [ CommentPostSchema ],
    data: { type: Date, default: Date.now }
  });

  var UserSchema = new Schema({
    email: { type: String, required: true, index: { unique: true } },
    nome: { type: String, required: true },
    nome_usuario: { type: String, required: true, index: { unique: true } },
    senha: { type: String, required: true },
    sexo: { type: String, required: true },
    seguindo: [ String ],
    seguidores: [ String ],
    foto_perfil: { type: String },
    postagens: [ PostsSchema ]
  });

  return db.model("users", UserSchema);
}
