'use strict';

function PublishDataService($http) {

  return {
    getPages: function (id) {
      var url = 'https://www.eecs.tufts.edu/~aplume01/portal/cgi-bin/AloadMenu.cgi';
      var data = $.param({
        'classID': id,
        'menu': 'publish'
      });
      var headers = {
        'Content-type': 'application/x-www-form-urlencoded'
      };
      if (!data) {
        return [];
      }
      return $http.post(url, data, {headers: headers}).then(function (data) {
        return data.data.result.pages;
      });
    },
    setPublish: function (id, page, shouldPub) {
      var url = 'https://www.eecs.tufts.edu/~aplume01/portal/cgi-bin/publish.cgi';
      var data = $.param({
        'classID': id,
        'page': page,
        'publish': (shouldPub) ? 'y' : 'n'
      });
      var headers = {
        'Content-type': 'application/x-www-form-urlencoded'
      };
      if (!data || !page) {
        return;
      }
      $http.post(url, data, {headers: headers});
    },
    setCommments: function (id, page, shouldPub) {
      var url = 'https://www.eecs.tufts.edu/~aplume01/portal/cgi-bin/publish_com.cgi';
      var data = $.param({
        'classID': id,
        'page': page,
        'publish': (shouldPub) ? 'y' : 'n'
      });
      var headers = {
        'Content-type': 'application/x-www-form-urlencoded'
      };
      if (!data || !page) {
        return;
      }
      $http.post(url, data, {headers: headers});
    }
  };
}

angular.module('virtualGrade')
  .factory('PublishData', ['$http', PublishDataService]);
