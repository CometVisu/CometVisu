/**
 * User preferences.
 */
qx.Class.define("cv.ui.manager.model.Preferences", {
  extend: qx.core.Object,
  type: "singleton",

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this.base(arguments);
    this._restorePreferences();
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    defaultConfigEditor: {
      check: ["source", "xml"],
      init: "source",
      event: "changeDefaultConfigEditor",
      apply: "_savePreferences"
    },

    quickPreview: {
      check: "Boolean",
      init: false,
      event: "changeQuickPreview",
      apply: "_savePreferences"
    },

    /**
     * In export mode the manager looks and behaves like a file explorer.
     */
    expertMode: {
      check: "Boolean",
      init: false,
      event: "changeExpertMode",
      apply: "_savePreferences"
    },

    /**
     * View mode of the start page
     */
    startViewMode: {
      check: ["list", "preview"],
      init: "preview",
      event: "changeStartViewMode",
      apply: "_savePreferences"
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _skipSaving: false,

    _savePreferences: function () {
      if (!this._skipSaving) {
        const store = qx.bom.Storage.getLocal();
        const data = qx.util.Serializer.toNativeObject(this);
        store.setItem("preferences", data);
        cv.report.Record.record(cv.report.Record.STORAGE, "preferences", data);
      }
    },

    _restorePreferences: function () {
      const store = qx.bom.Storage.getLocal();
      this.set(store.getItem("preferences"));
    },

    setPreferences: function (preferences, noSave) {
      if (noSave) {
        this._skipSaving = true;
      }
      this.set(preferences);
      this._skipSaving = false;
    }
  }
});
