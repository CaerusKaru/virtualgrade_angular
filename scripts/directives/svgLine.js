'use strict';

function SvgLineDirective($document) {
  return {
    restrict: 'A',
    scope: false,
    link: function (scope, element, attrs) {
      var mode = 'draw';
      var currentColor = element.css('stroke');
      var selected = false;
      var currentX = 0;
      var currentY = 0;
      var transform = attrs.translate;
      if (transform) {
        var currentPos = transform.split('(')[1].split(')')[0].split(',');
        currentX = currentPos[0];
        currentY = currentPos[1];
      }

      scope.$on('mode', function (evt, newMode) {
        mode = newMode;
        element.css('stroke', currentColor);
        cleanUp();
        if (newMode === 'select' || newMode === 'drag') {
          element.bind('mouseover', hoverStart);
          element.bind('mouseleave', hoverEnd);
        }
        if (newMode === 'select') {
          element.bind('click', selectClick);
        }
        if (newMode === 'drag') {
          element.bind('mousedown', dragStart);
        }
      });

      scope.$on('$destroy', function () {
        cleanUp();
      });

      function hoverStart() {
        element.css('stroke', 'red');
      }

      function hoverEnd() {
        // Idea: make the highlighted color the inverse of the current color to avoid collisions
        if (!selected) {
          element.css('stroke', currentColor);
        }
      }

      function selectClick() {
        selected = !selected;
        if (selected) {
          element.css('stroke', 'red');
          $document.bind('keydown', remove);
        } else {
          element.css('stroke', currentColor);
          $document.off('keydown', remove);
        }
      }

      function remove(evt) {
        if (!selected) {
          return;
        }
        if (evt.keyCode === 8 || evt.keyCode === 46) {
          evt.preventDefault();
          cleanUp();
          angular.element(element).remove();
        }
      }

      function dragStart(evt) {
        evt.preventDefault();
        selected = true;
        var touchX = evt.pageX;
        var touchY = evt.pageY;

        $document.bind('mousemove', {touchX: touchX, touchY: touchY}, dragMove);
        $document.bind('mouseup', {touchX: touchX, touchY: touchY}, dragEnd);
        element.css('cursor', 'move');
      }

      function dragMove(evt) {
        evt.preventDefault();
        var startX = evt.data.touchX;
        var startY = evt.data.touchY;
        var deltaX = ((evt.pageX - startX) * scope.offsetX) + currentX;
        var deltaY = ((evt.pageY - startY) * scope.offsetY) + currentY;

        attrs.$set('transform', 'translate(' + deltaX + ', ' + deltaY + ')');
      }

      function dragEnd(evt) {

        selected = false;
        var startX = evt.data.touchX;
        var startY = evt.data.touchY;
        var deltaX = ((evt.pageX - startX) * scope.offsetX) + currentX;
        var deltaY = ((evt.pageY - startY) * scope.offsetY) + currentY;

        currentX = deltaX;
        currentY = deltaY;
        $document.off('mouseup', dragEnd);
        $document.off('mousemove', dragMove);
        element.css('cursor', 'auto');
      }

      function cleanUp() {
        $document.off('mouseup', dragEnd);
        $document.off('mousemove', dragMove);
        element.off('mouseover', hoverStart);
        element.off('mouseleave', hoverEnd);
        element.off('click', selectClick);
        element.off('mousedown', dragStart);
        $document.off('keydown', remove);
      }
    }
  };
}

angular.module('virtualGrade')
  .directive('svgLine', ['$document', SvgLineDirective]);
