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

define(["_common"],function(e){var t=e.basicdesign;e.basicdesign.addCreator("wgplugin_info",{create:function(e,n,r,i){var s=$(e),o=s.children("layout")[0],u=o?'style="'+t.extractLayout(o,i)+'"':"",a=$('<div class="widget clearfix info" '+u+" />");i=="3d"&&$(document).bind("update3d",{element:a,layout:t.extractLayout3d(o)},this.update3d),t.setWidgetLayout(a,s),t.makeWidgetLabel(a,s,r),s.attr("flavour")&&(r=s.attr("flavour")),r&&a.addClass("flavour_"+r);var f=t.makeAddressList(s),l='<div class="actor"><div class="value">-</div></div>',c=$(l).data({variable:s.attr("variable"),address:f});for(var h in f)c.bind(h,this.update);return a.append(c),a},update:function(e,t,n){var r=n||$(this),i=r.data("variable"),s=r.find(".value");$.getJSON("/wg-plugindb.pl?name="+i,function(e){templateEngine.setWidgetStyling(r,r.data("basicvalue")),r.data("align")&&r.addClass(r.data("align")),s.empty(),s.append(e[i])})},update3d:e.basicdesign.defaultUpdate3d})});