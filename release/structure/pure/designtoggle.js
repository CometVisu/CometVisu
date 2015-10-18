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

define(["_common"],function(e){var t=e.basicdesign;e.basicdesign.addCreator("designtoggle",{create:function(e,n,r,i){var s=$(e),o=t.createDefaultWidget("toggle",s,n,r,i),u=$('link[href*="basic.css"]').attr("href").split("/")[2],a='<div class="actor switchUnpressed"><div class="value">'+u+"</div></div>",f=templateEngine.widgetDataGet(n);return $.getJSON("./designs/get_designs.php",function(e){f.availableDesigns=e}),o+a+"</div>"},downaction:t.defaultButtonDownAnimationInheritAction,action:function(e,n,r){t.defaultButtonUpAnimationInheritAction(e,n);if(r)return;var i=templateEngine.widgetDataGet(e),s=$(this),o=i.availableDesigns,u=$(".value",s).text(),a=o[(o.indexOf(u)+1)%o.length],f=window.location.href,l=new RegExp("design="+u);f.search(l)!=-1?window.location.href=f.replace(l,"design="+a):f.indexOf("?")!=-1?window.location.href=f+"&design="+a:window.location.href=f+"?design="+a}})});