<?php
/* proxy.php (c) 2018 by Christian Mayer [CometVisu at ChristianMayer dot de]
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
 * This little PHP helper will fetch the page that the GET parameter "uri"
 * points to and pass it directly to the browser.
 *
 * This is a needed workaround for two reasons:
 * 1. A Fritz!Box only allows the device (IP address) to access an SID that
 *    recieved it by authentication.
 * 2. When the browser want's to authenticate itself it would need to know
 *    the credentials, i.e. they must be accessable in the same way as the
 *    CometVisu config file - something that should be prevented already in a
 *    medium secure environment.
 * 3. A Fritz!Box uses a self signed SSL certificate that created annoying
 *    messages on the client side.
 *
 * Security considerations:
 * A pure proxy script could create security problems by itself. To prevent
 * a misuse this proxy will only access the configured TR-064 device.
 * So the GET parameter "device" must be included in the JSON file
 * "/config/hidden/hidden.json" and the URI will be matched against it.
 */

$device = $_GET['device'];
$TR064devices = json_decode(file_get_contents('../../config/hidden/hidden.json'), TRUE);
$TR064device = $TR064devices[$device];
if( !$TR064device )
{
  header("HTTP/1.0 404 Not Found");
  echo 'Device "' . $device . '" is not known.';
  die();
}

$uri = $_GET['uri'];
if( strncmp( $TR064device, $uri, strlen($TR064device) ) != 0 )
  $uri = $TR064device . $uri;

if( $stream = @fopen($uri, 'r') )
{
  $content = stream_get_contents($stream);
  $meta = stream_get_meta_data($stream);
  fclose($stream);

  foreach( $meta['wrapper_data'] as $headerline )
    if( strncasecmp( 'Content-Type', $headerline, 12 ) == 0 )
      header( $headerline );

  echo $content;
} else {
  header("HTTP/1.0 404 Not Found");
  echo 'Error: proxy.php couldn\'t open URI "' . $uri . '"';
}

?>