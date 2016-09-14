'use strict';

function StartUpDataService($http) {

  return {
    getData: function () {
      var url = 'https://www.eecs.tufts.edu/~aplume01/portal/cgi-bin/AloadUser.cgi';
      return $http.post(url, {}, {}).then(function (data) {
        return data.data;
      });
    }
  };
}

angular.module('virtualGrade')
  .factory('StartUpData', ['$http', StartUpDataService]);
