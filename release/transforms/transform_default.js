/* transform_default.js (c) 2010 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

define(["jquery"],function(e){function t(t,n){for(trans in n)n[trans].link?Transform[t+":"+trans]=e.extend({},n[n[trans].link],n[trans]):Transform[t+":"+trans]=n[trans]}function n(e,t){return e.length>=t?e:(new Array(1+t-e.length)).join("0")+e}return Transform={raw:{name:"Only the RAW value",encode:function(e){return e},decode:function(e){return e}},"int":{name:"Cast to Int",encode:function(e){return e.toString()},decode:function(e){return parseInt(e)}},"float":{name:"Cast to Float",encode:function(e){return e.toString()},decode:function(e){return parseFloat(e)}}},{Transform:Transform,addTransform:t,zeroFillString:n}});