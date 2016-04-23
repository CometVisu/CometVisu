<?php
/*****************************************************************************/
/* rsslog.php - A simple log message reciever and sender via RSS             */
/*                                                                           */
/* (c) 2011 by Christian Mayer                                               */
/* Licenced under the GPLv3                                                  */
/*****************************************************************************/

// There are diffentent modes of operation
// 1. Creating a new log line:
//    URL parameter "c":   the content of the log
//    URL parameter "t[]": a tag for later filtering. Multiple might be given, 
//                          separated by COMMA, usage &t[]=tag1,tag2 
//    URL parameter "h":   a header(title) for the entry; maybe empty 
//    URL parameter "state": (optional) state
//    URL parameter "mapping": (optional) mapping - used for displaying
// 2. Receive the log as RSS:
//    URL parameter "f":   The (optional) filter, only log lines with a tag
//                         that fit this string are sent
//    URL parameter "state": get only rows with state=value
//    URL parameter "limit": only get the latest "limit" entries
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


// look where to store DB
if (is_dir('/etc/wiregate/rss'))
  $dbfile = '/etc/wiregate/rss/rsslog.db';
else
    $dbfile = 'rsslog.db';

//check if the DIRECTORY is writeable by the webserver
$dbfile_dir = dirname($dbfile);
if (! is_writable($dbfile_dir))
    die ("Database $dbfile not writeable! make sure the file AND " .
        "the directory are writeable by the webserver!"); 

// create database connection
$db = sqlite_open($dbfile, 0666, $error);
if (!$db) die ($error);

// create table if it doesn't exists
create( $db );

if( isset($_GET['c']) )
{ 
  // store a new log
  $store = true;
  $log_content = $_GET['c'] ? $_GET['c'] : '<no content>';
  $log_title = $_GET['h'] ? $_GET['h'] : '';
  $log_state = $_GET['state'] ? $_GET['state'] : 0;
  $log_mapping = $_GET['mapping'] ? $_GET['mapping'] : '';
  if( mb_detect_encoding($log_content, 'UTF-8', true) != 'UTF-8' )
    $log_content = utf8_encode($log_content);
  if( mb_detect_encoding($log_title, 'UTF-8', true) != 'UTF-8' )
    $log_title = utf8_encode($log_title);
  $log_tags    = $_GET['t'] ? $_GET['t'] : array();
  if(! is_array($log_tags))
    die("wrong format - use one or more t[]= for tags");
  insert( $db, $log_content, $log_title, $log_tags, $log_mapping, $log_state );
} else if( isset($_GET['dump']) )
{
  $result = retrieve( $db, $log_filter, NULL, NULL );
  ?>
<html><head><meta http-equiv="Content-Type" content="text/html;charset=utf-8" /></head><body>
<table border="1">
  <?php
  $records = 0;
  echo '<tr><th>ID</th><th>DateTime</th><th>Timestamp</th><th>Title</th><th>Content</th><th>Tags</th><th>Mapping</th><th>State</th></tr>';
  while( sqlite_has_more($result) )
  {
    $row = sqlite_fetch_array($result, SQLITE_ASSOC ); 
    echo '<tr>';
    echo '<td>' . $row['id'] . '</td>';
    echo '<td>' . date( DATE_ATOM, $row['t'] ) . '</td>';
    echo '<td>' . $row['t'] . '</td>';
    echo '<td>' . $row['title'] . '</td>';
    echo '<td>' . $row['content'] . '</td>';
    echo '<td>' . $row['tags'] . '</td>';
    echo '<td>' . $row['mapping'] . '</td>';
    echo '<td>' . $row['state'] . '</td>';
    echo "</tr>\n";
    $records++;
  }
  echo '<tfoot><tr><td>Sum</td><td>' . $records . '</td></tr></tfoot>';
  ?>
</table>
</body></html>
  <?php
} else if( isset($_GET['r']) )
{
  $timestamp  = $_GET['r'] ? $_GET['r'] : '';
  $filter  = $_GET['f'] ? $_GET['f'] : '';
  delete( $db, $timestamp, $filter );
} else if( isset($_GET['j']) )
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
  $future = $_GET['future'];

  // retrieve data
  $result = retrieve( $db, $log_filter, $state, $future );
  $first = true;
  while( sqlite_has_more($result) )
  {
    $row = sqlite_fetch_array($result, SQLITE_ASSOC ); 
    if( !$first ) echo ",\n";
    echo '{';
    echo '"id": "' . $row['id'] . '",';
    echo '"title": "' . $row['title'] . '",';
    echo '"content": "' . $row['content'] . '",';
    echo '"tags": ' . json_encode(explode(",", $row['tags'])) . ',';
    echo '"mapping": "' . $row['mapping'] . '",';
    echo '"state": "' . $row['state'] . '",';
    echo '"publishedDate": "' . date( DATE_ATOM, $row['t'] ) . '"';
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
} else if ( isset($_GET['u']) ) {
  $id = $_GET['u'];
  if (!is_numeric($id))
    die("wrong format - id has to be numeric");
  $newstate = $_GET['state'];
  if (!is_numeric($newstate))
    die("wrong format - state is required and has to be numeric");
  updatestate( $db, $id, $newstate );
?>
Successfully updated ID=<?php echo $id; ?>.
<?php
} else if ( isset($_GET['d']) ) {
  $id = $_GET['d'];
  if (!is_numeric($id))
    die("wrong format - id has to be numeric");
  deleteentry( $db, $id );
?>
Successfully deleted ID=<?php echo $id; ?>.
<?php
} else {
  // send logs
  $log_filter  = $_GET['f'] ? $_GET['f'] : '';
  $state = $_GET['state']; // ? $_GET['state'] : '';
  $future = $_GET['future'];

  // retrieve data
  $result = retrieve( $db, $log_filter, $state, $future );
  echo '<?xml version="1.0"?>';
  ?>
<rss version="2.0">
  <channel>
    <title>RSS supplied logs <?php echo $state; echo $log_filter; ?></title>
    <link><?php echo 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['SCRIPT_NAME']; ?></link>
    <description>RSS supplied logs</description>
  <?php
  // echo '<description>foo</description>';
  while( sqlite_has_more($result) )
  {
    $row = sqlite_fetch_array($result, SQLITE_ASSOC );
    $tags = ' [ id=' . $row['id']. ',state=' . $row['state'];
    if ($row['tags'])
        $tags .= ',' . $row['tags'];
    $tags .= ' ]';
    echo '<item>';
    echo '<title>' . $row['title'] . $tags . '</title>';
    echo '<description>' . $row['content'] . '</description>';
    echo '<pubDate>' . date( DATE_ATOM, $row['t'] ) . '</pubDate>';
    echo '</item>' . "\n";
  }
  ?>
  </channel>
</rss>
  <?php
}

