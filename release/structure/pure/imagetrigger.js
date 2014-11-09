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

define(["_common"],function(e){var t=e.basicdesign;e.basicdesign.addCreator("imagetrigger",{create:function(e,n,r,i){var s=$(e),o=$('<div class="widget clearfix image" />');t.setWidgetLayout(o,s),o.addClass("imagetrigger"),s.attr("flavour")&&(r=s.attr("flavour")),r&&o.addClass("flavour_"+r);var u=s.attr("value")?s.attr("value"):0,a=templateEngine.bindClickToWidget;s.attr("bind_click_to_widget")&&(a=s.attr("bind_click_to_widget")=="true"),o.append(t.extractLabel(s.find("label")[0],r));var f=t.makeAddressList(s),l=s.children("layout")[0],c=l?'style="'+t.extractLayout(l,i,{width:"100%"})+'"':"",h='<div class="actor">';s.attr("type")=="show"?h+='<img src="'+s.attr("src")+"."+s.attr("suffix")+'" '+c+" />":h+='<img src="" '+c+" />",h+="</div>",h+="</div>";var p=s.attr("refresh")?s.attr("refresh")*1e3:0,d=$(h).data({address:f,refresh:p,src:s.attr("src"),suffix:s.attr("suffix"),type:s.attr("type"),sendValue:s.attr("sendValue")||""}).each(templateEngine.setupRefreshAction),v=a?o:d;v.bind("click",this.action);for(var m in f)d.bind(m,this.update);return o.append(d),o},update:function(e,t){var n=$(this).data();if(n.address[e.type][1].writeonly=="true")return;var r=templateEngine.transformDecode(n.address[e.type][0],t);n.type=="show"?r==0?$(this).children().hide():$(this).children().attr("src",n.src+"."+n.suffix).show():n.type=="select"&&(r==0?$(this).children().hide():$(this).children().attr("src",n.src+r+"."+n.suffix).show())},action:function(){var e=$(this).find(".actor").size()==1?$(this).find(".actor").data():$(this).data();for(var t in e.address){if(!(e.address[t][1]&2))continue;if(e.sendValue=="")continue;templateEngine.visu.write(t.substr(1),templateEngine.transformEncode(e.address[t][0],e.sendValue))}}})});