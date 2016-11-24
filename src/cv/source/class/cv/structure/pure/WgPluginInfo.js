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
 * @module structure/pure/WgPluginInfo
 * @requires structure/pure
 * @author Christian Mayer
 * @since 2012
 */
qx.Class.define('cv.structure.pure.WgPluginInfo', {
  extend: cv.structure.pure.AbstractWidget,
  include: cv.role.Update,

  has: {
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
      var that = this;
      // TODO: remove jquery
      $.getJSON('/wg-plugindb.pl?name=' + this.getVariable(), function(data) {
        that.defaultUpdate( undefined, data[that.getVariable()], that.getValueElement(), true, that.getPath());
      });
    }
  },

  defer: function() {
    // register the parser
    cv.xml.Parser.addHandler("wgplugin_info", cv.structure.pure.WgPluginInfo);
  }
}); // end define