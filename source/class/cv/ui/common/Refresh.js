/* Refresh.js 
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


qx.Mixin.define("cv.ui.common.Refresh", {

  /*
   ******************************************************
   CONSTRUCTOR
   ******************************************************
   */
  construct: function () {
    if (cv.TemplateEngine.getInstance().isDomFinished()) {
      this.setupRefreshAction();
    } else {
      qx.event.message.Bus.subscribe("setup.dom.finished", function () {
        this.setupRefreshAction();
      }, this);
    }

    // Stop the while invisible
    this.addListener("changeVisible", function(ev) {
      if (this._timer) {
        if (ev.getData()) {
          this._timer.start();
        } else {
          this._timer.stop();
        }
      }
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
   MEMBERS
   ******************************************************
   */
  members: {
    _timer: null,

    setupRefreshAction: function () {
      if (this.getRefresh() && this.getRefresh() > 0) {
        if (this._setupRefreshAction) {
          // overridden by inheriting class
          this._setupRefreshAction();
        } else {
          var element = this.getDomElement();
          var target = qx.bom.Selector.query('img', element)[0] || qx.bom.Selector.query('iframe', element)[0];
          var src = qx.bom.element.Attribute.get(target, "src");
          if (src.indexOf('?') < 0) {
            src += '?';
          }
          this._timer = new qx.event.Timer(this.getRefresh());
          this._timer.addListener("interval", function () {
            this.refreshAction(target, src);
          }, this);
          this._timer.start();
        }
      }
    },

    refreshAction: function (target, src) {
      if (this._refreshAction) {
        this._refreshAction();
      } else {
        /*
         * Special treatment for (external) iframes: we need to clear it and reload
         * it in another thread as otherwise stays blank for some targets/sites and
         * src = src doesnt work anyway on external This creates though some
         * "flickering" so we avoid to use it on images, internal iframes and others
         */
        var parenthost = window.location.protocol + "//" + window.location.host;
        if (target.nodeName === "IFRAME" && src.indexOf(parenthost) !== 0) {
          qx.bom.element.Attribute.set(target, "src", "");
          qx.event.Timer.once(function () {
            qx.bom.element.Attribute.set(target, "src", src);
          }, this, 0);
        } else {
          qx.bom.element.Attribute.set(target, "src", src + '&' + new Date().getTime());
        }
      }
    }
  },

  /*
  ******************************************************
    DESTRUCTOR
  ******************************************************
  */
  destruct: function() {
    if (this._timer) {
      this._disposeObjects("_timer");
    }
  }
});