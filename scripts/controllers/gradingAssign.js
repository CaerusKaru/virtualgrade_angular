'use strict';

function GradingAssignController($scope, $rootScope, $mdDialog, RetrieveStudents) {

  $scope.pages = [];
  $scope.students = [];
  $scope.inps = [];
  $scope.coms = [];
  $scope.random = false;
  $scope.type = '';

  RetrieveStudents.getData($rootScope.$stateParams.id, $rootScope.$stateParams.assign).then(function (result) {
    $scope.students = result.none;
    $scope.inps = result.inp;
    $scope.coms = result.com;
    $scope.type = result.type;
    $scope.pages = result.pages;
  });

  $scope.submit = function (name, num) {
    if ($scope.type === 'pdf') {
      console.log(num);
      $mdDialog.show({
        controller: 'PDFCtrl',
        templateUrl: 'views/gradingPDFModal.html',
        clickOutsideToClose: true
      });
    } else if ($scope.type === 'scorecard') {
      $mdDialog.show({
        controller: 'ScorecardCtrl',
        templateUrl: 'views/gradingScorecardModal.html',
        clickOutsideToClose: true
      });
    }
    console.log(name);
  };
}

angular.module('virtualGrade')
  .controller('GradingAssignCtrl', ['$scope', '$rootScope', '$mdDialog', 'RetrieveStudents', GradingAssignController]);
