/**
 * Provide a configuration/list of available data-providers for attributes.
 * 
 * May be used for any attribute which is defined in the schema/xsd and referenced by a globally defined type
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
 * @since       2012-10-17
 */

var DataProviderConfig={address:{_nodeValue:{url:"editor/dataproviders/list_all_addresses.php",cache:!0,userInputAllowed:!0,grouped:!0}},rrd:{_nodeValue:{url:"editor/dataproviders/list_all_rrds.php",cache:!0,userInputAllowed:!0}},icon:{name:{url:"editor/dataproviders/list_all_icons.php",cache:!0,userInputAllowed:!1}},plugin:{name:{url:"editor/dataproviders/list_all_plugins.php",cache:!0,userInputAllowed:!1}},pages:{design:{url:"designs/get_designs.php",map:function(e){return{value:e,label:e}},cache:!0,userInputAllowed:!1}},"*":{rrd:{url:"editor/dataproviders/list_all_rrds.php",cache:!0,userInputAllowed:!0},ga:{url:"editor/dataproviders/list_all_addresses.php",cache:!0,userInputAllowed:!0,grouped:!0},transform:{url:"editor/dataproviders/dpt_list.json",cache:!0,userInputAllowed:!1},styling:{live:function(){var e=[];return $("#config").find(".element > .name.nodeType_styling .nameValue").each(function(){var t=$(this).text(),n={value:t,label:t};e.push(n)}),e},cache:!1,userInputAllowed:!1},mapping:{live:function(){var e=[];return $("#config").find(".element > .name.nodeType_mapping .nameValue").each(function(){var t=$(this).text(),n={value:t,label:t};e.push(n)}),e},cache:!1,userInputAllowed:!1}}};