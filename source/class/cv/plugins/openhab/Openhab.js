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
  construct() {
    super();
    if (!Object.prototype.hasOwnProperty.call(cv.Config.request.queryKey, 'preview')) {
      this.__notificationRouter = cv.core.notifications.Router.getInstance();

      // listen to notifications
      const client = cv.io.BackendConnections.getClient();
      const sse = client.getCurrentTransport && client.getCurrentTransport();
      if (sse) {
        sse.subscribe('notifications', this._onNotification, this);
      }
      cv.TemplateEngine.getInstance().executeWhenDomFinished(this._createSettings, this);
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members: {
    __notificationRouter: null,
    __settings: null,
    _openSettings: null,

    _createSettings() {
      // add element structure to notification-center
      const settingsRoot = qx.dom.Element.create('section', {
        id: 'qxsettings',
        html: '<div></div>'
      });

      qx.dom.Element.insertAfter(
        settingsRoot,
        document.querySelector('#' + cv.ui.NotificationCenter.getInstance().getRootElementId() + ' section.messages')
      );

      // add a settings button to trigger opening the settings
      const button = qx.dom.Element.create('div', {
        html: cv.util.IconTools.svgKUF('edit_settings')(null, 'width: 22px; height: 22px;', '', true),

        style: 'float: left;'
      });

      this._openSettings = new qx.ui.command.Command('Ctrl+S');
      this._openSettings.addListener('execute', () => {
        cv.ui.NotificationCenter.getInstance().show();
        this.__settings.show();
      });
      cv.TemplateEngine.getInstance().getCommands().add('open-settings', this._openSettings);
      qx.dom.Element.insertBegin(button, document.querySelector('#notification-center footer'));

      qx.event.Registration.addListener(
        button,
        'tap',
        function () {
          this.__settings.show();
        },
        this
      );

      //add to DOM
      qx.theme.manager.Meta.getInstance().setTheme(cv.theme.Dark);

      // Initialize tooltip manager (currently disable as it requires a root with basic layout
      // and that breaks the inline container sizes)
      // qx.ui.tooltip.Manager.getInstance();

      this._inline = new qx.ui.root.Inline(document.querySelector('#qxsettings > div'), true, false);

      this._inline.setLayout(new qx.ui.layout.VBox());
      this.__settings = new cv.plugins.openhab.Settings();
      this.__settings.exclude();
      this._inline.add(this.__settings, { flex: 1 });
    },

    /**
     * Handles notification messages from backend
     * @param e {Event}
     * @protected
     */
    _onNotification(e) {
      if (!e.data) {
        this.error('invalid content received from SSE: ', e);
      }
      const json = typeof e.data === 'object' ? e.data : JSON.parse(e.data);
      this.__notificationRouter.dispatchMessage(json.topic || 'cv.backend', json);
    }
  },

  /*
  ******************************************************
    DESTRUCTOR
  ******************************************************
  */
  destruct() {
    this._disposeObjects('__settings', '_openSettings');
    this.__notificationRouter = null;
  },

  defer(statics) {
    // initialize on load but delay the call
    qx.event.Timer.once(statics.getInstance, statics, 1000);
  }
});
