/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  
  
  app.get('/api/url-metrics', function(request, response) {
    var query = request.query;
  });
  
  /*
    $http.get('/api/followers/XXX')
      .success(function(result) {
        // result.followers is your follower count
      });
  */
  
  app.get('/api/followers/:id', function(request, response) {
    var twitterUser = request.params.id;
    // Lookup twitter followers
    response.json({ followers: 0 });
  });

  // sample api route
        app.get('/api/moz-data', function(req, res) {
            // use mongoose to get all nerds in the database
            Nerd.find(function(err, nerds) {

                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(nerds); // return all nerds in JSON format
            });
        });
  
  
  // Stackoverflow example
  /*
  var controller = require("../controllers/user");

  module.exports = function(app) {
    app.route("/api/users").get(controller.listUsers);
  };
  */
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
  
};
