/* imagetrigger.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

define(["_common"],function(t){var n=t.basicdesign;t.basicdesign.addCreator("imagetrigger",{create:function(e,t,r,i){var s=$(e),o=n.setWidgetLayout(s,t);o+=" imagetrigger",s.attr("flavour")&&(r=s.attr("flavour")),r&&(o+=" flavour_"+r);var u='<div class="widget clearfix image '+(o?o:"")+'">',a=s.attr("value")?s.attr("value"):0;u+=n.extractLabel(s.find("label")[0],r);var f=n.makeAddressList(s),l=s.children("layout")[0],c=l?'style="'+n.extractLayout(l,i,{width:"100%"})+'"':"",h='<div class="actor">';s.attr("type")=="show"?h+='<img src="'+s.attr("src")+"."+s.attr("suffix")+'" '+c+" />":h+='<img src="" '+c+" />",h+="</div>",h+="</div>";var p=s.attr("refresh")?s.attr("refresh")*1e3:0,d=templateEngine.widgetDataInsert(t,{address:f,refresh:p,src:s.attr("src"),suffix:s.attr("suffix"),sendValue:s.attr("sendValue")||""});return d.refresh&&templateEngine.postDOMSetupFns.push(function(){templateEngine.setupRefreshAction(t,d.refresh)}),u+h+"</div>"},update:function(t,n){var r=templateEngine.widgetDataGetByElement(element);if(r.address[e.type][1].writeonly=="true")return;var i=templateEngine.transformDecode(r.address[t][0],n);r.type=="show"?i==0?$(this).children().hide():$(this).children().attr("src",r.src+"."+r.suffix).show():r.type=="select"&&(i==0?$(this).children().hide():$(this).children().attr("src",r.src+i+"."+r.suffix).show())},action:function(e,t,n){var r=templateEngine.widgetDataGet(e);for(var i in r.address){if(!(r.address[i][1]&2))continue;if(r.sendValue=="")continue;templateEngine.visu.write(i,templateEngine.transformEncode(r.address[i][0],r.sendValue))}}})});