'use strict';

angular.module('topProgrammingBlogsApp')
  
  .factory('TwitterService', function($http, $q){  // factory from Strangemilk
  
  var getUser = function(username){
    var d = $q.defer();  //promise
    $http.get('/twitter/user/' + username)
      .success(function(followers){
        return d.resolve(followers);
      })
      .error(function(error){
        return d.reject(error);
      });
    return d.promise;
  };

  return {
    getUser : getUser
  }
})
  

  .factory('MozService', function($http, $q){  // factory from Strangemilk
  
  
  var getMoz = function(mozUrl){
    var d = $q.defer();  //promise
    $http.get('/api/url-metrics/' + mozUrl)
      .success(function(res){
        return d.resolve(res);
      })
      .error(function(error){
        return d.reject(error);
      });
    return d.promise;
  };

  return {
    getMoz : getMoz
  }
})
 


  .controller('MainCtrl', function ($scope, $http, $firebaseObject, $firebaseArray, $resource, TwitterService, MozService) {
  
    // Twitter API
    $scope.currentTwitterCount = [];
   
    $scope.getTwitterCount = function(start) {
      var twitterHandle = $scope.blogs[start].twitterName;
    
      TwitterService.getUser(twitterHandle)
        .then(function(followers){
        //do work with data
          $scope.twitterErrors = undefined;
          $scope.follower = followers;
        //console.log(followers);
        //$scope.currentTwitterCount.push(followers);
          $scope.currentTwitterCount[start] = followers;
      })
        .catch(function(error){
        console.error('there was an error retrieving data: ', error);
      })
    }
    
    //console.log($scope.currentTwitterCount);
   
    
    var mozUrl = [
      'tympanus.net%2fcodrops',
      'www.codementor.io%2fblog/'
    ];
    
    //for(i=0; i<mozUrl.length; i++){
  
    MozService.getMoz(mozUrl[0])
        .then(function(linkData){
        //do work with data
          $scope.twitterErrors = undefined;
          $scope.mozData = linkData;
          //console.log(res);
        
      })
        .catch(function(error){
        console.error('there was an error retrieving data: ', error);
      })
    
    //}
    
    
    
    var ref = new Firebase("https://top-programming.firebaseio.com/"); // Instantiate the Firebase service with the new operator.

    // download the data into a local object
    $scope.data = $firebaseObject(ref);

    // create a synchronized array
    $scope.blogs = $firebaseArray(ref);
    $scope.blogs.$loaded()
      .then(function(res) {
        $scope.currentRss = new Array(res.length);
        
      }).then(function(res){
        $scope.currentTwitterCount = new Array(res.length);
      });

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
    // /api/url-metrics/????
    $http.jsonp('http://lsapi.seomoz.com/linkscape/url-metrics/'+currentUrl+'?Cols=34359754788&AccessID=mozscape-07bc82a137&Expires='+apiExpires+'&Signature='+signature).then(function(siteData) {
      $scope.mozData = siteData;
    })
      
    //.error(function(err) { $scope.mozData = err; })
  
  
    console.log($scope.mozData);  
    */

    
  
  
    // Google Feed API
  
    $scope.showRss = function(start) {  
   
      //for(var index = 0; index < $scope.blogs.length; index++){
      var rssUrl = $scope.blogs[start].rssFeed;
        
      google.load("feeds", "1");

      function initialize() {
        var feed = new google.feeds.Feed(rssUrl);
        feed.load(function(result) {
          if (!result.error) {
            var entry = result.feed.entries[0];
            $scope.currentRss[start] = entry;
    
            //$scope.currentRss = entry;
            //$scope.rssArray.push = entry; 
            //document.getElementById("feed").innerHTML = "<a href='"+entry.link+"'>"+entry.title+"</a>"; for div id = feed 
        }
        $scope.$apply();  
        });
      }
      initialize();
      // end for loop
      //}
    }
    
    //$scope.showRss();
 
    
    /*
    // W3Schools API
    $http.get("http://www.w3schools.com/angular/customers.php")
  .success(function (response) {$scope.names = response.records;});
  
    // Racers API  
    $http.get('http://ergast.com/api/f1/2013/driverStandings.json')
    .success(function(racers){
        $scope.racerNames = racers;
    });
    */  
  
  
    // Add new blog to Firebase array
    
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
        blogScore: 100
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


