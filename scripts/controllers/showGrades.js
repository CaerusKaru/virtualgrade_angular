'use strict';

function ShowGradesController($scope, $state, $rootScope, $window, RetrieveGrades) {

  $scope.currentNavItem = ($state.includes('course')) ? $state.href('mode.grades.course', {}, {}).split('/')[2] : '/';
  $scope.course = $rootScope.$stateParams.id;
  $scope.grades = [];
  RetrieveGrades.getGrades($scope.course).then(function (data) {
    $scope.grades = data;
  });
  $scope.submitPDF = function (assign) {
    $window.location.href = 'https://www.eecs.tufts.edu/~aplume01/portal/cgi-bin/loadROC.cgi?page=' + assign + '&classID=' + $scope.course;
  };
  $scope.submitCard = function () {
    console.log('card');
  };
}

angular.module('virtualGrade')
  .controller('ShowGradesCtrl', ['$scope', '$state', '$rootScope', '$window', 'RetrieveGrades', ShowGradesController]);
