/* group.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

define(["_common"],function(e){var t=e.basicdesign;e.basicdesign.addCreator("group",{maturity:e.Maturity.development,create:function(e,n,r,i){var s=$(e),o="clearfix group "+t.setWidgetLayout(s,n);s.attr("class")&&(o+=" custom_"+s.attr("class")),s.attr("nowidget")!=="true"&&(o="widget "+o),s.attr("flavour")&&(r=s.attr("flavour")),r&&(o+=" flavour_"+r);var u="";s.attr("align")&&(u+="text-align:"+s.attr("align")+";"),u!=""&&(u='style="'+u+'"');var a=s.children().not("layout"),f='<div class="clearfix">';s.attr("name")&&(f+="<h2 "+u+">"+s.attr("name")+"</h2>"),$(a).each(function(e){f+=templateEngine.create_pages(a[e],n+"_"+e,r)}),f+="</div>";if(s.attr("target")){var l=s.attr("target");o+=" clickable";var c=templateEngine.widgetDataInsert(n,{bind_click_to_widget:!0,target:l})}return'<div class="'+o+'">'+f+"</div>"},action:function(e,t,n){var r=templateEngine.widgetDataGet(e);if(n)return;r.target!=0&&templateEngine.scrollToPage(r.target)}})});