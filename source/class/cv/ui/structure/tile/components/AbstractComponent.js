/**
 *
 */
qx.Class.define('cv.ui.structure.tile.components.AbstractComponent', {
  extend: qx.core.Object,
  type: 'abstract',

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __element: null,

    getDomElement() {
      if (!this.__element) {
        this.__element = this._createDomElement();
      }
      return this.__element;
    },

    _createDomElement() {
      return document.createElement('div');
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    if (this.__element) {
      this.__element.remove();
    }
    this.__element = null;
  }
});
