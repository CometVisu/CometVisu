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
 * So the GET parameter "device" must be included in the file
 * "/config/hidden.php" and the URI will be matched against it.
 */

include '../../config/hidden.php';

$TR064device = $hidden[($_GET['device'] ?? '')] ?? false;
if( !$TR064device )
{
  header("HTTP/1.0 404 Not Found");
  echo 'Device key "' . ($_GET['device'] ?? '') . '" is not known in config file.';
  die();
}
$TR064_uri = $TR064device['uri'];
if( !$TR064_uri )
{
  header("HTTP/1.0 404 Not Found");
  echo 'Device uri not available.';
  die();
}

$context = NULL;
if( array_key_exists( 'selfsigned', $TR064device ) &&
  'true' == $TR064device['selfsigned']  ) {

  $context = stream_context_create( array(
    'ssl' => [
      'verify_peer' => false,
      'allow_self_signed' => true,
      'verify_peer_name' => false
    ]
  ) );
}

$uri = $_GET['uri'] ?? '';
$uri = preg_replace( '#^(https?://[^/]*/)? */*#', $TR064_uri, $uri );

if( $stream = @fopen($uri, 'r', false, $context) )
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