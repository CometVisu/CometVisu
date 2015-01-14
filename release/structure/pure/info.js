/* info.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */

define(["_common"],function(e){var t=e.basicdesign;e.basicdesign.addCreator("info",{create:function(e,n,r,i){var s=$(e),o=t.createDefaultWidget("info",s,n,r,i,this.update),u=$('<div class="actor"><div class="value"></div></div>');return o.append(u),t.defaultUpdate(undefined,undefined,o,!0),o},update:function(e,n){var r=$(this);t.defaultUpdate(e,n,r,!0)},update3d:e.basicdesign.defaultUpdate3d})});