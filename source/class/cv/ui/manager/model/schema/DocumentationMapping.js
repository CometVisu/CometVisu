/* DocumentationMapping.js
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
 *
 */
qx.Class.define('cv.ui.manager.model.schema.DocumentationMapping', {
  type: 'static',

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    MAP: {
      _base: 'https://www.cometvisu.org/CometVisu/',
      'system-voraussetzungen': '/0.13/manual/#system-voraussetzungen',
      'tile-backend-system': '/0.13/manual/config/structure-tile/elements/backend.html#tile-backend-system',
      'tile-components': '/0.13/manual/config/structure-tile/index.html#tile-components',
      'tile-element-backend': '/0.13/manual/config/structure-tile/elements/backend.html#tile-element-backend',
      'tile-widgets': '/0.13/manual/config/structure-tile/index.html#tile-widgets'
    }
  }
});
