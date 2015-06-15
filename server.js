// define constants.
var PORT = process.env.PORT || 3000;

// import modules.
var path = require('path');
var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var apiRouter = express.Router();

// import routes.
require('./routes/api')(apiRouter);

// global middleware.
app.use([
  express.static(path.join(__dirname, '/app')),
  favicon(path.join(__dirname, '/app/images/favicon.ico')),
  bodyParser.json()
]);

// mount routers.
app.use('/api', apiRouter);

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

// start server.
app.listen(PORT, function() {
  console.log('\n\n\nServer is listening on port %d', PORT);
});
