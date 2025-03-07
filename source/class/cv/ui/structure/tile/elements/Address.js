/* Address.js
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
 * Address element that connect a widget/component to the backend.
 *
 *  @author Tobias Bräutigam
 *  @since 2022
 */
qx.Class.define('cv.ui.structure.tile.elements.Address', {
  extend: cv.ui.structure.tile.elements.AbstractCustomElement,

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __lastValue: null,
    __transformedValue: null,
    _stateUpdateTarget: null,

    getAddress() {
      return this._element.textContent.trim();
    },


    _init() {
      const element = this._element;
      this._stateUpdateTarget = element;
      const address = this.getAddress();
      if (address) {
        const model = cv.data.Model.getInstance();
        const backendName = element.getAttribute('backend');
        model.addAddress(address, element.getAttribute('id'), backendName);
        const mode = element.hasAttribute('mode') ? element.getAttribute('mode') : 'readwrite';
        if (mode !== 'write') {
          // subscribe
          // this is a read address register for updates
          const state = model.getState(address, backendName);
          if (state !== undefined) {
            this.fireStateUpdate(address, state);
          }
          //add listener
          model.addUpdateListener(address, this.fireStateUpdate, this, backendName);

          if (element.hasAttribute('target') && element.getAttribute('target').startsWith('last-update')) {
            if (state === undefined) {
              // notify tile that we have no value, so its outdated
              this.fireStateUpdate(address, '-');
            }
          }
        }
        if (mode !== 'read') {
          // listen for sendState events
          element.addEventListener('sendState', ev => {
            let value = null;
            if (Object.prototype.hasOwnProperty.call(ev.detail, 'value')) {
              value = ev.detail.value;
            }
            let allowDuplicates =
              ev.detail.source &&
              ev.detail.source instanceof cv.ui.structure.tile.components.Button &&
              (ev.detail.source.getType() === 'trigger' || ev.detail.source.getType() === 'push');

            if (element.hasAttribute('value')) {
              // address has a fixed value that must be sent
              value = element.getAttribute('value');
              allowDuplicates = true;
            }

            if (value !== null) {
              const encoding = element.getAttribute('transform') || 'raw';
              const encodedValue = cv.Transform.encodeBusAndRaw({
                transform: encoding,
                selector: this._element.getAttribute('selector'),
                ignoreError: this._element.getAttribute('ignore-error') === 'true',
                variantInfo: this._element.getAttribute('variant'),
                qos: (this._element.getAttribute('qos') || 0) | 0
              }, value);

              const client = cv.io.BackendConnections.getClient(backendName);
              if (!client) {
                this.error('no client found for backend', backendName);
                return;
              }
              // noinspection EqualityComparisonWithCoercionJS
              if (
                allowDuplicates ||
                !Object.prototype.hasOwnProperty.call(element, 'lastSentValue') ||
                encodedValue.raw !== element.lastSentValue
              ) {
                if (element.hasAttribute('delay')) {
                  const delay = parseInt(element.getAttribute('delay'));
                  this.debug(`send with delay of ${delay}ms`);
                  qx.event.Timer.once(
                    () => {
                      client.write(
                        address,
                        encodedValue.bus,
                        element
                      );

                      if (!allowDuplicates) {
                        element.lastSentValue = encodedValue.raw;
                      }
                    },
                    this,
                    delay
                  );
                } else {
                  client.write(address, encodedValue.bus, element);

                  if (!allowDuplicates) {
                    element.lastSentValue = encodedValue.raw;
                  }
                }
              }
            }
          });
        }
      }
    },

    /**
     * Creates a 'stateUpdate' event with the transformed value and dispatches it to the <cv-address>-Element.
     * @param address {String} address
     * @param state {variant} state to send
     */
    fireStateUpdate(address, state) {
      if (this.__lastValue !== state || this._element.getAttribute('send-mode') === 'always') {
        let transform = this._element.getAttribute('transform') || 'raw';
        let transformedState = cv.Transform.decode({
          transform: transform,
          selector: this._element.getAttribute('selector'),
          ignoreError: this._element.getAttribute('ignore-error') === 'true',
          variantInfo: this._element.getAttribute('variant'),
          qos: (this._element.getAttribute('qos') || 0) | 0
        }, state);

        let mapping = '';
        if (this._element.hasAttribute('mapping')) {
          mapping = this._element.getAttribute('mapping');
          transformedState = cv.Application.structureController.mapValue(mapping, transformedState);
        }
        if (this._element.hasAttribute('format')) {
          transformedState = cv.util.String.sprintf(
            this._element.getAttribute('format'),
            transformedState instanceof Date ? transformedState.toLocaleString() : transformedState
          );
        }
        let targetConfig = this._element.hasAttribute('target') ? this._element.getAttribute('target').split(':') : [];
        const target = targetConfig.length > 0 ? targetConfig.shift() : '';
        const ev = new CustomEvent('stateUpdate', {
          bubbles: true,
          cancelable: true,
          detail: {
            address: this.getAddress(),
            state: transformedState,
            target: target,
            targetConfig: targetConfig,
            raw: state,
            mapping: mapping,
            addressValue: this._element.hasAttribute('value') ? this._element.getAttribute('value') : null,
            source: this,
            variant: this._element.hasAttribute('variant') ? this._element.getAttribute('variant') : null
          }
        });

        this.__transformedValue = transformedState;
        //console.log(ev.detail);
        this._stateUpdateTarget.dispatchEvent(ev);
        this.__lastValue = state;
        // reset lastSentValue
        if (state !== this._element.lastSentValue) {
          this._element.lastSentValue = null;
        }
      }
    },

    /**
     *
     * @return {boolean} true if this is a read address
     */
    isRead() {
      return this._element.getAttribute('mode') !== 'write';
    },

    /**
     *
     * @return {boolean} true if this is a write address
     */
    isWrite() {
      return this._element.getAttribute('mode') !== 'read';
    },

    getValue() {
      return this.__transformedValue;
    }
  },

  defer(Clazz) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'address',
      class extends QxConnector {
        constructor() {
          super(Clazz);
        }
      }
    );
  }
});
