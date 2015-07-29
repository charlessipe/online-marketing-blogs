/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: 'l6ENz8qThSI7btJzL8XeFe5nq',
  consumer_secret: 'ihBEIaEtV7gvmPaPtqEYwPIGQLkp9DCW4TWeJiJQMEmkqbe2ZH',
  access_token_key: '824219-RkZ0CHFJUxyBYdiUE8cqWq9kCOUxl76PIn4HEZTe7oK',
  access_token_secret: 'WWnzLBLSfGVSVUcciZY0xHuKokAADMScTfAITBDWNNg2V'
});


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
 
  app.get('/twitter/user/:name', function(request, response) {
    var twitterName = request.params.name;
    var params = { screen_name: twitterName };
    client.get('users/show', params, function(error, followers, resp){
      if (!error) {
        response.json(followers.followers_count); 
        return;  
        //console.log(followers.followers_count);
      }
      
      response.json({ error: error });
    });
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
