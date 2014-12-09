/* trigger.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

define(["_common"],function(e){var t=e.basicdesign;e.basicdesign.addCreator("trigger",{create:function(e,n,r,i){var s=$(e),o=function(e,t,n,r){return[!0,r=="short"?1:r=="button"?2:3]},u=t.createDefaultWidget("trigger",s,n,r,i,null,o);u.data({sendValue:s.attr("value")||0,shorttime:parseFloat(s.attr("shorttime"))||-1,shortValue:s.attr("shortvalue")||0});var a=$('<div class="actor switchUnpressed"><div class="value"></div></div>');u.append(a);var f=templateEngine.bindClickToWidget;u.data("bind_click_to_widget")&&(f=u.data("bind_click_to_widget")==="true");var l=f?u:a;return t.createDefaultButtonAction(l,a,this.downaction,this.action),t.defaultUpdate(undefined,u.data("sendValue"),u,!0),u},downaction:function(e){$(this).parent().data("downtime",(new Date).getTime())},action:function(e){var t=$(this);undefined===t.data().address&&(t=t.parent());var n=t.data();if(n.downtime){var r=(new Date).getTime()-n.downtime<n.shorttime,i=r?1:2;for(var s in n.address){if(!(n.address[s][1]&2))continue;n.address[s][2]&i&&templateEngine.visu.write(s.substr(1),templateEngine.transformEncode(n.address[s][0],r?n.shortValue:n.sendValue))}}}})});