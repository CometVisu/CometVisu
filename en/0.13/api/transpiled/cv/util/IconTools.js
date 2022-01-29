(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.log.Logger": {},
      "cv.Application": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* IconTools.js 
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
   * @since 2015
   */
  qx.Class.define('cv.util.IconTools', {
    type: 'static',

    /*
    ******************************************************
      STATICS
    ******************************************************
    */
    statics: {
      // "global" functions (=> state less)
      hexColorRegEx: /#[0-9a-fA-F]{6}/,
      colorMapping: {
        // as a convenience, definition of a few colors
        white: '#ffffff',
        orange: '#ff8000',
        red: '#ff4444',
        green: '#44ff44',
        blue: '#4444ff',
        purple: '#ff44ff',
        yellow: '#ffff00',
        grey: '#777777',
        black: '#000000'
      },
      iconCache: {},
      // the Image() of all knows (i.e. used) icons
      iconCacheMap: [],
      // mapping of ID to Cache entry (URL)
      iconDelay: [],
      // array of all icons to fill where the Image is not ready yet
      iconDelayFn: null,
      // handler for delay function
      tmpCanvas: null,
      tmpCtx: null,
      iconDelayed: function iconDelayed(icon, colors, color) {
        cv.util.IconTools.iconDelay.push([icon, colors, color]);

        if (!cv.util.IconTools.iconDelayFn) {
          cv.util.IconTools.iconDelayFn = setInterval(function () {
            while (cv.util.IconTools.iconDelay.length) {
              // it should be enough to test only the first element - the other
              // elements will be covered anyway...
              if (cv.util.IconTools.iconDelay[0][2] in cv.util.IconTools.iconDelay[0][1]) {
                cv.util.IconTools.fillRecoloredIcon(cv.util.IconTools.iconDelay.shift()[0]);
              } else {
                break;
              }
            }

            if (cv.util.IconTools.iconDelay.length === 0) {
              clearInterval(cv.util.IconTools.iconDelayFn);
              cv.util.IconTools.iconDelayFn = 0;
            }
          }, 10);
        }
      },

      /**
       * Create the HTML for the canvas element and return it.
       * @param iconId
       * @param styling
       * @param classes
       */
      createCanvas: function createCanvas(iconId, styling, classes) {
        return '<canvas class="' + iconId + ' ' + classes + '" ' + styling + '/>';
      },

      /**
       * Fill the canvas with the ImageData. Also resize the
       * canvas at the same time.
       * @param canvas
       * @param imageData
       */
      fillCanvas: function fillCanvas(canvas, imageData) {
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        canvas.getContext('2d').putImageData(imageData, 0, 0);
      },

      /**
         * Two versions of a recoloring funtion to work around an Android bug:
         * http://stackoverflow.com/questions/14969496/html5-canvas-pixel-manipulation-problems-on-mobile-devices-when-setting-the-alph
         * https://code.google.com/p/android/issues/detail?id=17565
         * @param r
         * @param g
         * @param b
         * @param data
         * @param length
         */
      innerRecolorLoop: navigator.userAgent.toLowerCase().indexOf('android') > -1 && parseFloat(navigator.userAgent.slice(navigator.userAgent.toLowerCase().indexOf('android') + 8)) < 4.4 ? function (r, g, b, data, length) {
        // for Android version < 4.4
        for (var i = 0; i < length; i += 4) {
          var a = data[i + 3];

          if (a > 127) {
            data[i] = r;
            data[i + 1] = g;
            data[i + 2] = b;
            data[i + 3] = 255;
          } else {
            // brute force it...
            data[i] = 0;
            data[i + 1] = 0;
            data[i + 2] = 0;
            data[i + 3] = 0;
          }
        }
      } : function (r, g, b, data, length) {
        // the normal version
        for (var i = 0; i < length; i += 4) {
          if (data[i + 3] !== 0) {
            data[i] = r;
            data[i + 1] = g;
            data[i + 2] = b;
          }
        }
      },

      /**
       * Do the recoloring based on @param thisIcon and store it in the
       * hash @param thisIconColors.
       * @param color
       * @param thisIcon
       * @param thisIconColors
       */
      doRecolorNonTransparent: function doRecolorNonTransparent(color, thisIcon, thisIconColors) {
        if (thisIconColors[color]) {
          return; // done, already recolored
        }

        var width = cv.util.IconTools.tmpCanvas.width = thisIcon.width;
        var height = cv.util.IconTools.tmpCanvas.height = thisIcon.height;
        cv.util.IconTools.tmpCtx.drawImage(thisIcon, 0, 0);
        var imageData = cv.util.IconTools.tmpCtx.getImageData(0, 0, width, height);

        if (color !== undefined) {
          if (!cv.util.IconTools.hexColorRegEx.test(color)) {
            qx.log.Logger.error(this, 'Error! "' + color + '" is not a valid color for icon recoloring! It must have a shape like "#aabbcc".');
          }

          var r = parseInt(color.substr(1, 2), 16);
          var g = parseInt(color.substr(3, 2), 16);
          var b = parseInt(color.substr(5, 2), 16);
          cv.util.IconTools.innerRecolorLoop(r, g, b, imageData.data, width * height * 4);
        }

        thisIconColors[color] = imageData;
      },

      /**
       * Funtion to call for each icon that should be dynamically recolored.
       * This will be called for each known URL, so only remember the string but
       * don't load the image yet as it might not be needed.
       * @param url
       */
      recolorNonTransparent: function recolorNonTransparent(url) {
        var loadHandler = function loadHandler() {
          var toFill = cv.util.IconTools.iconCache[url].toFill;
          var thisIcon = cv.util.IconTools.iconCache[url].icon;
          var thisIconColors = cv.util.IconTools.iconCache[url].colors;
          var thisFillColor;

          while (thisFillColor = toFill.pop()) {
            // eslint-disable-line no-cond-assign
            cv.util.IconTools.doRecolorNonTransparent(thisFillColor, thisIcon, thisIconColors);
          }
        };
        /**
         * will be called for each color that is actually used
         * => load image for all colors
         * => transform image
         * @param color
         * @param styling
         * @param classes
         * @param asText
         * @return {Function} a function that will append the recolored image to
         * the jQuery element passed to that function
         */


        return function (color, styling, classes, asText) {
          if (undefined === cv.util.IconTools.iconCache[url]) {
            var thisIcon = new Image();
            thisIcon.onload = loadHandler;
            thisIcon.src = url;
            cv.util.IconTools.iconCache[url] = {
              icon: thisIcon,
              // the original Image() of the icon
              id: cv.util.IconTools.iconCacheMap.length,
              // the unique ID for this icon
              colors: {},
              // cache all the transformed ImageDatas
              toFill: [] // all the icon colors to fill once the image was loaded

            };
            cv.util.IconTools.iconCacheMap.push(url);
          }

          if (color === undefined) {
            color = '#ffffff';
          }

          if (color in cv.util.IconTools.colorMapping) {
            color = cv.util.IconTools.colorMapping[color];
          }

          var c = 'icon' + cv.util.IconTools.iconCache[url].id + '_' + color.substr(1, 6);
          cv.util.IconTools.iconCache[url].toFill.push(color); // when already available - fill it now. Otherwise the onLoad will do it.

          if (cv.util.IconTools.iconCache[url].icon.complete) {
            loadHandler();
          }

          var newCanvas = cv.util.IconTools.createCanvas(c, styling, classes);

          if (asText) {
            return newCanvas;
          }

          var newElement = document.querySelector(newCanvas);

          if (cv.util.IconTools.iconCache[url].icon.complete) {
            cv.util.IconTools.fillCanvas(newElement, cv.util.IconTools.iconCache[url].colors[color]);
          } else {
            cv.util.IconTools.iconDelayed(newElement, cv.util.IconTools.iconCache[url].colors, color);
          }

          return newElement;
        };
      },

      /**
       * This function must be called to fill a specific icon that was created
       * @param icon
       */
      fillRecoloredIcon: function fillRecoloredIcon(icon) {
        var parameters = (icon.className.split ? icon.className.split(' ') : icon.className.baseVal.split(' '))[0].substring(4).split('_');

        if (parameters.length === 2) {
          var cacheEntry = cv.util.IconTools.iconCache[cv.util.IconTools.iconCacheMap[parameters[0]]];
          var coloredIcon = cacheEntry.colors['#' + parameters[1]];

          if (undefined === coloredIcon) {
            cv.util.IconTools.iconDelayed(icon, cacheEntry.colors, '#' + parameters[1]);
          } else {
            cv.util.IconTools.fillCanvas(icon, coloredIcon);
          }
        }
      },
      svgKUF: function svgKUF(iconID) {
        return function (color, styling, classes) {
          if (color in cv.util.IconTools.colorMapping) {
            color = cv.util.IconTools.colorMapping[color];
          } // use relative path here, otherwise it won't work in replay mode


          var iconPath = cv.Application.getRelativeResourcePath() + 'icons/knx-uf-iconset.svg';
          var style = styling || '';

          if (color) {
            style += 'color:' + color + ';';
          }

          if (style) {
            style = ' style="' + style + '"';
          }

          return '<svg' + style + ' class="' + classes + '"><use xlink:href="' + iconPath + '#kuf-' + iconID + '"></use></svg>';
        };
      }
    },
    defer: function defer() {
      var canvas = document.createElement('canvas');
      this.defer.self.tmpCanvas = canvas;
      this.defer.self.tmpCtx = canvas.getContext('2d');
    }
  });
  cv.util.IconTools.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IconTools.js.map?dt=1643473495219