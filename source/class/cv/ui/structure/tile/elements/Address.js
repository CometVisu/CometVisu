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

    _init() {
      const element = this._element;
      const address = element.textContent.trim();
      if (address) {
        const model = cv.data.Model.getInstance();
        const backendName = element.getAttribute('backend');
        model.addAddress(address, element.getAttribute('id'), backendName);
        const mode = element.hasAttribute('mode')
          ? element.getAttribute('mode')
          : 'readwrite';
        if (mode !== 'write') {
          // subscribe
          // this is a read address register for updates
          const state = model.getState(address, backendName);
          if (state !== undefined) {
            this.fireStateUpdate(address, state);
          }
          //add listener
          model.addUpdateListener(
            address,
            this.fireStateUpdate,
            this,
            backendName
          );
        }
        if (mode !== 'read') {
          // listen for sendState events
          element.addEventListener('sendState', ev => {
            let value = null;
            if (Object.prototype.hasOwnProperty.call(ev.detail, 'value')) {
              value = ev.detail.value;
            }
            if (element.hasAttribute('value')) {
              // address has a fixed value that must be sent
              value = element.getAttribute('value');
            }
            const allowDuplicates =
              ev.detail.source &&
              ev.detail.source instanceof
                cv.ui.structure.tile.components.Button &&
              (ev.detail.source.getType() === 'trigger' ||
                ev.detail.source.getType() === 'push');
            if (value !== null) {
              const encoding = element.getAttribute('transform') || 'raw';
              const encodedValue = cv.Transform.encodeBusAndRaw(
                { transform: encoding },
                value
              );

              // noinspection EqualityComparisonWithCoercionJS
              if (
                allowDuplicates ||
                !Object.prototype.hasOwnProperty.call(
                  element,
                  'lastSentValue'
                ) ||
                encodedValue.raw !== element.lastSentValue
              ) {
                if (element.hasAttribute('delay')) {
                  const delay = parseInt(element.getAttribute('delay'));
                  this.debug(`send with delay of ${delay}ms`);
                  qx.event.Timer.once(
                    () => {
                      cv.io.BackendConnections.getClient(backendName).write(
                        element.textContent,
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
                  cv.io.BackendConnections.getClient(backendName).write(
                    element.textContent,
                    encodedValue.bus,
                    element
                  );

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
      if (
        this.__lastValue !== state ||
        this._element.getAttribute('send-mode') === 'always'
      ) {
        let transform = this._element.getAttribute('transform') || 'raw';
        let transformedState = cv.Transform.decode(
          { transform: transform },
          state
        );

        let mapping = '';
        if (this._element.hasAttribute('mapping')) {
          mapping = this._element.getAttribute('mapping');
          transformedState = cv.Application.structureController.mapValue(
            mapping,
            transformedState
          );
        }
        if (this._element.hasAttribute('format')) {
          transformedState = cv.util.String.sprintf(
            this._element.getAttribute('format'),
            transformedState instanceof Date
              ? transformedState.toLocaleString()
              : transformedState
          );
        }
        const ev = new CustomEvent('stateUpdate', {
          bubbles: true,
          cancelable: true,
          detail: {
            address: this._element.textContent.trim(),
            state: transformedState,
            target: this._element.getAttribute('target') || '',
            raw: state,
            mapping: mapping,
            addressValue: this._element.hasAttribute('value')
              ? this._element.getAttribute('value')
              : null,
            source: this,
            variant: this._element.hasAttribute('variant')
              ? this._element.getAttribute('variant')
              : null
          }
        });

        this.__transformedValue = transformedState;
        //console.log(ev.detail);
        this._element.dispatchEvent(ev);
        this.__lastValue = state;
        // reset lastSentValue
        if (state !== this._element.lastSentValue) {
          this._element.lastSentValue = null;
        }
      }
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
