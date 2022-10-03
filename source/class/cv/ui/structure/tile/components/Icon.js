/* Icon.js
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
qx.Class.define("cv.ui.structure.tile.components.Icon", {
  extend: cv.ui.structure.tile.components.AbstractComponent,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct(element) {
    super(element);
    this._idRegex = /^[^\s]+$/;
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    id: {
      check: "String",
      nullable: true,
      apply: "_applyId",
      // the id is used as 'class' property and therefore must not have spaces
      transform: "_transformId"
    },

    color: {
      check: "String",
      nullable: true,
      apply: "_applyColor"
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __initialized: false,
    _idRegex: null,

    _transformId(value) {
      if (this._idRegex.test(value)) {
        return value;
      }
      this.error("invalid icon id:", value);
      return null;
    },

    _init() {
      super._init();
      const element = this._element;
      if (element.textContent.trim()) {
        this.__initialized = true;
        this.setId(element.textContent.trim());
      } else {
        const it = element.classList.values();
        for (let name of it) {
          if (name.startsWith("ri-") || name.startsWith("knxuf-")) {
            this.setId(name);
            break;
          }
        }
      }
      this.__initialized = true;
    },

    _applyId(value, oldValue) {
      const element = this._element;
      if (this.__initialized) {
        if (oldValue) {
          element.classList.remove(oldValue);
        }
        if (value) {
          // default is an icon font that uses CSS classes
          element.classList.add(value);
          if (element.textContent) {
            element.textContent = "";
          }
        }
      }
    },

    _applyColor(value, oldValue) {
      const element = this._element;
      if (oldValue) {
        element.classList.remove(oldValue);
      }
      if (value) {
        element.classList.add(value);
      }
    }
  },

  defer(Clazz) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + "icon",
      class extends QxConnector {
        constructor() {
          super(Clazz);
        }

        static get observedAttributes() {
          return ["color"];
        }
      }
    );
  }
});
