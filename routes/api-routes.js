// export router.
module.exports = function(router) {

  // brews - retriveAll and create.
  router.route('/brews')
    .get(function(req, res, next) {
      next();
    })
    .post(function(req, res, next) {
      next();
    });

  // brews - retrieve, update and destroy.
  router.route('/brews/:id')
    .get(function(req, res, next) {
      next();
    })
    .put(function(req, res, next) {
      next();
    })
    .delete(function(req, res, next) {
      next();
    });

  // 'brewers' is a synonym for 'users'. this endpoint handles requests to: create, retrieve (or retrieveAll), update
  // and destroy 'brewer' entities.
  router.route('/brewers')
    .all(function(req, res, next) {

    });



  // 'drafts' is a synonym for ''
  router.route('/drafts')
    .all(function(req, res, next) {

    });

};