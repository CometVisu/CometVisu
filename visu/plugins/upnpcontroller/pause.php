<?php
/* pause.php (c) 2012 by Mark K. [mr dot remy at gmx dot de]
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

$cmd_pause='POST /MediaRenderer/AVTransport/Control HTTP/1.1
CONNECTION: close
HOST: '.$address.':1400
CONTENT-LENGTH: 252
CONTENT-TYPE: text/xml; charset="utf-8"
SOAPACTION: "urn:schemas-upnp-org:service:AVTransport:1#Pause"

<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"><s:Body><u:Pause xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>0</InstanceID></u:Pause></s:Body></s:Envelope>';

$actionResponse = sendUpnpAction($cmd_pause, $address, $port);

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