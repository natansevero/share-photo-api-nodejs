module.exports = app => {
  app.get('/', (req, res) => {
  	res.status(200).json({ "API STATUS": "API Node.js para aplicativo SharePhoto" })
  });
}
