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

define("plugins/clock/structure_plugin",["structure_custom"],function(e){e.prototype.addCreator("clock",{that:this,create:function(e,t){var n=this,r=$(e),i=$('<div class="widget clearfix clock" />');templateEngine.design.setWidgetLayout(i,r);var s=r.find("label")[0],o=s?'<div class="label">'+s.textContent+"</div>":"",u={};r.find("address").each(function(){var e=this.textContent,t=this.getAttribute("transform"),n=this.getAttribute("variant"),r=this.getAttribute("readonly");templateEngine.addAddress(e),u["_"+e]=[t,n,r=="true"]});var a='<div class="actor" style="width:200px;">';a+="</div>";var f=$(e).attr("datatype"),l=$(a).data({value:new Date,address:u,type:"clock"});l.svg({loadURL:"plugins/clock/clock_pure.svg",onLoad:function(e){$(e.getElementById("HotSpotHour")).draggable().bind("drag",{type:"hour",actor:l},n.dragHelper).bind("dragstop",{actor:l},n.action),$(e.getElementById("HotSpotMinute")).draggable().bind("drag",{type:"minute",actor:l},n.dragHelper).bind("dragstop",{actor:l},n.action)}});for(var c in u)u[c][2]||l.bind(c,this.update),l.bind(c,this.update);return i.append(o).append(l),i},update:function(e,t){var n=$(this),r=templateEngine.design.defaultUpdate(e,t,n),i=n.find("svg"),s=r.split(":");i.children().find("#Hour").attr("transform","rotate("+(s[0]%12*360/12+s[1]*30/60)+",50,50)"),i.children().find("#Minute").attr("transform","rotate("+s[1]*6+",50,50)")},dragHelper:function(e,t){var n=e.data.actor,r=n.find("svg"),i=e.originalEvent.pageX-r.offset().left-50,s=50-(e.originalEvent.pageY-r.offset().top),o=(Math.atan2(i,s)*180/Math.PI+360)%360,u=n.data("value");if(e.data.type=="hour"){var a=u.getHours(),f=a>=12,l=Math.floor(o/30),c=o%30*2;a%12>9&&l<3?f?(f=!1,u.setDate(u.getDate()+1)):f=!0:l>9&&a%12<3&&(f?f=!1:(f=!0,u.setDate(u.getDate()-1))),u.setHours(l+f*12),u.setMinutes(c)}else{var c=Math.round(o/6),h=u.getMinutes();h>45&&c<15?u.setHours(u.getHours()+1):c>45&&h<15&&u.setHours(u.getHours()-1),u.setMinutes(c)}n.find("#Hour").attr("transform","rotate("+(u.getHours()%12*360/12+u.getMinutes()*30/60)+",50,50)"),n.find("#Minute").attr("transform","rotate("+u.getMinutes()*6+",50,50)")},action:function(e,t){var n=e.data.actor.data();for(var r in n.address){if(n.address[r][1]==1)continue;templateEngine.visu.write(r.substr(1),templateEngine.transformEncode(n.address[r][0],n.value))}}})});