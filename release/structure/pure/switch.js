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

define(["_common"],function(e){var t=e.basicdesign;e.basicdesign.addCreator("switch",{create:function(e,n,r,i){var s=$(e),o=t.createDefaultWidget("switch",s,n,r,i,this.update);o.data({on_value:s.attr("on_value")||1,off_value:s.attr("off_value")||0});var u=$('<div class="actor switchUnpressed"><div class="value"></div></div>');o.append(u);var a=templateEngine.bindClickToWidget;o.data("bind_click_to_widget")&&(a=o.data("bind_click_to_widget")==="true");var f=a?o:u;return f.bind("click",this.action),t.defaultUpdate(undefined,undefined,o,!0),o},update:function(e,n){var r=$(this),i=r.find(".actor"),s=t.defaultUpdate(e,n,r,!0),o=templateEngine.map(r.data("off_value"),r.data("mapping"));i.removeClass(s==o?"switchPressed":"switchUnpressed"),i.addClass(s==o?"switchUnpressed":"switchPressed")},action:function(){var e=$(this),t=e.data();undefined===t.address&&(t=e.parent().data());for(var n in t.address){if(!(t.address[n][1]&2))continue;templateEngine.visu.write(n.substr(1),templateEngine.transformEncode(t.address[n][0],t.basicvalue==t.off_value?t.on_value:t.off_value))}}})});