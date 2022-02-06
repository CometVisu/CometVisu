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
    /**
     * RegEx to determine a valid CSS style color like #rrggbb
     * @type {RegExp}
     */
    hexColorRegEx: /#[0-9a-fA-F]{6}/,
    /**
     * as a convenience, definition of a few colors
     * @type {Object<string, string>}
     */
    colorMapping: {
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

    /**
     * @typedef iconCacheEntryHash
     * @type {Object}
     * @property {HTMLImageElement} icon - the original Image() of the icon
     * @property {number} id - the unique ID for this icon
     * @property {Object.<string, ImageData>} colors - cache all the transformed ImageDatas
     * @property {string[]} toFill - all the icon colors to fill once the image was loaded
     */

    /**
     * the Image() of all knows (i.e. used) icons
     * @type {Object.<string, iconCacheEntryHash>}
     */
    iconCache: {},
    /**
     * mapping of ID to Cache entry (URL)
     */
    iconCacheMap: [],
    /**
     * array of all icons to fill where the Image is not ready yet
     * @type {Array.<Array<(HTMLCanvasElement|SVGElement), Object.<string, ImageData>, string>>}
     */
    iconDelay: [],
    /**
     * handler for delay function
     * @type {Function}
     */
    iconDelayFn: null,

    tmpCanvas: null,
    tmpCtx: null,
    /**
     * Were the KNX User Forum icons already preloaded?
     * Only done when the config is using them
     * @type {boolean}
     */
    preloadedKUFicons: false,

    /**
     *
     * @param {(HTMLCanvasElement|SVGElement)} icon
     * @param {Object.<string, ImageData>} colors
     * @param {string} color
     */
    iconDelayed: function (icon, colors, color) {
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
     * @param {string} iconId
     * @param {string?} styling
     * @param {string?} classes
     * @returns {string}
     */
    createCanvas: function (iconId, styling= '', classes = '') {
      return '<canvas class="' + iconId + ' ' + classes + '" ' + styling + '/>';
    },
    /**
     * Fill the canvas with the ImageData. Also resize the
     * canvas at the same time.
     * @param {HTMLCanvasElement} canvas
     * @param {ImageData} imageData
     */
    fillCanvas: function (canvas, imageData) {
      canvas.width = imageData.width;
      canvas.height = imageData.height;
      canvas.getContext('2d').putImageData(imageData, 0, 0);
    },
    /**
       * Two versions of a recoloring function to work around an Android bug:
       * http://stackoverflow.com/questions/14969496/html5-canvas-pixel-manipulation-problems-on-mobile-devices-when-setting-the-alph
       * https://code.google.com/p/android/issues/detail?id=17565
       * @param {number} r
       * @param {number} g
       * @param {number} b
       * @param {number[]} data
       * @param {number} length
       */
    innerRecolorLoop: navigator.userAgent.toLowerCase().indexOf('android') > -1 && parseFloat(navigator.userAgent.slice(navigator.userAgent.toLowerCase().indexOf('android') + 8)) < 4.4
      ? function (r, g, b, data, length) { // for Android version < 4.4
        for (let i = 0; i < length; i += 4) {
          const a = data[i + 3];
          if (a > 127) {
            data[i] = r;
            data[i + 1] = g;
            data[i + 2] = b;
            data[i + 3] = 255;
          } else { // brute force it...
            data[i] = 0;
            data[i + 1] = 0;
            data[i + 2] = 0;
            data[i + 3] = 0;
          }
        }
      }
      : function (r, g, b, data, length) { // the normal version
        for (let i = 0; i < length; i += 4) {
          if (data[i + 3] !== 0) {
            data[i] = r;
            data[i + 1] = g;
            data[i + 2] = b;
          }
        }
      },
    /**
     * Do the recoloring based on `thisIcon` and store it in the
     * hash `thisIconColors`.
     * @param {string} color - color in the CSS style #rrggbb
     * @param {HTMLImageElement} thisIcon
     * @param {Object.<string, iconCacheEntryHash>} thisIconColors
     */
    doRecolorNonTransparent: function (color, thisIcon, thisIconColors) {
      if (thisIconColors[color]) {
        return; // done, already recolored
      }
      const width = cv.util.IconTools.tmpCanvas.width = thisIcon.width;
      const height = cv.util.IconTools.tmpCanvas.height = thisIcon.height;
      cv.util.IconTools.tmpCtx.drawImage(thisIcon, 0, 0);

      const imageData = cv.util.IconTools.tmpCtx.getImageData(0, 0, width, height);
      if (color !== undefined) {
        if (!cv.util.IconTools.hexColorRegEx.test(color)) {
          qx.log.Logger.error(this, 'Error! "' + color + '" is not a valid color for icon recoloring! It must have a shape like "#rrggbb".');
        }
        const r = parseInt(color.substr(1, 2), 16);
        const g = parseInt(color.substr(3, 2), 16);
        const b = parseInt(color.substr(5, 2), 16);
        cv.util.IconTools.innerRecolorLoop(r, g, b, imageData.data, width * height * 4);
      }
      thisIconColors[color] = imageData;
    },

    /**
     * Function to call for each icon that should be dynamically recolored.
     * This will be called for each known URL, so only remember the string but
     * don't load the image yet as it might not be needed.
     * @param {string} url
     * @returns {recolorCallback} a function that will append the recolored image to
     * the jQuery element passed to that function
     */
    recolorNonTransparent: function (url) {
      const loadHandler = function () {
        const toFill = cv.util.IconTools.iconCache[url].toFill;
        const thisIcon = cv.util.IconTools.iconCache[url].icon;
        const thisIconColors = cv.util.IconTools.iconCache[url].colors;
        let thisFillColor;
        while (thisFillColor = toFill.pop()) { // eslint-disable-line no-cond-assign
          cv.util.IconTools.doRecolorNonTransparent(thisFillColor, thisIcon, thisIconColors);
        }
      };

      /**
       * @callback recolorCallback
       * will be called for each color that is actually used
       * => load image for all colors
       * => transform image
       * @param {string} color - color in CSS style, i.e. #rrggbb
       * @param {string} styling
       * @param {string} classes
       * @param {boolean?} asText
       */
      return function (color, styling, classes, asText) {
        if (undefined === cv.util.IconTools.iconCache[url]) {
          const thisIcon = new Image();
          thisIcon.onload = loadHandler;
          thisIcon.src = url;

          cv.util.IconTools.iconCache[url] = {
            icon: thisIcon, // the original Image() of the icon
            id: cv.util.IconTools.iconCacheMap.length, // the unique ID for this icon
            colors: {}, // cache all the transformed ImageDatas
            toFill: [] // all the icon colors to fill once the image was loaded
          };
          cv.util.IconTools.iconCacheMap.push(url);
        }

        if (!color) {
          color = '#ffffff';
        }
        if (color in cv.util.IconTools.colorMapping) {
          color = cv.util.IconTools.colorMapping[color];
        }
        const c = 'icon' + cv.util.IconTools.iconCache[url].id + '_' + color.substr(1, 6);
        cv.util.IconTools.iconCache[url].toFill.push(color);

        // when already available - fill it now. Otherwise the onLoad will do it.
        if (cv.util.IconTools.iconCache[url].icon.complete) {
          loadHandler();
        }
        const newCanvas = cv.util.IconTools.createCanvas(c, styling, classes);
        if (asText) {
          return newCanvas;
        }
        let template = document.createElement('template');
        template.innerHTML = newCanvas;
        const newElement = template.content.firstChild;
        if (cv.util.IconTools.iconCache[url].icon.complete) {
          cv.util.IconTools.fillCanvas(newElement, cv.util.IconTools.iconCache[url].colors[color]);
        } else {
          cv.util.IconTools.iconDelayed(newElement, cv.util.IconTools.iconCache[url].colors, color);
        }
        return newElement;
      };
    },

    /**
     * This function must be called to fill a specific icon that was created.
     * Is will be colored based on it's class name.
     * @param {(HTMLCanvasElement|SVGElement)} icon
     */
    fillRecoloredIcon: function (icon) {
      const parameters = (icon.className.split ? icon.className.split(' ') : icon.className.baseVal.split(' '))[0].substring(4).split('_');
      if (parameters.length === 2) {
        const cacheEntry = cv.util.IconTools.iconCache[cv.util.IconTools.iconCacheMap[parameters[0]]];
        const coloredIcon = cacheEntry.colors['#' + parameters[1]];

        if (undefined === coloredIcon) {
          cv.util.IconTools.iconDelayed(icon, cacheEntry.colors, '#' + parameters[1]);
        } else {
          cv.util.IconTools.fillCanvas(icon, coloredIcon);
        }
      }
    },

    /**
     * @param {string} iconID
     * @returns {recolorCallback}
     */
    svgKUF: function (iconID) {
      if (!this.preloadedKUFicons) {
        this.preloadedKUFicons = true;
        qx.event.message.Bus.subscribe('setup.dom.finished.before', function() {
          qx.log.Logger.debug(cv.util.IconTools, 'preloading KUF icons');

          // use relative path here, otherwise it won't work in replay mode
          const iconPath = cv.Application.getRelativeResourcePath() + 'icons/knx-uf-iconset.svg';
          window.fetch(iconPath)
            .then(r => r.text())
            .then(text => {
              let div = document.createElement('div');
              div.innerHTML = text;
              let svg = div.firstChild;
              svg.setAttribute('style', 'display:none');
              document.body.appendChild(svg);
            }).catch(err => {
              qx.log.Logger.debug(cv.util.IconTools, err);
            });
        });
      }
      /**
       * @param {string} color - color in CSS style, i.e. #rrggbb
       * @param {string} styling
       * @param {string} classes
       * @param {boolean?} asText
       * @param {boolean?} forceRemote - force to load the icon remotely, e.g. as it could be that it's not inside the
       *          DOM; this is relevant only for special cases when the normal DOM might not be ready
       */
      return function (color, styling, classes, asText, forceRemote = false) {
        // use relative path here, otherwise it won't work in replay mode
        const iconPath = forceRemote ? (cv.Application.getRelativeResourcePath() + 'icons/knx-uf-iconset.svg') : '';
        const iconLink = iconPath + '#kuf-' + iconID;

        if (color in cv.util.IconTools.colorMapping) {
          color = cv.util.IconTools.colorMapping[color];
        }

        let style = styling || '';
        if (color) {
          style += 'color:' + color + ';';
        }
        if (asText) {
          if (style) {
            style = ' style="' + style + '"';
          }
          return '<svg' + style + ' class="' + classes + '"><use xlink:href="' + iconLink + '"></use></svg>';
        }
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', classes);
        if (style) {
          svg.setAttribute('style', style);
        }
        let use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', iconLink);
        svg.appendChild(use);
        return svg;
      };
    }
  },

  defer: function() {
    const canvas = document.createElement('canvas');
    this.defer.self.tmpCanvas = canvas;
    this.defer.self.tmpCtx = canvas.getContext('2d');
  }
});
