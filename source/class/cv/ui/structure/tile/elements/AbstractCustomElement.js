/* AbstractCustomElement.js
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
qx.Class.define("cv.ui.structure.tile.elements.AbstractCustomElement", {
  extend: qx.core.Object,
  type: "abstract",

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct(element) {
    this._element = element;
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    connected: {
      check: "Boolean",
      init: false,
      apply: "_applyConnected",
      event: "changeConnected",
    },
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    /**
     * @var {HTMLElement}
     */
    _element: null,

    _initialized: false,

    _applyConnected(value) {
      if (value && !this._initialized) {
        this._init();
        this._initialized = true;
      } else {
        this._disconnected();
        this._initialized = false;
      }
    },
    _init() {},

    _disconnected() {},

    getElement() {
      return this._element;
    },
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct() {
    this._element = null;
  },
});

// eslint-disable-next-line no-unused-vars
class QxConnector extends HTMLElement {
  constructor(QxClass) {
    super();
    if (
      qx.Class.isSubClassOf(
        QxClass,
        cv.ui.structure.tile.elements.AbstractCustomElement
      )
    ) {
      this._instance = new QxClass(this);
    } else {
      throw Error(
        QxClass +
          " must be a subclass of cv.ui.structure.tile.elements.AbstractCustomElement"
      );
    }
    if (this.hasAttribute("colspan")) {
      this.classList.add("colspan-" + this.getAttribute("colspan"));
    }
    if (this.hasAttribute("rowspan")) {
      this.classList.add("rowspan-" + this.getAttribute("rowspan"));
    }
  }

  getInstance() {
    return this._instance;
  }

  connectedCallback() {
    if (this._instance) {
      this._instance.setConnected(true);
    }
  }

  disconnectedCallback() {
    if (this._instance) {
      this._instance.setConnected(false);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (
      this._instance &&
      qx.Class.hasProperty(this._instance.constructor, name)
    ) {
      this._instance.set(name, newValue);
    }
  }
}

window.QxConnector = QxConnector;
