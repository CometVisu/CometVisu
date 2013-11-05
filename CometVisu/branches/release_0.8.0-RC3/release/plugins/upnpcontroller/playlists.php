<?php
/* playlists.php (c) 2012 by Mark K. [mr dot remy at gmx dot de]
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

$format = $_GET['format'];

if($format == 'html'){
	header("content-type: text/html");
}else{
	header("content-type: text/json");
}

$cmd_playlist='POST /MediaServer/ContentDirectory/Control HTTP/1.1
CONNECTION: close
HOST: '.$address.':'.$port.'
CONTENT-LENGTH: 416
CONTENT-TYPE: text/xml; charset="utf-8"
SOAPACTION: "urn:schemas-upnp-org:service:ContentDirectory:1#Browse"

<s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:Browse xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"><ObjectID>SQ:</ObjectID><BrowseFlag>BrowseDirectChildren</BrowseFlag><Filter></Filter><StartingIndex>0</StartingIndex><RequestedCount>100</RequestedCount><SortCriteria></SortCriteria></u:Browse></s:Body></s:Envelope>';


$actionResponse = sendUpnpAction($cmd_playlist, $address, $port);

//echo "actionResponse xml: ";
//print_r($actionResponse);
//echo "</br>'";

$xmlParser = xml_parser_create("UTF-8");
xml_parser_set_option($xmlParser, XML_OPTION_TARGET_ENCODING, "UTF-8");
xml_parse_into_struct($xmlParser, $actionResponse, $actionResponseArray, $index);
xml_parser_free($xmlParser);

//print_r($actionResponseArray);
//print_r($index);

$totalMatches = getValueOfResponse($actionResponseArray, "TOTALMATCHES");
$playListsMeta = getValueOfResponse($actionResponseArray, "RESULT");

$xmlParser = xml_parser_create("UTF-8");
xml_parser_set_option($xmlParser, XML_OPTION_TARGET_ENCODING, "UTF-8");
xml_parse_into_struct($xmlParser, $playListsMeta, $playListsArray, $index);
xml_parser_free($xmlParser);

//print_r($playListsArray);

$arraySize = count($playListsArray);
$playLists = array();
$j = 0;

for($i=0; $i < $arraySize; $i++)
{			
	$tag = $playListsArray[$i]['tag'];
			
	if($tag == "DC:TITLE"){
		$playLists[$j]['name'] = $playListsArray[$i]['value'];
		$playLists[$j]['url'] = $playListsArray[$i + 1]['value'];
		$playLists[$j]['urlenc'] =  urlencode((string)$playListsArray[$i + 1]['value']);
		
		$j++;
	}
}

//print_r($playLists);
        
$json_result = "{\"actionstatus\" : \"OK\", \"totalMatches\": " . $totalMatches;

$json_result .= ", \"playLists\": ";
$json_result .= json_encode($playLists);

$json_result .= "}";

print_r($json_result);

?>