sqlite_close($db);

///////////////////////////////////////////////////////////////////////////////
// create tables if they don't exist
function create( $db )
{
  $logschema = 0;  // default: nothing exists yet
  
  // check: do we have a version information?
  $q = "SELECT name FROM sqlite_master WHERE type='table' AND name='Version';";
  $result = sqlite_query( $db, $q, SQLITE_NUM );
  if (!$result) die("Cannot execute query. $q");
  if( !sqlite_has_more($result) )
  {
    // no table found - create it
    $q = 'CREATE TABLE Version(' .
        '  logschema INT' .
        ');' . 
        'INSERT INTO Version( logschema ) VALUES( 0 );';
    $ok = sqlite_exec($db, $q, $error);
    
    if (!$ok)
      die("Cannot execute query $q. $error");
    
    $q = "SELECT name FROM sqlite_master WHERE type='table' AND name='Logs';";
    $result = sqlite_query( $db, $q, SQLITE_NUM );
    if (!$result) die("Cannot execute query. $q");
    if( sqlite_has_more($result) )
    {
      // no Version table but Log table
      // => database version prior 2016
      $logschema = 1;
    }
  } else {
    $q = "SELECT logschema FROM Version";
    $res = sqlite_query( $db, $q, SQLITE_ASSOC );
    $logschema = sqlite_fetch_single( $res );
  }
  
  $currentSchema = 
    '(' .
    '  id INTEGER PRIMARY KEY,' .
    '  title TEXT,' . 
    '  content TEXT NOT NULL,' .
    '  tags TEXT,' .
    '  mapping TEXT,' .
    '  t TIMESTAMP,' .
    '  state INT' .
    ');';
    
  switch( $logschema )
  {
    case 0:  // inital setup of database
      // no table found - create it
      $q = 'CREATE TABLE Logs' . $currentSchema;
      $ok = sqlite_exec($db, $q, $error);
      if (!$ok) die("Cannot execute query $q. $error");
        
      $logschema = 2;
      break;
      
    case 1:  // version without mapping
      // note: SQLite2 has no ALTER TABLE - so do it the hard way
      $q = 'CREATE TEMPORARY TABLE TempLogs' . $currentSchema .
        'INSERT INTO TempLogs SELECT id, title, content, tags, "", t, state FROM Logs;' .
        'DROP TABLE Logs;' .
        'CREATE TABLE Logs' . $currentSchema .
        'INSERT INTO Logs SELECT id, title, content, tags, mapping, t, state FROM TempLogs;' .
        'DROP TABLE TempLogs;';
      $ok = sqlite_exec($db, $q, $error);
      if (!$ok) die("Cannot execute query $q. $error");
    
      $logschema = 2;
      break;
      
    case 2:  // current
      return; 
  }
  
  // bump logschema
  $q = 'UPDATE Version SET logschema=' . $logschema . ';';
  $ok = sqlite_exec($db, $q, $error);
  if (!$ok) die("Cannot execute query. $error");
}

