var mongoose = require('mongoose');

var url;
if(process.env.NODE_ENV == "dev") url = "mongodb://localhost/share-photo";
else url = "mongodb://natansevero:silva2011@ds145380.mlab.com:45380/share-photo";;

var single_connection;

module.exports = app => {
  single_connection = mongoose.connect(url);

  return single_connection;
}
