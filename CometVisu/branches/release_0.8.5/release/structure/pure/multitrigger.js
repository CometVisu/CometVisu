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

define(["_common"],function(e){var t=e.basicdesign;e.basicdesign.addCreator("multitrigger",{create:function(e,n,r,i){var s=$(e),o=s.attr("showstatus")==="true",u=t.createDefaultWidget("multitrigger",s,n,r,i,o?this.update:undefined);u.data({showstatus:o,button1label:s.attr("button1label"),button1value:s.attr("button1value"),button2label:s.attr("button2label"),button2value:s.attr("button2value"),button3label:s.attr("button3label"),button3value:s.attr("button3value"),button4label:s.attr("button4label"),button4value:s.attr("button4value")});var a=u.data(),f=$('<div class="actor_container" style="float:left"/>'),l=0;if(a.button1label){var c='<div class="actor switchUnpressed ';a.align&&(c+=a.align),c+='">',c+='<div class="value">'+a.button1label+"</div>",c+="</div>";var h=$(c).data({value:a.button1value}).bind("click",this.action);f.append(h),1==l++%2&&f.append($("<br/>"))}if(a.button2label){var c='<div class="actor switchUnpressed ';a.align&&(c+=a.align),c+='">',c+='<div class="value">'+a.button2label+"</div>",c+="</div>";var h=$(c).data({value:a.button2value}).bind("click",this.action);f.append(h),1==l++%2&&f.append($("<br/>"))}if(a.button3label){var c='<div class="actor switchUnpressed ';a.align&&(c+=a.align),c+='">',c+='<div class="value">'+a.button3label+"</div>",c+="</div>";var h=$(c).data({value:a.button3value}).bind("click",this.action);f.append(h),1==l++%2&&f.append($("<br/>"))}if(a.button4label){var c='<div class="actor switchUnpressed ';a.align&&(c+=a.align),c+='">',c+='<div class="value">'+a.button4label+"</div>",c+="</div>";var h=$(c).data({value:a.button4value}).bind("click",this.action);f.append(h),1==l++%2&&f.append($("<br/>"))}return u.append(f)},update:function(e,t){var n=$(this),r=n.data(),i=r.address[e.type][0],s=templateEngine.transformDecode(i,t);n.find(".actor").each(function(){var e=$(this),t=s===e.data("value");e.removeClass(t?"switchUnpressed":"switchPressed").addClass(t?"switchPressed":"switchUnpressed")})},action:function(){var e=$(this),t=e.parent().parent().data(),n=e.data("value");for(var r in t.address){if(!(t.address[r][1]&2))continue;templateEngine.visu.write(r.substr(1),templateEngine.transformEncode(t.address[r][0],n))}}})});