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

define(["transform_default"],function(e){e.addTransform("OH",{"switch":{name:"OH_Switch",encode:function(e){return e==1?"ON":"OFF"},decode:function(e){return e=="ON"||parseInt(e)>0?1:0}},contact:{name:"OH_Contact",encode:function(e){return e==1?"OPEN":"CLOSED"},decode:function(e){return e=="OPEN"?1:0}},rollershutter:{name:"OH_RollerShutter",encode:function(e){return e==1?"DOWN":e==0?"UP":e},decode:function(e){return e=="NaN"||e=="Uninitialized"?0:e=="UP"?0:e=="DOWN"?1:e}},dimmer:{name:"OH_Dimmer",encode:function(e){return parseInt(e)},decode:function(e){return e=="NaN"||e=="Uninitialized"?0:e=="ON"?100:e=="OFF"?0:parseInt(e)}},number:{name:"OH_Number",encode:function(e){return parseFloat(e)},decode:function(e){return e=="NaN"||e=="Uninitialized"?0:parseFloat(e)}},string:{name:"OH_String",encode:function(e){return e},decode:function(e){return e}},datetime:{name:"OH_DateTime",encode:function(e){return e instanceof Date?e.toLocaleDateString():e},decode:function(e){if(e=="NaN"||e=="Uninitialized")return"-";var t=new Date(e);return t}},time:{name:"OH_Time",encode:function(e){return e instanceof Date?e.toLocaleTimeString():e},decode:function(e){if(e=="NaN"||e=="Uninitialized")return"-";var t=new Date(e);return t}},color:{name:"OH_Color",encode:function(e){var t,n,r,i,s,o,u=e[0]/255,a=e[1]/255,f=e[2]/255;t=Math.max(u,a,f),n=Math.min(u,a,f),s=t,o=t-n,i=t===0?0:o/t;if(t===n)r=0;else{switch(t){case u:r=(a-f)/o+(a<f?6:0);break;case a:r=(f-u)/o+2;break;case f:r=(u-a)/o+4}r/=6}return r*=360,i*=100,s*=100,[r,i,s]},decode:function(e){var t=e.split(","),n=t[0],r=t[1],i=t[2],s,o,u,a,f,l,c,h;return i===0?[0,0,0]:(r/=100,i/=100,n/=60,a=Math.floor(n),f=n-a,l=i*(1-r),c=i*(1-r*f),h=i*(1-r*(1-f)),a===0?(s=i,o=h,u=l):a===1?(s=c,o=i,u=l):a===2?(s=l,o=i,u=h):a===3?(s=l,o=c,u=i):a===4?(s=h,o=l,u=i):a===5&&(s=i,o=l,u=c),s=Math.floor(s*255),o=Math.floor(o*255),u=Math.floor(u*255),[s,o,u])}}})});