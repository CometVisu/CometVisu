/* web.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

define(["_common"],function(e){var t=e.basicdesign;e.basicdesign.addCreator("web",{create:function(e,n,r,i){var s=$(e),o={};s.attr("ga")&&(src=s.attr("ga"),templateEngine.addAddress(s.attr("ga")),o["_"+s.attr("ga")]=["DPT:1.001",0]);var u=s.children("layout")[0],a=u?'style="'+t.extractLayout(u,i)+'"':"",f=$('<div class="widget web" '+a+"/>");t.setWidgetLayout(f,s),s.attr("flavour")&&(r=s.attr("flavour")),r&&f.addClass("flavour_"+r),f.append(t.extractLabel(s.find("label")[0],r));var l="";s.attr("width")?l+="width:"+s.attr("width")+";":l+="width: 100%;",s.attr("height")&&(l+="height:"+s.attr("height")+";"),s.attr("frameborder")=="false"&&(a+="border: 0px ;"),s.attr("background")&&(l+="background-color:"+s.attr("background")+";"),l!=""&&(l='style="'+l+'"');var c="";s.attr("scrolling")&&(c='scrolling="'+s.attr("scrolling")+'"');var h=$('<div class="actor"><iframe src="'+s.attr("src")+'" '+l+c+"></iframe></div>");for(var p in o)h.bind(p,this.update);var d=h;d.data("address",o);var v=s.attr("refresh")?s.attr("refresh")*1e3:0;return f.append($(d).data({refresh:v}).each(templateEngine.setupRefreshAction)),f},update:function(e,n){var r=$(this),i=t.defaultValueHandling(e,n,r.data()),s=r.data().address[e.type][2];switch(s){default:if(n==1){var o=r.find("iframe");o.attr("src",o.attr("src")),templateEngine.visu.write(e.type.substr(1),templateEngine.transformEncode("DPT:1.001",0))}}}})});