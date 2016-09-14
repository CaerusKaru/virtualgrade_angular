'use strict';

function PDFLandingDirective() {
  return {
    restrict: 'E',
    scope: false,
    templateUrl: 'views/gradingPDF.html'
  };
}

angular.module('virtualGrade')
  .directive('pdfLanding', PDFLandingDirective);
