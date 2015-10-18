/* infotrigger.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

define(["_common"],function(e){var t=e.basicdesign;e.basicdesign.addCreator("infotrigger",{create:function(e,n,r,i){var s=$(e),o=function(e,t,n,r){return[!0,r=="short"?1:r=="button"?2:3]},u=t.createDefaultWidget("infotrigger",s,n,r,i,this.update,o),a=templateEngine.widgetDataInsert(n,{downvalue:s.attr("downvalue")||0,shortdownvalue:s.attr("shortdownvalue")||0,downlabel:s.attr("downlabel"),upvalue:s.attr("upvalue")||0,shortupvalue:s.attr("shortupvalue")||0,uplabel:s.attr("uplabel"),shorttime:parseFloat(s.attr("shorttime"))||-1,isAbsolute:(s.attr("change")||"relative")=="absolute",min:parseFloat(s.attr("min"))||0,max:parseFloat(s.attr("max"))||255});u+='<div style="float:left;">';var f='<div class="actor switchUnpressed downlabel" ';a.align&&(f+='style="text-align: '+a.align+'" '),f+=">",f+='<div class="label">'+(a.downlabel||"-")+"</div>",f+="</div>";var l='<div class="actor switchUnpressed uplabel" ';a.align&&(l+='style="text-align: '+a.align+'" '),l+=">",l+='<div class="label">'+(a.uplabel||"+")+"</div>",l+="</div>";var c='<div class="actor switchInvisible " ';a.align&&(c+='style="text-align: '+a.align+'" '),c+='" ><div class="value">-</div></div>';switch(s.attr("infoposition")){case"middle":u+=f,u+=c,u+=l;break;case"right":u+=f,u+=l,u+=c;break;default:u+=c,u+=f,u+=l}return u+"</div></div>"},update:function(e,n){var r=$(this),i=t.defaultUpdate(e,n,r,!0,r.parent().attr("id"))},downaction:t.defaultButtonDownAnimation,action:function(e,n,r){t.defaultButtonUpAnimation(e,n);if(r)return;var i=n.classList.contains("downlabel"),s=templateEngine.widgetDataGet(e),o=s[i?"downvalue":"upvalue"],u=s[i?"shortdownvalue":"shortupvalue"],a=Date.now()-templateEngine.handleMouseEvent.downtime<s.shorttime,f=a?u:o,l=a?1:2;s.isAbsolute&&(f=parseFloat(s.basicvalue),isNaN(f)&&(f=0),f+=parseFloat(a?u:o),f<s.min&&(f=s.min),f>s.max&&(f=s.max));for(var c in s.address){if(!(s.address[c][1]&2))continue;s.address[c][2]&l&&templateEngine.visu.write(c,templateEngine.transformEncode(s.address[c][0],f))}}})});