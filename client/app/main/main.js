'use strict';

angular.module('topProgrammingBlogsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        title: 'Top Ranked Blogs - RankedBlogs.com'
      });
  
    $stateProvider
      .state('about', {  // About page
        url: '/about',
        templateUrl: 'app/about.html',
        controller: 'MainCtrl',
        title: 'About RankedBlogs.com'
      });

    $stateProvider
      .state('instructions', {  // Instructions page
        url: '/instructions',
        templateUrl: 'app/instructions.html',
        controller: 'MainCtrl',
        title: 'Instructions'
      });
  
    $stateProvider
      .state('add-blog', {  // Add blog page
        url: '/add-blog',
        templateUrl: 'app/add-blog.html',
        controller: 'MainCtrl',
        title: 'Add blog'
      });
  
    $stateProvider
      .state('coding-bootcamps', {  // Coding Bootcamps page
        url: '/coding-bootcamps',
        templateUrl: 'app/coding-bootcamps.html',
        controller: 'MainCtrl'
      });
  
    $stateProvider
      .state('personal-development', {  // Personal Development page
        url: '/personal-development',
        templateUrl: 'app/personal-development.html',
        controller: 'MainCtrl',
        title: 'Top Personal Development Blogs - Ranked Blogs'
      });
  
    $stateProvider
      .state('online-marketing', {  // Online Marketing page
        url: '/online-marketing',
        templateUrl: 'app/online-marketing.html',
        controller: 'MainCtrl',
        title: 'Top Online Marketing Blogs - Ranked Blogs'
      });
  
    $stateProvider
      .state('parenting', {  // Parenting page
        url: '/parenting',
        templateUrl: 'app/parenting.html',
        controller: 'MainCtrl',
        title: 'Top Parenting Blogs - Ranked Blogs'
      });
  
    $stateProvider
      .state('seattle', {  // Seattle page
        url: '/seattle',
        templateUrl: 'app/seattle.html',
        controller: 'MainCtrl',
        title: 'Top Seattle Blogs - Ranked Blogs'
      });
  
    $stateProvider
      .state('programming', {  // Programming page
        url: '/programming',
        templateUrl: 'app/programming.html',
        controller: 'MainCtrl',
        title: 'Top Programming Blogs - Ranked Blogs'
      });
  
    $stateProvider
      .state('marketing', {  // Marketing page
        url: '/marketing',
        templateUrl: 'app/marketing.html',
        controller: 'MainCtrl',
        title: 'Top Marketing Blogs - Ranked Blogs'
      });
  
    $stateProvider
      .state('javascript', {  // JavaScript page
        url: '/javascript',
        templateUrl: 'app/javascript.html',
        controller: 'MainCtrl',
        title: 'Top JavaScript Blogs - Ranked Blogs'
      });
  
    $stateProvider
      .state('seattle-startups', {  // Seattle Startups page
        url: '/seattle-startups',
        templateUrl: 'app/seattle-startups.html',
        controller: 'MainCtrl',
        title: 'Top Seattle Startup Blogs - Ranked Blogs'
      });
  
    $stateProvider
      .state('code-schools', {  // Code Schools page
        url: '/code-schools',
        templateUrl: 'app/code-schools.html',
        controller: 'MainCtrl',
        title: 'Top Code School Blogs - Ranked Blogs'
      });
  
    $stateProvider
      .state('apple', {  // Apple page
        url: '/apple',
        templateUrl: 'app/apple.html',
        controller: 'MainCtrl',
        title: 'Top Apple Blogs - Ranked Blogs'
      });
  
    $stateProvider
      .state('farming', {  // Farming page
        url: '/farming',
        templateUrl: 'app/farming.html',
        controller: 'MainCtrl',
        title: 'Top Farming Blogs - Ranked Blogs'
      });
  
    $stateProvider
      .state('law-firms', {  // Farming page
        url: '/law-firms',
        templateUrl: 'app/law-firms.html',
        controller: 'MainCtrl',
        title: 'Top Law Firm Blogs - Ranked Blogs'
      });
  
  });