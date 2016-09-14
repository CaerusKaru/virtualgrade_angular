'use strict';

function AdminMenuController($scope, $rootScope, $mdToast, PageService) {

  $scope.menu = [
    {
      'name': 'Create',
      'state': 'create'
    },
    {
      'name': 'Publish',
      'state': 'publish'
    },
    {
      'name': 'Assign Graders',
      'state': 'assign'
    },
    {
      'name': 'Export',
      'state': 'export'
    },
    {
      'name': 'Statistics',
      'state': 'stats'
    },
    {
      'name': 'Delete',
      'state': 'delete'
    }
  ];

  $scope.page = {
    name: '',
    number: ''
  };

  $scope.selectedIndex = 0;
  $scope.type = 'pdf';

  $scope.setType = function (type) {
    $scope.type = type;
  };

  $scope.click = function () {
    var course = $rootScope.$stateParams.id;
    console.log(course, $scope.type, $scope.selectedIndex);
    PageService.addPage(course, $scope.type, $scope.page.name, $scope.page.number).then(function (data) {
      console.log(data);
      $mdToast.showSimple(data);
    });
  };
}

angular.module('virtualGrade')
  .controller('AdminMenuCtrl', ['$scope', '$rootScope', '$mdToast', 'PageService', AdminMenuController]);
