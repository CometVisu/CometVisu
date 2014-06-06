<?php
/*****************************************************************************/
/* rsslog.php - A simple log message reciever and sender via RSS             */
/*                                                                           */
/* (c) 2011 by Christian Mayer                                               */
/* Licenced under the GPLv3                                                  */
/*****************************************************************************/

/* 
Re-write by PelliX 2014 for MySQL instead of SQLite(3) 

Use the following SQL query to create the table. 

CREATE TABLE `rsslog` (
  `id` int(3) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(20) DEFAULT NULL,
  `content` varchar(250) DEFAULT NULL,
  `tags` varchar(25) DEFAULT NULL,
  `t` varchar(50) NOT NULL,
  `state` int(3) unsigned DEFAULT NULL,
  UNIQUE KEY `ID` (`id`)
) TYPE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=latin1 COMMENT='RSSlog plugin entries';

*/

// There are diffentent modes of operation
// 1. Creating a new log line:
//    URL parameter "c":   the content of the log
//    URL parameter "t[]": a tag for later filtering. Multiple might be given, 
//                          separated by COMMA, usage &t[]=tag1,tag2 
//    URL parameter "h":   a header(title) for the entry; maybe empty 
//    URL parameter "state": (optional) state

// 2. Receive the log as RSS:
//    URL parameter "f":   The (optional) filter, only log lines with a tag
//                         that fit this string are sent
//    URL parameter "state": get only rows with state=value

// 3. Dump all the content in a HTML page:
//    URL parameter "dump" - no value needed

// 4. Remove old content:
//    URL parameter "r":   the timestamp (seconds since 1970) of the oldest log
//                         line to keep
//    URL parameter "f":   The (optional) filter, only log lines with a tag
//                         that fit this string are deleted
// 4a. Remove single line:
//    URL parameter "d":   id of row to delete

// 5. Get content as JSON:
//    URL parameter "j"

// 6. Update state:
//    URL parameter "u" id of row
//    URL parameter "state": new state

// 7. Create MySQL table:
//	  URL parameter "table"


// Configuration
$mysql_db = "db_name";
$mysql_table = "tbl_name";
$mysql_user = "user";
$mysql_pass = "password";
$mysql_srv = "mysql.local.lan";


// disable error reporting (can interfere with data output)
error_reporting(0);

// MySQL connection
mysql_connect($mysql_srv, $mysql_user, $mysql_pass) or
	die ("database connection failed!" . mysql_error());
mysql_select_db($mysql_db) or
	die ("database cannot be located!" . mysql_error());

