/* Rgb.js 
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
 * With the RGB widget you can display a colour in the visu.
 *
 * @author Christian Mayer
 * @since 2012
 */
qx.Class.define('cv.ui.structure.pure.Rgb', {
  extend: cv.ui.structure.AbstractWidget,
  include: [cv.ui.common.Update],


  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {
    // overridden
    _getInnerDomString: function () {
      return '<div class="actor"><div class="value"></div></div>';
    },

    /**
     * Updates the RGB widget by setting the background color
     *
     * @param address {String} KNX-GA or openHAB item name
     * @param data {var} incoming data
     */
    _update: function(address, data) {
      if (data === undefined || address === undefined) {
        return;
      }
      const valElem = this.getValueElement();

      const value = cv.Transform.decode(this.getAddress()[address].transform, data);

      let bg = window.getComputedStyle(valElem)['background-color'].replace(/[a-zA-Z()\s]/g, '').split(/,/);
      if (bg.length !== 3) {
        bg = [0, 0, 0];
      }
      switch (this.getAddress()[address].variantInfo) {
        case 'r':
          bg[0] = value;
          break;
        case 'g':
          bg[1] = value;
          break;
        case 'b':
          bg[2] = value;
          break;
      }
      valElem.style['background-color'] = 'rgb(' + bg[0] + ', ' + bg[1] + ', ' + bg[2] + ')';
    }
  },

  defer: function(statics) {
    cv.ui.structure.WidgetFactory.registerClass('rgb', statics);
  }
});
