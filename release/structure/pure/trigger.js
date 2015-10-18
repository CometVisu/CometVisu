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

define(["_common"],function(e){var t=e.basicdesign;e.basicdesign.addCreator("trigger",{create:function(e,n,r,i){var s=$(e),o=function(e,t,n,r){return[!0,r=="short"?1:r=="button"?2:3]},u=t.createDefaultWidget("trigger",s,n,r,i,null,o),a=templateEngine.widgetDataInsert(n,{sendValue:s.attr("value")||0,shorttime:parseFloat(s.attr("shorttime"))||-1,shortValue:s.attr("shortvalue")||0}),f='<div class="actor switchUnpressed"><div class="value"></div></div>';return templateEngine.postDOMSetupFns.push(function(){t.defaultUpdate(undefined,a.sendValue,$("#"+n),!0,n)}),u+f+"</div>"},downaction:t.defaultButtonDownAnimationInheritAction,action:function(e,n,r){t.defaultButtonUpAnimationInheritAction(e,n);if(r)return;var i=templateEngine.widgetDataGet(e),s=Date.now()-templateEngine.handleMouseEvent.downtime<i.shorttime,o=s?1:2;for(var u in i.address){if(!(i.address[u][1]&2))continue;i.address[u][2]&o&&templateEngine.visu.write(u,templateEngine.transformEncode(i.address[u][0],s?i.shortValue:i.sendValue))}}})});