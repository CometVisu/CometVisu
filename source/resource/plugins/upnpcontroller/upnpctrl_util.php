<?php
/* upnpctrl_util.php (c) 2012 by Mark K. [mr dot remy at gmx dot de]
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

$address = $_GET['player_ip_addr'] ?? '';
$port = $_GET['port'] ?? '';
$port = 1400;
$error_msg;


function handleError($errno, $errstr, $errfile, $errline)
{
    switch ($errno) {
    
	    case E_USER_ERROR:
			$error_msg = "Error [" . $errno . "] " . $errstr;
        	break;

	    case E_USER_WARNING:
			$error_msg = "WARNING [" . $errno . "] " . $errstr;
        	break;

    	case E_USER_NOTICE:
			$error_msg = "NOTICE [" . $errno . "] " . $errstr;
        	break;

    	default:
			$error_msg = "Unknown error [" . $errno . "] " . $errstr;
        	break;
    }

    return true;
}

set_error_handler('handleError');


	function sendUpnpAction($content, $address, $port)
	{
		$plainActionResponse = "";
		$recieveBuffer = "";
		
		try {
			$fp = fsockopen($address, $port, $errno, $errstr, 10);
		}
		catch (Exception $e)		
		{
			if(empty($error_msg)){
				$error_msg = "Error on opening the socket " . $address . ":" . $port;
			}

			return $array[0];
		}


		if (!$fp){
			if(empty($error_msg)){
				$error_msg = "Error on opening the socket " . $address . ":" . $port;
			}
			
			return $array[0];
		}   

		fputs ($fp, $content);

		while (!feof($fp)) {
			$recieveBuffer = fgets($fp, 256);
			$plainActionResponse .= $recieveBuffer;
		}

		fclose($fp);

		$array = preg_split("/\n/", $plainActionResponse);

		//debug trace
//		print_r($array);

		if(strpos($array[0], "200 OK") === false){
			if(empty($error_msg)){
				$error_msg = "Action response is not valid!";
			}
			
			return $array[0];
		}
		
		return $array[count($array) - 1];
	}
	
	function getValueOfResponse($responseArray, $name){
//		print_r('name: ' . $name);
	
        for($i = 0; $i < count($responseArray); $i++)
        {
//			print_r($responseArray[$i]['tag'] . '</br>');
			
			if(ereg($name."$", $responseArray[$i]['tag']) == false){
				continue;
			}else{
				return $responseArray[$i]['value'];
			}
		}
	}
?>