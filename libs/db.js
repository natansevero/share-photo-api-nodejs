var mongoose = require('mongoose');
var url = "mongodb://localhost/share-photo";
var single_connection;

module.exports = app => {
  single_connection = mongoose.connect(url);

  return single_connection;
}
