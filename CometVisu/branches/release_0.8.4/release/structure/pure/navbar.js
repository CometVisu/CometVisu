/* navbar.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

define(["_common"],function(e){var t=e.basicdesign;e.basicdesign.addCreator("navbar",{create:function(e,t,n,r){var i=$(e),s=i.children(),o=t.split("_");o.pop();var u=i.attr("position")||"left",a=i.attr("scope")||-1,f=$('<div class="navbar clearfix" id="'+o.join("_")+"_"+u+'_navbar" />');i.attr("name")&&f.append("<h2>"+i.attr("name")+"</h2>"),i.attr("flavour")&&(n=i.attr("flavour")),$(s).each(function(e){f.append(templateEngine.create_pages(s[e],t+"_"+e,n))}),f.data("scope",a),n&&f.addClass("flavour_"+n);var l=i.attr("dynamic")=="true"?!0:!1,c=i.attr("width")||300;switch(u){case"top":$("#navbarTop").append(f);break;case"left":$("#navbarLeft").append(f);var h=$("#navbarLeft").data("size")||c;l&&templateEngine.pagePartsHandler.navbarSetSize("left",h);break;case"right":$("#navbarRight").append(f);var h=$("#navbarRight").data("size")||c;l&&templateEngine.pagePartsHandler.navbarSetSize("right",h);break;case"bottom":$("#navbarBottom").append(f)}templateEngine.pagePartsHandler.navbars[u].dynamic|=l}})});