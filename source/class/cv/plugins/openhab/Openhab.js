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
  },

  /*
 *****************************************************************************
    PROPERTIES
 *****************************************************************************
 */
  properties: {},

  /*
*****************************************************************************
   MEMBERS
*****************************************************************************
*/
  members: {
    __notificationRouter: null,

    /**
     * Handles notification messages from backend
     * @param e {Event}
     * @protected
     */
    _onNotification: function(e) {
      if (!e.data) {
        this.error("invalid content received from SSE: %o", e);
      }
      var json = qx.lang.Type.isObject(e.data) ? e.data : qx.lang.Json.parse(e.data);
      this.__notificationRouter.dispatchMessage(json.topic || "cv.backend", json);
    }
  },

  /*
 *****************************************************************************
    DESTRUCTOR
 *****************************************************************************
 */
  destruct: function (statics) {
    // initialize on load
    statics.getInstance();
  }
});
