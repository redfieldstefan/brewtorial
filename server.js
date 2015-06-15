var port = process.env.PORT || 3000;

// import modules.
var path = require('path');
var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var router = express.Router();

// static middleware options.
var staticOptions = {
  dotFiles: 'ignore',
  etag: true,
  index: 'index.html',
  lastModified: true,
  redirect: true
};

// import routes.
require('./routes')(router);

app.use(express.static(__dirname + "/build"));
app.use(express.static(__dirname + "/app"));

app.use("/api", router);

// global middleware.
app.use([express.static(path.join(__dirname, '/assets'), staticOptions),
  favicon(path.join(__dirname, '/assets/images/favicon.ico')),
  router
]);

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
app.listen(port, function() {
  console.log('\n\n\nServer is listening on port %d', port);
});
