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

include "../../config/hidden.php";

function query( $q, $db = '', $auth )
{
  global $hidden;

  if( $db )
    $db = '&db=' . $db;

  $context = NULL;
  $uri = 'http://localhost:8086/query';

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

    $context = stream_context_create( $opts );
  }

  $content = @file_get_contents( $uri . '?q=' . urlencode( $q ) . $db, false, $context );
  if( FALSE === $content )
  {
    $error = error_get_last();
    print $error['message'];
    exit;
  }
  return $content;
}

function getTs( $tsParameter, $field, $start, $end, $ds, $res, $fill, $filter )
{
  $ts = explode( '/', $tsParameter );
  if( '' == $ts[0] || '' == $ts[1] )
    return 'Error: wrong ts parameter [' . $tsParameter . ']';

  if( !preg_match('/^[A-Za-z0-9_\-]*$/', $ts[1]) )
    return 'Error: invalid series [' . $ts[1] . ']';

  if( '' == $field || !preg_match('/^[A-Za-z0-9_\-]*$/', $field) )
    $field = '*';

  switch( $end )
  {
    case 'now':
      $end = 'now()';
      break;

    case 'midnight+24hour':
      $end = strftime( "'%Y-%m-%d' + 1d" );
      break;

    default:
      if( !preg_match( '/^[A-Za-z0-9: +\-()]$/', $end ) )
        return 'Error: invalid end parameter [' . $end . ']';
  }

  preg_match_all( '/^end-([0-9]*)([a-z]*)$/', $start, $startParts );
  $map = array( 'hour' => 'h', 'day' => 'd', 'week' => 'w', 'month' => 'm', 'year' => 'y' );
  $start = $end . ' - ' . $startParts[1][0] . $map[ $startParts[2][0] ];

  if( $filter )
  {
    $filter = 'AND ' . str_replace( "\\'", "'", $filter );
  }

  if( '' != $res )
  {
    if( !preg_match( '/^[0-9]+$/', $res ) )
      return 'Error: invalid res parameter [' . $res . ']';
    switch( $ds )
    {
      case 'COUNT':
      case 'INTEGRAL':
      case 'MAX':
      case 'MEAN':
      case 'MEDIAN':
      case 'MIN':
      case 'MODE':
      case 'SPREAD':
      case 'STDDEV':
      case 'SUM':
        break;

      default:
        return 'Error: invalid ds parameter (required when res is set) [' . $ds . ']';
    }

    $q = sprintf( 'SELECT %s(%s) FROM "%s" WHERE time >= %s AND time <= %s %s GROUP BY time(%ss)', $ds, $field, $ts[ 1 ], $start, $end, $filter, $res );

    if( '' != $fill )
    {
      if( !preg_match( '/^([0-9eE.+-]+|linear|none|null|previous)$/', $fill ) )
        return 'Error: invalid fill parameter [' . $fill . ']';

      $q .= " fill($fill)";
    }
  } else {
    $q = sprintf( 'SELECT %s FROM "%s" WHERE time >= %s AND time <= %s %s', $field, $ts[ 1 ], $start, $end, $filter );
  }
  $tz = date_default_timezone_get();
  if( 'System/Localtime' == $tz )
    $tz = 'Europe/Berlin';  // best guess for a not good set up system
  $q .= " tz('$tz')";

  if( '' != $_GET['debug'] )
    var_dump($q);

  $arrData = array();

  $seriesArr = json_decode( query( $q, $ts[0], $_GET['auth'] ), true );
  $series = $seriesArr['results'][0]['series'][0]['values'];
  foreach( $series as $thisSeries )
  {
    $arrData[] = array(
      strtotime( $thisSeries[0] ),// * 1000,
      array( (string)$thisSeries[1] )
    );
  }

  return $arrData;
}

function printRow( $row )
{
  print '[' . $row[0] . '000,[';
  if( $row[1] )
  {
    print '"' . join('","', $row[1] ) . '"';
  }
  print ']]';
}

$arrData = getTs( $_GET['ts'], $_GET['field'], $_GET['start'], $_GET['end'], $_GET['ds'], $_GET['res'], $_GET['fill'], $_GET['filter'] );

Header("Content-type: application/json");

if( is_array( $arrData ) )
{
  print '[';
  printRow( array_shift( $arrData ) );
  if( $arrData )
  {
    foreach( $arrData as $row )
    {
      print ',';
      printRow( $row );
    }
  }
  print ']';
} else
  print $arrData;

?>