/* _common.js
 *
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
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

qx.Mixin.define("cv.role.Refresh", {

  /*
   ******************************************************
   CONSTRUCTOR
   ******************************************************
   */
  construct: function () {
    cv.MessageBroker.getInstance().subscribe("setup.dom.finished", function () {
      this.setupRefreshAction();
    }, this);
  },

  /*
   ******************************************************
   PROPERTIES
   ******************************************************
   */
  properties: {
    refresh: {
      check: 'Number',
      init: 0
    }
  },

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    parse: function (xml, path) {
      var data = cv.data.Model.getInstance().getWidgetData(path);
      data.refresh = xml.getAttribute('refresh') ? parseInt(xml.getAttribute('refresh')) * 1000 : 0;
    }
  },

  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {

    setupRefreshAction: function () {
      if (this.getRefresh() && this.getRefresh() > 0) {
        var element = this.getDomElement();
        var target = $('img', element)[0] || $('iframe', element)[0];
        var src = target.src;
        if (src.indexOf('?') < 0)
          src += '?';

        this._timer = new qx.event.Timer(this.getRefresh());
        this._timer.addListener("interval", function () {
          this.refreshAction(target, src);
        }, this);
      }
    },

    refreshAction: function (target, src) {
      /*
       * Special treatment for (external) iframes: we need to clear it and reload
       * it in another thread as otherwise stays blank for some targets/sites and
       * src = src doesnt work anyway on external This creates though some
       * "flickering" so we avoid to use it on images, internal iframes and others
       */
      var parenthost = window.location.protocol + "//" + window.location.host;
      if (target.nodeName == "IFRAME" && src.indexOf(parenthost) != 0) {
        target.src = '';
        qx.event.Timer.once(function () {
          target.src = src;
        }, this, 0);
      } else {
        target.src = src + '&' + new Date().getTime();
      }
    }
  }
});