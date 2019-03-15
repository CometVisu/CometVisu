/**
 * Simple config entry.
 */
qx.Class.define('cv.ui.manager.model.config.Option', {
  extend: qx.core.Object,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function (key, value) {
    this.base(arguments);
    this.setKey(key);
    this.setValue(value);
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    key: {
      check: 'String',
      init: '',
      event: 'changeKey'
    },

    value: {
      check: 'String',
      init: '',
      event: 'changeValue'
    }
  }
});
