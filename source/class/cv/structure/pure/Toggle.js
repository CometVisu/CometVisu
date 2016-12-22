/* Toggle.js 
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
qx.Class.define('cv.structure.pure.Toggle', {
  extend: cv.structure.AbstractWidget,
  include: [cv.role.Operate, cv.role.Update, cv.role.HasAnimatedButton],

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    _getInnerDomString: function () {
      return '<div class="actor switchUnpressed"><div class="value">-</div></div>';
    },

    /**
     * Get the value that should be send to backend after the action has been triggered
     *
     *
     */
    getActionValue: function () {
      return this.getNextMappedValue(this.getBasicValue(), this.getMapping());
    }
  },

  defer: function() {
    // register the parser
    cv.xml.Parser.addHandler("toggle", cv.structure.pure.Toggle);
  }
});