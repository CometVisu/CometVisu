/* refresh.js (c) 2014 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

define(["_common"],function(e){var t=e.basicdesign;e.basicdesign.addCreator("refresh",{create:function(e,n,r,i){var s=$(e),o=t.createDefaultWidget("refresh",s,n,r,i,null),u=$('<div class="actor switchUnpressed"><div class="value"></div></div>');o.append(u);var a=templateEngine.bindClickToWidget;o.data("bind_click_to_widget")&&(a=o.data("bind_click_to_widget")==="true");var f=a?o:u;return t.createDefaultButtonAction(f,u,undefined,this.action),t.defaultUpdate(undefined,s.attr("value"),o,!0),o},action:function(e){templateEngine.visu.restart()}})});