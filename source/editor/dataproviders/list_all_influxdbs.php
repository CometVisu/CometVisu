<?php
/* vim: set expandtab tabstop=8 shiftwidth=2 softtabstop=2: */

/**
 * Provide a list of all system-known InfluxDB timeseries.
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
 * @link        http://cometvisu.de
 * @since       2018-11-04
 */

function query( $q, $db = '' )
{
  if( $db )
    $db = '&db=' . $db;

  return file_get_contents('http://localhost:8086/query?q=' . urlencode($q) . $db);
}

$arrData = array();

$databases = json_decode( query( 'show databases' ), true );
foreach( $databases[ 'results' ][ 0 ][ 'series' ][ 0 ][ 'values' ] as $databaseEntry )
{
  $database = $databaseEntry[ 0 ];
  if( '_internal' == $database )
    continue;

  $resSeries = array();
  $measurements = array();

  $seriesArr = json_decode( query( 'SHOW SERIES', $database ), true );
  $series = $seriesArr[ 'results' ][ 0 ][ 'series' ][ 0 ][ 'values' ];
  if( NULL != $series )
  {
    foreach( $series as $thisSeries )
    {
      $list = explode( ',', $thisSeries[ 0 ] );
      $measurement = array_shift( $list );
      if( !array_key_exists( $measurement, $measurements ) )
        $measurements[ $measurement ] = array();

      foreach( $list as $tag )
      {
        $tagKV = explode( '=', $tag );
        if( array_key_exists( $tagKV[ 0 ], $measurements[ $measurement ] ) )
        {
          $measurements[ $measurement ][ $tagKV[ 0 ] ][ $tagKV[ 1 ] ] = 1; // fake set operation
        } else
        {
          $measurements[ $measurement ][ $tagKV[ 0 ] ] = array( $tagKV[ 1 ] => 1 ); // fake set operation
        }
      }
    }
    // translate fake set to real set/array
    foreach( $measurements as $measurement => $measurementValues )
    {
      foreach( $measurementValues as $tag => $tagValues )
        $measurements[ $measurement ][ $tag ] = array_keys( $tagValues );
      $resSeries[ $measurement ] = $measurements[ $measurement ];

      // now forget all the nice information and compact to the relevant one:
      $arrData[] = array(
        'value' => $database . '/' . $measurement,
        'label' => ''
      );
    }
  }
}

Header("Content-type: application/json");
print json_encode($arrData);
exit;

?>
