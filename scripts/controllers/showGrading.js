'use strict';

function ShowGradingController($scope, $state, $rootScope, RetrieveGrading) {

  $scope.currentNavItem = ($state.includes('course')) ? $state.href('mode.grading.course', {}, {}).split('/')[2] : '/';
  $scope.course = $rootScope.$stateParams.id;
  RetrieveGrading.getPages($scope.course).then(function (data) {
    $scope.assignments = data;
  });
}

angular.module('virtualGrade')
  .controller('ShowGradingCtrl', ['$scope', '$state', '$rootScope', 'RetrieveGrading', ShowGradingController]);