// insert a new log line
function insert( $db, $content, $title, $tags, $mapping, $state )
{
  // store a new log line
  $q = 'INSERT INTO Logs(content, title, tags, mapping, t, state) VALUES( ' .
       "  '" . sqlite_escape_string( $content ) . "'," .
       "  '" . sqlite_escape_string( $title ) . "'," .
       "  '" . sqlite_escape_string( implode(",",$tags) ) . "'," .
       "  '" . sqlite_escape_string( $mapping ) . "'," .
       "  datetime('now')," .
       "  $state" .
       ')';
  
  $ok = sqlite_exec($db, $q, $error);
  
  if (!$ok)
    die("Cannot execute query. $error (Title: $itle Content: $content Tags: $tags State: $state)");
}

// return a handle to all the data
function retrieve( $db, $filter, $state, $future )
{
  $filters = explode(',', $filter); // accept filters by separated by ,
  foreach ($filters as $i => $val) {
    $filters[$i] = " (tags LIKE '%" . sqlite_escape_string($val) . "%') ";
  }
  
  $q = "SELECT id, title, content, tags, mapping, state, strftime('%s', t) AS t FROM Logs WHERE (" . implode('OR', $filters) . ")";
  
  if (isset($state) AND is_numeric($state))
    $q .= " AND state=" . $state . " ";

  if (isset($future) AND is_numeric($future))
    $q .= " AND ((t  <= datetime('now','+" . $future . " hour') )) ";
  else
    $q .= " AND ((t  <= datetime('now') ))";
  
  $q .= "ORDER by t DESC";
  if (!isset($_GET['dump']))
    if( !isset($_GET['limit']) || !is_numeric($_GET['limit']) || '0' == $_GET['limit'] )
      $q .= " LIMIT 100";
    else
      $q .= " LIMIT " . $_GET['limit'];
  return sqlite_query( $db, $q, SQLITE_ASSOC );
}

// delete all log lines older than the timestamp and optional a filter
function delete( $db, $timestamp, $filter )
{
  $filters = explode(',', $filter); // accept filters by separated by ,
  foreach ($filters as $i => $val) {
    $filters[$i] = " (tags LIKE '%" . sqlite_escape_string($val) . "%') ";
  }

  $q = "DELETE from Logs WHERE t < datetime($timestamp, 'unixepoch') AND (" . implode('OR', $filters) . ")";
  $ok = sqlite_exec($db, $q, $error);
  
  if (!$ok)
    die("Cannot execute query. $error");
}

function deleteentry( $db, $id )
{
  $q = "DELETE from Logs WHERE id = $id";
  $ok = sqlite_exec($db, $q, $error);
  
  if (!$ok)
    die("Cannot execute query. $error");
}

function updatestate( $db, $id, $newstate)
{
  $q = 'UPDATE Logs SET state=' . $newstate . ' WHERE id=' . $id . ';';
  $ok = sqlite_exec($db, $q, $error);
  
  if (!$ok)
    die("Cannot execute query. $error");
}
?>
