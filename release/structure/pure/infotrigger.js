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

define(["_common"],function(e){var t=e.basicdesign;e.basicdesign.addCreator("infotrigger",{create:function(e,n,r,i){var s=$(e),o=function(e,t,n,r){return[!0,r=="short"?1:r=="button"?2:3]},u=t.createDefaultWidget("infotrigger",s,n,r,i,this.update,o);u.data({downvalue:s.attr("downvalue")||0,shortdownvalue:s.attr("shortdownvalue")||0,downlabel:s.attr("downlabel"),upvalue:s.attr("upvalue")||0,shortupvalue:s.attr("shortupvalue")||0,uplabel:s.attr("uplabel"),shorttime:parseFloat(s.attr("shorttime"))||-1,isAbsolute:(s.attr("change")||"relative")=="absolute",min:parseFloat(s.attr("min"))||0,max:parseFloat(s.attr("max"))||255});var a=u.data(),f=$('<div style="float:left;"/>'),l='<div class="actor switchUnpressed downlabel" ';a.align&&(l+='style="text-align: '+a.align+'" '),l+=">",l+='<div class="label">'+(a.downlabel||"-")+"</div>",l+="</div>";var c=$(l).data({value:a.downvalue,shortvalue:a.shortdownvalue});t.createDefaultButtonAction(c,c,this.downaction,this.action);var h='<div class="actor switchUnpressed uplabel" ';a.align&&(h+='style="text-align: '+a.align+'" '),h+=">",h+='<div class="label">'+(a.uplabel||"+")+"</div>",h+="</div>";var p=$(h).data({value:a.upvalue,shortvalue:a.shortupvalue});t.createDefaultButtonAction(p,p,this.downaction,this.action);var d='<div class="actor switchInvisible " ';a.align&&(d+='style="text-align: '+a.align+'" '),d+='" ><div class="value"></div></div>';var v=$(d);switch(s.attr("infoposition")){case"middle":f.append(c),f.append(v),f.append(p);break;case"right":f.append(c),f.append(p),f.append(v);break;default:f.append(v),f.append(c),f.append(p)}return u.append(f),t.defaultUpdate(undefined,undefined,u,!0),u},update:function(e,n){var r=$(this),i=t.defaultUpdate(e,n,r,!0)},downaction:function(e){$(this).parent().parent().data("downtime",(new Date).getTime())},action:function(e){var t=$(this),n=t.data(),r=t.parent().parent().data();if(r.downtime){var i=(new Date).getTime()-r.downtime<r.shorttime,s=i?n.shortvalue:n.value;r.isAbsolute&&(s=parseFloat(r.basicvalue),isNaN(s)&&(s=0),s+=parseFloat(i?n.shortvalue:n.value),s<r.min&&(s=r.min),s>r.max&&(s=r.max));var o=i?1:2;for(var u in r.address){if(!(r.address[u][1]&2))continue;r.address[u][2]&o&&templateEngine.visu.write(u.substr(1),templateEngine.transformEncode(r.address[u][0],s))}}}})});