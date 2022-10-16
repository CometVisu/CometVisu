/* Value.js
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
 * Shows a value from the backend, as label or image/icon
 * @author Tobias Bräutigam
 * @since 2022
 */
qx.Class.define('cv.ui.structure.tile.components.Value', {
  extend: cv.ui.structure.tile.components.AbstractComponent,
  include: [cv.ui.structure.tile.MVisibility, cv.ui.structure.tile.MResize],
  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _queuedOverflowDetection: null,
    _debouncedDetectOverflow: null,

    _init() {
      super._init();
      this._debouncedDetectOverflow = qx.util.Function.debounce(
        this._detectOverflow,
        20
      );

      const target = this._element.querySelector('.value');
      if (target && target.tagName.toLowerCase() === 'label') {
        // check for overflowing text, when labels parent gets resized
        this.setResizeTarget(this._element);
        this.addListener('resized', this._debouncedDetectOverflow, this);
      }
    },

    _applyVisible(visible) {
      if (visible) {
        if (this._queuedOverflowDetection) {
          this._debouncedDetectOverflow();
        }
      } else {
        const target = this._element.querySelector('.value');
        if (target && target.classList.contains('scroll')) {
          target.classList.remove('scroll');
        }
      }
    },

    _detectOverflow() {
      const target = this._element.querySelector('.value');
      if (this.isVisible()) {
        this._queuedOverflowDetection = false;
        if (target.clientWidth > target.parentElement.clientWidth) {
          target.classList.add('scroll');
        } else {
          target.classList.remove('scroll');
        }
      } else {
        this._queuedOverflowDetection = true;
      }
    },

    _updateValue(mappedValue, value) {
      const target = this._element.querySelector('.value');
      let styleClass = '';
      if (target) {
        const tagName = target.tagName.toLowerCase();
        switch (tagName) {
          case 'cv-icon':
            target._instance.setId(mappedValue);
            if (this._element.hasAttribute('styling')) {
              styleClass = cv.Application.structureController.styleValue(
                this._element.getAttribute('styling'),
                value,
                this.__store
              );
            }
            target._instance.setStyleClass(styleClass);
            break;
          case 'meter':
            target.setAttribute('value', mappedValue);
            target.innerHTML = '' + mappedValue;
            break;
          case 'cv-round-progress':
            if (typeof value === 'string') {
              value = parseInt(value);
            }
            target._instance.setProgress(value);
            target._instance.setText('' + mappedValue);
            break;
          case 'label':
            target.innerHTML = mappedValue;
            this._debouncedDetectOverflow();
            break;
        }
      }
    }
  },

  defer(QxClass) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'value',
      class extends QxConnector {
        constructor() {
          super(QxClass);
        }
      }
    );
  }
});
