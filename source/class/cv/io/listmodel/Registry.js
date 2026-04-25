/* Registry.js
 *
 * Copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
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
 * Registry for all classes that implement cv.io.listmodel.IListModel.
 */
qx.Class.define('cv.io.listmodel.Registry', {
  type: 'static',

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    _REG: {},

    /**
     *
     * @param modelClass {Class}
     */
    register(modelClass) {
      if (qx.Class.hasInterface(modelClass, cv.io.listmodel.IListModel)) {
        const className = modelClass.basename.toLowerCase();
        this._REG[className] = modelClass;
      }
    },

    unregister(modelClass) {
      delete this._REG[modelClass.basename.toLowerCase()];
    },

    /**
     *
     * @param name {String}
     */
    get(name) {
      name = name.toLowerCase();
      if (Object.prototype.hasOwnProperty.call(this._REG, name)) {
        const clazz = this._REG[name];
        if (clazz.REQUIRES) {
          for (const check of clazz.REQUIRES) {
            switch (check) {
              case 'php':
                if (!qx.core.Init.getApplication().getServerHasPhpSupport()) {
                  qx.log.Logger.warn(this, `${clazz.classname} requires PHP support`);
                  return null;
                }
                break;

              case 'openhab':
                if (!cv.io.BackendConnections.getClientByType('openhab')) {
                  qx.log.Logger.warn(this, `${clazz.classname} requires openHAB backend`);
                  return null;
                }
                break;
            }
          }
        }
        return clazz;
      }
      return null;
    }
  }
});
