/**
 * DataProvider-definition for the editor
 * 
 * with data-providers, the user can be displayed a list of choices instead of having to fill in
 * an empty text-field in an editor.
 * 
 * Will work with both server-provided data (via URL/AJAX) and in-configuration data (via jQuery)
 *
 *
 * LICENSE: This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 3
 * of the License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://opensource.org/licenses/gpl-license.php>;.
 *
 * @category    editor
 * @package     CometVisu
 * @author      Julian Makowski (julian at makowskis dot de)
 * @copyright   2012 Julian Makowski
 * @license     GPLv3 or later, http://opensource.org/licenses/gpl-license.php
 * @version     SVN: $Id$
 * @link        http://cometvisu.de
 * @since       2012-12-25
 * @requires    DataProviderConfig.js
 */

var DataProviderManager={getProvider:function(e,t){return typeof DataProviderManager._providers=="undefined"&&DataProviderManager.initialize(),typeof DataProviderManager._providers[e]=="undefined"?typeof DataProviderManager._providers["*"]=="undefined"?undefined:typeof DataProviderManager._providers["*"][t]!="undefined"?DataProviderManager._providers["*"][t]:undefined:typeof DataProviderManager._providers[e][t]!="undefined"?DataProviderManager._providers[e][t]:undefined},initialize:function(){if(typeof DataProviderConfig=="undefined")throw"programming error: no DataProviderConfig loaded";DataProviderManager._providers={attributes:{},elementValues:{}},$.each(DataProviderConfig,function(e,t){$.each(t,function(t,n){var r=new DataProvider(n);r.preloadData(),typeof DataProviderManager._providers[e]=="undefined"&&(DataProviderManager._providers[e]={}),DataProviderManager._providers[e][t]=r})})},_providers:undefined},DataProvider=function(e){var t=this,n=undefined,r=undefined,i=e;t.getEnumeration=function(){var e=u(),t=[];if(typeof i.grouped=="boolean"&&i.grouped==1){var n=[];$.each(e,function(e,t){n.push({label:e,elements:o(t)})}),t.push({group:n})}else t=o(e);return t},t.getHintsForValue=function(e){return undefined==n?undefined:(undefined==r&&(r=s()),typeof r[e]=="undefined"?undefined:r[e])};var s=function(){var e={},t=n;return typeof i.grouped=="boolean"&&i.grouped==1&&(t=[],$.each(n,function(e,n){$.each(n,function(e,n){t.push(n)})})),$.each(t,function(t,n){var r=n.value;if(typeof n.hints==undefined)return;e[r]=n.hints}),e};t.isUserInputAllowed=function(){return i.userInputAllowed};var o=function(e){var t=[];return typeof e=="undefined"?undefined:($.each(e,function(e,n){var r;r={label:n.label,value:n.value},t.push(r)}),t)};t.preloadData=function(){var e=typeof i.cache!="undefined"?i.cache:!0;if(!1===e)return;u()};var u=function(){if(n!==undefined)return n;var e=typeof i.cache!="undefined"?i.cache:!0,t=[];return typeof i.live=="function"&&(t=i.live(),1==e&&(n=t)),typeof i.url=="string"&&$.ajax(i.url,{dataType:"json",cache:e,async:!1,success:function(r){t=r,e==1&&(n=r)},error:function(e,t,n){var r=new Result(!1,Messages.dataProvider.loadingError,[t,n]);$(document).trigger("dataprovider_loading_error",[r])}}),typeof i.map=="function"&&$.each(t,function(e,n){t[e]=i.map(n)}),t}};