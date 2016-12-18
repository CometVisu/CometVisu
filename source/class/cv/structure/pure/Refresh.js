/* Refresh.js 
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
 * @module structure/pure/Refresh
 * @requires structure/pure
 * @author Christian Mayer
 * @since 2014
 */
qx.Class.define('cv.structure.pure.Refresh', {
  extend: cv.structure.pure.AbstractWidget,
  include: [cv.role.Operate, cv.role.HasAnimatedButton, cv.role.BasicUpdate],

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    sendValue: { check: "String", nullable: true }
  },

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    getAttributeToPropertyMappings: function () {
      return {
        'value': {target: 'sendValue'}
      };
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    _onDomReady: function() {
      this.base(arguments);
      this.defaultUpdate(undefined, this.getSendValue());
    },

    _getInnerDomString: function () {
      return '<div class="actor switchUnpressed"><div class="value">-</div></div>';
    },

    _action: function() {
      cv.TemplateEngine.getInstance().visu.restart();
    }
  },

  defer: function() {
    // register the parser
    cv.xml.Parser.addHandler("refresh", cv.structure.pure.Refresh);
  }
});