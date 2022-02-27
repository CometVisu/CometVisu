(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "cv.IconConfig": {
        "construct": true
      },
      "cv.util.IconTools": {},
      "qx.util.ResourceManager": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* IconHandler.js 
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
   * @since 2012
   */

  /**
   * The object "icon" contains the whole API necessary to handle the icons.
   *
   */
  qx.Class.define('cv.IconHandler', {
    extend: qx.core.Object,
    type: 'singleton',

    /*
     ******************************************************
     CONSTRUCTOR
     ******************************************************
     */
    construct: function construct() {
      this.__P_500_0 = cv.IconConfig.DB;
    },

    /*
     ******************************************************
     MEMBERS
     ******************************************************
     */
    members: {
      /**
       * @typedef iconDBEntry
       * @type {object}
       * @property {string} uri
       * @property {string} styling
       * @property {(string|HTMLCanvasElement|SVGElement)} icon
       */

      /**
       * @typedef iconDB
       * Hierachy:      name,           type,                   flavour,                color,   URI
       * @type {Object.<string, Object.<string, (string|Object.<string, (string|Object.<string, (iconDBEntry|recolorCallback)>)>)>>}
       */

      /**
       * Internal database of the known icons.
       * Initially filled with the default icons.
       * @type {iconDB}
       */
      __P_500_0: null,

      /**
       * Insert or overwrite one or many icons into the database. The parameter
       * might be a full hash of icon definitions or a single one consisting out of
       * a name and a URI path. Optional further parameters are a "type" and a
       * flavour.
       * @param {string} name
       * @param {string} uri
       * @param {string?} type
       * @param {string?} flavour
       * @param {string?} color
       * @param {string?} styling
       * @param {string?} dynamic
       * @param {string?} source
       */
      insert: function insert(name, uri) {
        var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '*';
        var flavour = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '*';
        var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '*';
        var styling = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
        var dynamic = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : '';
        var source = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : undefined;

        if (!this.__P_500_0[name]) {
          this.__P_500_0[name] = {};
        }

        if (source) {
          this.__P_500_0[name].source = source;
        }

        if (!this.__P_500_0[name][type]) {
          this.__P_500_0[name][type] = {};
        }

        if (!this.__P_500_0[name][type][flavour]) {
          this.__P_500_0[name][type][flavour] = {};
        }

        if (dynamic && window[dynamic]) {
          this.__P_500_0[name][type][flavour][color] = window[dynamic](uri);
        } else if (dynamic && cv.util.IconTools[dynamic]) {
          this.__P_500_0[name][type][flavour][color] = cv.util.IconTools[dynamic](uri);
        } else {
          this.__P_500_0[name][type][flavour][color] = {
            uri: uri,
            styling: styling
          };
        }
      },

      /**
       * Get the icon information for a name.
       *
       * @param {string} name
       * @param {string?} type
       * @param {string?} flavour
       * @param {string?} color (only relevant for monochrome icons)
       * @return {(string|recolorCallback|undefined)} The URI for the icon - or "undefined" if not known
       */
      get: function get(name) {
        var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '*';
        var flavour = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '*';
        var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '*';

        if (!this.__P_500_0[name]) {
          return function (a, b, c, asText) {
            return asText ? '[unknown]' : document.createTextNode('[unknown]');
          };
        }

        if (!this.__P_500_0[name][type]) {
          type = '*'; // undefined -> use default
        }

        var all;

        if (typeof this.__P_500_0[name][type] === 'string') {
          type = this.__P_500_0[name][type]; // redirect link

          if (type.split('/').length > 1) {
            all = type.split('/');
            type = all.shift();

            if (flavour === undefined) {
              flavour = all.shift();
            }
          }
        }

        if (!this.__P_500_0[name][type][flavour]) {
          flavour = '*'; // undefined -> use default
        }

        if (typeof this.__P_500_0[name][type][flavour] === 'string') {
          flavour = this.__P_500_0[name][type][flavour]; // redirect link

          if (flavour.split('/').length > 1) {
            all = flavour.split('/');
            flavour = all.shift();

            if (!color) {
              color = all.shift();
            }
          }
        }

        if (!this.__P_500_0[name][type][flavour][color]) {
          if (/\.svg(#.+)?$/.test(this.__P_500_0[name][type][flavour]['*'].uri)) {
            // SVGs can be dynamically recolored, so create new entry for this color
            this.__P_500_0[name][type][flavour][color] = Object.assign({}, this.__P_500_0[name][type][flavour]['*']);
          } else {
            color = '*'; // undefined -> use default
          }
        } // handle a generic mapping function


        if (typeof this.__P_500_0[name][type][flavour]['*'] === 'function') {
          return this.__P_500_0[name][type][flavour]['*'];
        }

        if (typeof this.__P_500_0[name][type][flavour][color] === 'string') {
          color = this.__P_500_0[name][type][flavour][color];
        } // redirect link


        return this.__P_500_0[name][type][flavour][color];
      },
      getURI: function getURI() {
        var i = this.get.apply(this, arguments);

        if (i) {
          return qx.util.ResourceManager.getInstance().toUri(i.uri);
        }

        return '';
      },

      /**
       * Get the icon - either as DOM element (`asText = false`) or as string
       * (`asText = true`).
       * When it is returned as string and it was added to the DOM, the
       * fillIcons method must be called to fill missing content (e.g. the
       * <canvas> icons.
       *
       * @param {string} name
       * @param {string?} type
       * @param {string?} flavour
       * @param {string?} color (only relevant for monochrome icons)
       * @param {string?} styling
       * @param {string?} iconclass
       * @param {boolean?} asText
       */
      getIconElement: function getIconElement(name, type, flavour, color) {
        var styling = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
        var iconclass = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';
        var asText = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
        var i = this.get(name, type, flavour, color);

        if (i) {
          if (i.icon && !styling && typeof i !== 'function' && !asText) {
            return i.icon;
          } // fetch and cache image


          if (!styling) {
            styling = i.styling;
          }

          var classes = 'icon';

          if (iconclass) {
            classes = classes + ' custom_' + iconclass;
          }

          if (typeof i === 'function') {
            if (asText) {
              return i(color, styling, classes, true);
            }

            i.icon = i(color, styling, classes, false);
          } else {
            if (color) {
              styling += ';color:' + color;
            }

            var icon = /\.svg#.*?$/.test(i.uri) // SVG with fragment identifier?
            ? '<svg class="' + classes + '" style="' + (styling ? styling : '') + '"><use href="' + qx.util.ResourceManager.getInstance().toUri(i.uri) + '"></use></svg>' : '<img class="' + classes + '" src="' + qx.util.ResourceManager.getInstance().toUri(i.uri) + '" style="' + (styling ? styling : '') + '"/>';

            if (asText) {
              return icon;
            }

            var template = document.createElement('template');
            template.innerHTML = icon;
            i.icon = template.content.firstChild;
          }

          return i.icon;
        }

        return asText ? '' : null;
      },

      /**
       * Provide a value that can be used by cv.ui.manager.basic.Image to display the icon on an qooxdoo widget.
       * @param {string} name
       * @param {string?} classes - optional css classes used in the svg icon code (default is 'icon')
       * @returns {string}
       */
      getIconSource: function getIconSource(name, classes) {
        var i = this.get(name);

        if (i) {
          if (!classes) {
            classes = 'icon';
          }

          if (typeof i === 'function') {
            var res = i(undefined, undefined, classes, true);

            if (res.startsWith('<canvas')) {
              // no support for canvas as icon preview
              return '';
            }

            return res;
          }

          if (/\.svg#.*?$/.test(i.uri)) {
            return '<svg class="' + classes + '"><use href="' + qx.util.ResourceManager.getInstance().toUri(i.uri) + '"></use></svg>';
          }

          return qx.util.ResourceManager.getInstance().toUri(i.uri);
        }

        return '';
      },

      /**
       * Fill the icons in the array.
       * @param array
       */
      fillIcons: function fillIcons(array) {
        array.forEach(cv.util.IconTools.fillRecoloredIcon, cv.util.IconTools);
      },

      /**
       * List all known icons
       *
       *
       * @return {string[]} List of all known icon names
       */
      list: function list() {
        return Object.keys(this.__P_500_0);
      },

      /**
       * Return icon database for debuging purposes - use ONLY for debugging as it's
       * circumventing the data hiding and exposes a writeable reference to the
       * database object!
       *
       *
       * @return {Object} The icon database
       */
      debug: function debug() {
        return this.__P_500_0;
      }
    }
  });
  cv.IconHandler.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IconHandler.js.map?dt=1645980681635