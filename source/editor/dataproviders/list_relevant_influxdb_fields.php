<?php
/* vim: set expandtab tabstop=8 shiftwidth=2 softtabstop=2: */

/**
 * Provide a list of all fields for an InfluxDB measurement.
 *
 *
 * This file will output a json-encoded object with multiple dimensions.
 * Each last node will have:
 * - value: the value for this node
 * - label: a user-readable description/title of this node
 * - hints: an object, defining a list of attributes that will be set on the same element in the editor, when this value
 *              is selected. There are NONE for this file
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
 * @author      Christian Mayer (mail at christianmayer dor de)
 * @copyright   2018 Christian Mayer
 * @license     GPLv3 or later, http://opensource.org/licenses/gpl-license.php
 * @link        https://www.cometvisu.org/
 * @since       2018-11-17
 */

include "../../resource/config/hidden.php";

function query( $q, $db = '', $auth )
{
  global $hidden;

  if( $db )
    $db = '&db=' . $db;

  $context = NULL;
  $uri = 'http://localhost:8086/query';

  // default to 'influx' when it is set in the hidden config but not set in the GET URL.
  if( NULL == $auth && array_key_exists( 'influx', $hidden ) )
    $influxKey = 'influx';
  else
    $influxKey = $auth;

  if( array_key_exists( $influxKey, $hidden ) )
  {
    if( array_key_exists( 'uri', $hidden[$influxKey] ) )
      $uri = $hidden[$influxKey]['uri'];

    $opts = array(
      'http' => array(
        'method' => "GET",
        'header' => "Authorization: Basic " . base64_encode( $hidden[$influxKey]['user'] . ':' . $hidden[$influxKey]['pass'] )
      )
    );
    if( array_key_exists( 'selfsigned', $hidden[$influxKey] ) &&
      'true' == $hidden[$influxKey]['selfsigned']  ) {
      $opts['ssl'] = [
        'verify_peer' => false,
        'allow_self_signed' => true,
        'verify_peer_name' => false
      ];
    }

    $context = stream_context_create( $opts );
  }

  $content = @file_get_contents( $uri . '?q=' . urlencode( $q ) . $db, false, $context );
  if( FALSE === $content )
  {
    $error = error_get_last();
    header("HTTP/1.0 500 Internal Server Error");
    print $error['message'];
    exit;
  }
  return $content;
}

function getFields( $tsParameter, $auth )
{
  $ts = explode( '/', $tsParameter );
  if( '' == $ts[0] || '' == $ts[1] )
    return 'Error: wrong measurement parameter [' . $tsParameter . ']';

  $arrData = array(array('value' => '*', 'label' => 'Default: *', 'forceOnlyLabel' => 1 ));

  $fieldsArr = json_decode( query( 'SHOW FIELD KEYS FROM ' . $ts[1], $ts[0], $auth ), true );
  $fields = $fieldsArr[ 'results' ][ 0 ][ 'series' ][ 0 ][ 'values' ];
  if( NULL != $fields )
  {
    foreach( $fields as $thisField )
    {
      $l = '';
      $r = '';

      if( 'string' == $thisField[1] )
      {
        $l = '[';
        $r = ']';
      }
      $arrData[] = array('value' => $thisField[0], 'label' => sprintf( '%s%s (%s)%s', $l, $thisField[0], $thisField[1], $r ), 'forceOnlyLabel' => 1 );
    }
  }

  return $arrData;
}

$arrData = getFields( $_GET['measurement'] ?? '', $_GET['auth'] ?? '');

Header("Content-type: application/json");
print json_encode($arrData);
exit;

?>