if(isset($_GET['c']))
{ 
	// store a new log
	$store = true;
	$log_content = $_GET['c'] ? $_GET['c'] : '<no content>';
	$log_title = $_GET['h'] ? $_GET['h'] : '';
	$log_state = $_GET['state'] ? $_GET['state'] : 0;
	if( mb_detect_encoding($log_content, 'UTF-8', true) != 'UTF-8' )
	$log_content = utf8_encode($log_content);
	if( mb_detect_encoding($log_title, 'UTF-8', true) != 'UTF-8' )
	$log_title = utf8_encode($log_title);
	$log_tags    = $_GET['t'] ? $_GET['t'] : array();
	if(! is_array($log_tags))
		die("wrong format - use one or more t[]= for tags");
	insert($log_content, $log_title, $log_tags, $log_state );
} 
else if(isset($_GET['dump']))
{
	// dump database in HTML table
	$result = retrieve( $log_filter, NULL );
	?>
	<html><head><meta http-equiv="Content-Type" content="text/html;charset=utf-8" /></head><body>
	<table border="1">
	<?php
	$records = 0;
	echo '<tr><th>ID</th><th>DateTime</th><th>Timestamp</th><th>Title</th><th>Content</th><th>Tags</th><th>State</th></tr>';
	while( $row = mysql_fetch_array($result) )
	{
		echo '<tr>';
		echo '<td>' . $row['id'] . '</td>';
		echo '<td>' . $row['t'] . '</td>';
		echo '<td>' . $row['t'] . '</td>';
		echo '<td>' . $row['title'] . '</td>';
		echo '<td>' . $row['content'] . '</td>';
		echo '<td>' . $row['tags'] . '</td>';
		echo '<td>' . $row['state'] . '</td>';
		echo "</tr>\n";
		$records++;
	}
	echo '<tfoot><tr><td>Sum</td><td>' . $records . '</td></tr></tfoot>';
	?>
	</table>
	</body></html>
	<?php
}
// delete function
else if(isset($_GET['r']))
{
	$timestamp  = $_GET['r'] ? $_GET['r'] : '';
	$filter  = $_GET['f'] ? $_GET['f'] : '';
	delete($timestamp, $filter);
} 
// JSON dump function
else if(isset($_GET['j']))
{
	?>
	{
	  "responseData" : {
		"feed" : {
		  "feedUrl": "<?php echo 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['SCRIPT_NAME']; ?>",
		  "title": "RSS supplied logs",
		  "link": "<?php echo 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['SCRIPT_NAME']; ?>",
		  "author": "",
		  "description": "RSS supplied logs",
		  "type": "rss20",
		  "entries": [
	<?php

	// send logs
	$log_filter  = $_GET['f'] ? $_GET['f'] : '';
	$state = $_GET['state']; // ? $_GET['state'] : '';

	// retrieve data
	$result = retrieve($log_filter, $state);
	$first = true;
	while($row = mysql_fetch_array($result))
	{
		if(!$first) echo ",\n";
		echo '{';
		echo '"id": "' . $row['id'] . '",';
		echo '"title": "' . $row['title'] . '",';
		echo '"content": "' . $row['content'] . '",';
		echo '"tags": ' . json_encode(explode(",", $row['tags'])) . ',';
		echo '"state": "' . $row['state'] . '",';
		echo '"publishedDate": "' . $row['t'] . '"';
		echo '}';
		$first = false;
	}
?>
		  ]
		}
	  },
	  "responseDetails" : null,
	  "responseStatus" : 200
	}
	<?php
} 
// update function
else if (isset($_GET['u'])) 
{
	$id = $_GET['u'];
	if (!is_numeric($id))
	{
		die("wrong format - id has to be numeric");
	}
	$newstate = $_GET['state'];
	if (!is_numeric($newstate))
	{
		die("wrong format - state is required and has to be numeric");
	}
	updatestate($id, $newstate);
	?>
	Successfully updated ID=<?php echo $id; ?>.
	<?php
} 
// delete entry function
else if (isset($_GET['d'])) {
	$id = $_GET['d'];
	if (!is_numeric($id))
	{
		die("wrong format - id has to be numeric");
	}
	deleteentry( $db, $id );
	?>
	Successfully deleted ID=<?php echo $id; ?>.
	<?php
}
// create table
else if (isset($_GET['table']))
{
	createtable($mysql_table);
}
else 
// regular retrieve function
{
	// send logs
	$log_filter  = $_GET['f'] ? $_GET['f'] : '';
	$state = $_GET['state']; // ? $_GET['state'] : '';

	// retrieve data
	$result = retrieve( $log_filter, $state );
	echo '<?xml version="1.0"?>';
	?>
	<rss version="2.0">
	  <channel>
		<title>RSS supplied logs <?php echo $state; echo $log_filter; ?></title>
		<link><?php echo 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['SCRIPT_NAME']; ?></link>
		<description>RSS supplied logs</description>
	<?php
	while($row = mysql_fetch_array($result))
	{
		$tags = ' [ id=' . $row['id']. ',state=' . $row['state'];
		if ($row['tags'])
		{
			$tags .= ',' . $row['tags'];
		}
		$tags .= ' ]';
		echo '<item>';
		echo '<title>' . $row['title'] . $tags . '</title>';
		echo '<description>' . $row['content'] . '</description>';
		echo '<pubDate>' . $row['t'] . '</pubDate>';
		echo '</item>' . "\n";
	}
	?>
	  </channel>
	</rss>
	<?php
} 

