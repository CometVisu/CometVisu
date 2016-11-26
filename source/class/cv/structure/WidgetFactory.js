/* _common.js 
 * 
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
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


qx.Class.define('cv.structure.WidgetFactory', {
  type: "static",

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    registry: { check: 'Object', init: {} },

    createInstance: function (type, data) {
      if (!this.registry[data.path]) {
        if (!cv.structure.pure[qx.lang.String.firstUp(type)]) {
          // try to find it via parser handler
          var handler = cv.xml.Parser.getHandler(type);
          if (handler) {
            this.registry[data.path] = new handler(data);
          } else {
            qx.log.Logger.error("No handler found for type '"+type+"'");
            return null;
          }
        } else {
          this.registry[data.path] = new cv.structure.pure[qx.lang.String.firstUp(type)](data);
        }
      }
      return this.registry[data.path];
    },

    getInstanceById: function (id) {
      return this.registry[id];
    },

    getInstanceByElement: function(element) {
      return this.getInstanceById(qx.bom.element.Attribute.get(element, 'id'));
    },

    clear: function () {
      this.registry = {};
    }
  }
});