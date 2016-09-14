'use strict';

function PublishController($scope, $rootScope, PublishData) {

  $scope.pages = [];
  PublishData.getPages($rootScope.$stateParams.id).then(function (data) {
    $scope.pages = data;
  });

  $scope.publish = function (page, shouldPub) {
    PublishData.setPublish($rootScope.$stateParams.id, page, shouldPub);
  };

  $scope.pubCom = function (page, shouldPub) {
    PublishData.setComments($rootScope.$stateParams.id, page, shouldPub);
  };
}

angular.module('virtualGrade')
  .controller('PublishCtrl', ['$scope', '$rootScope', 'PublishData', PublishController]);
