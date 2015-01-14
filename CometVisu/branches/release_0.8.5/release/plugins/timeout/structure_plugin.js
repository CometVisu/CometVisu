/* structure_plugin.js (c) 2012 by Carsten Tschach (Carsten@Tschach.com)
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

define("plugins/timeout/structure_plugin",["structure_custom"],function(e){function s(){o("TIMEOUT: Got Trigger ("+t+")"),t++;if(t>=10){t=0;var e=r;o("XXXXX Before Find-by-id: "+r),r.match(/^id_[0-9_]+$/)==null&&$(".page h1:contains("+r+")","#pages").each(function(e){o("In find-id"+$(this).text()),$(this).text()==r&&(r=$(this).closest(".page").attr("id"))}),o("XXXXXX After Find-by-id: "+r),n!=r?(o("TIMEOUT: Got Timeout - Now Goto Page "+r),templateEngine.scrollToPage(r),$("#"+r).scrollTop(0)):(o("TIMEOUT: Already on page "+r),$("#"+n).scrollTop(0))}}function o(e){i=="true"&&console.log(e)}var t=0,n="",r="",i="false";e.prototype.addCreator("timeout",{create:function(e,i){var s=$(e),u="id_0",a=600,f="false";s.attr("target")&&(u=s.attr("target")),s.attr("time")&&(a=s.attr("time")),o("AAAAAA: Before Find-by-id: "+u),u.match(/^id_[0-9_]+$/)==null&&$(".page h1:contains("+u+")","#pages").each(function(e){o("In find-id"+$(this).text()),$(this).text()==u&&(u=$(this).closest(".page").attr("id"))}),o("AAAAAA: After Find-by-id: "+u),o("TIMEOUT: Timeout Set to : "+a),o("TIMEOUT: Target Page: "+u),r=u;var l=a*100,c=setInterval("timeoutTrigger()",l);$(document).bind("scroll",function(e){t=0}),$(document).bind("mousemove",function(e){t=0}),$(document).bind("click",function(e){t=0}),$(document).bind("keypress",function(e){t=0}),$(document).bind("mousewheel",function(e){t=0}),$(document).bind("scrollstart",function(e){t=0}),$(document).bind("touchstart",function(e){t=0}),$(document).bind("touchmove",function(e){t=0}),$(document).bind("touchend",function(e){t=0}),$(window).bind("scrolltopage",function(e,r){n=r,t=0})}})});