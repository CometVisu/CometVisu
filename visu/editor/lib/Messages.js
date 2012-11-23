/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * Listing of messages used throughout the editor in user-related information.
 * 
 * Might be the place for i18n
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
 * @since       2012-11-21
 */

var Messages = {
    validity: {
        configurationInvalid: 'The configuration appears to be not valid. ' +
                                'Please check with \'check_config.php\' for details.\n' +
                                'Error: \'%s\'',
        valueInvalid: 'This is not a valid value.',
        valueInvalidForType: 'This is not a valid value, expected \'%s\'',
        noMoreChildrenAllowed: 'This element allows for no more child-elements.',
    },
    loader: {
        loading: 'Loading and validating configuration, this may take several seconds...',
    },
    configuration: {
        filenameInvalid: 'no, empty or invalid filename given, can not instantiate without one',
        loadingError: 'configuration could not be loaded, \'%s\' / \'%s\'',
        schemaNotFound: 'no schema/xsd found in root-level-element, can not run without one',
    },
    editor: {
        elementNotRemovable: 'This element can not be removed',
        tooltips: {
            clickToEdit: 'click to edit',
            buttons: {
                disabled: 'not avilable',
                addChild: 'Add an element as a child',
                remove: 'Remove this element and all of its children',
                attributes: 'Toggle display of attributes for this element',
                children: 'Toggle display of child-elements for this element',
            },
        },
    },
    schema: {
        complexType: 'complex type, please see documentation',
    },
};
