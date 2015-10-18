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

define(["_common"],function(e){var t=e.basicdesign,n=!0,r="",i="",s="",o="",u=$("#navbarLeft").data("size"),a=$("#navbarRight").data("size");e.basicdesign.addCreator("navbar",{create:function(e,t,f,l){var c=$(e),h=c.children(),p=t.split("_");p.pop();var d=c.attr("position")||"left",v=c.attr("scope")||-1;c.attr("flavour")&&(f=c.attr("flavour"));var m=f?" flavour_"+f:"",g='<div class="navbar clearfix'+m+'" id="'+p.join("_")+"_"+d+'_navbar">';c.attr("name")&&(g+="<h2>"+c.attr("name")+"</h2>"),$(h).each(function(e){g+=templateEngine.create_pages(h[e],t+"_"+e,f)}),g+="</div>";var y=templateEngine.widgetDataInsert(p.join("_")+"_"+d+"_navbar",{scope:v}),b=c.attr("dynamic")=="true"?!0:!1,w=c.attr("width")||300;switch(d){case"top":r+=g;break;case"left":i+=g;var E=u||w;b&&templateEngine.pagePartsHandler.navbarSetSize("left",E);break;case"right":s+=g;var E=a||w;b&&templateEngine.pagePartsHandler.navbarSetSize("right",E);break;case"bottom":o+=g}return templateEngine.pagePartsHandler.navbars[d].dynamic|=b,n&&(n=!1,templateEngine.postDOMSetupFns.unshift(function(){r&&$("#navbarTop").append(r),i&&$("#navbarLeft").append(i),s&&$("#navbarRight").append(s),o&&$("#navbarBottom").append(o)})),""}})});