/* pagejump.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

define(["_common"],function(e){var t=e.basicdesign;e.basicdesign.addCreator("pagejump",{create:function(e,n,r,i){var s=$(e),o=s.children("layout")[0],u=o?'style="'+t.extractLayout(o,i)+'"':"",a=s.attr("target")?s.attr("target"):"0",f="widget clearfix pagejump";s.attr("align")&&(f+=" "+s.attr("align"));var l=$('<div class="'+f+'" '+u+"/>");s.attr("flavour")&&(r=s.attr("flavour")),r&&l.addClass("flavour_"+r),t.setWidgetLayout(l,s);var c=t.extractLabel(s.find("label")[0],r),h=t.makeAddressList(s),p=templateEngine.bindClickToWidget;s.attr("bind_click_to_widget")&&(p=s.attr("bind_click_to_widget")=="true");var d='<div class="actor switchUnpressed ';s.attr("align")&&(d+=s.attr("align")),d+='">',s.attr("name")&&(d+='<div class="value">'+s.attr("name")+"</div>"),d+="</div>";var v=$(d).data({styling:$(e).attr("styling"),type:"pagejump",align:s.attr("align"),target:a});templateEngine.setWidgetStyling(v,a);var m=p?l:v;return m.bind("click",this.action).bind("mousedown",function(){v.removeClass("switchUnpressed").addClass("switchPressed")}).bind("mouseup mouseout",function(){v.removeClass("switchPressed").addClass("switchUnpressed")}),l.append(c).append(v),l},action:function(){var e=$(this).find(".actor").size()==1?$(this).find(".actor").data():$(this).data();templateEngine.scrollToPage(e.target)}}),$(window).bind("scrolltopage",function(e,t){var n=$("#"+t),r=n.data("name");$(".pagejump.active").removeClass("active"),$(".pagejump.active_ancestor").removeClass("active_ancestor"),$(".pagejump").each(function(){var e=$(this),t=e.find(".actor").data("target");r==t&&e.addClass("active")});var i=templateEngine.getParentPage(n);while(i!=null&&templateEngine.getParentPage(i)!=null){var s=i.data("name");$(".pagejump").each(function(){var e=$(this),t=e.find(".actor").data("target");s==t&&e.addClass("active_ancestor")}),i=templateEngine.getParentPage(i)}})});