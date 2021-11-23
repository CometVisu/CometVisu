/**
 *
 */
qx.Mixin.define('cv.ui.structure.tile.elements.MCustomElement', {
  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function (element) {
    this._element = element;
    this._init();
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
      apply: '_applyConnected',
      event: 'changeConnected'
    }
  },

  /*
  ***********************************************
    EVENTS
  ***********************************************
  */
  events: {

  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    /**
     * @var {HTMLElement}
     */
    _element: null,

    _applyConnected() {},
    _applyElement() {},
    _init() {}
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this._element.$$widget = null;
    this._element = null;
  }
});
