'use strict';

angular.module('topProgrammingBlogsApp')

  // Stackoverflow example http://stackoverflow.com/questions/27032964/mean-js-resource-to-call-express-server-restful-api
  /*
  .factory("UserService", ["$resource",
    function($resource) {
        var resource;

        resource = $resource("/api/users", null, {
            listUsers: {
                method: "GET",
                isArray: true
            }
        });

        return resource;
    }
])

  .controller("UserCtrl", ["$scope", "UserService",
    function($scope, userService) {

        $scope.loadUsers = function() {
            userService.listUsers(function(resource, headers) {
                // this function is called on success, with the result
                // stored within the `resource` variable

                // ...

            }, function(response) {
                // this function is called on error

                // ...

            });
        };
    }
])
    */



  .controller('MainCtrl', function ($scope, $http, $firebaseObject, $firebaseArray) {
   //, FeedService
  
    var ref = new Firebase("https://top-programming.firebaseio.com/"); // Instantiate the Firebase service with the new operator.

    // download the data into a local object
    $scope.data = $firebaseObject(ref);

    // create a synchronized array
    $scope.blogs = $firebaseArray(ref);

    // synchronize the object with a three-way data binding
    //syncObject.$bindTo($scope, "data");
    
    // Facebook login
    var ref = new Firebase("https://top-programming.firebaseio.com/");
    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        $scope.currentUid = authData.uid;
        $scope.userName = authData.facebook.displayName;
        $scope.$apply();
      }
    });
  
    /*
    
    // encode64() was written by Tyler Akins and has been placed in the
    // public domain.  It would be nice if you left this header intact.
    // Base64 code from Tyler Akins -- http://rumkin.com
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  
    function encode64(input) {
	var output = "";
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;

	while (i < input.length) {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);

		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;

		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}

		output += (keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4));
   }
   
   return output.toString();
    }  
  
    // Encode signature
    var accessId = "mozscape-07bc82a137";
    var secretKey = "cd446f269d9e9192dbf0220a549e8001";
    var apiExpires = moment().unix() + 300;
    console.log(apiExpires);
    
    //var stringToSign = accessId+"<br>"+apiExpires;
    var message = accessId + "\n" + apiExpires;
  
    //hmac sha1 hash
    //var hash = CryptoJS.SHA1(stringToSign,secretKey);
    var hmacString = Crypto.HMAC(Crypto.SHA1, message, secretKey, { asString: true });
    //console.log(hash);
    
    //urlencode and 64bit encode
    //var signatureEncoded = encodeURIComponent(btoa(hash));
    var signature = encode64(hmacString);
    //console.log(signatureEncoded);
    console.log(signature);
    
    var currentUrl = "codebetter.com";
  
    // Mozscape API moz.com%2fblog
    //var callbackString = '?callback=JSON_CALLBACK&data='
    var mozUri = 'http://lsapi.seomoz.com/linkscape/url-metrics/codebetter.com?Cols=34359754788&AccessID=mozscape-07bc82a137&Expires='+apiExpires+'&Signature='+signature
    
    $http.jsonp(mozUri)
      .success(function(siteData) {
        console.log('success', siteData);
        $scope.siteData = siteData;
      })
      .error(function(err) {
        console.log(err);
      })
     
    // this will never print antying sicne siteData at this point is still nil.  It has not been set
    // by the success callback.
     console.log($scope.siteData);
     /*
  
    /*
    // /api/url-metrics/????
    $http.jsonp('http://lsapi.seomoz.com/linkscape/url-metrics/'+currentUrl+'?Cols=34359754788&AccessID=mozscape-07bc82a137&Expires='+apiExpires+'&Signature='+signature).then(function(siteData) {
      $scope.mozData = siteData;
    })
      
    //.error(function(err) { $scope.mozData = err; })
  
  
    console.log($scope.mozData);  
    */
  
    // Google Feed API
  
  
    
     
    
    /*
    $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=15&callback=?&q=http://feeds.feedburner.com/CssTricks').then(function(res) {
      $scope.myRss = res.data.responseData.feed.entries;
      });
      //$scope.rssData = data.feed.entries.title; 
    */
  
  
    // works in JSBin
    
    
    var url = "http://feeds.feedburner.com/CssTricks";
        
    google.load("feeds", "1");

    function initialize() {
      var feed = new google.feeds.Feed(url);
      feed.load(function(result) {
        if (!result.error) {
          for (var i = 0; i < 1; i++) {
            var entry = result.feed.entries[i];       document.getElementById("feed").innerHTML = "<a href='"+entry.link+"'>"+entry.title+"</a>";
          }
        }
      });
    }
    initialize();

    

    /*
    
    function showRss(rssFeed){
        
    google.load("feeds", "1");

    function initialize() {
      var feed = new google.feeds.Feed(url);
      feed.load(function(result) {
        if (!result.error) {
          for (var i = 0; i < 1; i++) {
            var entry = result.feed.entries[i];       document.getElementById("feed").innerHTML = "<a href='"+entry.link+"'>"+entry.title+"</a>";
          }
        }
      });
    }
    google.setOnLoadCallback(initialize);
    
    
    }
    
    */
  
    
    
  

    /*
    $scope.init = function() {
        $http.get("http://ajax.googleapis.com/ajax/services/feed/load", { params: { "v": "1.0", "q": "http://blog.nraboy.com/feed/" } })
            .success(function(data) {
                $scope.rssTitle = data.responseData.feed.title;
                $scope.rssUrl = data.responseData.feed.feedUrl;
                $scope.rssSiteUrl = data.responseData.feed.link;
                $scope.entries = data.responseData.feed.entries;
                console.log($scope.rssTitle);
            })
            .error(function(data) {
                console.log("ERROR: " + data);
            });
    }
    */
    
    /*
   .factory('FeedService',['$http',function($http){
    return {
        parseFeed : function(url){
            return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=15&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
        }
      }
   }])
  // I want to change var to the current $scope.blogs[i].rssFeed during the ng-repeat
  .controller('FeedCtrl', ['$scope', 'FeedService', function ($scope, Feed) {
        var url = ['http://feeds.feedburner.com/CssTricks', 'http://feeds.feedburner.com/TheProgrammersParadox', 'http://feeds2.feedburner.com/tympanus'];
        Feed.parseFeed(url[2]).then(function (res) {
            $scope.feeds = res.data.responseData.feed.entries;
         });
      
      //}
                          
   }])
   */
  

  
    /*
    $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=15&callback=?&q=http://feeds.feedburner.com/CssTricks').success(function(data) {
      console.log(data);
      });
    
      //$scope.rssData = data.feed.entries.title; 
    */
    
    /*
      window.onload = function any_function_name() {
        
      var url = "http://www.joezimjs.com/feed/";
        
    google.load("feeds", "1");

    function initialize() {
      var feed = new google.feeds.Feed(url);
      feed.load(function(result) {
        console.log("Go earth");
        if (!result.error) {
          var container = document.getElementById("feed");
          for (var i = 0; i < 1; i++) {
            var entry = result.feed.entries[i];
            var div = document.createElement("div");
            div.appendChild(document.createTextNode(entry.title));
            div.appendChild(document.createTextNode(entry.link));
            container.appendChild(div);
          }
        }
      });
    }
    google.setOnLoadCallback(initialize);
    }
    */
  
    /*
    // W3Schools API
    $http.get("http://www.w3schools.com/angular/customers.php")
  .success(function (response) {$scope.names = response.records;});

    // Twitter API
    $http.jsonp('https://api.twitter.com/1.1/followers/list.json?cursor=-1&screen_name=twitterdev&skip_status=true&include_user_entities=false?callback=JSON_CALLBACK')
    .success(function(tweets){
        $scope.twitterFollowers = tweets;
    }); 
  
    // Racers API  
    $http.get('http://ergast.com/api/f1/2013/driverStandings.json')
    .success(function(racers){
        $scope.racerNames = racers;
    });
    */  
  
    //console.log($scope.awesomeThings);
  
    $scope.addBlog = function() { 
      var getBlog = $scope.newContent;
      var getUrl = $scope.newUrl;
      var getTwitter = $scope.newTwitter;
      var getTwitUrl = $scope.newTwitUrl;
      var getRss = $scope.newRss;
      var newBlog = {
        name: getBlog,
        url: getUrl, 
        pageauthority: 50, 
        linkingsites: 25,
        mozrank: 3,
        pagerank: 5,
        votes: [1],
        twitterName: getTwitter,
        twitterUrl: getTwitUrl,
        twitterFollowers: 100,
        rssFeed: getRss,
        latestarticle: "Why Inline CSS Must Die in 2015 or Be Replaced With a New Method"
      };

      $scope.blogs.$add(newBlog);
      $scope.blogs.$save(newBlog); 
    }
    
    $scope.addVote = function(number) {
      if($scope.blogs[number].votes.indexOf($scope.currentUid) < 0) {
        var blog = $scope.blogs[number];
        blog.votes.push($scope.currentUid);
        $scope.blogs.$save(blog);
      }
      else {
        alert("Sorry! You've already voted for this blog.");
      }
    }

  
    /*$http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    }); 
    */

  });


