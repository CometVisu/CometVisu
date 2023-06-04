/* Tile.js
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
 * Shows a tile
 */
qx.Class.define('cv.ui.structure.tile.widgets.Tile', {
  extend: cv.ui.structure.tile.components.AbstractComponent,
  include: cv.ui.structure.tile.MPopup,

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    backgroundImage: {
      check: 'String',
      nullable: true,
      apply: '_applyBackgroundImage'
    },

    /**
     * Turn this tile into a popup
     */
    popup: {
      check: 'Boolean',
      init: false,
      apply: '_applyPopup'
    },

    outdated: {
      check: 'Boolean',
      init: false,
      apply: '_applyOutdated'
    },

    checkOutdated: {
      check: 'Boolean',
      init: false,
      apply: '_applyCheckOutdated'
    },

    outdatedMessage: {
      check: 'String',
      nullable: true,
      apply: '_applyOutdatedMessage'
    }
  },

  /*
  ***********************************************
    EVENTS
  ***********************************************
  */
  events: {
    fullscreenChanged: 'qx.event.type.Data'
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _fullScreenMode: null,
    _dateFormat: null,
    _checkOutdatedTimerId: null,
    _lastUpdate: null,
    _maxAge: null,
    _hideTimer: null,

    _init() {
      super._init();
      this._dateFormat = new qx.util.format.DateFormat(qx.locale.Date.getDateFormat('medium') + ' ' + qx.locale.Date.getTimeFormat('medium'));
      this._initPopupChild();
      if (this._element.hasAttribute('background-image')) {
        this.setBackgroundImage(this._element.getAttribute('background-image'));
      }
      if (this._childPopup) {
        this._childPopup.addEventListener('closed', () => {
          this.resetPopup();
        });
      }
      if (this._element.querySelector(':scope > label.title')) {
        this._element.classList.add('has-title');
      }

      this._hideTimer = new qx.event.Timer(5000);
      this._hideTimer.addListener('interval', () => {
        const elem = this._element.querySelector(':scope > .outdated-value');
        if (elem.style.display !== 'none') {
          elem.style.display = 'none';
        }
        this._hideTimer.stop();
      });
    },

    _applyBackgroundImage(value) {
      if (value) {
        this._element.style.backgroundImage = `url(${value})`;
        let overlay = this._element.querySelector(':scope > div.overlay');
        if (!overlay) {
          overlay = document.createElement('div');
          overlay.classList.add('overlay');
          this._element.insertBefore(overlay, this._element.firstChild);
        }
        this._element.classList.add('has-bg-image');
      } else {
        this._element.style.backgroundImage = '';
        this._element.classList.remove('has-bg-image');
      }
    },

    _applyOutdated(value) {
      let elem = this._element.querySelector(':scope > .outdated');
      if (value) {
        this._element.classList.add('outdated');
        if (!elem) {
          elem = document.createElement('div');
          elem.classList.add('outdated');
          elem.textContent = '!';
          this._element.insertBefore(elem, this._element.firstElementChild);
          // capture all clicks by stealing the initial event
          elem.addEventListener('pointerdown', ev => {
            ev.stopImmediatePropagation();
          });
          elem.addEventListener('click', ev => {
            // show last updated value for 5 seconds
            let valueElem = this._element.querySelector(':scope > .outdated-value');
            if (!valueElem) {
              valueElem = document.createElement('div');
              valueElem.classList.add('outdated-value');
              valueElem.textContent = this.getOutdatedMessage();
              this._element.appendChild(valueElem);
              this._element.insertBefore(valueElem, elem.nextElementSibling);
              // capture all clicks by stealing the initial event
              valueElem.addEventListener('pointerdown', ev => {
                ev.stopImmediatePropagation();
                valueElem.style.display = 'none';
              });
            } else {
              valueElem.style.display = 'block';
            }
            this._hideTimer.start();
          });
        }
        elem.style.display = 'block';
      } else {
        this._element.classList.remove('outdated');
        if (elem) {
          elem.style.display = 'none';
        }
      }
    },

    _applyOutdatedMessage(value) {
      this._element.setAttribute('title', value);
      let valueElem = this._element.querySelector(':scope > .outdated-value');
      if (valueElem) {
        valueElem.textContent = value;
      }
    },

    _applyCheckOutdated(value) {
      const timer = qx.util.TimerManager.getInstance();
      if (value) {
        this._checkOutdatedTimerId = timer.start(this.checkOutdated, 5000, this);
      } else if (this._checkOutdatedTimerId) {
        timer.stop(this._checkOutdatedTimerId);
        this._checkOutdatedTimerId = null;
      }
    },

    checkOutdated() {
      if (this._lastUpdate instanceof Date) {
        const age = Math.floor((Date.now() - this._lastUpdate.getTime()) / 1000);
        this.setOutdated(age > this._maxAge);
        this.setOutdatedMessage(qx.locale.Manager.tr('Last update: %1', this._dateFormat.format(this._lastUpdate)));
      } else if (this._lastUpdate === '-') {
        this.setOutdated(true);
        this.setOutdatedMessage(qx.locale.Manager.tr('Last update: unknown'));
      } else {
        this.error('last-update value must be a Date object, but is of type:', typeof this._lastUpdate, this._lastUpdate);
        this.resetOutdatedMessage();
      }
    },

    open() {
      if (this._childPopup) {
        this._openPopupChild();
      } else if (this._headerFooterParent) {
        const target = this._headerFooterParent;
        let closeButton = target.querySelector(':scope > button.close');
        if (!closeButton) {
          closeButton = document.createElement('button');
          closeButton.classList.add('close');
          const icon = document.createElement('i');
          icon.classList.add('ri-close-line');
          closeButton.appendChild(icon);
          target.appendChild(closeButton);
          closeButton.addEventListener('click', () => this.setPopup(false));
        }
        closeButton.style.display = 'block';
        target.classList.add('popup');
        if (this._fullScreenMode) {
          target.classList.add('fullscreen');
          this.fireDataEvent('fullscreenChanged', true);
        }
        this.registerModalPopup();
      }
    },

    close(keepState) {
      if (!keepState) {
        this.setPopup(false);
      }
      if (this._childPopup) {
        this._closePopupChild();
      } else if (this._headerFooterParent) {
        this._headerFooterParent.classList.remove('popup');
        if (this._fullScreenMode) {
          this._headerFooterParent.classList.remove('fullscreen');
          this.fireDataEvent('fullscreenChanged', true);
        }
        let closeButton = this._headerFooterParent.querySelector(':scope > button.close');
        if (closeButton) {
          closeButton.style.display = 'none';
        }
        this.unregisterModalPopup();
      }
      if (this._autoCloseTimer) {
        this._autoCloseTimer.stop();
      }
      this.fireEvent('closed');
    },

    _applyPopup(value) {
      if (value) {
        this.open();
      } else {
        this.close(true);
      }
    },

    /**
     * Handles the incoming data from the backend for this widget
     *
     * @param ev {CustomEvent} stateUpdate event fired from a cv-address component
     */
    onStateUpdate(ev) {
      if (!super.onStateUpdate(ev)) {
        switch (ev.detail.target) {
          case 'background-image':
            this.setBackgroundImage(ev.detail.state);
            break;

          case 'popup':
          case 'fullscreen-popup':
            this._fullScreenMode = ev.detail.target === 'fullscreen-popup';
            if (ev.detail.addressValue) {
              // only open when the sent value equals the fixed value
              // noinspection EqualityComparisonWithCoercionJS
              if (ev.detail.addressValue == ev.detail.state) {
                this.setPopup(true);
                // this is not closing by address, so we set a close timeout to 3 minutes
                if (!this._autoCloseTimer) {
                  this._autoCloseTimer = new qx.event.Timer(180 * 1000);
                  this._autoCloseTimer.addListener('interval', this.close, this);
                }
                this._autoCloseTimer.restart();
              }
            } else {
              // open / close depending on value
              // noinspection EqualityComparisonWithCoercionJS
              this.setPopup(ev.detail.state == 1);
            }
            break;

          case 'last-update':
            this._maxAge = ev.detail.targetConfig && ev.detail.targetConfig.length > 0 ? parseInt(ev.detail.targetConfig.shift()) : Number.POSITIVE_INFINITY;
            this._lastUpdate = ev.detail.state;
            this.checkOutdated();
            break;

          default:
            this.debug('unhandled address target', ev.detail.target);
        }
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct() {
      this._disposeObjects('_dateFormat');
      if (this._checkOutdatedTimerId) {
        qx.util.TimerManager.getInstance().stop(this._checkOutdatedTimerId);
        this._checkOutdatedTimerId = null;
      }
    }
  },

  defer(QxClass) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'tile',
      class extends QxConnector {
        constructor() {
          super(QxClass);
        }
      }
    );
  }
});
