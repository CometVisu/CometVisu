<?php
/* soap.php (c) 2018 by Christian Mayer [CometVisu at ChristianMayer dot de]
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */

/**
 * This PHP does the SOAP request required for the TR-064 protocol.
 * To hide the necessary credentials from the user they are fetched throug
 * a PHP based config file.
 */

include '../../config/hidden.php';

$TR064device = $hidden[$_GET['device']];
if( !$TR064device )
{
  header("HTTP/1.0 404 Not Found");
  echo 'Device key "' . $device . '" is not known in config file.';
  die();
}
$TR064_uri = $TR064device['uri'];
if( !$TR064_uri )
{
  header("HTTP/1.0 404 Not Found");
  echo 'Device uri not available.';
  die();
}
$TR064_user = $TR064device['user'];
if( !$TR064_user )
{
  header("HTTP/1.0 404 Not Found");
  echo 'Device user not available.';
  die();
}
$TR064_pass = $TR064device['pass'];
if( !$TR064_pass )
{
  header("HTTP/1.0 404 Not Found");
  echo 'Device pass not available.';
  die();
}

header('Content-type: application/json');

$debug = $_GET['debug']=='true';

$options = array(
  'exceptions'    => 0,
  'trace'         => ($debug?1:0),
  'location'      => $TR064_uri . $_GET['location'],
  'login'         => $TR064_user,
  'password'      => $TR064_pass,
  'authentication'=> SOAP_AUTHENTICATION_DIGEST,
  'uri'           => $_GET['uri']
);

$client = new SoapClient( null, $options );

$arguments = array();
$pArray = $_GET['p'];
$vArray = $_GET['v'];
if( is_array($pArray) )
{
  foreach( $pArray as $i => $p )
  {
    array_push( $arguments, new SoapParam($vArray[$i], $p) );
  }
}

$result = $client->__soapCall($_GET['fn'], $arguments);

echo json_encode($result);

if( $debug )
{
  echo "\n\n";
  var_dump( $result );
  echo "Request header:\n*****\n"  . $client->__getLastRequestHeaders()  . "\n*****\n\n";
  echo "Request:\n*****\n"         . $client->__getLastRequest()         . "\n*****\n\n";
  echo "Response header:\n*****\n" . $client->__getLastResponseHeaders() . "\n*****\n\n";
  echo "Response:\n*****\n"        . $client->__getLastResponse()        . "\n*****\n";
}

?>