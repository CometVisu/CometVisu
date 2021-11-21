/**
 *
 */
qx.Class.define('cv.ui.structure.tile.components.AbstractComponent', {
  extend: qx.core.Object,
  type: 'abstract',

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  /**
   * @param element {QxConnector}
   */
  construct: function (element) {
    this.base(arguments);
    this._element = element;
    this._initAddresses(element);
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    connected: {
      check: 'Boolean',
      init: false,
      apply: '_applyConnected'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _element: null,

    _applyConnected(value) {
      this.debug(this._element, 'connected', value);
    },

    getDomElement() {
      return this._element;
    },

    _initAddresses : function(element) {
      const model = cv.data.Model.getInstance();
      Array.prototype.forEach.call(element.querySelectorAll(':scope > cv-address'), elem => {
        const address = elem.textContent;
        if (elem.getAttribute('mode') !== 'write') {
          // this is a read address register for updates
          const state = model.getState(address);
          if (state !== undefined) {
            this.update(address, state);
          }
          //add listener
          model.addUpdateListener(address, this.update, this);
        }
        model.addAddress(address, element.getAttribute('id'));
      });
    },

    update(address, state) {
      this.debug('update for address', address, ':', state);
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this._element = null;
  }
});
