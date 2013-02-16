/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * Class for unified inter-object communication
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
 * @since       2012-12-17
 */

/**
 * ListenerEvent is the centre of inter-object communication.
 * It is the transporter of information
 * 
 * @param   event   string  name of the event
 * @param   params  object  list of additional, programmer-only, information/params, optional
 * @param   result  object  Result-object, used for clear-text informations on the event, optional
 */
var ListenerEvent = function (event, params, result) {
    var _le = this;
    
    _le.event = event;
    _le.params = params;
    _le.result = undefined;
    
    if (typeof result == 'object') {
        _le.result = result;
    }
};