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

define(["jquery"],function(e){if(/(msie)/i.test(navigator.userAgent.toLowerCase())){var t=/MSIE\s([\d]+)/;t.exec(navigator.userAgent)!=null&&10>parseFloat(RegExp.$1)&&alert("Sorry, but Internet Explorer prior version 10.0 is not supported!")}typeof console=="undefined"?(console={},console.log=console.debug=console.info=console.warn=console.error=console.stamp=function(){}):console.stamp=function(){var e=new Date;return function t(n){console.timeStamp(n),console.log("["+t.caller.name+"] "+n+": "+(Date.now()-e))}}();var n={init:function(){if(typeof arguments=="undefined")return null;if(arguments.length<1)return null;if(typeof arguments[0]!="string")return null;if(typeof RegExp=="undefined")return null;var e=arguments[0],t=new RegExp(/(%([%]|(\-)?(\+|\x20)?(0)?(\d+)?(\.(\d)?)?([bcdfosxX])))/g),r=new Array,i,s=new Array,o=0,u=0,a=0,f=0,l="",c=null;while(c=t.exec(e))c[9]&&(o+=1),u=f,a=t.lastIndex-c[0].length,s[s.length]=e.substring(u,a),f=t.lastIndex,r[r.length]={match:c[0],left:c[3]?!0:!1,sign:c[4]||"",pad:c[5]||" ",min:c[6]||0,precision:c[8],code:c[9]||"%",negative:parseFloat(arguments[o])<0?!0:!1,argument:String(arguments[o])};s[s.length]=e.substring(f);if(r.length==0)return e;if(arguments.length-1<o)return null;var h=null,c=null,p=null;for(p=0;p<r.length;p++)r[p].code=="%"?i="%":r[p].code=="b"?(r[p].argument=String(Math.abs(parseInt(r[p].argument)).toString(2)),i=n.convert(r[p],!0)):r[p].code=="c"?(r[p].argument=String(String.fromCharCode(parseInt(Math.abs(parseInt(r[p].argument))))),i=n.convert(r[p],!0)):r[p].code=="d"?(r[p].argument=String(Math.abs(parseInt(r[p].argument))),i=n.convert(r[p])):r[p].code=="f"?(r[p].argument=String(Math.abs(parseFloat(r[p].argument)).toFixed(r[p].precision?r[p].precision:6)),i=n.convert(r[p])):r[p].code=="o"?(r[p].argument=String(Math.abs(parseInt(r[p].argument)).toString(8)),i=n.convert(r[p])):r[p].code=="s"?(r[p].argument=r[p].argument.substring(0,r[p].precision?r[p].precision:r[p].argument.length),i=n.convert(r[p],!0)):r[p].code=="x"?(r[p].argument=String(Math.abs(parseInt(r[p].argument)).toString(16)),i=n.convert(r[p])):r[p].code=="X"?(r[p].argument=String(Math.abs(parseInt(r[p].argument)).toString(16)),i=n.convert(r[p]).toUpperCase()):i=r[p].match,l+=s[p],l+=i;return l+=s[p],l},convert:function(e,t){t?e.sign="":e.sign=e.negative?"-":e.sign;var n=e.min-e.argument.length+1-e.sign.length,r=(new Array(n<0?0:n)).join(e.pad);return e.left?e.pad=="0"||t?e.sign+e.argument+r.replace(/0/g," "):e.sign+e.argument+r:e.pad=="0"||t?e.sign+r+e.argument:r+e.sign+e.argument}};window.sprintf=n.init,e.extend({getUrlVars:function(){var e=[],t,n=window.location.href.slice(window.location.href.indexOf("?")+1).split("#")[0].split("&");for(var r=0;r<n.length;r++)t=n[r].split("="),e.push(t[0]),e[t[0]]=t[1];return e},getUrlVar:function(t){return e.getUrlVars()[t]}}),"object"==typeof window.applicationCache&&window.applicationCache.addEventListener("updateready",function(){window.location.reload(!1)})});