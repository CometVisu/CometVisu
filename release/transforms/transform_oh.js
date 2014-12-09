/* transform_knx.js (c) 2010 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

define(["transform_default"],function(e){hueToRGB=function(e,t,n){return n=n<0?n+1:n>1?n-1:n,n*6<1?e+(t-e)*n*6:n*2<1?t:n*3<2?e+(t-e)*(.66666-n)*6:e},e.addTransform("OH",{"switch":{name:"OH_Switch",encode:function(e){return e==1?"ON":"OFF"},decode:function(e){return e=="ON"||parseInt(e)>0?1:0}},contact:{name:"OH_Contact",encode:function(e){return e==1?"OPEN":"CLOSED"},decode:function(e){return e=="OPEN"?1:0}},rollershutter:{name:"OH_RollerShutter",encode:function(e){return e==1?"DOWN":e==0?"UP":e},decode:function(e){return e=="NaN"||e=="Uninitialized"?0:e=="UP"?0:e=="DOWN"?1:e}},dimmer:{name:"OH_Dimmer",encode:function(e){return parseInt(e)},decode:function(e){return e=="NaN"||e=="Uninitialized"?0:e=="ON"?100:e=="OFF"?0:parseInt(e)}},number:{name:"OH_Number",encode:function(e){return parseFloat(e)},decode:function(e){return e=="NaN"||e=="Uninitialized"?0:parseFloat(e)}},string:{name:"OH_String",encode:function(e){return e},decode:function(e){return e}},color:{name:"OH_Color",encode:function(e){var t,n,r,i,s,o,u=e[0]/100,a=e[1]/100,f=e[2]/100;return console.log(e),t=Math.min(u,Math.min(a,f)),n=Math.max(u,Math.max(a,f)),r=n-t,o=n,s=r/o,i=0,r>0&&(n==u&&n!=a&&(i+=(a-f)/r),n==a&&n!=f&&(i+=2+(f-u)/r),n==f&&n!=u&&(i+=4+(u-a)/r),i/=6),[i*360,s*100,o*100]},decode:function(e){var t,n,r=e[0]/360,i=e[1]/100,s=e[2]/100;console.log("HSB: "+e);var o=.5*s*(2-i);return n=o<=.5?o*(i+1):o+i-o*i,t=o*2-n,[hueToRGB(t,n,r+.33333),hueToRGB(t,n,r),hueToRGB(t,n,r-.33333)]}}})});