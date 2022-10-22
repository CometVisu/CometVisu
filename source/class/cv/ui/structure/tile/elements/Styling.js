/* Styling.js
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
 * Styling maps a value to another value that can be used to style a component
 * @author Tobias Bräutigam
 * @since 2022
 */
qx.Class.define('cv.ui.structure.tile.elements.Styling', {
  extend: cv.ui.structure.tile.elements.Mapping,

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _applyConnected(value, oldValue, name) {
      super._applyConnected(value, oldValue, name);
      if (value) {
        cv.Application.structureController.addStyling(this._element.getAttribute('name'), this);
      } else {
        cv.Application.structureController.removeStyling(this._element.getAttribute('name'));
      }
    }
  },

  defer(Clazz) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'styling',
      class extends QxConnector {
        constructor() {
          super(Clazz);
        }
      }
    );
  }
});
