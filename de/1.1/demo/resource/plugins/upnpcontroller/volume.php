<?php
/* volume.php (c) 2012 by Mark K. [mr dot remy at gmx dot de]
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

require 'upnpctrl_util.php';

//header("content-type: text/html");
header("content-type: text/json");
$volume = $_GET['volume'] ?? '';

$cmd_setvolume='POST /MediaRenderer/RenderingControl/Control HTTP/1.1
CONNECTION: close
HOST: '.$address.':'.$port.'
CONTENT-LENGTH: 32'.strlen($volume).'
CONTENT-TYPE: text/xml; charset="utf-8"
SOAPACTION: "urn:schemas-upnp-org:service:RenderingControl:1#SetVolume"

<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"><s:Body><u:SetVolume xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>0</InstanceID><Channel>Master</Channel><DesiredVolume>'.$volume.'</DesiredVolume></u:SetVolume></s:Body></s:Envelope>';

$actionResponse = sendUpnpAction($cmd_setvolume, $address, $port);

//echo "actionResponse xml: ";
//print_r($actionResponse);
//echo "</br>'";

$xmlParser = xml_parser_create("UTF-8");
xml_parser_set_option($xmlParser, XML_OPTION_TARGET_ENCODING, "UTF-8");
xml_parse_into_struct($xmlParser, $actionResponse, $actionResponseArray, $index);
xml_parser_free($xmlParser);

//print_r($actionResponseArray);
//print_r($index);

print_r("{\"actionstatus\" : 'OK'}");

?>