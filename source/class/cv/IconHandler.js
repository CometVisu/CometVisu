/* IconHandler.js 
 * 
 * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
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
qx.Class.define("cv.IconHandler", {
  extend: qx.core.Object,
  type: "singleton",

  /*
   ******************************************************
   CONSTRUCTOR
   ******************************************************
   */
  construct: function () {
    this.__db = cv.IconConfig.DB;
  },

  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {
    /**
     * Internal database of the known icons.
     * Initially filled with the default icons.
     */
    __db: null,

    /**
     * Insert or overwrite one or many icons into the database. The parameter
     * might be a full hash of icon definitions or a single one consisting out of
     * a name and a URI path. Optional further parameters are a "type" and a
     * flavour.
     */
    insert: function () {
      const name = arguments[0];
      const uri = arguments[1];
      const type = arguments[2] || "*";
      const flavour = arguments[3] || "*";
      const color = arguments[4] || "*";
      const styling = arguments[5];
      const dynamic = arguments[6];

      if (!this.__db[name]) {
        this.__db[name] = {};
      }
      if (!this.__db[name][type]) {
        this.__db[name][type] = {};
      }
      if (!this.__db[name][type][flavour]) {
        this.__db[name][type][flavour] = {};
      }

      if (dynamic && window[dynamic]) {
        this.__db[name][type][flavour][color] = window[dynamic](uri);
      } else {
        this.__db[name][type][flavour][color] = {
          uri: uri,
          styling: styling
        };
      }
    },

    /**
     * Get the icon information for a name.
     *
     * @param name {String} Name
     * @param type {String?} Type
     * @param flavour {String?} Flavour
     * @param color {String?} Color (only relevant for monochrome icons)
     * @return {String} The URI for the icon - or "undefined" if not known
     */
    get: function (name, type, flavour, color) {
      if (!this.__db[name]) {
        return undefined;
      }
      if (!this.__db[name][type]) {
        type = "*"; // undefined -> use default
      }
      let all;
      if (typeof this.__db[name][type] === "string") {
        type = this.__db[name][type]; // redirect link
        if (type.split("/").length > 1) {
          all = type.split("/");
          type = all.shift();
          if (flavour === undefined) {
            flavour = all.shift();
          }
        }
      }
      if (!this.__db[name][type][flavour]) {
        flavour = "*"; // undefined -> use default
      }
      if (typeof this.__db[name][type][flavour] === "string") {
        flavour = this.__db[name][type][flavour]; // redirect link
        if (flavour.split("/").length > 1) {
          all = flavour.split("/");
          flavour = all.shift();
          if (!color) {
            color = all.shift();
          }
        }
      }
      if (!this.__db[name][type][flavour][color]) {
        color = "*"; // undefined -> use default
      }
      // handle a generic mapping function
      if (typeof this.__db[name][type][flavour]["*"] === "function") {
        return this.__db[name][type][flavour]["*"];
      }
      if (typeof this.__db[name][type][flavour][color] === "string") {
        color = this.__db[name][type][flavour][color];
      } // redirect link
      return this.__db[name][type][flavour][color];
    },

    getURI: function () {
      const i = this.get.apply(this, arguments);
      if (i) {
        return qx.util.ResourceManager.getInstance().toUri(i.uri);
      }
      return "";
    },

    /**
     * Return an icon DOM element.
     */
    getIconElement: function () {
      const i = this.get.apply(this, arguments);
      if (i) {
        let styling = arguments[4];
        if (i.icon && !styling && typeof i !== "function") {
          return i.icon;
        }

        // fetch and cache image
        if (!styling) {
          styling = i.styling;
        }

        let classes = "icon";
        const iconclass = arguments[5];
        if (iconclass) {
          classes = classes + " custom_" + iconclass;
        }

        if (typeof i === "function") {
          i.icon = i(arguments[3], styling, classes, false);
        } else {
          i.icon = "<img class=\"" + classes + "\" src=\"" + qx.util.ResourceManager.getInstance().toUri(i.uri) +"\" style=\"" + (styling ? styling : "") + "\"/>";
        }
        return i.icon;
      }
      return null;
    },

    /**
     * Return a String for the icon, e.g. build a DOM tree in a string before
     * passing it to ParseHTML. After the content was added to the DOM the
     * fillIcons method must be called to fill missing content (e.g. the <canvas>
     * icons.
     * @param name {String} Name
     * @param type {String?} Type
     * @param flavour {String?} Flavour
     * @param color {String?} Color (only relevant for monochrome icons)
     * @param styling {String?} Styling
     * @param iconclass {String?} icon class
     */
    getIconText: function (name, type, flavour, color, styling, iconclass) {
      const i = this.get.apply(this, arguments);
      if (i) {
        if (!styling) {
          styling = !i.styling ? "" : " style=\"" + i.styling + "\"";
        } else {
          styling = " style=\"" + styling + "\"";
        }

        let classes = "icon";
        if (iconclass) {
          classes = classes + " custom_" + iconclass;
        }

        if (typeof i === "function") {
          return i(color, styling, classes, true);
        } 
          return "<img class=\"" + classes + "\" src=\"" + qx.util.ResourceManager.getInstance().toUri(i.uri) + "\"" + styling + "/>";
      }
      return "";
    },

    /**
     * Provide a value that can be used by cv.ui.manager.basic.Image to display the icon on an qooxdoo widget.
     * @param name {String} icon name
     * @param classes {String?} optional css classes used in the svg icon code (default is 'icon')
     * @returns {String|string|*}
     */
    getIconSource: function (name, classes) {
      const i = this.get.apply(this, arguments);
      if (i) {
        if (!classes) {
          classes = "icon";
        }
        if (typeof i === "function") {
          return i(undefined, undefined, classes, true);
        } 
          return qx.util.ResourceManager.getInstance().toUri(i.uri);
      }
      return "";
    },

    /**
     * Fill the icons in the array.
     * @param array
     */
    fillIcons: function (array) {
      array.forEach(cv.util.IconTools.fillRecoloredIcon, cv.util.IconTools);
    },

    /**
     * List all known icons
     *
     *
     * @return {Array} List of all known icon names
     */
    list: function () {
      return Object.keys(this.__db);
    },

    /**
     * Return icon database for debuging purposes - use ONLY for debugging as it's
     * circumventing the data hiding and exposes a writeable reference to the
     * database object!
     *
     *
     * @return {Object} The icon database
     */
    debug: function () {
      return this.__db;
    }
  }
});
