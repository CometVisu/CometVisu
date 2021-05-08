(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

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
    construct: function construct(key, value) {
      qx.core.Object.constructor.call(this);
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
      _applyChange: function _applyChange() {
        this.fireEvent('change');
      }
    }
  });
  cv.ui.manager.model.config.Option.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Option.js.map?dt=1620513274213