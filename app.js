var express = require('express');
var consign = require('consign');

var app = express();

consign()
	.include('libs/middlewares.js')
	.then('libs/db.js')
	.then('models')
	.then('controllers')
	.then('routes')
	.then('libs/boot.js')
	.into(app)
