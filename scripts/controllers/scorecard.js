'use strict';

function ScorecardController($scope) {
  $scope.headers = [
    {
      'title': 'Content',
      'lines': [
        {
          'title': 'Under 30 lines',
          'points': 12,
          'max': 12,
          'comments': ['Don\'t take off too much for this', 'Seriously, don\'t'],
          'off': [
            {
              'comment': 'You didn\'t do this!',
              'points': 0
            }
          ]
        },
        {
          'title': 'Under 80 chars'
        }
      ]
    }
  ];
}

angular.module('virtualGrade')
  .controller('ScorecardCtrl', ['$scope', ScorecardController]);
