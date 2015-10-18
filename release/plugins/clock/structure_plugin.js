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

define("plugins/clock/structure_plugin",["structure_custom"],function(e){e.prototype.addCreator("clock",{that:this,create:function(e,t,n,r){var i=this,s=$(e),o=templateEngine.design.setWidgetLayout(s,t),u='<div class="widget clearfix clock '+(o?o:"")+'">';u+=templateEngine.design.extractLabel(s.find("label")[0],n);var a=templateEngine.design.makeAddressList(s,!1,t);u+='<div class="actor" style="width:200px;"></div>';var f=templateEngine.widgetDataInsert(t,{value:new Date,address:a,type:"clock"});return templateEngine.postDOMSetupFns.push(function(){var e=$("#"+t+" .actor");e.svg({loadURL:"plugins/clock/clock_pure.svg",onLoad:function(t){$(t.getElementById("HotSpotHour")).draggable().bind("drag",{type:"hour",actor:e},i.dragHelper).bind("dragstop",{actor:e},i.dragAction),$(t.getElementById("HotSpotMinute")).draggable().bind("drag",{type:"minute",actor:e},i.dragHelper).bind("dragstop",{actor:e},i.dragAction)}})}),u+="</div>",u},update:function(e,t){var n=$(this),r=templateEngine.design.defaultUpdate(e,t,n,undefined,n.parent().attr("id")),i=n.find("svg"),s=r.split(":");i.children().find("#Hour").attr("transform","rotate("+(s[0]%12*360/12+s[1]*30/60)+",50,50)"),i.children().find("#Minute").attr("transform","rotate("+s[1]*6+",50,50)")},dragHelper:function(e,t){var n=e.data.actor,r=n.find("svg"),i=n.parents(".widget_container")[0],s=i.id,o=templateEngine.widgetDataGet(s),u=e.originalEvent.pageX-r.offset().left-50,a=50-(e.originalEvent.pageY-r.offset().top),f=(Math.atan2(u,a)*180/Math.PI+360)%360,l=o.value;if(e.data.type=="hour"){var c=l.getHours(),h=c>=12,p=Math.floor(f/30),d=f%30*2;c%12>9&&p<3?h?(h=!1,l.setDate(l.getDate()+1)):h=!0:p>9&&c%12<3&&(h?h=!1:(h=!0,l.setDate(l.getDate()-1))),l.setHours(p+h*12),l.setMinutes(d)}else{var d=Math.round(f/6),v=l.getMinutes();v>45&&d<15?l.setHours(l.getHours()+1):d>45&&v<15&&l.setHours(l.getHours()-1),l.setMinutes(d)}n.find("#Hour").attr("transform","rotate("+(l.getHours()%12*360/12+l.getMinutes()*30/60)+",50,50)"),n.find("#Minute").attr("transform","rotate("+l.getMinutes()*6+",50,50)")},dragAction:function(e,t){var n=e.data.actor.parents(".widget_container")[0],r=templateEngine.widgetDataGet(n.id);for(var i in r.address){if(r.address[i][1]==1)continue;templateEngine.visu.write(i,templateEngine.transformEncode(r.address[i][0],r.value))}},action:function(e,t,n){}})});