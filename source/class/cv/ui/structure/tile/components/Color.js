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
qx.Class.define('cv.ui.structure.tile.components.Color', {
  extend: cv.ui.structure.tile.components.AbstractComponent,
  include: cv.ui.structure.tile.MResize,

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    throttleInterval: {
      check: 'Number',
      init: 250,
      apply: '_applyThrottleInterval'
    }
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    CC_COUNTER: 0
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __colorChooser: null,

    _init() {
      const element = this._element;
      if (element.hasAttribute('throttle-interval')) {
        this.setThrottleInterval(parseInt(element.getAttribute('throttle-interval')));
      }

      // init components
      const mode = element.hasAttribute('mode') ? element.getAttribute('mode') : 'popup';
      if (mode === 'popup') {
        let popup = element.querySelector(':scope > cv-popup');
        if (!popup) {
          popup = document.createElement('cv-popup');
          popup.setAttribute('modal', 'true');
          if (element.hasAttribute('title')) {
            popup.setAttribute('title', element.getAttribute('title'));
          }
          const addresses = {};
          for (const elem of element.querySelectorAll(':scope > cv-address')) {
            let src = elem.textContent;
            let transform = elem.getAttribute('transform');
            let mode = 1 | 2; // Bit 0 = read, Bit 1 = write  => 1|2 = 3 = readwrite
            switch (elem.getAttribute('mode')) {
              case 'disable':
                mode = 0;
                break;
              case 'read':
                mode = 1;
                break;
              case 'write':
                mode = 2;
                break;
              case 'readwrite':
                mode = 1 | 2;
                break;
            }
            let variantInfo = cv.parser.pure.widgets.ColorChooser.makeAddressListFn(src, transform, mode, elem.getAttribute('variant'));
            addresses[src.trim()] = {
              transform: transform,
              mode: mode,
              variantInfo: variantInfo[1]
            };
          }
          cv.ui.structure.tile.components.Color.CC_COUNTER++;
          const path = 'id_'+cv.ui.structure.tile.components.Color.CC_COUNTER;
          const props = {
            path: path,
            $$type: 'colorchooser',
            classes: 'widget colorchooser',
            layout: {
              colspan: 1
            },
            controls: element.hasAttribute('controls') ? element.getAttribute('controls') : 'triangle',
            address: addresses,
            throttleInterval: this.getThrottleInterval()
          };
          cv.parser.pure.widgets.ColorChooser.parseAttributes(element, props);
          this.__colorChooser = new cv.ui.structure.pure.ColorChooser(props);
          this.__colorChooser.addListener('colorChanged', this._onColorChanged, this);
          this._onColorChanged();
          popup.innerHTML = `<div class="widget_container" style="margin-top: 24px; max-width: 100vw; width: 320px; max-height: 100vh; min-height: 320px" id="${path}" data-type="colorchooser">${this.__colorChooser.getDomString()}</div>`;
          element.appendChild(popup);
          element.addEventListener('click', ev => {
            if (ev.path.indexOf(popup) < 0) {
              popup.getInstance().open();
            }
          });
          qx.event.Timer.once(() => {
            this.__colorChooser._onDomReady();
          }, this, 0);

          this.setResizeTarget(popup);
          this.addListener('resized', () => {
            this.__colorChooser.invalidateScreensize();
          });
        }
      }
    },

    _onColorChanged() {
      const color = this.__colorChooser.getColor();
      const rgb = color.getComponent('rgb');
      const v = color.getComponent('v');
      this.setValue(
        `#${this.__convertToHex(rgb.r)}${this.__convertToHex(rgb.g)}${this.__convertToHex(rgb.b)}${this.__convertToHex(v)}`
      );
    },

    __convertToHex(v) {
      return Math.round(v * 255)
        .toString(16)
        .padStart(2, '0');
    },

    _updateValue(mappedValue, value) {
      let target = this._element.querySelector(':scope > .value');
      const rgb = mappedValue.substring(0, 7);
      if (target) {
        const tagName = target.tagName.toLowerCase();
        const alpha = mappedValue.length === 9 ? parseInt(mappedValue.substring(7, 9), 16) / 255 : 1.0;

        switch (tagName) {
          case 'cv-icon':
            target.style.color = rgb;
            target.style.opacity = Math.max(alpha, 0.2); // do not blend it out totally
            break;
        }
      } else {
        // only if we do not have another value handler
        this._element.style.backgroundColor = mappedValue;
      }
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this._disposeObjects('__colorChooser');
  },

  defer(QxClass) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'color',
      class extends QxConnector {
        constructor() {
          super(QxClass);
        }
      }
    );
  }
});
