/* UrlTrigger.js 
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
 * The UrlTrigger widget adds a button to the visualization that queries data from a URL in the background.
 *
 * @author Christian Mayer
 * @since 2012
 */
qx.Class.define('cv.ui.structure.pure.UrlTrigger', {
  extend: cv.ui.structure.AbstractWidget,
  include: [
    cv.ui.common.Operate,
    cv.ui.common.HasAnimatedButton,
    cv.ui.common.BasicUpdate
  ],

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    sendValue: { check: "String", init: "0" },
    params: { check: "String", init: '' },
    url: { check: "String", nullable: true, apply: "_applyUrl" }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __xhr: null,

    // property apply
    _applyUrl: function(value) {
      if (value) {
        if (!this.__xhr) {
          var xhr = new qx.io.request.Xhr(qx.util.ResourceManager.getInstance().toUri(value));
          xhr.set({
            method: "GET",
            accept: "application/html",
            requestData: this.getParams()
          });
          this.__xhr = xhr;
        } else {
          this.__xhr.setUrl(qx.util.ResourceManager.getInstance().toUri(value));
        }
      }
    },

    // overridden
    _onDomReady: function() {
      this.base(arguments);
      this.defaultUpdate(undefined, this.getSendValue(), this.getDomElement());
    },

    // overridden
    _getInnerDomString: function () {
      var actor = '<div class="actor switchUnpressed ';
      if ( this.getAlign() ) {
        actor += this.getAlign();
      }
      actor += '"><div class="value"></div></div>';
      return actor;
    },

    // overridden
    _action: function() {
      if (this.__xhr) {
        this.__xhr.send();
      }
    }
  },

  /*
  ******************************************************
    DESTRUCTOR
  ******************************************************
  */
  destruct: function() {
    this._disposeObjects("__xhr");
  },

  defer: function(statics) {
    cv.ui.structure.WidgetFactory.registerClass("urltrigger", statics);
  }
});
