/* WidgetFactory.js
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

qx.Class.define('cv.ui.structure.WidgetFactory', {
  type: 'static',

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    c: 0,
    /**
     * Map $$type to Classname
     */
    __typeMapping: {},
    registry: {},

    registerClass(type, clazz) {
      this.__typeMapping[type] = clazz;
    },

    createInstance(type, data) {
      if (!this.registry[data.path]) {
        if (!cv.ui.structure[cv.Config.loadedStructure][type.charAt(0).toUpperCase() + type.substr(1)]) {
          const Clazz = this.__typeMapping[type];
          if (Clazz) {
            this.registry[data.path] = new Clazz(data);
          } else {
            qx.log.Logger.error(this, "No handler found for type '" + type + "'");

            return null;
          }
        } else {
          this.registry[data.path] = new cv.ui.structure[cv.Config.loadedStructure][
            type.charAt(0).toUpperCase() + type.substr(1)
          ](data);
        }
        this.c++;
      }
      return this.registry[data.path];
    },

    getInstanceById(id, skipCreation) {
      let widget = this.registry[id];
      if (!widget && !skipCreation && cv.Config.lazyLoading === true) {
        const data = cv.data.Model.getInstance().getWidgetData(id);
        if (data.$$type) {
          widget = this.createInstance(data.$$type, data);
        }
      }
      return widget;
    },

    getInstanceByElement(element) {
      const instance = this.getInstanceById(element.getAttribute('id'));
      if (instance && cv.Config.lazyLoading === true && instance._onDomReady && !instance.$$domReady) {
        // apply listeners and update initial value
        instance._onDomReady();
        // make sure that this is not triggered twice
        instance.$$domReady = true;
      }
      return instance;
    },

    clear() {
      this.registry = {};
    }
  }
});