mysql_close();

// insert a new log entry
function insert($content, $title, $tags, $state)
{
	global $mysql_table;
	$q = 'INSERT INTO '.$mysql_table.'(content, title, tags, t, state) VALUES ( ' .
	   "  '" . mysql_escape_string( $content ) . "'," .
	   "  '" . mysql_escape_string( $title ) . "'," .
	   "  '" . mysql_escape_string( implode(",",$tags) ) . "'," .
	   "  DATE_FORMAT(NOW(), '%Y-%m-%dT%T')," .
	   "  $state" .
	   ')';
	print $q;
	$ok = mysql_query($q);

	if (!$ok)
	{
		die("Cannot execute query. (Title: $title Content: $content Tags: $tags State: $state)" . mysql_error());
	}
}

// return a handle to all the data
function retrieve($filter, $state)
{
	global $mysql_table;
	$filters = explode(',', $filter); // accept filters by separated by ,
	foreach ($filters as $i => $val) {
		$filters[$i] = " (tags LIKE '%" . mysql_escape_string($val) . "%') ";
	}
  
	$q = "SELECT id, title, content, tags, state, t FROM " . $mysql_table . " WHERE (" . implode('OR', $filters) . ")"; // ORIG
	if (isset($state))
	{
		$q .= " AND state=" . $state . " ";
	}
  
	$q .= "ORDER by t DESC";
	if (!isset($_GET['dump']))
	{
		$q .= " LIMIT 100";
	}
	return mysql_query($q);
}

// delete all log lines older than the timestamp and optional a filter
function delete($timestamp, $filter)
{
	global $mysql_table;
	$filters = explode(',', $filter); // accept filters by separated by ,
	foreach ($filters as $i => $val) {
		$filters[$i] = " (tags LIKE '%" . mysql_escape_string($val) . "%') ";
	}

	$q = "DELETE from " . $mysql_table . " WHERE t < datetime($timestamp, 'unixepoch') AND (" . implode('OR', $filters) . ")";
	$ok = mysql_query($q);
  
	if (!$ok)
	{
		die("Cannot execute query." . mysql_error());
	}
}

// delete a single entry
function deleteentry($id)
{
	global $mysql_table;
	$q = "DELETE from " . $mysql_table . " WHERE id = $id";
	$ok = mysql_query($q);
  
	if (!$ok)
	{
		die("Cannot execute query." . mysql_error());
	}
}

// update an entry (visible/crossed out)
function updatestate($id, $newstate)
{
	global $mysql_table;
	$q = 'UPDATE ' . $mysql_table . ' SET state=' . $newstate . ' WHERE id=' . $id . ';';
	$ok = mysql_query($q);
  
	if (!$ok)
	{
		die("Cannot execute query." . mysql_error());
	}
}

// create the MySQL table
function createtable($mysql_table)
{
	$q = "CREATE TABLE `" . $mysql_table . "` (" . 
		"`id` int(3) unsigned NOT NULL AUTO_INCREMENT," .
		"`title` varchar(20) DEFAULT NULL," . 
		"`content` varchar(250) DEFAULT NULL," .
		"`tags` varchar(25) DEFAULT NULL," .
		"`t` varchar(50) NOT NULL," . 
		"`state` int(3) unsigned DEFAULT NULL," . 
		"UNIQUE KEY `ID` (`id`)" . 
		") TYPE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=latin1 COMMENT='RSSlog plugin entries';";
	$ok = mysql_query($q);
	if (!$ok)
	{
		die("Failed to create table!" . mysql_error());
	}
}
?>
