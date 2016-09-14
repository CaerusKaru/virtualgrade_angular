'use strict';

function PDFService($http) {

  return {
    getPDF: function (id, assign, prev, student, page) {
      var url = 'https://www.eecs.tufts.edu/~aplume01/portal/cgi-bin/AloadPDF.cgi';
      var data = $.param({
        'classID': id,
        'assign': assign,
        'prev': prev,
        'student': student,
        'page': page
      });
      var headers = {
        'Content-type': 'application/x-www-form-urlencoded'
      };
      if (!data || !page) {
        return;
      }
      return $http.post(url, data, {headers: headers}).then(function (data) {
        return data.data;
      });
    }
  };
}

angular.module('virtualGrade')
  .factory('PDFService', ['$http', PDFService]);
