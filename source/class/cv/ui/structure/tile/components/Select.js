/* Select.js
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
 * Allows the selection of one element out of a list of <cv-option> elements
 */
qx.Class.define("cv.ui.structure.tile.components.Select", {
  extend: cv.ui.structure.tile.components.AbstractComponent,

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __options: null,
    __value: null,
    __popup: null,

    _init() {
      super._init();
      const element = this._element;
      this.__options = new Map();

      const popup = (this.__popup = document.createElement("div"));
      popup.classList.add("popup");
      element.querySelectorAll(":scope > cv-option").forEach((option, i) => {
        popup.appendChild(option);
        if (!option.hasAttribute("key")) {
          option.setAttribute("key", "" + i);
        }
        this.__options.set(option.getAttribute("key"), option);
      });
      const value = (this.__value = document.createElement("span"));
      value.classList.add("value");
      element.appendChild(value);
      element.appendChild(popup);
      const handle = document.createElement("cv-icon");
      handle.classList.add("dropdown");
      handle.classList.add("ri-arrow-down-s-line");
      element.appendChild(handle);

      if (this._writeAddresses.length > 0) {
        element.addEventListener("click", (ev) => this.onClicked(ev));
      }
    },

    onClicked(ev) {
      const style = getComputedStyle(this.__popup);
      for (let target of ev.path) {
        if (target.tagName.toLowerCase() === "cv-option") {
          // select this option
          this._sendSelection(target.getAttribute("key"), true);
          break;
        }
        if (target === ev.currentTarget) {
          break;
        }
      }
      // open popup
      if (style.getPropertyValue("display") === "none") {
        this.__popup.style.display = "block";
      } else {
        this.__popup.style.display = "none";
      }
    },

    _sendSelection(key, predictive) {
      const ev = new CustomEvent("sendState", {
        detail: {
          value: key,
          source: this,
        },
      });

      this._writeAddresses
        .filter(
          (addr) =>
            !addr.hasAttribute("on") || addr.getAttribute("on") === "click"
        )
        .forEach((address) => address.dispatchEvent(ev));
      if (predictive === true) {
        this.setValue(key);
      }
    },

    _updateValue(mappedValue, value) {
      if (this.__options.has(mappedValue)) {
        this.__value.innerHTML = "";
        const current = this.__options.get(mappedValue);
        if (current.children.length > 0) {
          // if we have non text children, we only use them (only icons no text)
          for (const child of current.children) {
            this.__value.appendChild(child.cloneNode());
          }
        } else {
          this.__value.innerHTML = current.innerHTML;
        }
      }
    },
  },

  defer(QxClass) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + "select",
      class extends QxConnector {
        constructor() {
          super(QxClass);
        }
      }
    );
  },
});
