//
//  Icon handler for the CometVisu.
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

define(["icon/iconconfig"],function(e){function t(){if(!(this instanceof t))return new t;var n=e;this.insert=function(){var e=arguments[0],t=arguments[1],r=arguments[2]||"*",i=arguments[3]||"*",s=arguments[4]||"*",o=arguments[5],u=arguments[6];n[e]||(n[e]={}),n[e][r]||(n[e][r]={}),n[e][r][i]||(n[e][r][i]={}),n[e][r][i][s]={uri:t,styling:o,dynamic:u}},this.get=function(){var e=arguments[0],t=arguments[1],r=arguments[2],i=arguments[3];if(!n[e])return undefined;n[e][t]||(t="*");if(typeof n[e][t]=="string"){t=n[e][t];if(t.split("/").length>1){var s=t.split("/");t=s.shift(),r===undefined&&(r=s.shift())}}n[e][t][r]||(r="*");if(typeof n[e][t][r]=="string"){r=n[e][t][r];if(r.split("/").length>1){var s=r.split("/");r=s.shift(),i===undefined&&(i=s.shift())}}return n[e][t][r][i]||(i="*"),typeof n[e][t][r]["*"]=="function"?n[e][t][r]["*"]:(typeof n[e][t][r][i]=="string"&&(i=n[e][t][r][i]),n[e][t][r][i])},this.getURI=function(){var e=this.get.apply(this,arguments);if(e)return e.uri},this.getIconElement=function(){var e=this.get.apply(this,arguments);if(e){var t=arguments[4];if(e.icon&&t===undefined&&typeof e!="function")return e.icon;t===undefined?t=e.styling===undefined?"":' style="'+e.styling+'"':t=' style="'+t+'"';var n="icon",r=arguments[5];return r!==undefined&&(n=n+" custom_"+r),typeof e=="function"?e.icon=e(arguments[3],t,n,!1):e.icon=$('<img class="'+n+'" src="'+e.uri+'"'+t+"/>")[0],e.icon}},this.getIconText=function(){var e=this.get.apply(this,arguments);if(e){var t=arguments[4];t===undefined?t=e.styling===undefined?"":' style="'+e.styling+'"':t=' style="'+t+'"';var n="icon",r=arguments[5];return r!==undefined&&(n=n+" custom_"+r),typeof e=="function"?e(arguments[3],t,n,!0):'<img class="'+n+'" src="'+e.uri+'"'+t+"/>"}},this.fillIcons=function(e){e.each(function(e){window.fillRecoloredIcon(e)})},this.list=function(){return Object.keys(n)},this.debug=function(){return n}}window.icons=new t});