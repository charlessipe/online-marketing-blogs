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
  
  });