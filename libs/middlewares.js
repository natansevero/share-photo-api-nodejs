var bodyParser = require('body-parser');
var cors = require('cors');

module.exports = app => {
  app.set('port', process.env.PORT || 3000);

  app.use(cors({
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
  }));
  app.use(bodyParser.json({limit: '5mb'}));
  app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));

}
