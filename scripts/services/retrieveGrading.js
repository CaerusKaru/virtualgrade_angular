'use strict';

function RetrieveGradingService($http) {

  return {
    getPages: function (id) {

      var url = 'https://www.eecs.tufts.edu/~aplume01/portal/cgi-bin/AloadPages.cgi';
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
        if (data.data.pages[0] === '') {
          return [];
        }
        return data.data.pages;
      });
    }
  };
}

angular.module('virtualGrade')
  .factory('RetrieveGrading', ['$http', RetrieveGradingService]);
