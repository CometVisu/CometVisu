/* structure_plugin.js (c) 2010 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

define("plugins/svg/structure_plugin",["structure_custom"],function(e){e.prototype.addCreator("svg",{create:function(e,t,n,r){var i=$(e),s=$(this),o=templateEngine.design.setWidgetLayout(i,t),u='<div class="widget clearfix image '+(o?o:"")+'">';templateEngine.design.setWidgetLayout(i,i,t),u+=templateEngine.design.extractLabel(i.find("label")[0],n);var a=templateEngine.design.makeAddressList(i,!1,t);u+='<div class="actor"></div>';var f=i.attr("refresh")?i.attr("refresh")*1e3:0,l=templateEngine.widgetDataInsert(t,{address:a,refresh:f});return templateEngine.postDOMSetupFns.push(function(){var e=$("#"+t+" .actor");e.svg({loadURL:"plugins/svg/rollo.svg"})}),l.refresh&&templateEngine.setupRefreshAction(t,l.refresh),u+="</div>",u},update:function(e,t){var n=$(this),r=templateEngine.design.defaultUpdate(e,t,n,undefined,n.parent().attr("id")),i=3,s=1,o=i+s,u=48/o;for(var a=0;a<=Math.floor(r/u);a++)n.find("#line"+(a+1)).attr("y1",9+o*a+r%u/u*o),n.find("#line"+(a+1)).attr("y2",9+o*a+r%u/u*o);for(var a=Math.floor(r/u)+1;a<=u;a++)n.find("#line"+(a+1)).attr("y1",9),n.find("#line"+(a+1)).attr("y2",9)}})});