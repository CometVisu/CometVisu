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

var Messages={language:"en",validity:{configurationInvalid:"The configuration appears to be not valid. Please check with 'check_config.php' for details.\nError: '%s'",valueInvalid:"This is not a valid value.",valueInvalidForType:"This is not a valid value, expected '%s'",noMoreChildrenAllowed:"This element allows for no more child-elements."},loader:{loading:"Loading and validating configuration, this may take several seconds..."},configuration:{filenameInvalid:"no, empty or invalid filename given, can not instantiate without one",loadingError:"configuration could not be loaded, '%s' / '%s'",savingError:"configuration could not be saved, server responded with '%s'",savingErrorUnknown:"configuration could not be saved, server-response is not understood",savingErrorServer:"configuration could not be saved, server responded with '%s' / '%s'",saved:"configuration was saved.",schemaNotFound:"no schema/xsd found in root-level-element, can not run without one"},dataProvider:{loadingError:"data-provider could not be loaded, '%s' / '%s'"},editor:{elementNotRemovable:"This element can not be removed",elementNotCuttable:"This element can not be cut - please use copy instead",notSavingInvalidConfiguration:"The configuration is not valid, and as such can not be saved.",ui:{disabled:{tooltip:"not avilable",text:undefined},addChild:{tooltip:"Add an element as a child",text:"add child"},remove:{tooltip:"Remove this element and all of its children",text:"remove"},attributes:{tooltip:"Display attributes for this element",text:undefined},children:{tooltip:"Toggle display of child-elements for this element",text:undefined},cut:{tooltip:"cut",text:"cut"},copy:{tooltip:"copy",text:"copy"},paste:{tooltip:"paste",text:"paste"},sort:{tooltip:"sort",text:"sort"},toggleSubmenu:{tooltip:"Toggle display of submenu/action-menu",text:undefined},clickToEdit:{tooltip:"click to edit",text:undefined},save:{tooltip:"validate config and save",text:"save"},preview:{tooltip:"validate config, save it temporarily, and preview it",text:"preview"},expert:{tooltip:"show/hide attributes for advanced configuration",text:"complex"}}},schema:{complexType:"complex type, please see documentation"}};