var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.status(200).json({ "API STATUS": "API Node.js para aplicativo SharePhoto" })
})

app.listen(app.get('port'), () => {
	console.log(`Aplicação rodando na porta ${app.get('port')}`);
});
