/* toggle.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

define(["_common"],function(e){var t=e.basicdesign;e.basicdesign.addCreator("toggle",{create:function(e,n,r,i){var s=$(e),o=t.createDefaultWidget("toggle",s,n,r,i,this.update);o+='<div class="actor switchUnpressed"><div class="value">-</div></div>';var u=templateEngine.widgetDataGet(n);return o+"</div>"},update:function(e,n){var r=$(this);t.defaultUpdate(e,n,r,!0,r.parent().attr("id"))},downaction:t.defaultButtonDownAnimationInheritAction,action:function(e,n,r){t.defaultButtonUpAnimationInheritAction(e,n);if(r)return;var i=templateEngine.widgetDataGet(e),s=templateEngine.getNextMappedValue(i.basicvalue,i.mapping);for(var o in i.address){if(!(i.address[o][1]&2))continue;templateEngine.visu.write(o,templateEngine.transformEncode(i.address[o][0],s))}}})});