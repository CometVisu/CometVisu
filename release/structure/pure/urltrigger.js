/* trigger.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
 * modified urltrigger.js (c) 2012 by mm@elabnet.de
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

define(["_common"],function(e){var t=e.basicdesign;e.basicdesign.addCreator("urltrigger",{create:function(e,n,r,i){var s=$(e),o=s.children("layout")[0],u=o?'style="'+t.extractLayout(o,i)+'"':"",a=s.attr("value")?s.attr("value"):0,f="widget clearfix trigger";s.attr("align")&&(f+=" "+s.attr("align"));var l=$('<div class="'+f+'" '+u+"/>");t.setWidgetLayout(l,s),s.attr("flavour")&&(r=s.attr("flavour")),r&&l.addClass("flavour_"+r);var c=t.extractLabel(s.find("label")[0],r),h='<div class="actor switchUnpressed ';s.attr("align")&&(h+=s.attr("align")),h+='"><div class="value"></div></div>';var p=$(h),d=p.find(".value"),v=templateEngine.map(a,s.attr("mapping")),m=templateEngine.bindClickToWidget;s.attr("bind_click_to_widget")&&(m=s.attr("bind_click_to_widget")=="true");if("string"==typeof v||"number"==typeof v)d.append(v);else for(var g=0;g<v.length;g++)d.append($(v[g]).clone());p.data({url:$(e).attr("url"),mapping:$(e).attr("mapping"),styling:$(e).attr("styling"),type:"urltrigger",align:s.attr("align"),params:$(e).attr("params"),sendValue:a}),templateEngine.setWidgetStyling(p,a);var y=m?l:p;return y.bind("click",this.action).bind("mousedown",function(){p.removeClass("switchUnpressed").addClass("switchPressed")}).bind("mouseup mouseout",function(){p.removeClass("switchPressed").addClass("switchUnpressed")}),l.append(c).append(p),l},action:function(){var e=$(this).find(".actor").size()==1?$(this).find(".actor").data():$(this).data();e.params=e.params?e.params:"",$.ajax({type:"GET",datatype:"html",data:encodeURI(e.params),url:e.url,success:function(e){}})}})});