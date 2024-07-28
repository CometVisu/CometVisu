function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.ui.root.Inline": {
        "require": true,
        "defer": "runtime"
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "cv.Config": {
        "construct": true
      },
      "cv.core.notifications.Router": {
        "construct": true
      },
      "cv.io.BackendConnections": {
        "construct": true
      },
      "cv.TemplateEngine": {
        "construct": true
      },
      "qx.dom.Element": {},
      "cv.ui.NotificationCenter": {},
      "cv.util.IconTools": {},
      "qx.ui.command.Command": {},
      "qx.event.Registration": {},
      "qx.theme.manager.Meta": {},
      "cv.theme.Dark": {},
      "qx.ui.layout.VBox": {},
      "cv.plugins.openhab.Settings": {},
      "qx.event.Timer": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Openhab.js
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
   * This Plugin provides some specials to improve the integration with openHAB backend.
   *
   * .. NOTE::
   *
   *    This plugin gets automatically activated if the openHAB2 backend is used.
   *    There is no need to add it to the ``plugins`` section of the ``visu_config.xml``.
   *
   * @author Tobias Bräutigam
   * @since 0.11.0
   *
   * @require(qx.ui.root.Inline)
   */
  qx.Class.define('cv.plugins.openhab.Openhab', {
    extend: qx.core.Object,
    type: 'singleton',
    /*
    *****************************************************************************
      CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      if (!Object.prototype.hasOwnProperty.call(cv.Config.request.queryKey, 'preview')) {
        this.__P_22_0 = cv.core.notifications.Router.getInstance();

        // listen to notifications
        var client = cv.io.BackendConnections.getClientByType('openhab');
        if (client) {
          var sse = client.getCurrentTransport && client.getCurrentTransport();
          if (sse) {
            sse.subscribe('notifications', this._onNotification, this);
          }
          cv.TemplateEngine.getInstance().executeWhenDomFinished(this._createSettings, this);
        }
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_22_0: null,
      __P_22_1: null,
      _openSettings: null,
      _createSettings: function _createSettings() {
        var _this = this;
        // add element structure to notification-center
        var settingsRoot = qx.dom.Element.create('section', {
          id: 'qxsettings',
          html: '<div></div>'
        });
        qx.dom.Element.insertAfter(settingsRoot, document.querySelector('#' + cv.ui.NotificationCenter.getInstance().getRootElementId() + ' section.messages'));

        // add a settings button to trigger opening the settings
        var button = qx.dom.Element.create('div', {
          html: cv.util.IconTools.svgKUF('edit_settings')(null, 'width: 22px; height: 22px;', '', true),
          style: 'float: left;'
        });
        this._openSettings = new qx.ui.command.Command('Ctrl+S');
        this._openSettings.addListener('execute', function () {
          cv.ui.NotificationCenter.getInstance().show();
          _this.__P_22_1.show();
        });
        cv.TemplateEngine.getInstance().getCommands().add('open-settings', this._openSettings);
        qx.dom.Element.insertBegin(button, document.querySelector('#notification-center footer'));
        qx.event.Registration.addListener(button, 'tap', function () {
          this.__P_22_1.show();
        }, this);

        //add to DOM
        qx.theme.manager.Meta.getInstance().setTheme(cv.theme.Dark);

        // Initialize tooltip manager (currently disable as it requires a root with basic layout
        // and that breaks the inline container sizes)
        // qx.ui.tooltip.Manager.getInstance();

        this._inline = new qx.ui.root.Inline(document.querySelector('#qxsettings > div'), true, false);
        this._inline.setLayout(new qx.ui.layout.VBox());
        this.__P_22_1 = new cv.plugins.openhab.Settings();
        this.__P_22_1.exclude();
        this._inline.add(this.__P_22_1, {
          flex: 1
        });
      },
      /**
       * Handles notification messages from backend
       * @param e {Event}
       * @protected
       */
      _onNotification: function _onNotification(e) {
        if (!e.data) {
          this.error('invalid content received from SSE: ', e);
        }
        var json = _typeof(e.data) === 'object' ? e.data : JSON.parse(e.data);
        this.__P_22_0.dispatchMessage(json.topic || 'cv.backend', json);
      }
    },
    /*
    ******************************************************
      DESTRUCTOR
    ******************************************************
    */
    destruct: function destruct() {
      this._disposeObjects("__P_22_1", '_openSettings');
      this.__P_22_0 = null;
    },
    defer: function defer(statics) {
      // initialize on load but delay the call
      qx.event.Timer.once(statics.getInstance, statics, 1000);
    }
  });
  cv.plugins.openhab.Openhab.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Openhab.js.map?dt=1722153800482