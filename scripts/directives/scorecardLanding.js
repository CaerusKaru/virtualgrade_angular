'use strict';

function ScorecardLandingDirective() {
  return {
    restrict: 'E',
    scope: false,
    templateUrl: 'views/gradingScorecard.html'
  };
}

angular.module('virtualGrade')
  .directive('scorecardLanding', ScorecardLandingDirective);
