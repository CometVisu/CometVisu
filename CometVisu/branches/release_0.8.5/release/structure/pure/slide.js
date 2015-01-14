/* slide.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

define(["_common"],function(e){var t=e.basicdesign;e.basicdesign.addCreator("slide",{create:function(e,n,r,i){var s=$(e),o=t.createDefaultWidget("slide",s,n,r,i,this.update),u=undefined,a=undefined;s.find("address").each(function(){var e=this.getAttribute("transform");Transform[e]&&Transform[e].range&&(u>Transform[e].range.min||(u=Transform[e].range.min),a<Transform[e].range.max||(a=Transform[e].range.max))});var f=parseFloat(s.attr("min")||u||0),l=parseFloat(s.attr("max")||a||100),c=parseFloat(s.attr("step")||.5);o.data({min:f,max:l,step:c,valueInternal:!0,inAction:!1});var h=$('<div class="actor">');return o.append(h),h.slider({step:c,min:f,max:l,range:"min",animate:!0,start:this.slideStart,change:this.slideChange}),o.data("format")&&(h.on("slide",this.slideUpdateValue),h.children(".ui-slider-handle").text(sprintf(o.data("format"),templateEngine.map(undefined,o.data("mapping"))))),o},update:function(e,t){var n=$(this),r=n.find(".actor"),i=n.data();if(i.inAction)return;var s=templateEngine.transformDecode(i.address[e.type][0],t);i.value!=s&&(i.value=s,i.valueInternal=!1,r.slider("value",s),i.valueInternal=!0,i.format!=null&&r.children(".ui-slider-handle").text(sprintf(i.format,templateEngine.map(s,i.mapping))))},slideUpdateValue:function(e,t){var n=$(this).parent(),r=n.find(".actor"),i=n.data();i.format&&$(t.handle).text(sprintf(i.format,templateEngine.map(t.value,i.mapping)))},slideStart:function(e,t){var n=$(this).parent(),r=n.find(".actor"),i=n.data();i.inAction=!0,i.valueInternal=!0,i.updateFn=setInterval(function(){var e=r.slider("value");if(i.value==e)return;for(var t in i.address){if(!(i.address[t][1]&2))continue;var n=templateEngine.transformEncode(i.address[t][0],e);n!=templateEngine.transformEncode(i.address[t][0],i.value)&&templateEngine.visu.write(t.substr(1),n)}i.value=e},250)},slideChange:function(e,t){var n=$(this).parent().data();clearInterval(n.updateFn,t.value),n.inAction=!1;if(n.valueInternal&&n.value!=t.value)for(var r in n.address){if(!(n.address[r][1]&2))continue;var i=templateEngine.transformEncode(n.address[r][0],t.value);i!=templateEngine.transformEncode(n.address[r][0],n.value)&&templateEngine.visu.write(r.substr(1),i)}}})});