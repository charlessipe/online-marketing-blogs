'use strict';

angular.module('topProgrammingBlogsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  
    $stateProvider
      .state('about', {  // About page
        url: '/about',
        templateUrl: 'app/about.html',
        controller: 'MainCtrl',
      });

    $stateProvider
      .state('instructions', {  // Instructions page
        url: '/instructions',
        templateUrl: 'app/instructions.html',
        controller: 'MainCtrl',
      });
  
    $stateProvider
      .state('seattle-startups', {  // Seattle Startups page
        url: '/seattle-startups',
        templateUrl: 'app/seattle-startups.html',
        controller: 'MainCtrl',
      });
  
    $stateProvider
      .state('add-blog', {  // Add blog page
        url: '/add-blog',
        templateUrl: 'app/add-blog.html',
        controller: 'MainCtrl',
      });
  
    $stateProvider
      .state('coding-bootcamps', {  // Coding Bootcamps page
        url: '/coding-bootcamps',
        templateUrl: 'app/coding-bootcamps.html',
        controller: 'MainCtrl',
      });
  
    $stateProvider
      .state('personal-development', {  // Personal Development page
        url: '/personal-development',
        templateUrl: 'app/personal-development.html',
        controller: 'MainCtrl',
      });
  
    $stateProvider
      .state('online-marketing', {  // Online Marketing page
        url: '/online-marketing',
        templateUrl: 'app/online-marketing.html',
        controller: 'MainCtrl',
      });
  
    $stateProvider
      .state('parenting', {  // Parenting page
        url: '/parenting',
        templateUrl: 'app/parenting.html',
        controller: 'MainCtrl',
      });
  
    $stateProvider
      .state('seattle', {  // Seattle page
        url: '/seattle',
        templateUrl: 'app/seattle.html',
        controller: 'MainCtrl',
      });
  
    $stateProvider
      .state('programming', {  // Programming page
        url: '/programming',
        templateUrl: 'app/programming.html',
        controller: 'MainCtrl',
      });
  
    $stateProvider
      .state('marketing', {  // Marketing page
        url: '/marketing',
        templateUrl: 'app/marketing.html',
        controller: 'MainCtrl',
      });
  
    $stateProvider
      .state('javascript', {  // Marketing page
        url: '/javascript',
        templateUrl: 'app/javascript.html',
        controller: 'MainCtrl',
      });
  
  });