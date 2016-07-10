<?php
/*****************************************************************************/
/* rsslog_external.php - A simple wrapper to fetch cross-domain content      */
/* version 0.0.4                                                             */
/* (c) 2014 by ctr http://knx-user-forum.de/members/ctr.html                 */
/* Licenced under the GPLv3                                                  */
/*****************************************************************************/

$json_url = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=' . ($_GET["url"]) . '?' . time() . '&output=json';

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json; charset=utf-8');
$str = preg_replace('/\\\u003c.*?\\\u003e/', '', file_get_contents($json_url));
echo strip_tags($str);
?>
