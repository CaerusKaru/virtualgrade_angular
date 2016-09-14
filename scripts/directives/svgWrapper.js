'use strict';

function SVGWrapperDirective($compile, $window, PDFService) {
  return {
    restrict: 'E',
    scope: true,
    link: function (scope, element) {

      var ns = 'http://www.w3.org/2000/svg';
      var line = '';
      var gesture = false;
      var board;
      scope.offsetX = 1.0;
      scope.offsetY = 1.0;
      var posX, posY;
      scope.mode = 'draw';
      var fontColor = '#000000';
      var fontSize = 5;
      var cursorSize = 5;
      var cursorColor = '#000000';
      var fontType = 'Helvetica';
      var defaultText = 'Click to edit!';

      scope.$on('mode', function (evt, newMode) {
        scope.mode = newMode;
      });

      scope.$on('fontColor', function (evt, newColor) {
        fontColor = newColor;
      });

      scope.$on('fontSize', function (evt, newSize) {
        fontSize = newSize;
      });


      scope.$on('cursorColor', function (evt, newColor) {
        cursorColor = newColor;
      });


      scope.$on('cursorSize', function (evt, newSize) {
        cursorSize = newSize;
      });

      function click(evt) {
        if (scope.mode === 'text') {
          textCreate(evt);
        }
      }

      element.bind('click', click);

      function undo() {
        var paths = board.children;
        if (paths.length !== 1) {
          board.removeChild(paths[paths.length - 1]);
        }
      }

      function clear(evt, type) {
        var paths = board.children;
        var min = 0;
        if (type === 'all') {
          min = 1;
        } else if (type === 'text') {
          paths = board.getElementsByTagNameNS(ns, 'text');
        } else if (type === 'lines') {
          paths = board.getElementsByTagNameNS(ns, 'path');
        }

        if (paths.length > min) {
          while (paths[min]) {
            board.removeChild(paths[min]);
          }
        }
      }

      scope.$on('clear', clear);
      scope.$on('undo', undo);

      function calculateHeight() {

        var curHeight = element[0].clientHeight;
        curHeight -= parseFloat(element[0].style.marginTop) || 0;
        curHeight -= parseFloat(element[0].style.marginBottom) || 0;
        curHeight -= parseFloat(element[0].style.paddingTop) || 0;
        curHeight -= parseFloat(element[0].style.paddingBottom) || 0;
        board.style.height = curHeight;
      }

      var w = angular.element($window);

      w.bind('resize', calculateHeight);

      scope.clickDown = function (evt) {
        evt.preventDefault();
        updateBoundingRect();
        if (scope.mode === 'draw') {
          drawStart(evt);
        }
      };

      // set the cursor styling here since in theory this should always happen first...
      scope.clickMove = function (evt) {
        evt.preventDefault();
        if (scope.mode === 'draw') {
          drawMove(evt);
        } else {
          if (board) {
            board.style.cursor = 'auto';
          }
        }
      };

      element.bind('touchstart', scope.clickDown);
      element.bind('touchmove', scope.clickMove);
      element.bind('touchend', scope.clickUp);

      scope.clickUp = function (evt) {
        evt.preventDefault();
        if (scope.mode === 'draw') {
          drawEnd(evt);
        }
      };

      function getLocalMouse(evt) {
        var pt = board.createSVGPoint();
        pt.x = evt.clientX || evt.touches[0].clientX;
        pt.y = evt.clientY || evt.touches[0].clientY;
        return pt.matrixTransform(board.getScreenCTM().inverse());
      }

      function textCreate(evt) {
        evt.preventDefault();
//		console.log(evt.target);
        var localpoint = getLocalMouse(evt);
        var textNode = document.createElementNS(ns, 'text');
        textNode.setAttributeNS(null, 'font-family', fontType);
        textNode.setAttributeNS(null, 'font-size', fontSize * 5);
        textNode.setAttributeNS(null, 'fill', fontColor);

        textNode.setAttributeNS(null, 'x', localpoint.x);
        textNode.setAttributeNS(null, 'y', localpoint.y);
        textNode.setAttributeNS(null, 'dy', '1.0em');

        var initSpan = document.createElementNS(ns, 'tspan');
        initSpan.setAttributeNS(null, 'x', localpoint.x);

        var textSpan = document.createTextNode(defaultText);

        initSpan.appendChild(textSpan);
        textNode.appendChild(initSpan);

        textNode.setAttribute('svg-text', '');
        angular.element('svg').append(textNode);
        $compile(angular.element(textNode))(scope);
      }

      function drawStart(evt) {
        line = 'M' + ((evt.clientX || evt.touches[0].clientX) - posX) * scope.offsetX + ', ' + ((evt.clientY || evt.touches[0].clientY) - posY) * scope.offsetY + ' ';
        gesture = true;
        evt.preventDefault();
      }

      function drawMove(evt) {
        if (gesture) {
          line += 'L' + ((evt.clientX || evt.touches[0].clientX) - posX) * scope.offsetX + ', ' + ((evt.clientY || evt.touches[0].clientY) - posY) * scope.offsetY + ' ';
          trace(evt);
        }
      }

      function drawEnd(evt) {

        removeDots();
        var color = cursorColor;
        var size = cursorSize;
        line += 'L' + ((evt.clientX || evt.changedTouches[0].clientX) - posX) * scope.offsetX + ', ' + ((evt.clientY || evt.changedTouches[0].clientY) - posY) * scope.offsetY;
        var path = document.createElementNS(ns, 'path');
        path.setAttributeNS(null, 'd', line);
        path.setAttributeNS(null, 'fill', 'none');
        path.setAttributeNS(null, 'stroke-linecap', 'round');
        path.setAttributeNS(null, 'stroke', color);
        path.setAttributeNS(null, 'stroke-width', size);
        path.setAttributeNS(null, 'ng-mousedown', 'drawClick($event)');
        path.setAttribute('svg-line', '');

        angular.element('svg').append(path);
        $compile(angular.element(path))(scope);

        gesture = false;
      }

      function removeDots() {
        var dots = document.getElementsByClassName('dot');
        while (dots[0]) {
          dots[0].parentNode.removeChild(dots[0]);
        }
      }

      function trace(evt) {
        var x = evt.clientX || evt.touches[0].clientX;
        var y = evt.clientY || evt.touches[0].clientY;
        var parentOffsetBoundingRect = document.getElementsByClassName('pdf-wrap')[0].getBoundingClientRect();
        var parentOffsetX = parentOffsetBoundingRect.left;
        var parentOffsetY = parentOffsetBoundingRect.top;
        var size = cursorSize;
        var color = cursorColor;
        var dot = document.createElement('div');
        dot.className = 'dot';
        dot.style.position = 'fixed';
        dot.style.top = (y - parentOffsetY - (size / (scope.offsetY * 2))) + 'px';
        dot.style.left = (x - parentOffsetX - (size / (scope.offsetX * 2))) + 'px';
        dot.style.background = color;
        dot.style.width = size / scope.offsetX + 'px';
        dot.style.height = size / scope.offsetY + 'px';
        document.getElementById('cursor').appendChild(dot);
      }


      PDFService.getPDF('00', 'hw4', '', 'aplume01', '1').then(function (data) {
        var svg = $compile(data)(scope);
        element.append(svg);
        board = document.getElementById('Layer_1');
        board.style.width = 'auto';
        var curHeight = element[0].clientHeight;
        curHeight -= parseFloat(element[0].style.marginTop) || 0;
        curHeight -= parseFloat(element[0].style.marginBottom) || 0;
        curHeight -= parseFloat(element[0].style.paddingTop) || 0;
        curHeight -= parseFloat(element[0].style.paddingBottom) || 0;
        board.style.height = curHeight;
        board.style.margin = 'auto';
        board.style.border = '1px solid grey';
        board.setAttribute('flex', '');
        board.setAttribute('layout', 'column');
      });

      function updateBoundingRect() {
        if (!board) {
          return;
        }
        var viewBox = board.getAttribute('viewBox');
        var height = board.clientHeight;
        var width = board.clientWidth;
        var svgHeight = parseFloat(viewBox.split(' ')[3]);
        var svgWidth = parseFloat(viewBox.split(' ')[2]);
        scope.offsetY = svgHeight / parseFloat(height);
        scope.offsetX = svgWidth / parseFloat(width);
        var boundingClientRect = board.getBoundingClientRect();
        posX = boundingClientRect.left;
        posY = boundingClientRect.top;
      }

      scope.$on('$destroy', function () {
        cleanUp();
      });

      function cleanUp() {
        element.off('click', click);
        element.off('touchstart', scope.clickDown);
        element.off('touchmove', scope.clickMove);
        element.off('touchend', scope.clickUp);
      }
    }
  };
}

angular.module('virtualGrade')
  .directive('svgWrapper', ['$compile', '$window', 'PDFService', SVGWrapperDirective]);
