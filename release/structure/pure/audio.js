/* audio.js (c) 2014 by Markus Damman 
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

define(["_common"],function(e){var t=e.basicdesign;e.basicdesign.addCreator("audio",{create:function(e,n,r,i){var s=$(e),o=t.createDefaultWidget("audio",s,n,r,i,this.update),u=templateEngine.widgetDataInsert(n,{src:s.attr("src"),id:s.attr("id"),width:s.attr("width"),height:s.attr("height"),autoplay:s.attr("autoplay"),loop:s.attr("loop"),threshold_value:s.attr("threshold_value")||1}),a="";u.width&&(a+="width:"+u.width+";"),u.height&&(a+="height:"+u.height+";"),a!=""&&(a='style="'+a+'"');var f=u.autoplay=="true"?" autoplay ":"",l=u.loop=="true"?" loop ":"",c='<div class="actor"><audio id="'+s.attr("id")+'" '+f+l+a+' controls> <source src="'+s.attr("src")+'" > </audio> </div>';return o+c+"</div>"},update:function(e,n){var r=$(this),i=r.find(".actor"),s=t.defaultUpdate(e,n,r,!0,r.parent().attr("id")),o=templateEngine.widgetDataGetByElement(r),u=templateEngine.map(o.threshold_value,o.mapping);if(s>=u){var a=document.getElementById(o.id);a.paused==1&&a.play()}}})});