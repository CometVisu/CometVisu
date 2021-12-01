/**
 *
 */
qx.Class.define('cv.ui.structure.tile.elements.Address', {
  extend: cv.ui.structure.tile.elements.AbstractCustomElement,

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _init() {
      const element = this._element;
      const address = element.textContent.trim();
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
            const allowDuplicates = ev.detail.source &&
              ev.detail.source instanceof cv.ui.structure.tile.components.Button &&
              (ev.detail.source.getType() === 'trigger' || ev.detail.source.getType() === 'push');
            if (value !== null) {
              const encoding = element.getAttribute('transform');
              const encodedValue = cv.Transform.encodeBusAndRaw(encoding, value);
              // noinspection EqualityComparisonWithCoercionJS
              if (allowDuplicates || !Object.prototype.hasOwnProperty.call(element, 'lastSentValue') || encodedValue.raw !== element.lastSentValue) {
                cv.TemplateEngine.getClient(backendName).write(element.textContent, encodedValue.bus, element);
                if (!allowDuplicates) {
                  element.lastSentValue = encodedValue.raw;
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
      let transform = this._element.getAttribute('transform') || 'raw';
      const ev = new CustomEvent('stateUpdate', {
        bubbles: true,
        cancelable: true,
        detail: {
          address: this._element.textContent.trim(),
          state: cv.Transform.decode(transform, state),
          raw: state
        }
      });
      this._element.dispatchEvent(ev);
    }
  },

  defer(Clazz) {
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'address', class extends QxConnector {
      constructor() {
        super(Clazz);
      }
    });
  }
});
