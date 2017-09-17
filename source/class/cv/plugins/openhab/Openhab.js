/* Openhab.js
 *
 * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
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
 */
qx.Class.define("cv.plugins.openhab.Openhab", {
  extend: qx.core.Object,
  type: "singleton",

  /*
 *****************************************************************************
    CONSTRUCTOR
 *****************************************************************************
 */
  construct: function () {
    this.base(arguments);

    this.__notificationRouter = cv.core.notifications.Router.getInstance();

    // listen to notifications
    var client = cv.TemplateEngine.getInstance().visu;
    var sse = client.getCurrentTransport();
    sse.subscribe("notifications", this._onNotification, this);

    cv.TemplateEngine.getInstance().executeWhenDomFinished(this._createSettings, this);
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members: {
    __notificationRouter: null,
    __settings: null,

    _createSettings: function() {
      // add element structure to notification-center
      var root = qx.dom.Element.create("section", {"id": "qxsettings", "html": "<div></div>"});
      qx.dom.Element.insertAfter(root, qx.bom.Selector.query("#notification-center section.messages")[0]);

      // add a settings button to trigger opening the settings
      var button = qx.dom.Element.create("div", {
        html: cv.util.IconTools.svgKUF("edit_settings")(null, "width: 22px; height: 22px;"),
        style: "float: left;"
      });
      qx.dom.Element.insertBegin(button, qx.bom.Selector.query("#notification-center footer")[0]);
      qx.event.Registration.addListener(button, "tap", function() {
        this.__settings.show();
      }, this);

      //add to DOM
      qx.theme.manager.Meta.getInstance().setTheme(cv.theme.Dark);
      this._inline = new qx.ui.root.Inline(qx.bom.Selector.query("#qxsettings > div")[0], true, false);
      this._inline.setLayout(new qx.ui.layout.VBox());
      this.__settings = new cv.plugins.openhab.Settings();
      this.__settings.exclude();
      this._inline.add(this.__settings, {flex: 1});
    },

    /**
     * Handles notification messages from backend
     * @param e {Event}
     * @protected
     */
    _onNotification: function(e) {
      if (!e.data) {
        this.error("invalid content received from SSE: ", e);
      }
      var json = qx.lang.Type.isObject(e.data) ? e.data : qx.lang.Json.parse(e.data);
      this.__notificationRouter.dispatchMessage(json.topic || "cv.backend", json);
    }
  },

  /*
  ******************************************************
    DESTRUCTOR
  ******************************************************
  */
  destruct: function() {
    this._disposeObjects("__settings");
    this.__notificationRouter = null;
  },

  defer: function(statics) {
    // initialize on load
    statics.getInstance();
  }
});
