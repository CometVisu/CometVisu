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

define(["_common"],function(e){var t=e.basicdesign;e.basicdesign.addCreator("wgplugin_info",{create:function(e,n,r,i){var s=$(e),o=t.createDefaultWidget("info",s,n,r,i,this.update);templateEngine.widgetDataInsert(n,{variable:s.attr("variable")});var u='<div class="actor"><div class="value">-</div></div>';return o+=u,o+"</div>"},update:function(e,n,r){var i=r||$(this),s=templateEngine.widgetDataGetByElement(i),o=s.variable,u=i.find(".value");$.getJSON("/wg-plugindb.pl?name="+o,function(e){t.defaultUpdate(undefined,e[o],i,!0,i.parent().attr("id"))})},update3d:e.basicdesign.defaultUpdate3d})});