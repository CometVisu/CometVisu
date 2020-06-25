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
    EVENTS
  ***********************************************
  */
  events: {
    // sent whenever the options key or value has been changed
    'change': 'qx.event.type.Event'
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
      event: 'changeKey',
      apply: '_applyChange'
    },

    value: {
      check: 'String',
      init: '',
      event: 'changeValue',
      apply: '_applyChange'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _applyChange: function () {
      this.fireEvent('change');
    }
  }
});
