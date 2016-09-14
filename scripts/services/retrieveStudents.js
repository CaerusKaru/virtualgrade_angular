'use strict';

function RetrieveStudentsService($http) {

  return {
    getData: function (id, page) {
      var url = 'https://www.eecs.tufts.edu/~aplume01/portal/cgi-bin/AloadGrading.cgi';
      var data = $.param({
        'classID': id,
        'page': page
      });
      var headers = {
        'Content-type': 'application/x-www-form-urlencoded'
      };
      if (!data || !page) {
        return [];
      }
      return $http.post(url, data, {headers: headers}).then(function (data) {
        return data.data;
      });
    }
  };
}

angular.module('virtualGrade')
  .factory('RetrieveStudents', ['$http', RetrieveStudentsService]);
