/* compatability.js (c) 2013 by Christian Mayer [CometVisu at ChristianMayer dot de]
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
 * 
 * @module Compatability
 * @title  CometVisu helper functions for compatability issues
 */

define(["jquery"],function(e){if(/(msie)/i.test(navigator.userAgent.toLowerCase())){var t=/MSIE\s([\d]+)/;t.exec(navigator.userAgent)!=null&&10>parseFloat(RegExp.$1)&&alert("Sorry, but Internet Explorer prior version 10.0 is not supported!")}typeof console=="undefined"?(console={},console.log=console.debug=console.info=console.warn=console.error=console.stamp=function(){}):console.stamp=function(){var e=new Date;return function t(n){console.timeStamp(n),console.log("["+t.caller.name+"] "+n+": "+(Date.now()-e))}}(),sprintfWrapper={init:function(){if(typeof arguments=="undefined")return null;if(arguments.length<1)return null;if(typeof arguments[0]!="string")return null;if(typeof RegExp=="undefined")return null;var e=arguments[0],t=new RegExp(/(%([%]|(\-)?(\+|\x20)?(0)?(\d+)?(\.(\d)?)?([bcdfosxX])))/g),n=new Array,r,i=new Array,s=0,o=0,u=0,a=0,f="",l=null;while(l=t.exec(e))l[9]&&(s+=1),o=a,u=t.lastIndex-l[0].length,i[i.length]=e.substring(o,u),a=t.lastIndex,n[n.length]={match:l[0],left:l[3]?!0:!1,sign:l[4]||"",pad:l[5]||" ",min:l[6]||0,precision:l[8],code:l[9]||"%",negative:parseFloat(arguments[s])<0?!0:!1,argument:String(arguments[s])};i[i.length]=e.substring(a);if(n.length==0)return e;if(arguments.length-1<s)return null;var c=null,l=null,h=null;for(h=0;h<n.length;h++)n[h].code=="%"?r="%":n[h].code=="b"?(n[h].argument=String(Math.abs(parseInt(n[h].argument)).toString(2)),r=sprintfWrapper.convert(n[h],!0)):n[h].code=="c"?(n[h].argument=String(String.fromCharCode(parseInt(Math.abs(parseInt(n[h].argument))))),r=sprintfWrapper.convert(n[h],!0)):n[h].code=="d"?(n[h].argument=String(Math.abs(parseInt(n[h].argument))),r=sprintfWrapper.convert(n[h])):n[h].code=="f"?(n[h].argument=String(Math.abs(parseFloat(n[h].argument)).toFixed(n[h].precision?n[h].precision:6)),r=sprintfWrapper.convert(n[h])):n[h].code=="o"?(n[h].argument=String(Math.abs(parseInt(n[h].argument)).toString(8)),r=sprintfWrapper.convert(n[h])):n[h].code=="s"?(n[h].argument=n[h].argument.substring(0,n[h].precision?n[h].precision:n[h].argument.length),r=sprintfWrapper.convert(n[h],!0)):n[h].code=="x"?(n[h].argument=String(Math.abs(parseInt(n[h].argument)).toString(16)),r=sprintfWrapper.convert(n[h])):n[h].code=="X"?(n[h].argument=String(Math.abs(parseInt(n[h].argument)).toString(16)),r=sprintfWrapper.convert(n[h]).toUpperCase()):r=n[h].match,f+=i[h],f+=r;return f+=i[h],f},convert:function(e,t){t?e.sign="":e.sign=e.negative?"-":e.sign;var n=e.min-e.argument.length+1-e.sign.length,r=(new Array(n<0?0:n)).join(e.pad);return e.left?e.pad=="0"||t?e.sign+e.argument+r.replace(/0/g," "):e.sign+e.argument+r:e.pad=="0"||t?e.sign+r+e.argument:r+e.sign+e.argument}},sprintf=sprintfWrapper.init,e.extend({getUrlVars:function(){var e=[],t,n=window.location.href.slice(window.location.href.indexOf("?")+1).split("#")[0].split("&");for(var r=0;r<n.length;r++)t=n[r].split("="),e.push(t[0]),e[t[0]]=t[1];return e},getUrlVar:function(t){return e.getUrlVars()[t]}}),"object"==typeof window.applicationCache&&window.applicationCache.addEventListener("updateready",function(){window.location.reload(!1)})});