'use strict';

/* Credit to Tom Hodgins for much of the below code
 * Conversion to AngularJS courtesy of the implementation author
 */

function PDFController($scope, $state, $mdDialog) {

  $scope.currentNavItem = 'draw';

  $scope.cursorColor = '#000000';
  $scope.textColor = '#000000';
  $scope.fontSize = 5;
  $scope.cursorSize = 5;

  $scope.course = '00';
  $scope.assign = 'hw4';
  $scope.page = '4';
  $scope.student = 'aplume01';
  $scope.numPages = 6;

  (function init() {
    $scope.$broadcast('mode', $scope.currentNavItem);
    $scope.$broadcast('fontSize', $scope.fontSize);
    $scope.$broadcast('cursorSize', $scope.cursorSize);
    $scope.$broadcast('cursorColor', $scope.cursorColor);
    $scope.$broadcast('fontColor', $scope.textColor);
  }());

  $scope.pagesArray = function () {
    return new Array($scope.numPages);
  };

  $scope.undo = function () {
    $scope.$broadcast('undo');
  };
  $scope.clear = function (type) {
    $scope.$broadcast('clear', type);
  };

  $scope.search = function () {
    console.log('Search by student: ' + $scope.searchStudent);
  };
  $scope.searchPage = function (num) {
    console.log('Search by page: ' + num);
  };

  $scope.save = function () {
    console.log('Save!');
  };

  $scope.next = function (shouldSave) {
    if (shouldSave) {
      $scope.save();
    }
    console.log('Next!');
  };

  $scope.close = function (shouldSave) {
    if (shouldSave) {
      $scope.save();
    }
    $mdDialog.hide();
  };

  $scope.changeMode = function (mode) {
    $scope.$broadcast('mode', mode);
  };

  $scope.$watch('cursorColor', function () {
    $scope.$broadcast('cursorColor', $scope.cursorColor);
  });

  $scope.$watch('cursorSize', function () {
    $scope.$broadcast('cursorSize', $scope.cursorSize);
  });

  $scope.$watch('fontColor', function () {
    $scope.$broadcast('fontColor', $scope.fontColor);
  });

  $scope.$watch('fontSize', function () {
    $scope.$broadcast('fontSize', $scope.fontSize);
  });
}

angular.module('virtualGrade')
  .controller('PDFCtrl', ['$scope', '$state', '$mdDialog', PDFController]);
