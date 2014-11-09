/* designtoggle.js (c) 2010 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

define(["_common"],function(e){var t=e.basicdesign;e.basicdesign.addCreator("designtoggle",{create:function(e,n,r,i){var s=$(e),o=t.createDefaultWidget("toggle",s,n,r,i),u=$('link[href*="basic.css"]').attr("href").split("/")[2],a=$('<div class="actor switchUnpressed"><div class="value">'+u+"</div></div>");o.append(a);var f=templateEngine.bindClickToWidget;o.data("bind_click_to_widget")&&(f=o.data("bind_click_to_widget")==="true");var l=f?o:a;return t.createDefaultButtonAction(l,a,!1,this.action),$.getJSON("./designs/get_designs.php",function(e){o.data("availableDesigns",e)}),o},action:function(){var e=$(this),t=e.parent().data("availableDesigns"),n=$(".value",e).text(),r=t[(t.indexOf(n)+1)%t.length],i=window.location.href,s=new RegExp("design="+n);i.search(s)!=-1?window.location.href=i.replace(s,"design="+r):i.indexOf("?")!=-1?window.location.href=i+"&design="+r:window.location.href=i+"?design="+r}})});