'use strict';

function RetrieveGradesService($http) {

  return {
    getGrades: function (id) {

      var url = 'https://www.eecs.tufts.edu/~aplume01/portal/cgi-bin/AloadGrades.cgi';
      var data = $.param({
        'classID': id
      });
      var headers = {
        'Content-type': 'application/x-www-form-urlencoded'
      };
      if (!data) {
        return [];
      }
      return $http.post(url, data, {headers: headers}).then(function (data) {
        return data.data.grades;
      });
    }
  };
}

angular.module('virtualGrade')
  .factory('RetrieveGrades', ['$http', RetrieveGradesService]);
