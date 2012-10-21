/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * Draw the configuration-tree on-screen
 *
 * This is most probably only an interims-file, and will be replaced by the Editor itself
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
 * @requires    Schema.js, Configuration.js
 */

/**
 * Class for dumping the configuration
 * 
 * @param   config  object  Configuration-object, fully loaded and equipped with its schema
 */
var DumpConfig = function (config) {
    var _dc = this;
    
    /**
     * Configuration
     * @var object
     */
    var _config = config;
    
    _dc.dump = function () {
        $('body').remove('#config');
        
        var container = $('<ul />').attr('id', 'config');
        
        $.each(_config.rootNodes, function (i, node) {
            dumpElement(node, container);
        });
        
        $('body').append(container);
    }
    
    /**
     * dump a single element
     * 
     * @param   element     object  ConfigurationElement to dump
     * @param   container   object  jQuery-object of our parent-DOMNode
     */
    var dumpElement = function (element, container) {
        var elementContainer = $('<li />');
        elementContainer.append($('<b />').html('Name: ' + element.name));
        
        var allowed = $('<span />');
        
        $.each(element.getSchemaElement().getAllowedElements(), function (i, item) {
            allowed.append($('<i />').html(item.name));
        });
        
        
        allowed.appendTo(elementContainer);

        if (element.children.length > 0) {
            var subElementContainer = $('<ul />');

            $.each(element.children, function (i, subElement) {
                dumpElement(subElement, subElementContainer);
            });
            subElementContainer.appendTo(elementContainer);
        }

        elementContainer.appendTo(container);
    }
}