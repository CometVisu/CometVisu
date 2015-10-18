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

define(["_common"],function(e){var t=e.basicdesign;e.basicdesign.addCreator("web",{create:function(e,n,r,i){var s=$(e),o={};s.attr("ga")&&(src=s.attr("ga"),templateEngine.addAddress(s.attr("ga")),o["_"+s.attr("ga")]=["DPT:1.001",0]);var u=s.children("layout")[0],a=u?'style="'+t.extractLayout(u,i)+'"':"",f=t.setWidgetLayout(s,n);s.attr("flavour")&&(r=s.attr("flavour")),r&&(f+=" flavour_"+r);var l='<div class="widget web '+(f?f:"")+'" '+a+">";l+=t.extractLabel(s.find("label")[0],r);var c="";s.attr("width")?c+="width:"+s.attr("width")+";":c+="width: 100%;",s.attr("height")&&(c+="height:"+s.attr("height")+";"),s.attr("frameborder")=="false"&&(a+="border: 0px ;"),s.attr("background")&&(c+="background-color:"+s.attr("background")+";"),c!=""&&(c='style="'+c+'"');var h="";s.attr("scrolling")&&(h='scrolling="'+s.attr("scrolling")+'"');var p='<div class="actor"><iframe src="'+s.attr("src")+'" '+c+h+"></iframe></div>",d=s.attr("refresh")?s.attr("refresh")*1e3:0,v=templateEngine.widgetDataInsert(n,{address:o,refresh:d});return v.refresh&&templateEngine.postDOMSetupFns.push(function(){templateEngine.setupRefreshAction(n,v.refresh)}),l+p+"</div>"},update:function(e,n){var r=$(this),i=templateEngine.widgetDataGetByElement(r),s=t.defaultValueHandling(e,n,i),o=i.address[e][2];switch(o){default:if(n==1){var u=r.find("iframe");u.attr("src",u.attr("src")),templateEngine.visu.write(e,templateEngine.transformEncode("DPT:1.001",0))}}}})});