'use strict';

/**
 * @ngdoc overview
 * @name virtualGrade
 * @description
 * # An online SPA for grading documents based on courses and students retrieved via AJAX
 *
 * Main module of the application.
 */

var modules = [];

var libModules = [
  'ngMaterial',
  'ngMessages',
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ui.sortable',
  'ui.router'
];

function ThemeConfig($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .accentPalette('blue');
}

function AppRoute($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}

function AppRouteConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/grades');
  $stateProvider
    .state('mode', {
      url: '/',
      templateUrl: 'views/nav.html',
      controller: 'NavCtrl'
    })
    .state('mode.grades', {
      url: 'grades',
      templateUrl: 'views/showCourses.html',
      controller: 'GradesCtrl'
    })
    .state('mode.grading', {
      url: 'grading',
      templateUrl: 'views/showCourses.html',
      controller: 'GradingCtrl'
    })
    .state('mode.admin', {
      url: 'admin',
      templateUrl: 'views/showCourses.html',
      controller: 'AdminCtrl'
    })
    .state('mode.grades.course', {
      url: '/:id',
      templateUrl: 'views/showGrades.html',
      controller: 'ShowGradesCtrl'
    })
    .state('mode.admin.course', {
      url: '/:id',
      templateUrl: 'views/admin.html',
      controller: 'AdminMenuCtrl'
    })
    .state('mode.admin.course.menu', {
      url: '/:menu',
      templateUrl: function (params) {
        return 'views/menus/' + params.menu + '.html';
      }
    })
    .state('mode.grading.course', {
      url: '/:id',
      templateUrl: 'views/showGradingAssign.html',
      controller: 'ShowGradingCtrl'
    })
    .state('mode.grading.course.assign', {
      url: '/:assign',
      templateProvider: function ($stateParams, RetrieveStudents) {
        return RetrieveStudents.getData($stateParams.id, $stateParams.assign).then(function (data) {
          if (data.type === 'scorecard') {
            return '<scorecard-landing flex layout="row"></scorecard-landing>';
          } else if (data.type === 'pdf') {
            return '<pdf-landing flex></pdf-landing>';
          } else {
            return '<p>Unsupported type</p>';
          }
        });
      },
      controller: 'GradingAssignCtrl'
    });
}

angular
  .module('virtualGrade', modules.concat(libModules))
  .run(['$rootScope', '$state', '$stateParams', AppRoute])
  .config(['$mdThemingProvider', ThemeConfig])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', AppRouteConfig]);
