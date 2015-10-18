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

define(["_common"],function(e){var t=e.basicdesign;e.basicdesign.addCreator("urltrigger",{create:function(e,n,r,i){var s=$(e),o=s.children("layout")[0],u=o?'style="'+t.extractLayout(o,i)+'"':"",a=s.attr("value")?s.attr("value"):0,f="widget clearfix trigger";s.attr("align")&&(f+=" "+s.attr("align"));var l=t.setWidgetLayout(s,n);l&&(f+=" "+l),r&&(f+=" flavour_"+r);var c='<div class="'+f+'" '+u+">";s.attr("flavour")&&(r=s.attr("flavour"));var h=t.extractLabel(s.find("label")[0],r),p='<div class="actor switchUnpressed ';s.attr("align")&&(p+=s.attr("align")),p+='"><div class="value"></div></div>';var d=templateEngine.widgetDataInsert(n,{url:$(e).attr("url"),mapping:$(e).attr("mapping"),styling:$(e).attr("styling"),align:s.attr("align"),params:$(e).attr("params"),sendValue:a});return templateEngine.postDOMSetupFns.push(function(){t.defaultUpdate(undefined,a,$("#"+n),!0,n)}),c+h+p+"</div>"},downaction:t.defaultButtonDownAnimationInheritAction,action:function(e,n,r){t.defaultButtonUpAnimationInheritAction(e,n);if(r)return;var i=templateEngine.widgetDataGet(e);i.params=i.params?i.params:"",$.ajax({type:"GET",datatype:"html",data:encodeURI(i.params),url:i.url,success:function(e){}})}})});