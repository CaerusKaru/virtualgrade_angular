'use strict';

function NavController($scope, $state, $location, $window, StartUpData) {

  var curState = $state.current.name.split('.')[1];
  $scope.currentNavItem = curState || 'grades';
  $scope.logOut = function () {
    var newUrl = 'https://z:z@' + $location.absUrl().substring(7);
    $window.location.href = newUrl;
  };
  StartUpData.getData().then(function (data) {
    $scope.isAdmin = data.admin.length !== 0;
    $scope.isGrader = data.grading.length !== 0;
    $scope.username = data.user;
  });
  if (!curState) {
    $state.go('.grades');
  }
}

angular.module('virtualGrade')
  .controller('NavCtrl', ['$scope', '$state', '$location', '$window', 'StartUpData', NavController]);
