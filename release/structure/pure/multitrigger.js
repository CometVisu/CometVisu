/* multitrigger.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

define(["_common"],function(e){var t=e.basicdesign;e.basicdesign.addCreator("multitrigger",{create:function(e,n,r,i){var s=$(e),o=s.attr("showstatus")==="true",u=t.createDefaultWidget("multitrigger",s,n,r,i,o?this.update:undefined),a=templateEngine.widgetDataInsert(n,{showstatus:o,button1label:s.attr("button1label"),button1value:s.attr("button1value"),button2label:s.attr("button2label"),button2value:s.attr("button2value"),button3label:s.attr("button3label"),button3value:s.attr("button3value"),button4label:s.attr("button4label"),button4value:s.attr("button4value")});u+='<div class="actor_container" style="float:left">';var f=0;return a.button1label&&(u+='<div class="actor switchUnpressed ',a.align&&(u+=a.align),u+='">',u+='<div class="value">'+a.button1label+"</div>",u+="</div>",1==f++%2&&(u+="<br/>")),a.button2label&&(u+='<div class="actor switchUnpressed ',a.align&&(u+=a.align),u+='">',u+='<div class="value">'+a.button2label+"</div>",u+="</div>",1==f++%2&&(u+="<br/>")),a.button3label&&(u+='<div class="actor switchUnpressed ',a.align&&(u+=a.align),u+='">',u+='<div class="value">'+a.button3label+"</div>",u+="</div>",1==f++%2&&(u+="<br/>")),a.button4label&&(u+='<div class="actor switchUnpressed ',a.align&&(u+=a.align),u+='">',u+='<div class="value">'+a.button4label+"</div>",u+="</div>",1==f++%2&&(u+="<br/>")),u+"</div></div>"},update:function(e,t){var n=$(this),r=templateEngine.widgetDataGetByElement(this),i=r.address[e][0],s=templateEngine.transformDecode(i,t);n.find(".actor").each(function(){var e=$(this),t=e.index()<3?e.index()+1:e.index(),n=s===r["button"+t+"value"];e.removeClass(n?"switchUnpressed":"switchPressed").addClass(n?"switchPressed":"switchUnpressed")})},downaction:t.defaultButtonDownAnimation,action:function(e,n,r){t.defaultButtonUpAnimation(e,n);if(r)return;var i=$(n),s=templateEngine.widgetDataGet(e),o=i.index()<3?i.index()+1:i.index(),u=s["button"+o+"value"];for(var a in s.address){if(!(s.address[a][1]&2))continue;templateEngine.visu.write(a,templateEngine.transformEncode(s.address[a][0],u))}}})});