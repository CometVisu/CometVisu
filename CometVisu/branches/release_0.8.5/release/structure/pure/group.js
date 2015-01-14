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

define(["_common"],function(e){var t=e.basicdesign;e.basicdesign.addCreator("group",{maturity:e.Maturity.development,create:function(e,n,r,i){var s=$(e),o=$('<div class="widget clearfix group" />');s.attr("flavour")&&(r=s.attr("flavour"));var u="";s.attr("align")&&(u+="text-align:"+s.attr("align")+";"),u!=""&&(u='style="'+u+'"'),t.setWidgetLayout(o,s),s.attr("nowidget")=="true"&&o.removeClass("widget"),s.attr("class")&&o.addClass("custom_"+s.attr("class"));var a=s.children().not("layout"),f=$('<div class="clearfix"/>');s.attr("name")&&f.append("<h2 "+u+">"+s.attr("name")+"</h2>"),$(a).each(function(e){f.append(templateEngine.create_pages(a[e],n+"_"+e,r))}),r&&o.addClass("flavour_"+r);if(s.attr("target")){var l=s.attr("target")?s.attr("target"):"0";o.addClass("clickable"),o.data({type:"pagejump",target:l}).bind("click",this.action),templateEngine.setWidgetStyling(o,l)}return o.append(f),o},action:function(){var e=$(this).data();e.target!=0&&templateEngine.scrollToPage(e.target)}})});