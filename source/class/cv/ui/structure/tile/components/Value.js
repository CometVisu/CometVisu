/* Value.js
 *
 * copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
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
    CONSTRUCTOR
  ***********************************************
  */
  construct(element) {
    super(element);
    this.addListener('changeVisible', this._applyVisible, this);
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __overflowTimerId: null,
    __iconUpdateFrame: null,

    _init() {
      super._init();

      const target = this._element.querySelector('.value');
      if (target && target.tagName.toLowerCase() === 'label') {
        // check for overflowing text, when labels parent gets resized
        this.setResizeTarget(this._element);
        this.addListener('resized', this._scheduleDetectOverflow, this);
      }
    },

    _disconnected() {
      this.__cleanupAsyncHandles();
      super._disconnected();
    },

    __cleanupAsyncHandles() {
      if (this.__overflowTimerId !== null) {
        window.clearTimeout(this.__overflowTimerId);
        this.__overflowTimerId = null;
      }
      this.removeListener('resized', this._scheduleDetectOverflow, this);
      if (this.__iconUpdateFrame !== null) {
        window.cancelAnimationFrame(this.__iconUpdateFrame);
        this.__iconUpdateFrame = null;
      }
    },

    _scheduleDetectOverflow() {
      if (this.__overflowTimerId !== null) {
        window.clearTimeout(this.__overflowTimerId);
      }
      this.__overflowTimerId = window.setTimeout(() => {
        this.__overflowTimerId = null;
        if (!this.isDisposed() && this.isConnected()) {
          this._detectOverflow();
        }
      }, 20);
    },

    _applyVisible(ev) {
      if (ev.getData()) {
        this._scheduleDetectOverflow();
      } else {
        const target = this._element.querySelector('.value');
        if (target && target.classList.contains('scroll')) {
          target.classList.remove('scroll');
        }
      }
    },

    _detectOverflow() {
      const target = this._element.querySelector('.value');
      if (this.isVisible() && target) {
        if (target.clientWidth > target.parentElement.clientWidth) {
          target.classList.add('scroll');
        } else {
          target.classList.remove('scroll');
        }
      }
    },

    _updateValue(mappedValue, value) {
      let styleClass = '';
      for (const target of this._element.querySelectorAll('.value')) {
        const tagName = target.tagName.toLowerCase();
        switch (tagName) {
          case 'cv-icon':
            if (this._element.hasAttribute('styling')) {
              styleClass = this._getStyleClass(value);
            }
            if (target._instance) {
              target._instance.setId('' + mappedValue);
              target._instance.setStyleClass(styleClass);
            } else {
              // try again in next frame
              this.__iconUpdateFrame = window.requestAnimationFrame(() => {
                this.__iconUpdateFrame = null;
                if (!this.isConnected() || !target.isConnected) {
                  return;
                }
                if (target._instance) {
                  target._instance.setId('' + mappedValue);
                  target._instance.setStyleClass(styleClass);
                } else {
                  this.error('id and styleClass could not be applied, custom element not initialized yet!');
                }
              });
            }
            break;
          case 'meter':
            target.setAttribute('value', value);
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
            this._scheduleDetectOverflow();
            break;
        }
      }
    }
  },

  destruct() {
    this.__cleanupAsyncHandles();
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
