'use strict';

angular.module('topProgrammingBlogsApp')
  .controller('MainCtrl', function ($scope, $http, $firebaseObject, $firebaseArray) {
  
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
      }
    });
  
    $scope.addBlog = function() { 
      var getBlog = $scope.newContent;
      var getUrl = $scope.newUrl;
      var newBlog = {
        name: getBlog,
        url: getUrl, 
        pageauthority: 50, 
        linkingsites: 25,
        mozrank: 3,
        pagerank: 5,
        votes: [1],
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
    //if(blog.indexOf("facebook:10104241544048628") > -1) 
    
    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

  });