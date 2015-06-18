// define constants.
var PORT = process.env.PORT || 3000;

// import modules.
var path = require('path');
var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var apiRouter = express.Router();
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/brewtorial_dev');
process.env.APP_SECRET = process.env.APP_SECRET || 'brewtorial_dev';

// import routes.
require('./routes/api')(apiRouter);

// global middleware.
app.use([
  express.static(path.join(__dirname, '/build')),
  favicon(path.join(__dirname, '/app/images/favicon.ico')),
  bodyParser.json()
]);

// mount routers.
app.use('/api', apiRouter);

// 404 handler.
app.use(function(req, res, next) {
  console.log('404 - ' + req.method + ' ' + req.url);
  res.status(404)
    .json({
      success: false,
      message: '404 - Resource Not Found',
      result: req.method + ' ' + req.url
    })
});

// 500 handler.
app.use(function(err, req, res, next) {
  console.log('500 - ', err.message, err.stack);
  res.status(500)
    .json({
      success: false,
      message: '500 - Internal Server Error',
      result: null
    });
});

// start server.
app.listen(PORT, function() {
  console.log('\n\n\nServer is listening on port %d', PORT);
});
