'use strict';

function AdminController($scope, $state, StartUpData) {

  $scope.currentNavItem = ($state.includes('course')) ? $state.href('mode.admin.course', {}, {}).split('/')[2] : '/';
  StartUpData.getData().then(function (data) {
    $scope.courses = data.admin;
  });
}

angular.module('virtualGrade')
  .controller('AdminCtrl', ['$scope', '$state', 'StartUpData', AdminController]);
