/* trick-o-matic.js (c) 2010-2015 by Christian Mayer [CometVisu at ChristianMayer dot de]
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
 * @module Tick-o-Matic
 * @title  CometVisu templateengine
 */

define(["jquery"],function(e){return function(){function i(e,t){return"@keyframes "+e+" {\n"+t+"}\n"+"@-moz-keyframes "+e+" {\n"+t+"}\n"+"@-webkit-keyframes "+e+" {\n"+t+"}\n"}function o(e,t){return e+": "+t+";\n"+"-moz-"+e+": "+t+";\n"+"-webkit-"+e+": "+t+";\n"}var t=this.getSVGDocument();if(!t)return;var n=t.getElementsByClassName("pipe_group");e(n).each(function(){var t=this;e(this).find("path").each(function(){var e=this,n=parseInt(parseFloat(e.style.strokeWidth)/2),r=.15;for(var i=n-1;i>0;i--){r-=.1/n;var s=e.cloneNode();s.className.baseVal+=" pipe-o-matic_clone",s.style.strokeWidth=i*2,s.style.stroke="#ffffff",s.style.strokeOpacity=r,t.insertBefore(s,e.nextElementSibling)}})});var r=40,n=t.getElementsByClassName("show_flow");e(n).each(function(){var t=this,n=0;e(this).find("path").each(function(){function h(e){var t=parseInt(e).toString(16);return t.length<2?"0"+t:t}var e=this;if(e.className.animVal.split(" ").indexOf("pipe-o-matic_clone")>0)return;var i=e.style.stroke,s,o,u;if(i[0]=="#")s=parseInt(e.style.stroke.substring(1,3),16),o=parseInt(e.style.stroke.substring(3,5),16),u=parseInt(e.style.stroke.substring(5,7),16);else if(i.indexOf("rgb(")==0){var a=i.replace(/[^0-9,.]*/g,"").split(",");s=a[0],o=a[1],u=a[2]}var f=0,l=0,c=0;for(var p=r/2;p>0;p-=2){var d=1-p/(r/2),v=(n+r/2-p)%r,m=2*p,g=r-m,y=e.cloneNode();y.className.baseVal+=" flow-o-matic_clone",y.style.stroke="#"+h(s*d+f*(1-d))+h(o*d+l*(1-d))+h(u*d+c*(1-d)),g>v?y.style.strokeDasharray=[g-v,m,v,0]:y.style.strokeDasharray=[0,m-(v-g),g,v-g],y.style.strokeDashoffset=n%(.5*r),t.insertBefore(y,e.nextElementSibling)}n+=e.getTotalLength()}),this.attributes.getNamedItem("data-cometvisu-active")&&(activeValues=this.attributes.getNamedItem("data-cometvisu-active").value,e(activeValues.split(" ")).each(function(){e("body").bind("_"+this,function(e,n,r){n=="01"?t.setAttribute("class",t.getAttribute("class").replace(" flow_active","")+" flow_active"):t.setAttribute("class",t.getAttribute("class").replace(" flow_active",""))})}))});var s=i("move","from {  stroke-dashoffset: "+r+";  }\n"+"to   {  stroke-dashoffset: 0;  }\n");s+=".flow_active path {\n"+o("animation-duration","3s")+o("animation-name","move")+o("animation-timing-function","linear")+o("animation-iteration-count","infinite")+"}\n";var u=t.createElementNS("http://www.w3.org/2000/svg","style");u.setAttribute("type","text/css"),u.textContent=s,e("svg",t).prepend(u)}});