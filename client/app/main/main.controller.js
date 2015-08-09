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
        
        $scope.updateTwitter = function() {
          var item = $scope.blogs[start];
          item.twitterFollowers = $scope.follower;
          $scope.blogs.$save(item);
        }
        $scope.updateTwitter();
        
      })
        .catch(function(error){
        console.error('there was an error retrieving data: ', error);
      })
    }
    
    $scope.updateBlogScore = function(start) {
      
      var votesValue = $scope.blogs[start].votes.length;
      var linkingsitesValue = $scope.blogs[start].linkingsites;
      var mozrankValue = $scope.blogs[start].mozrank;
      var pageauthorityValue = $scope.blogs[start].pageauthority;
      var twitterValue = $scope.blogs[start].twitterFollowers;
      
      var BlogScoreTotal = votesValue + (linkingsitesValue * 0.00005) + (mozrankValue * 0.05) + (pageauthorityValue * 0.025) + (twitterValue * 0.00005);
      
      var blogScoreItem = $scope.blogs[start]; 
      blogScoreItem.blogScore = BlogScoreTotal;
      $scope.blogs.$save(blogScoreItem);
      
      
      //console.log($scope.blogs[start].votes.length);
      //console.log($scope.blogs[start].linkingsites);
      //console.log($scope.blogs[start].mozrank);
      //console.log($scope.blogs[start].pageauthority);
    }
    
    
   
    //Set random background image
    
    $scope.currentImage = "/assets/images/balloons.jpeg";
    
    $scope.randomImage = function() {
      
      $scope.backgroundImage = [
      "/assets/images/mountain-sunset.jpg",
      "/assets/images/telephone.jpg",
      "/assets/images/grand-central.jpg",
      "/assets/images/balloons.jpeg",
      "/assets/images/northern-lights.jpg",
      "/assets/images/city-river.jpg",
      "/assets/images/rainy-window.jpg",
      "/assets/images/snow-trees.jpg",
      "/assets/images/coffee.jpg",
      "/assets/images/cave-light.jpg",
      "/assets/images/ocean.jpg",
      "/assets/images/sea-sunset.jpg",
      "/assets/images/rock-forest.jpg",
      "/assets/images/mountain-sunset.jpg"
      ]
      
      var randomNum = Math.floor((Math.random() * 13) + 1);
      //var randomNum = Math.floor((Math.random() * 5) + 1);
      $scope.currentImage = $scope.backgroundImage[randomNum];
      //console.log(randomNum);
      //console.log($scope.backgroundImage[randomNum]);
  
    }
    
    
    
    //Only need to execute function to update Moz data, there are API rate limits, Turn this on when a new blog added
    /*
    $scope.getMozData = function(start) {
  
    var mozUrl = $scope.blogs[start].url;
  
    MozService.getMoz(mozUrl)
        .then(function(linkData){
        //do work with data
          $scope.twitterErrors = undefined;
          $scope.mozData = linkData;
          //console.log(res);
      
      $scope.updateMoz = function(){
        var item = $scope.blogs[start]; 
        item.mozrank = $scope.mozData.umrp;
        item.pageauthority = $scope.mozData.upa;
        item.linkingsites = $scope.mozData.ueid;
        $scope.blogs.$save(item);  
      }
      
      $scope.updateMoz();
      //Only need to execute function to update Moz data, there are API rate limits
      
      
      })
        .catch(function(error){
        console.error('there was an error retrieving data: ', error);
      })
    
    }
    */
    
    
    
    
    
    var ref = new Firebase("https://top-programming.firebaseio.com/"); // Instantiate the Firebase service with the new operator.

    // download the data into a local object
    $scope.data = $firebaseObject(ref);

    // create a synchronized array
    $scope.blogs = $firebaseArray(ref);
    $scope.blogs.$loaded()
      .then(function(res) {
        $scope.currentRss = new Array(res.length);
        $scope.currentTwitterCount = new Array(res.length);
      });

    // synchronize the object with a three-way data binding
    //syncObject.$bindTo($scope, "data");
    
    // Facebook login
    //var ref = new Firebase("https://top-programming.firebaseio.com/");
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
  
    
  
  
    // Google Feed API
  
    //$scope.currentRss = [];
  
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
            
            
            $scope.updateRss = function() {
            var rssItem = $scope.blogs[start];
            rssItem.rssTitle = $scope.currentRss[start].title;
            rssItem.rssUrl = $scope.currentRss[start].link;
            $scope.blogs.$save(rssItem);
            }
            $scope.updateRss();
    
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
    
    /*
    $scope.updateMozRank = function(start) {
    
      var oldMozRank = $scope.blogs[start].mozrank;
      console.log($scope.blogs[start].mozrank);
      //var oldMozRank = $scope.mozData.mozrank;
    }
    $scope.blogs.$save($scope.updateMozRank);  
    */
  
    // Add new blog to Firebase array
    
    $scope.addBlog = function() { 
      var getBlog = $scope.newContent;
      var getUrl = $scope.newUrl;
      var getMainUrl = $scope.newMainUrl;
      var getTwitter = $scope.newTwitter;
      var getTwitUrl = $scope.newTwitUrl;
      var getRss = $scope.newRss;
      var newBlog = {
        name: getBlog,
        url: getUrl,
        blogurl: "https://unsplash.com/",
        pageauthority: 0, 
        linkingsites: 0,
        mozrank: 0,
        pagerank: 5,
        votes: [1],
        twitterName: getTwitter,
        twitterUrl: getTwitUrl,
        twitterFollowers: 100,
        rssFeed: getRss,
        blogScore: 100,
        rssTitle: "Newly Submitted Blog",
        rssUrl: "http://www.google.com/",
        mainUrl: getMainUrl
      };

      $scope.blogs.$add(newBlog);
      $scope.blogs.$save(newBlog); 
    }
    
    $scope.addVote = function(number) {
      //console.log(number);
      if(number.votes.indexOf($scope.currentUid) < 0) {
        var blog = number;
        blog.votes.push($scope.currentUid);
        $scope.blogs.$save(blog);
      }
      else {
        alert("Sorry! You've already voted for this blog.");
      }
    }

    $scope.sortBy = '-blogScore';
    //$scope.filters = {presentUid: currentUid};

  });


