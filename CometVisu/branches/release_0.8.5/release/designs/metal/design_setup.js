//
//  Design setup for the metal design
//
//   Copyright (C) 2012 by Christian Mayer
//   cometvisu (at) ChristianMayer.de
//
//   This program is free software; you can redistribute it and/or modify
//   it under the terms of the GNU General Public License as published by
//   the Free Software Foundation; either version 2 of the License, or
//   (at your option) any later version.
//
//   This program is distributed in the hope that it will be useful,
//   but WITHOUT ANY WARRANTY; without even the implied warranty of
//   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//   GNU General Public License for more details.
//
//   You should have received a copy of the GNU General Public License
//   along with this program; if not, write to the
//   Free Software Foundation, Inc.,
//   59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
//
//////////////////////////////////////////////////////////////////////////////
//$(".value < img").css("padding", "0");

function getOffsetCorners(e){return{top_left:{top:Math.round(e.offset().top),left:Math.round(e.offset().left)},bottom_left:{top:Math.round(e.offset().top+e.height()),left:Math.round(e.offset().left)},top_right:{top:Math.round(e.offset().top),left:Math.round(e.offset().left+e.width())},bottom_right:{top:Math.round(e.offset().top+e.height()),left:Math.round(e.offset().left+e.width())}}}function roundCorners(){$(".page.activePage .group:visible").each(function(e){var t=$(this);if(t.parents(".navbar").size()>0)return;var n=getOffsetCorners(t),r=$(this).find(".widget_container:first-child").size()>0&&t.css("border-top-right-radius")!="0px",i=5;$(this).find(".widget_container").each(function(e){var s=getOffsetCorners($(this));r&&Math.abs(s.top_right.top-n.top_right.top)<i&&Math.abs(s.top_right.left-n.top_right.left)<i&&($(this).css({"border-top-right-radius":t.css("border-top-right-radius")}),$(this).children().css({"border-top-right-radius":t.css("border-top-right-radius")})),t.css("border-bottom-right-radius")!="0px"&&Math.abs(s.bottom_right.top-n.bottom_right.top)<i&&Math.abs(s.bottom_right.left-n.bottom_right.left)<i&&($(this).css({"border-bottom-right-radius":t.css("border-bottom-right-radius")}),$(this).children().css({"border-bottom-right-radius":t.css("border-bottom-right-radius")})),t.css("border-bottom-left-radius")!="0px"&&Math.abs(s.bottom_left.top-n.bottom_left.top)<i&&Math.abs(s.bottom_left.left-n.bottom_left.left)<i&&($(this).css({"border-bottom-left-radius":t.css("border-bottom-left-radius")}),$(this).children().css({"border-bottom-left-radius":t.css("border-bottom-left-radius")}))})})}$("#navbarLeft").data("columns",6),$("#main").data("columns",12),$("#navbarRight").data("columns",6),$(window).bind("scrolltopage",function(){/(opera|chrome|safari)/i.test(navigator.userAgent.toLowerCase())&&roundCorners()}),templateEngine.bindActionForLoadingFinished(function(){$("#navbarLeft .navbar .widget .label,#navbarRight .navbar .widget .label").each(function(e){var t=$(this);if(t.text().trim()!=""){var n=t.siblings(".actor");t.children("img").size()==0&&n.children(".value").text().trim()!=""&&n.css("padding-top","0.5em")}}),$(".page > div > .widget_container > .group:not(.widget)").each(function(e){var t=$(this);t.find(".clearfix > .widget_container > .group.widget").size()>0&&t.css({border:"none",margin:0})})});