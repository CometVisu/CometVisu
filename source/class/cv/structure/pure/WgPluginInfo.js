/* WgPluginInfo.js 
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


/**
 * TODO: complete docs
 *
 *
 *
 * @author Christian Mayer
 * @since 2012
 */
qx.Class.define('cv.structure.pure.WgPluginInfo', {
  extend: cv.structure.pure.AbstractWidget,
  include: cv.role.Update,

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    variable   : { check: "String", nullable: true }
  },

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    getAttributeToPropertyMappings: function () {
      return {
        'variable' : {}
      };
    },
    getDefaultClasses: function(type) {
      // additional info class
      return 'widget clearfix info '+type.toLowerCase();
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    _getInnerDomString: function () {
      return '<div class="actor"><div class="value">-</div></div>';
    },

    handleUpdate: function(value) {
      var ajaxRequest = new qx.io.request.Xhr('/wg-plugindb.pl?name=' + this.getVariable());
      ajaxRequest.set({
        accept: "application/json",
        async: false
      });
      ajaxRequest.addListenerOnce("success", function(ev) {
        var req = ev.getTarget();
        var data = req.getResponse();
        this.defaultUpdate(undefined, data[this.getVariable()], this.getValueElement());
      }, this);
    }
  },

  defer: function() {
    // register the parser
    cv.xml.Parser.addHandler("wgplugin_info", cv.structure.pure.WgPluginInfo);
  }
}); // end define