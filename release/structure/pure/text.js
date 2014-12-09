/* text.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

define(["_common"],function(e){var t=e.basicdesign;e.basicdesign.addCreator("text",{create:function(e,n,r,i){var s=$(e),o=s.children("layout")[0],u=o?'style="'+t.extractLayout(o,i)+'"':"",a=$('<div class="widget clearfix text" '+u+"/>").data({path:n,type:"text"});t.setWidgetLayout(a,s),s.attr("flavour")&&(r=s.attr("flavour")),r&&a.addClass("flavour_"+r);var f=t.extractLabel(s.find("label")[0],r);return f||(f=$("<div/>"),s.contents().each(function(){var e=$(this);if(e.is("icon")){var t=icons.getIcon(e.attr("name"),e.attr("type"),e.attr("flavour")||r,e.attr("color"),e.attr("styling"));"function"==typeof t?t($div):t&&f.append(t.clone())}else f.append(this.textContent)})),f.removeAttr("class"),s.attr("align")&&f.attr("style","text-align:"+s.attr("align")+";"),a.append(f),a}})});