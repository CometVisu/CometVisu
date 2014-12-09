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

define(["_common"],function(e){var t=e.basicdesign;e.basicdesign.addCreator("image",{create:function(e,n,r,i){var s=$(e),o=t.createDefaultWidget("image",s,n,r,i);o.data({width:s.attr("width"),height:s.attr("height"),src:s.attr("src"),refresh:s.attr("refresh")});var u=o.data(),a="";u.width?a+="width:"+u.width+";":a+="width: 100%;",u.height&&(a+="height:"+u.height+";");var f=$('<div class="actor"><img src="'+u.src+'" style="'+a+'" /></div>');return o.append(f),u.refresh&&(f.data("refresh",u.refresh*1e3),f.each(templateEngine.setupRefreshAction)),o}})});