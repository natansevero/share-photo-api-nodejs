var mongoose = require('mongoose');
//var url = "mongodb://natansevero:silva2011@ds145380.mlab.com:45380/share-photo";
var url = "mongodb://localhost/share-photo";
var single_connection;

module.exports = app => {
  single_connection = mongoose.connect(url);

  return single_connection;
}
