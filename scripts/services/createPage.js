'use strict';

function PageService($http) {

  return {
    addPage: function (course, type, page, numPages) {

      var url = 'https://www.eecs.tufts.edu/~aplume01/portal/cgi-bin/AcreatePage.cgi';
      var data = $.param({
        'classID': course,
        'type': type,
        'assign': page,
        'pages': numPages
      });
      var headers = {
        'Content-type': 'application/x-www-form-urlencoded'
      };
      if (!data) {
        return [];
      }
      return $http.post(url, data, {headers: headers}).then(function (data) {
        return data.data.result;
      });
    }
  };
}

angular.module('virtualGrade')
  .factory('PageService', ['$http', PageService]);
