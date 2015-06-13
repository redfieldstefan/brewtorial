// import modules.
var express = require('express');
var app = express();

var router = express.Router();

// import routes.
require('./routes')(router);

// global middleware.
app.use(router);

// 404 handler.
app.use(function(req, res, next) {
  console.log('404 - ' + req.url);
  res.status(404)
    .set('Content-Type', 'text/plain')
    .end('404 - Resource not found');
});

// 500 handler.
app.use(function(err, req, res, next) {
  console.log('500 - ', err.message, err.stack);
  res.status(500)
    .set('Content-Type', 'text/plain')
    .end('500 - Internal server error');
});