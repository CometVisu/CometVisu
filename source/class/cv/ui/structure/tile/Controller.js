qx.Class.define('cv.ui.structure.tile.Controller', {
  extend: qx.core.Object,
  type: 'singleton',
  implement: cv.ui.structure.IController,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this.base(arguments);
    this.__HTML_STRUCT = '';
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    HTML_STRUCT: ''
  },
  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __HTML_STRUCT: null,

    getHtmlStructure() {
      return this.__HTML_STRUCT;
    },

    parseLabel: function (label, flavour, labelClass, style) {
      return label ? label.textContent : '';
    },
    supports(feature, subfeature) {
      return false;
    },

    initLayout() {

    }
  },
  defer: function (statics) {
    cv.Application.structureController = statics.getInstance();
  }
});
