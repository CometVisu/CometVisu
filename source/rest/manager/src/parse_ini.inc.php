<?php

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * Parse an ini-file without the problems that parse_ini_file has (like failing on values with brackets)
 * Source: http://www.php.net/manual/en/function.parse-ini-file.php#78815
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
 * @copyright   2013 Julian Makowski
 * @license     GPLv3 or later, http://opensource.org/licenses/gpl-license.php
 * @version     SVN: $Id$
 * @link        http://cometvisu.de
 * @since       2013-11-10
 */
function parse_ini($filepath) {
    $ini = file($filepath);
    if (count($ini) == 0) {
        return array();
    }
    $sections = array();
    $values = array();
    $globals = array();
    $i = 0;
    foreach ($ini as $line) {
        $line = trim($line);
        // Comments
        if ($line == '' || $line[0] == ';') {
            continue;
        }
        // Sections
        if ($line[0] == '[') {
            $sections[] = substr($line, 1, -1);
            $i++;
            continue;
        }
        // Key-value pair
        list( $key, $value ) = explode('=', $line, 2);
        $key = trim($key);
        $value = trim($value);
        if ($i == 0) {
            // Array values
            if (substr($line, -1, 2) == '[]') {
                $globals[$key][] = $value;
            } else {
                $globals[$key] = $value;
            }
        } else {
            // Array values
            if (substr($line, -1, 2) == '[]') {
                $values[$i - 1][$key][] = $value;
            } else {
                $values[$i - 1][$key] = $value;
            }
        }
    }
    for ($j = 0; $j < $i; $j++) {
        $result[$sections[$j]] = $values[$j];
    }
    return $result + $globals;
}

?>
