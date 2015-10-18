/* switch.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

define(["_common"],function(e){var t=e.basicdesign;e.basicdesign.addCreator("switch",{create:function(e,n,r,i){var s=$(e),o=t.createDefaultWidget("switch",s,n,r,i,this.update),u=templateEngine.widgetDataInsert(n,{on_value:s.attr("on_value")||1,off_value:s.attr("off_value")||0});return o+='<div class="actor switchUnpressed"><div class="value">-</div></div>',o+"</div>"},update:function(e,n){var r=$(this),i=templateEngine.widgetDataGetByElement(r),s=r.find(".actor"),o=t.defaultUpdate(e,n,r,!0,r.parent().attr("id")),u=templateEngine.map(i.off_value,i.mapping);s.removeClass(o==u?"switchPressed":"switchUnpressed"),s.addClass(o==u?"switchUnpressed":"switchPressed")},action:function(e,t,n){if(n)return;var r=templateEngine.widgetDataGet(e);for(var i in r.address){if(!(r.address[i][1]&2))continue;templateEngine.visu.write(i,templateEngine.transformEncode(r.address[i][0],r.basicvalue==r.off_value?r.on_value:r.off_value))}}})});