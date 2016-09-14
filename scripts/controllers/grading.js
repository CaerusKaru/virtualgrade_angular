'use strict';

function GradingController($scope, $state, StartUpData) {

  $scope.currentNavItem = ($state.includes('course')) ? $state.href('mode.grading.course', {}, {}).split('/')[2] : '/';
  StartUpData.getData().then(function (data) {
    $scope.courses = data.grading;
  });
}

angular.module('virtualGrade')
  .controller('GradingCtrl', ['$scope', '$state', 'StartUpData', GradingController]);
