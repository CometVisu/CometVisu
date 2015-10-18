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

define(["_common"],function(e){var t=e.basicdesign;e.basicdesign.addCreator("pagejump",{create:function(e,n,r,i){var s=$(e),o=s.children("layout")[0],u=o?'style="'+t.extractLayout(o,i)+'"':"",a=s.attr("target")?s.attr("target"):"0",f="widget clearfix pagejump";s.attr("align")&&(f+=" "+s.attr("align"));var l=t.setWidgetLayout(s,n);l&&(f+=" "+l),s.attr("flavour")&&(r=s.attr("flavour")),r&&(f+=" flavour_"+r);var c='<div class="'+f+'" '+u+">";c+=t.extractLabel(s.find("label")[0],r);var h='<div class="actor switchUnpressed ';s.attr("align")&&(h+=s.attr("align")),h+='">',s.attr("name")&&(h+='<div class="value">'+s.attr("name")+"</div>"),h+="</div>";var p=templateEngine.widgetDataInsert(n,{bind_click_to_widget:!0,styling:$(e).attr("styling"),align:s.attr("align"),target:a,path:$(e).attr("path"),active_scope:$(e).attr("active_scope")?$(e).attr("active_scope"):"target"}),d="",v=$("widgetinfo > *",s).first()[0];if(v!=undefined){var p=templateEngine.widgetDataInsert(n+"_0",{containerClass:"widgetinfo"});d=templateEngine.create_pages(v,n+"_0",r,v.nodeName)}return c+h+d+"</div>"},downaction:function(e,n,r){$(n).parent().hasClass("info")||t.defaultButtonDownAnimationInheritAction(e,n)},action:function(e,n,r){$(n).parent().hasClass("info")||t.defaultButtonUpAnimationInheritAction(e,n);if(r)return;var i=templateEngine.widgetDataGet(e),s=i.target;i.path!=undefined&&(s=templateEngine.getPageIdByPath(i.target,i.path)),templateEngine.scrollToPage(s)}}),$(window).bind("scrolltopage",function(e,t){var n=$("#"+t),r=templateEngine.widgetData[t].name;$(".pagejump.active").removeClass("active"),$(".pagejump.active_ancestor").removeClass("active_ancestor"),$(".pagejump").each(function(){var e=$(this),t=templateEngine.widgetDataGetByElement(this);r==t.target&&e.addClass("active")});var i=templateEngine.getParentPage(n);while(i!=null&&templateEngine.getParentPage(i)!=null){var s=i.attr("id"),o=templateEngine.widgetData[s].name;$(".pagejump").each(function(){var e=$(this),t=templateEngine.widgetDataGetByElement(this);(o==t.target||t.active_scope=="path"&&t.path!=undefined&&t.path.match(o+"$"))&&e.addClass("active_ancestor")}),i=templateEngine.getParentPage(i)}})});