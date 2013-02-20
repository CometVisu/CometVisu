<?php
/* status.php (c) 2012 by Mark K. [mr dot remy at gmx dot de]
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

$cmd_getvolume='POST /MediaRenderer/RenderingControl/Control HTTP/1.1
CONNECTION: close
HOST: '.$address.':'.$port.'
CONTENT-LENGTH: 296
CONTENT-TYPE: text/xml; charset="utf-8"
SOAPACTION: "urn:schemas-upnp-org:service:RenderingControl:1#GetVolume"

<s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><ns0:GetVolume xmlns:ns0="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>0</InstanceID><Channel>Master</Channel></ns0:GetVolume></s:Body></s:Envelope>';

$cmd_getmute='POST /MediaRenderer/RenderingControl/Control HTTP/1.1
CONNECTION: close
HOST: '.$address.':'.$port.'
CONTENT-LENGTH: 288
CONTENT-TYPE: text/xml; charset="utf-8"
SOAPACTION: "urn:schemas-upnp-org:service:RenderingControl:1#GetMute"

<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"><s:Body><u:GetMute xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>0</InstanceID><Channel>Master</Channel></ns0:GetMute></s:Body></s:Envelope>';

$cmd_getpositioninfo='POST /MediaRenderer/AVTransport/Control HTTP/1.1
CONNECTION: close
HOST: '.$address.':'.$port.'
CONTENT-LENGTH: 299  
CONTENT-TYPE: text/xml; charset="utf-8"
SOAPACTION: "urn:schemas-upnp-org:service:AVTransport:1#GetPositionInfo"

<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"><s:Body><u:GetPositionInfo xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>0</InstanceID><Channel>Master</Channel></ns0:GetPositionInfo></s:Body></s:Envelope>';

$cmd_gettransportinfo='POST /MediaRenderer/AVTransport/Control HTTP/1.1
CONNECTION: close
HOST: '.$address.':'.$port.'
CONTENT-LENGTH: 274
CONTENT-TYPE: text/xml; charset="utf-8"
SOAPACTION: "urn:schemas-upnp-org:service:AVTransport:1#GetTransportInfo"

<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"><s:Body><u:GetTransportInfo xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>0</InstanceID></u:GetTransportInfo></s:Body></s:Envelope>';

	
	$actionResponse = sendUpnpAction($cmd_getvolume, $address, $port);

	//echo "actionResponse xml: ";
	//print_r($actionResponse);
	//echo "</br>'";

	$xmlParser = xml_parser_create("UTF-8");
	xml_parser_set_option($xmlParser, XML_OPTION_TARGET_ENCODING, "UTF-8");
	xml_parse_into_struct($xmlParser, $actionResponse, $actionResponseArray, $index);
	xml_parser_free($xmlParser);

	//print_r($actionResponseArray);
	//print_r($index);

	$volume = getValueOfResponse($actionResponseArray, "CURRENTVOLUME");

	$actionResponse = sendUpnpAction($cmd_getmute, $address, $port);
	$xmlParser = xml_parser_create("UTF-8");
	xml_parser_set_option($xmlParser, XML_OPTION_TARGET_ENCODING, "UTF-8");
	xml_parse_into_struct($xmlParser, $actionResponse, $actionResponseArray, $index);
	xml_parser_free($xmlParser);

	//print_r($actionResponseArray);

	$muteState = getValueOfResponse($actionResponseArray, "CURRENTMUTE");
	
	$actionResponse = sendUpnpAction($cmd_gettransportinfo, $address, $port);
	$xmlParser = xml_parser_create("UTF-8");
	xml_parser_set_option($xmlParser, XML_OPTION_TARGET_ENCODING, "UTF-8");
	xml_parse_into_struct($xmlParser, $actionResponse, $actionResponseArray, $index);
	xml_parser_free($xmlParser);

//	print_r($actionResponseArray);

	$transportStateResponse = getValueOfResponse($actionResponseArray, "CURRENTTRANSPORTSTATE");
	
	if($transportStateResponse == "PAUSED_PLAYBACK"){
		$transportState = 'Pause';
	}else if($transportStateResponse == "PLAYING"){
		$transportState = 'Play';
	}else if($transportStateResponse == "STOPPED"){
		$transportState = 'Stop';
	}else{
		$transportState = 'unknown';
	}

	$actionResponse = sendUpnpAction($cmd_getpositioninfo, $address, $port);
	$xmlParser = xml_parser_create("UTF-8");
	xml_parser_set_option($xmlParser, XML_OPTION_TARGET_ENCODING, "UTF-8");
	xml_parse_into_struct($xmlParser, $actionResponse, $actionResponseArray, $index);
	xml_parser_free($xmlParser);

//	print_r($actionResponseArray);

	$reltimeResponse = getValueOfResponse($actionResponseArray, "RELTIME");
	$durationResponse = getValueOfResponse($actionResponseArray, "TRACKDURATION");
	$trackMetaDataResponse = getValueOfResponse($actionResponseArray, "TRACKMETADATA");
	
//	print_r($trackMetaDataResponse);

	$xmlParser = xml_parser_create("UTF-8");
	xml_parser_set_option($xmlParser, XML_OPTION_TARGET_ENCODING, "UTF-8");
	xml_parse_into_struct($xmlParser, $trackMetaDataResponse, $actionResponseArray, $index);
	xml_parser_free($xmlParser);

//	print_r($actionResponseArray);
	
	$title = getValueOfResponse($actionResponseArray, "TITLE");
	$artist = getValueOfResponse($actionResponseArray, "ALBUMARTIST");
	$album = getValueOfResponse($actionResponseArray, "ALBUM");

	//
	// create JSON response
	//
	print_r("{\"volume\" : " . $volume . ", \"muteState\" : " . $muteState 
				. ", \"transportState\" : \"" . $transportState 
				. "\" , \"reltimeResponse\" : \"" . $reltimeResponse 
				. "\" , \"durationResponse\" : \"" . $durationResponse
				. "\" , \"title\" : \"" . $title 
				. "\" , \"artist\" : \"" . $artist
				. "\" , \"album\" : \"" . $album 
				. "\" , \"error_msg\" : \"" . $error_msg . "\"}");

?>