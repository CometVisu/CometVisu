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
      const address = element.textContent;
      if (address) {
        const model = cv.data.Model.getInstance();
        model.addAddress(address, element.getAttribute('id'));
        const mode = element.hasAttribute('mode') ? element.getAttribute('mode') : 'readwrite';
        if (mode !== 'write') {
          // subscribe
          // this is a read address register for updates
          const state = model.getState(address);
          if (state !== undefined) {
            this.fireStateUpdate(state);
          }
          //add listener
          model.addUpdateListener(address, this.fireStateUpdate, this);
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
            const trigger = ev.detail.source && ev.detail.source instanceof cv.ui.structure.tile.components.Button && ev.detail.source.getType() === 'trigger';
            if (value !== null) {
              const encoding = element.getAttribute('transform');
              const encodedValue = cv.Transform.encodeBusAndRaw(encoding, value);
              // noinspection EqualityComparisonWithCoercionJS
              if (trigger || !Object.prototype.hasOwnProperty.call(element, 'lastSentValue') || encodedValue.raw !== element.lastSentValue) {
                cv.TemplateEngine.getClient().write(element.textContent, encodedValue.bus, element);
                if (!trigger) {
                  element.lastSentValue = encodedValue.raw;
                }
              }
            }
          });
        }
      }
    },

    fireStateUpdate(address, state) {
      let transform = this._element.getAttribute('transform') || 'raw';
      const ev = new CustomEvent('stateUpdate', {
        bubbles: true,
        cancelable: true,
        detail: {
          address: address,
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
