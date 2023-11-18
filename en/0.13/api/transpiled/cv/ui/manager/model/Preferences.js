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
      "qx.util.Serializer": {},
      "cv.report.Record": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Preferences.js
   *
   * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
   *
   * This program is free software; you can redistribute it and/or modify it
   * under the terms of the GNU General Public License as published by the Free
   * Software Foundation; either version 3 of the License, or (at your option)
   * any later version.
   *
   * This program is distributed in the hope that it will be useful, but WITHOUT
   * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
   * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
   * more details.
   *
   * You should have received a copy of the GNU General Public License along
   * with this program; if not, write to the Free Software Foundation, Inc.,
   * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
   */

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
      _skipSaving: false,
      _savePreferences: function _savePreferences() {
        if (!this._skipSaving) {
          var store = qx.bom.Storage.getLocal();
          var data = qx.util.Serializer.toNativeObject(this);
          store.setItem('preferences', data);
          cv.report.Record.record(cv.report.Record.STORAGE, 'preferences', data);
        }
      },
      _restorePreferences: function _restorePreferences() {
        var store = qx.bom.Storage.getLocal();
        this.set(store.getItem('preferences'));
      },
      setPreferences: function setPreferences(preferences, noSave) {
        if (noSave) {
          this._skipSaving = true;
        }
        this.set(preferences);
        this._skipSaving = false;
      }
    }
  });
  cv.ui.manager.model.Preferences.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Preferences.js.map?dt=1700345581052