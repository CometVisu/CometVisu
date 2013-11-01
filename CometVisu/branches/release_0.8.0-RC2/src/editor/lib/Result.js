/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * Class for unified method feedback.
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

var Result = function (success, message, params) {
    var _result = this;
    
    _result.success = success;
    _result.message = message;
    
    if (typeof params == 'object' && params instanceof Array) {
        $.each(params, function (i, param) {
            _result.message = _result.message.replace(/%s/, param);
        });
    }
    
    _result.toString = function () {
        return _result.message;
    }
}
