/* icontools.js (c) 2015 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

define([],function(){(function(e,t){var n=/#[0-9a-fA-F]{6}/,r={white:"#ffffff",orange:"#ff8000",red:"#ff4444",green:"#44ff44",blue:"#4444ff",purple:"#ff44ff",yellow:"#ffff00",grey:"#777777",black:"#000000"},i={},s=[],o=[],u,a=function(t,n,r){o.push([t,n,r]),u||(u=setInterval(function(){while(o.length){if(!(o[0][2]in o[0][1]))break;e.fillRecoloredIcon(o.shift()[0])}0===o.length&&(clearInterval(u),u=0)},10))},f=function(e,t,n){return'<canvas class="'+e+" "+n+'" '+t+"/>"},l=function(e,t){e.width=t.width,e.height=t.height,e.getContext("2d").putImageData(t,0,0)},c=navigator.userAgent.toLowerCase().indexOf("android")>-1?function(e,t,n,r,i){for(var s=0;s<i;s+=4){var o=r[s+3];o>127?(r[s]=e,r[s+1]=t,r[s+2]=n,r[s+3]=255):(r[s]=0,r[s+1]=0,r[s+2]=0,r[s+3]=0)}}:function(e,t,n,r,i){for(var s=0;s<i;s+=4)0!=r[s+3]&&(r[s]=e,r[s+1]=t,r[s+2]=n)},h=$("<canvas/>")[0],p=h.getContext("2d"),d=function(e,r,i){if(i[e])return;var s=h.width=r.width,o=h.height=r.height;p.drawImage(r,0,0);var u=p.getImageData(0,0,s,o);if(e!==t){n.test(e)||alert('Error! "'+e+'" is not a valid color for icon recoloring! It must have a shape like "#aabbcc".');var a=parseInt(e.substr(1,2),16),f=parseInt(e.substr(3,2),16),l=parseInt(e.substr(5,2),16);c(a,f,l,u.data,s*o*4)}i[e]=u};e.recolorNonTransparent=function(e){var n=function(){var t=i[e].toFill,n=i[e].icon,r=i[e].colors,s;while(s=t.pop())d(s,n,r)};return function(o,u,c,h){if(t===i[e]){var p=new Image;p.onload=n,p.src=e,i[e]={icon:p,id:s.length,colors:{},toFill:[]},s.push(e)}o===t&&(o="#ffffff"),o in r&&(o=r[o]);var d="icon"+i[e].id+"_"+o.substr(1,6);i[e].toFill.push(o),i[e].icon.complete&&n();var v=f(d,u,c);if(h)return v;var m=$(v)[0];return i[e].icon.complete?l(m,i[e].colors[o]):a(m,i[e].colors,o),m}},e.fillRecoloredIcon=function(e){var n=e.className.split(" ")[0].substring(4).split("_");if(2===n.length){var r=i[s[n[0]]],o=r.colors["#"+n[1]];t===o?a(e,r.colors,"#"+n[1]):l(e,o)}}})(window)});