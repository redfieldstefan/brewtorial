// export router.
module.exports = function(router) {

  router.route('*')
    .get(function(req, res, next) {
      res.status(200)
        .send('Tada');      
    });

};
