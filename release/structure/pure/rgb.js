/* image.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

define(["_common"],function(e){var t=e.basicdesign;e.basicdesign.addCreator("rgb",{create:function(e,n,r,i){function o(e,t,n,r){return[!0,r]}var s=$(e),u=t.createDefaultWidget("rgb",s,n,r,i,this.update,o),a='<div class="actor"><div class="value"></div></div>';return u+=a+"</div>",u},update:function(e,t){var n=$(this),r=n.find(".value"),i=templateEngine.widgetDataGetByElement(this),s=templateEngine.transformDecode(i.address[e][0],t),o=r.css("background-color").replace(/[a-zA-Z()\s]/g,"").split(/,/);3!==o.length&&(o=[0,0,0]);switch(i.address[e][2]){case"r":o[0]=s;break;case"g":o[1]=s;break;case"b":o[2]=s;break;default:}var u="rgb("+o[0]+", "+o[1]+", "+o[2]+")";r.css("background-color",u)}})});