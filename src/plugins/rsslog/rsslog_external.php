<?php
/*****************************************************************************/
/* rsslog_external.php - A simple wrapper to fetch cross-domain content      */
/* version 0.0.1                                                             */
/* (c) 2014 by ctr http://knx-user-forum.de/members/ctr.html                 */
/* Licenced under the GPLv3                                                  */
/*****************************************************************************/

$json_url = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=' . ($_GET["url"]) . '&output=json';

header('Content-type: text/javascript; charset=utf-8');
echo file_get_contents($json_url);
?>
