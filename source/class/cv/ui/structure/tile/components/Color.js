/* Color.js
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
 * Shows a html color input
 * @author Tobias Bräutigam
 * @since 2022
 */
qx.Class.define("cv.ui.structure.tile.components.Color", {
  extend: cv.ui.structure.tile.components.AbstractComponent,

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    throttleInterval: {
      check: "Number",
      init: 250,
      apply: "_applyThrottleInterval"
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __input: null,

    _init() {
      super._init();
      const element = this._element;
      if (element.hasAttribute("throttle-interval")) {
        this.setThrottleInterval(
          parseInt(element.getAttribute("throttle-interval"))
        );
      } else {
        this._applyThrottleInterval(this.getThrottleInterval());
      }

      // init components
      let input = element.querySelector(":scope > input");
      if (!input) {
        input = document.createElement("input");
        input.setAttribute("type", "color");
        element.appendChild(input);
        input.oninput = () => this.__throttled.call();
      }
      this.__input = input;
    },

    _applyThrottleInterval(value) {
      if (value > 0) {
        this.__throttled = cv.util.Function.throttle(
          this.onInput,
          value,
          { trailing: true },
          this
        );
      } else {
        // no throttling, direct call
        this.__throttled = {
          call: () => this.onInput(),
          abort: () => {}
        };
      }
    },

    onInput() {
      this.__sendValue(this.__input.value);
    },

    _updateValue(mappedValue, value) {
      let target = this._element.querySelector(":scope > .value");
      const rgb = mappedValue.substring(0, 7);
      if (target) {
        const tagName = target.tagName.toLowerCase();
        const alpha =
          mappedValue.length === 9
            ? parseInt(mappedValue.substring(7, 9), 16) / 255
            : 1.0;

        switch (tagName) {
          case "cv-icon":
            target.style.color = rgb;
            target.style.opacity = Math.max(alpha, 0.05); // do not blend it out totally
            break;
        }
      }
      const input = this._element.querySelector(":scope > input");
      input.value = rgb; // this input can't handle the alpha value
      if (!target) {
        // only if we do not have another value handler
        this._element.style.backgroundColor = mappedValue;
      }
    },

    onStateUpdate(ev) {
      let handled = false;
      if (ev.detail.target) {
        handled = super.onStateUpdate(ev);
      }
      if (!handled) {
        const value = ev.detail.state;
        let rgb;
        let alpha = "";
        switch (ev.detail.variant) {
          case "hsv":
            rgb = qx.util.ColorUtil.hsbToRgb([
              value.get("h"),
              value.get("s"),
              100
            ]);
            alpha = Math.round((value.get("v") / 100) * 255)
              .toString(16)
              .padStart(2, "0");
            this.setValue(
              `#${rgb[0].toString(16).padStart(2, "0")}${rgb[1]
                .toString(16)
                .padStart(2, "0")}${rgb[2]
                .toString(16)
                .padStart(2, "0")}${alpha}`
            );
            break;
        }
      }
    },

    __sendValue(value) {
      const hsvArray = qx.util.ColorUtil.rgbToHsb([
        parseInt(value.substring(1, 3), 16),
        parseInt(value.substring(3, 5), 16),
        parseInt(value.substring(5, 7), 16)
      ]);

      const hsv = new Map([
        ["h", hsvArray[0]],
        ["s", hsvArray[1]],
        ["v", hsvArray[2]]
      ]);

      const ev = new CustomEvent("sendState", {
        detail: {
          value: hsv,
          source: this
        }
      });

      this._writeAddresses
        .filter(addr => addr.getAttribute("variant") === "hsv")
        .forEach(address => address.dispatchEvent(ev));
    }
  },

  defer(QxClass) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + "color",
      class extends QxConnector {
        constructor() {
          super(QxClass);
        }
      }
    );
  }
});
