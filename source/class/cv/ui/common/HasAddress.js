/* HasAddress.js 
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
 * Add the address property to widgets
 */
qx.Mixin.define('cv.ui.common.HasAddress', {
  /*
   ******************************************************
   PROPERTIES
   ******************************************************
   */
  properties: {
    /**
     * Map of addresses (KNX-GA's or openHAB item names) this widget communicates with
     */
    address: {
      check: 'Object',
      init: {}
    }
  }
});
