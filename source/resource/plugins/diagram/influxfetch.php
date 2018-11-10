<?php
/* vim: set expandtab tabstop=8 shiftwidth=2 softtabstop=2: */

/**
 * Read the InfluxDB and send the data to the diagram plugin widgets.
 *
 * This file will output a json-encoded object with multiple dimensions.
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
 * @author      Christian Mayer (mail at christianmayer dot de)
 * @copyright   2018 Christian Mayer
 * @license     GPLv3 or later, http://opensource.org/licenses/gpl-license.php
 * @link        http://cometvisu.de
 * @since       2018-11-09
 */

function query( $q, $db = '' )
{
  if( $db )
    $db = '&db=' . $db;

  return file_get_contents('http://localhost:8086/query?q=' . urlencode($q) . $db);
}

function getTs( $tsParameter )
{
  $ts = explode( '/', $tsParameter );
  if( '' == $ts[0] || '' == $ts[1] )
    return 'Error: wrong ts parameter [' . $tsParameter . ']';

  if( !preg_match('/^[A-Za-z0-9_\-]*$/', $ts[1]) )
    return 'Error: invalid series [' . $ts[1] . ']';

  $q = 'SELECT * FROM ' . $ts[1];

  $arrData = array();

  $seriesArr = json_decode( query( $q, $ts[0] ), true );
  $series = $seriesArr['results'][0]['series'][0]['values'];
  foreach( $series as $thisSeries )
  {
    $arrData[] = array(
      strtotime( $thisSeries[0] ) * 1000,
      array( (string)$thisSeries[1] )
    );
  }

  return $arrData;
}

$arrData = getTs( $_GET['ts'] );

Header("Content-type: application/json");
print json_encode($arrData);
exit;

?>