/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

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

var DataProviderConfig = {
    'address': {
        '_nodeValue':  {
                url: 'editor/dataproviders/list_all_addresses.php',
                cache: true,
                userInputAllowed: true,
                grouped: true,
            },
    },
    'rrd': {
        '_nodeValue':  {
                url: 'editor/dataproviders/list_all_rrds.php',
                cache: true,
                userInputAllowed: true,
            },
    },
    'icon': {
        'name':  {
                url: 'editor/dataproviders/list_all_icons.php',
                cache: true,
                userInputAllowed: false,
            },
    },
    // wildcard: will match ANY elements attribute (lower prio than an exact element-attribute-match)
    '*': {
        'rrd':  {
                url: 'editor/dataproviders/list_all_rrds.php',
                cache: true,
                userInputAllowed: true,
            },
        'ga':  {
                url: 'editor/dataproviders/list_all_addresses.php',
                cache: true,
                userInputAllowed: true,
                grouped: true,
            },
        'transform':  {
                url: 'editor/dataproviders/dpt_list.json',
                cache: true,
                userInputAllowed: false,
            },
        'styling': {
                live: function() {
                                var stylings = [];
                                // find all current stylings and their names
                                $('#config').find('.element > .name.nodeType_styling .nameValue').each(function () {
                                    var text = $(this).text();

                                    // create an object for this styling
                                    var styling = {value: text, label: text};

                                    // push it to the stack
                                    stylings.push(styling);
                                });

                                // and off we go.
                                return stylings;
                            },
                cache: false,
                userInputAllowed: false,
            },
        'mapping': {
                live: function() {
                                var stylings = [];
                                // find all current mappings and their names
                                $('#config').find('.element > .name.nodeType_mapping .nameValue').each(function () {
                                    var text = $(this).text();

                                    // create an object for this styling
                                    var styling = {value: text, label: text};

                                    // push it to the stack
                                    stylings.push(styling);
                                });

                                // and off we go.
                                return stylings;
                            },
                cache: false,
                userInputAllowed: false,
            },
    },
};
