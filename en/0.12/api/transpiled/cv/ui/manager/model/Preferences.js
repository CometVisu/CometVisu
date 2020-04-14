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
      },
      "qx.bom.Storage": {},
      "qx.util.Serializer": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * User preferences.
   */
  qx.Class.define('cv.ui.manager.model.Preferences', {
    extend: qx.core.Object,
    type: 'singleton',

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this);

      this._restorePreferences();
    },

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      defaultConfigEditor: {
        check: ['source', 'xml'],
        init: 'source',
        event: 'changeDefaultConfigEditor',
        apply: '_savePreferences'
      },
      quickPreview: {
        check: 'Boolean',
        init: false,
        event: 'changeQuickPreview',
        apply: '_savePreferences'
      },

      /**
       * In export mode the manager looks and behaves like a file explorer.
       */
      expertMode: {
        check: 'Boolean',
        init: false,
        event: 'changeExpertMode',
        apply: '_savePreferences'
      },

      /**
       * View mode of the start page
       */
      startViewMode: {
        check: ['list', 'preview'],
        init: 'preview',
        event: 'changeStartViewMode',
        apply: '_savePreferences'
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _savePreferences: function _savePreferences() {
        var store = qx.bom.Storage.getLocal();
        store.setItem('preferences', qx.util.Serializer.toNativeObject(this));
      },
      _restorePreferences: function _restorePreferences() {
        var store = qx.bom.Storage.getLocal();
        this.set(store.getItem('preferences'));
      }
    }
  });
  cv.ui.manager.model.Preferences.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Preferences.js.map?dt=1586896745314