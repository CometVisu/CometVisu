(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.data.Model": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* TrickOMatic.js 
   * 
   * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
   * 
   * This program is free software; you can redistribute it and/or modify it
   * under the terms of the GNU General Public License as published by the Free
   * Software Foundation; either version 3 of the License, or (at your option)
   * any later version.
   *
   * This program is distributed in the hope that it will be useful, but WITHOUT
   * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
   * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
   * more details.
   *
   * You should have received a copy of the GNU General Public License along
   * with this program; if not, write to the Free Software Foundation, Inc.,
   * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
   */

  /**
   * @author Christian Mayer
   * @since 2010
   */
  qx.Class.define('cv.ui.TrickOMatic', {
    type: 'static',

    /*
    ******************************************************
      STATICS
    ******************************************************
    */
    statics: {
      id: 0,
      run: function run() {
        var svg = this.getSVGDocument();

        if (!svg) {
          return;
        } // Pipe-O-Matic:


        var pipes = svg.querySelectorAll('.pipe_group');
        pipes.forEach(function (pipe_group) {
          pipe_group.querySelectorAll('path').forEach(function (path) {
            var halfsize = Math.floor(parseFloat(path.style.strokeWidth) / 2);
            var opacity = 0.15;

            for (var width = halfsize - 1; width > 0; width--) {
              opacity -= 0.1 / halfsize;
              var n = path.cloneNode();
              n.className.baseVal += ' pipe-o-matic_clone';
              n.style.strokeWidth = width * 2;
              n.style.stroke = '#ffffff';
              n.style.strokeOpacity = opacity;
              pipe_group.insertBefore(n, path.nextElementSibling);
            }
          });
        });
        var model = cv.data.Model.getInstance(); // Flow-O-Matic: add Paths

        var segmentLength = 40;
        pipes = svg.querySelectorAll('.show_flow');
        pipes.forEach(function (pipe_group) {
          var length = 0.0;
          pipe_group.querySelectorAll('path').forEach(function (path) {
            if (path.className.animVal.split(' ').indexOf('pipe-o-matic_clone') > 0) {
              return;
            }

            var stroke = path.style.stroke;
            var r;
            var g;
            var b;

            if (stroke[0] === '#') {
              r = parseInt(path.style.stroke.substring(1, 3), 16);
              g = parseInt(path.style.stroke.substring(3, 5), 16);
              b = parseInt(path.style.stroke.substring(5, 7), 16);
            } else if (stroke.indexOf('rgb(') === 0) {
              var colors = stroke.replace(/[^0-9,.]*/g, '').split(',');
              r = colors[0];
              g = colors[1];
              b = colors[2];
            }

            var rTarget = 0; // this color should be somehow user setable but how?

            var gTarget = 0;
            var bTarget = 0;
            /**
             * @param v
             */

            function toHex(v) {
              var ret = parseInt(v).toString(16);
              return ret.length < 2 ? '0' + ret : ret;
            }

            for (var i = segmentLength / 2; i > 0; i -= 2) {
              var factor = 1 - i / (segmentLength / 2);
              var offset = (length + segmentLength / 2 - i) % segmentLength;
              var low = 2 * i;
              var high = segmentLength - low;
              var n = path.cloneNode();
              n.className.baseVal += ' flow-o-matic_clone';
              n.style.stroke = '#' + toHex(r * factor + rTarget * (1 - factor)) + toHex(g * factor + gTarget * (1 - factor)) + toHex(b * factor + bTarget * (1 - factor));

              if (high > offset) {
                n.style.strokeDasharray = [high - offset, low, offset, 0];
              } else {
                n.style.strokeDasharray = [0, low - (offset - high), high, offset - high];
              }

              n.style.strokeDashoffset = length % (0.5 * segmentLength);
              pipe_group.insertBefore(n, path.nextElementSibling);
            }

            length += path.getTotalLength();
            var activeValues = pipe_group.getAttribute('data-cometvisu-active');

            if (activeValues) {
              activeValues.split(' ').forEach(function (address) {
                var id = 'flow_' + cv.ui.TrickOMatic.id++;
                model.addAddress(address, id);
                model.addUpdateListener(address, function (address, data) {
                  cv.ui.TrickOMatic.updateActive(pipe_group, data);
                }); // init

                cv.ui.TrickOMatic.updateActive(pipe_group, cv.data.Model.getInstance().getState(address));
              });
            }
          });
        }); // Flow-O-Matic: add CSS
        // helper for multiple bowser support

        /**
         * @param name
         * @param content
         */

        function createKeyframe(name, content) {
          return '@keyframes ' + name + ' {\n' + content + '}\n' + '@-moz-keyframes ' + name + ' {\n' + content + '}\n' + '@-webkit-keyframes ' + name + ' {\n' + content + '}\n';
        }

        var keyframes = createKeyframe('move', 'from {  stroke-dashoffset: ' + segmentLength + ';  }\n' + 'to   {  stroke-dashoffset: 0;  }\n');
        /**
         * @param style
         * @param value
         */

        function createCSSRules(style, value) {
          return "".concat(style, ": ").concat(value, ";\n          -moz-").concat(style, ": ").concat(value, ";\n          -webkit-").concat(style, ": ").concat(value, ";\n        ");
        }

        keyframes += '.flow_active path {\n' + createCSSRules('animation-duration', '3s') + createCSSRules('animation-name', 'move') + createCSSRules('animation-timing-function', 'linear') + createCSSRules('animation-iteration-count', 'infinite') + '}\n';
        var s = svg.createElementNS('http://www.w3.org/2000/svg', 'style');
        s.setAttribute('type', 'text/css');
        s.textContent = keyframes;
        var svgElement = svg.querySelector('svg');
        svgElement.insertBefore(s, svgElement.firstChild);
      },
      updateActive: function updateActive(pipe_group, data) {
        if (parseInt(data) === 1 || data === 'ON' || data === true) {
          pipe_group.classList.toggle('flow_active', true);
        } else {
          pipe_group.classList.toggle('flow_active', false);
        }
      }
    }
  });
  cv.ui.TrickOMatic.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TrickOMatic.js.map?dt=1650117354405