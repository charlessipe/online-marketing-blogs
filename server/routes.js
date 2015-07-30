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
 
  // Twitter Restful API
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
  
  // Mozscape API
  var Mozscape = require('mozscape').Mozscape;
  
  var moz = new Mozscape('mozscape-07bc82a137', 'cd446f269d9e9192dbf0220a549e8001');
  
  app.get('/api/url-metrics/:name', function(req, res) {
    var mozUrl = req.params.name;
    moz.urlMetrics(mozUrl, ['page_authority', 'url', 'external_links', 'mozRank'], function(err, res) {
    if (err) {
        console.log(err);
        return;
    }
    //res.json(urlData);
    //return;
    console.log(res);
  });
    //var query = request.query;
  });

  /*
  moz.urlMetrics(mozUrl, ['page_authority', 'url', 'links', 'mozRank'], function(err, res) {
    if (err) {
        console.log(err);
        return;
    }

    console.log(res);
  });
*/

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
