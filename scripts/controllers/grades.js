'use strict';

function GradesController($scope, $state, StartUpData) {

  $scope.currentNavItem = ($state.includes('course')) ? $state.href('mode.grades.course', {}, {}).split('/')[2] : '/';
  StartUpData.getData().then(function (data) {
    $scope.courses = data.grades;
  });
}

angular.module('virtualGrade')
  .controller('GradesCtrl', ['$scope', '$state', 'StartUpData', GradesController]);
