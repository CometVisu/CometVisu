<?php
/*****************************************************************************/
/* rsslog.php - A simple log message receiver and sender via RSS             */
/*                                                                           */
/* (c) 2011 by Christian Mayer                                               */
/* Licenced under the GPLv3                                                  */
/*****************************************************************************/

// The URL parameter "database" is the name of an entry in the hidden config
// that contains information about how to access the database.
// When it is not set the "sqlite" backend is used as default.

// There are different modes of operation
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
// 7. Info page:
//    URL parameter "info" Show an info page

include '../../config/hidden.php';
$database = $hidden[($_GET['database'] ?? '')] ?? array();
$database['type'] = $database['type'] ?? 'sqlite';
$database['db'] = preg_replace('/[^a-zA-Z0-9_]/s','', $database['db'] ?? 'rsslog');
$database['logs'] = preg_replace('/[^a-zA-Z0-9_]/s','', $database['logs'] ?? 'Logs');
$database['version'] = preg_replace('/[^a-zA-Z0-9_]/s','', $database['version'] ?? 'Version');

switch($database['type']) {
  case 'sqlite':
    // look where to store DB
    $dbfile = $database['file'] ?? '';
    if ($dbfile === '') {
      if (is_dir('/etc/wiregate/rss'))  // Default for Wiregate
        $dbfile = '/etc/wiregate/rss/rsslog.db';
      elseif (is_dir('/etc/cometvisu')) // Central option for non-Wiregate systems
        $dbfile = '/etc/cometvisu/rsslog.db';
      elseif (is_dir('../../config/media')) // Central option for Docker based systems and a good generic choice anyway
        $dbfile = '../../config/media/rsslog.db';
      else                              // if not found use local plugin directory
        $dbfile = getcwd() . '/rsslog.db';
    }

    //check if the DIRECTORY is writeable by the webserver
    $dbfile_dir = dirname($dbfile);
    if (! is_writable($dbfile_dir))
    {
      header("HTTP/1.0 403 Forbidden");
      die ( "Database '$dbfile' not writeable! make sure the file AND " .
        "the directory '$dbfile_dir' are writeable by the webserver!" );
    }
    $database['file'] = $dbfile;
    break;

  case 'mysql':
    break;

  default:
    header("HTTP/1.0 500 Internal Server Error");
    die ( "Unknown database type '".$database['type']."'");
}

$database = openDb( $database );

// create table if it doesn't exists
create( $database );

if( isset($_GET['info']) )
{
  showInfo( $database );
} else if( isset($_GET['update']) )
{
  runUpdate( $database );
} else if( isset($_GET['c']) )
{ 
  // store a new log
  $store = true;
  $log_content = $_GET['c'] ?? '<no content>';
  $log_title = $_GET['h'] ?? '';
  $log_state = $_GET['state'] ?? 0;
  $log_mapping = $_GET['mapping'] ?? '';
  if( mb_detect_encoding($log_content, 'UTF-8', true) != 'UTF-8' )
    $log_content = utf8_encode($log_content);
  if( mb_detect_encoding($log_title, 'UTF-8', true) != 'UTF-8' )
    $log_title = utf8_encode($log_title);
  $log_tags    = $_GET['t'] ?? array();
  if(! is_array($log_tags))
    die("wrong format - use one or more t[]= for tags");
  insert( $database, $log_content, $log_title, $log_tags, $log_mapping, $log_state );
} else if( isset($_GET['dump']) )
{
  $result = retrieve( $database, NULL, NULL, NULL, true );
  ?>
<html><head><meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<title>RSSLog Information</title>
<link type="text/css" rel="stylesheet" href="../../cometvisu_management.css"></head><body>
<table border="1">
  <?php
  $records = 0;
  $tzo = (int) $_GET['tzo'] ?? 0;
  date_default_timezone_set('Etc/GMT' . ($tzo>=0?'+':'') . ($tzo/60));
  echo '<tr><th>ID</th><th>DateTime</th><th>Timestamp</th><th>Title</th><th>Content</th><th>Tags</th><th>Mapping</th><th>State</th></tr>';
  while( $row = $result->fetch(PDO::FETCH_ASSOC) )
  {
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
  $timestamp  = $_GET['r'] ?? '';
  $filter  = $_GET['f'] ?? '';
  delete( $database, $timestamp, $filter );
?>
Successfully run deletion.
<?php
} else if( isset($_GET['j']) )
{
  header('Content-Type: application/json');
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
  $log_filter  = $_GET['f'] ?? NULL;
  $state = $_GET['state'] ?? NULL;
  $future = $_GET['future'] ?? NULL;

  // retrieve data
  $result = retrieve( $database, $log_filter, $state, $future );
  $first = true;
  while( $row = $result->fetch(PDO::FETCH_ASSOC) )
  {
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
  $newstate = $_GET['state'] ?? 0;
  if (!is_numeric($newstate))
    die("wrong format - state is required and has to be numeric");
  updatestate( $database, $id, $newstate );
?>
Successfully updated ID=<?php echo $id; ?>.
<?php
} else if ( isset($_GET['d']) ) {
  $id = $_GET['d'];
  if (!is_numeric($id))
    die("wrong format - id has to be numeric");
  deleteentry( $database, $id );
?>
Successfully deleted ID=<?php echo $id; ?>.
<?php
} else {
  // send logs
  $log_filter  = $_GET['f'] ?? NULL;
  $state = $_GET['state'] ?? NULL;
  $future = $_GET['future'] ?? NULL;
  $showMeta = ($_GET['showmeta'] ?? 'false') === 'true';

  // retrieve data
  $result = retrieve( $database, $log_filter, $state, $future );
  echo '<?xml version="1.0"?>';
  ?>
<rss version="2.0">
  <channel>
    <title>RSS supplied logs <?php echo $state; echo $log_filter; ?></title>
    <link><?php echo 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['SCRIPT_NAME']; ?></link>
    <description>RSS supplied logs</description>
  <?php
  // echo '<description>foo</description>';
  while( $row = $result->fetch(PDO::FETCH_ASSOC) )
  {
    $title = $row['title'] !== '' ? $row['title'] : $row['content'];
    if ($showMeta || $title === '') {
      $tags = ' [ id=' . $row['id']. ',state=' . $row['state'];
      if ($row['tags'])
        $tags .= ',' . $row['tags'];
      $tags .= ' ]';
      $title .= $tags;
    }
    echo '<item>';
    echo '<title>' . $title . '</title>';
    echo '<description>' . $row['content'] . '</description>';
    if ($row['tags'])
      foreach( explode(',', $row['tags']) as $tag )
        echo '<category>' . $tag . '</category>';
    echo '<pubDate>' . date( DATE_ATOM, $row['t'] ) . '</pubDate>';
    echo '<guid>' . $_SERVER['HTTP_HOST'] . $_SERVER['SCRIPT_NAME'] . '-' . ($_GET['database'] ?? '') . '-' . $row['id'] . '</guid>';
    echo '</item>' . "\n";
  }
  ?>
  </channel>
</rss>
  <?php
}

///////////////////////////////////////////////////////////////////////////////
// Open database
function openDb( $database )
{
  ////////////////////////////////////////////////////////////////////////////
  // Handle history:
  // rsslog.php used to use sqlite2 which is outdated and replaced by sqlite3.
  // As it is not clear whether the database file is already a sqlite3 we 
  // assume it optimistically but check it later on when a problem occurs:
  global $usedDBdriver;

  try {
    switch ($database['type']) {
      case 'sqlite':
        // create database connection - assuming it's sqlite3
        $dbh = new PDO('sqlite:' . $database['file'], null, null, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)) or die("cannot open the database with PDO(sqlite)");
        $usedDBdriver = 'sqlite';

        // check whether we can read
        $q = "SELECT name FROM sqlite_master WHERE type='table'";
        $result = $dbh->query( $q );
        if (!$result)
        {
          // open and read did not work => file might be sqlite2
          if( in_array('sqlite2', PDO::getAvailableDrivers()) )
          {
            $dbh = new PDO('sqlite2:' . $database['file'], null, null, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)) or die("cannot open the database with PDO(sqlite2)");

            // check whether we can read now
            $q = "SELECT name FROM sqlite_master WHERE type='table'";
            $result = $dbh->query( $q );
            if (!$result) die("Database read with PDO(sqlite2) failed!");

            $usedDBdriver = 'sqlite2';
          } else {
            header("HTTP/1.0 500 Internal Server Error");
            die("Database couldn't be open. Sqlite2 check couldn't be performed as driver is missing.");
          }
        }
        break;

      case 'mysql':
        if (!in_array('mysql', PDO::getAvailableDrivers(), TRUE)) {
          header("HTTP/1.0 500 Internal Server Error");
          die('The PHP PDO support for MySQL is not available. Please install it on the server!');
        }
        $dsn = 'mysql:';
        $dsn .= 'host=' . ($database['host'] ?? 'localhost');
        $dsn .= isset($database['port']) ? ';port='.$database['port'].';' : ';';
        $dsn .= 'database=' . $database['db'];

        $dbh = new PDO($dsn, $database['user'] ?? null, $database['pass'] ?? null, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)) or die("cannot open the database with PDO(mysql)");

        $usedDBdriver = 'mysql';
        break;

      default:
        header("HTTP/1.0 500 Internal Server Error");
        die ('Fatal error: Unknown type');
    }
  } catch (PDOException $e) {
    header("HTTP/1.0 500 Internal Server Error");
    die ('Database connection failed: ' . $e->getMessage());
  }

  $database['dbh'] = $dbh;
  return $database;
}

///////////////////////////////////////////////////////////////////////////////
// create tables if they don't exist
function create( $database )
{
  global $usedDBdriver;
  // Database versions:
  // 0: nothing
  // 1: old version prior 2016
  // 2: currently the latest one
  $logschema = 0;  // default: nothing exists yet

  $dbh = $database['dbh'];
  $db = $database['db'];
  $Version = $database['version'];
  $Logs = $database['logs'];

  try {
    // check: do we have a version information?
    $q = $database['type'] === 'sqlite'
      ? "SELECT name FROM sqlite_master WHERE type='table' AND name='$Version';"
      : "SHOW TABLE STATUS FROM $db WHERE Name = '$Version'";
    $result = $dbh->query($q);
    if (!$result) die("Cannot execute query. $q");
    $doesVersionExist = $database['type'] === 'mysql'
      ? 0 !== $result->rowCount()
      : $result->fetch(PDO::FETCH_NUM);
    if ($database['type'] === 'mysql') {
      $result = $dbh->query( "USE $db;" );
    }
    if (!$doesVersionExist) {
      // no table found - create it
      $q = "CREATE TABLE $Version (" .
        '  logschema INT' .
        ');';
      $ok = $dbh->exec($q);
      if ($ok === false)
        die("Cannot execute query. $q. " . end($dbh->errorInfo()));

      $q = $database['type'] === 'sqlite'
        ? "SELECT name FROM sqlite_master WHERE type='table' AND name='$Logs';"
        : "SHOW TABLE STATUS FROM $db WHERE Name = '$Logs'";
      $result = $dbh->query($q);
      if (!$result) die("Cannot execute query. $q");
      $doesLogsExist = $database['type'] === 'mysql'
        ? 0 !== $result->rowCount()
        : $result->fetch(PDO::FETCH_NUM);
      if ($doesLogsExist) {
        // no Version table but Log table
        // => sqlite database version prior 2016 or mysql before release 0.12
        $logschema = 1;
      }
      if ($database['type'] === 'mysql') {
        $result = $dbh->query( "USE $db;" );
      }

      $q = "INSERT INTO $Version( logschema ) VALUES( $logschema )";
      $ok = $dbh->exec($q);
      if ($ok === false)
        die("Cannot execute query. $q. " . end($dbh->errorInfo()));
    } else {
      $logschema = dbSchemaVersion($database);
      if (-1 === $logschema) {
        // this shouldn't happen - the table Version does exist but is empty
        $logschemaNew = 2;
      }
    }

    $AUTO_INCREMENT = $database['type'] === 'mysql'
      ? 'AUTO_INCREMENT'
      : '';

    $currentSchema =
      '(' .
      "  id INTEGER $AUTO_INCREMENT PRIMARY KEY," .
      '  title TEXT,' .
      '  content TEXT NOT NULL,' .
      '  tags TEXT,' .
      '  mapping TEXT,' .
      '  t TIMESTAMP,' .
      '  state INT' .
      ');';

    switch ($logschema) {
      case 0:  // initial setup of database
        // no table found - create it
        $q = "CREATE TABLE $Logs" . $currentSchema;
        $ok = $dbh->exec($q);
        if ($ok === false) die("Cannot execute query $q. " . end($dbh->errorInfo()));

        $logschemaNew = 2;
        break;

      case 1:  // version without mapping
        // note: SQLite2 has no ALTER TABLE - so do it the hard
        global $dbfile;
        die("Error: Database version is too old! Please use a rsslog.php of the CometVisu release 0.9.x or 0.10.x to convert it or discard it by deleting the file '$dbfile'.");

        $logschemaNew = 2;
        break;

      case 2:  // current
        $logschemaNew = 2;
        return;
    }

    // bump logschema
    if ($logschema != $logschemaNew) {
      $q = "UPDATE $Version SET logschema=$logschemaNew";
      $ok = $dbh->exec($q);
      if ($ok === false) die("Cannot execute query $q. " . end($dbh->errorInfo()));
    }
  } catch (PDOException $e) {
    header("HTTP/1.0 500 Internal Server Error");
    die ('Database creation step failed in line ' . $e->getLine() . ' with: ' . $e->getMessage());
  }
}

// insert a new log line
function insert( $database, $content, $title, $tags, $mapping, $state, $time = null)
{
  $dbh = $database['dbh'];
  $Logs = $database['logs'];

  if(null === $time) {
    $time = $database['type'] === 'mysql'
      ? 'NOW()'
      : "datetime('now')";
  }

  // store a new log line
  $q = "INSERT INTO $Logs(content, title, tags, mapping, t, state) VALUES( " .
       "  ?," .
       "  ?," .
       "  ?," .
       "  ?," .
       "  $time," .
       "  ?" .
       ')';
  try {
    $sth = $dbh->prepare( $q );
    $sth->execute( array($content, $title, implode(",",$tags), $mapping, $state) );
  } catch (PDOException $e) {
    header("HTTP/1.0 500 Internal Server Error");
    die("Cannot execute query. " . $e->getMessage() . " (Title: $title Content: $content Tags: $tags State: $state)");
  }
}

// return a handle to all the data
function retrieve( $database, $filter, $state, $future, $dump = false, $order = 'DESC', $asUnix = true )
{
  $dbh = $database['dbh'];
  $Logs = $database['logs'];

  if( $filter === NULL || $filter === '' )
  {
    $filters = Array();
    $filterString = '1=1';
  } else {
    $filters = explode(',', $filter); // accept filters by separated by ,
    function substrmatch($s) { return "%$s%"; };
    $filters = array_map( 'substrmatch', $filters );
    $filterString = '(tags LIKE ?) ' . str_repeat( 'OR (tags LIKE ?) ', count( $filters )-1 );
  }

  $t = $asUnix
    ? ($database['type'] === 'mysql'
      ? "UNIX_TIMESTAMP(t) AS t"
      : "strftime('%s', t) AS t")
    : 't';
  $q = "SELECT id, title, content, tags, mapping, state, $t FROM $Logs WHERE ($filterString) ";
  
  if (isset($state) AND is_numeric($state))
    $q .= " AND state=" . $state . " ";

  if (isset($future) AND is_numeric($future))
    $q .= $database['type'] === 'mysql'
      ? " AND (t <= NOW() + INTERVAL $future HOUR) "
      : " AND ((t <= datetime('now','+" . $future . " hour') )) ";
  else
    $q .= $database['type'] === 'mysql'
      ? " AND (t <= NOW()) "
      : " AND ((t <= datetime('now') )) ";
  
  $q .= "ORDER by t $order";
  if (!$dump)
    if( !isset($_GET['limit']) || !is_numeric($_GET['limit']) || '0' == $_GET['limit'] )
      $q .= " LIMIT 100";
    else
      $q .= " LIMIT " . $_GET['limit'];
  
  try  {
    $sth = $dbh->prepare( $q );
    $sth->execute( $filters );
  } catch (PDOException $e) {
    header("HTTP/1.0 500 Internal Server Error");
    die ('Database retrieve failed: ' . $e->getMessage());
  }
  return $sth;
}

// delete all log lines older than the timestamp and optional a filter
function delete( $database, $timestamp, $filter )
{
  $dbh = $database['dbh'];
  $Logs = $database['logs'];

  if( $filter === '' )
  {
    $filters = Array();
    $filterString = '1=1';
  } else {
    $filters = explode(',', $filter); // accept filters by separated by ,
    function substrmatch($s) { return "%$s%"; };
    $filters = array_map( 'substrmatch', $filters );
    $filterString = '(tags LIKE ?) ' . str_repeat( 'OR (tags LIKE ?) ', count( $filters )-1 );
  }

  $q = $database['type'] === 'mysql'
    ? "DELETE from $Logs WHERE UNIX_TIMESTAMP(t) < $timestamp AND ($filterString)"
    : "DELETE from $Logs WHERE t < datetime($timestamp, 'unixepoch') AND ($filterString)";
  try {
    $sth = $dbh->prepare( $q );
    $sth->execute( $filters );
  } catch (PDOException $e) {
    header("HTTP/1.0 500 Internal Server Error");
    die ('Cannot execute query: ' . $q . "<br/>\n" . $e->getMessage());
  }
}

function deleteentry( $database, $id )
{
  $dbh = $database['dbh'];
  $Logs = $database['logs'];

  $q = "DELETE from $Logs WHERE id = ?";
  try {
    $sth = $dbh->prepare( $q );
    $sth->execute( array($id) );
  } catch (PDOException $e) {
    header("HTTP/1.0 500 Internal Server Error");
    die ('Cannot execute query: ' . $e->getMessage());
  }
}

function updatestate( $database, $id, $newstate)
{
  $dbh = $database['dbh'];
  $Logs = $database['logs'];

  $q = "UPDATE $Logs SET state=? WHERE id=?";
  try {
    $sth = $dbh->prepare( $q );
    $sth->execute( array((int) $newstate, (int) $id) );
  } catch (PDOException $e) {
    header("HTTP/1.0 500 Internal Server Error");
    die ('Cannot execute query: ' . $e->getMessage());
  }
}

function countentries( $database )
{
  $dbh = $database['dbh'];
  $Logs = $database['logs'];
  $q = "SELECT COUNT(*) from $Logs";
  try {
    $result = $dbh->query( $q );
    $row = $result->fetch(PDO::FETCH_NUM);
  } catch (PDOException $e) {
    header("HTTP/1.0 500 Internal Server Error");
    die ('Cannot execute query: ' . $e->getMessage());
  }
  if( $row )
    return $row[0];
    
  return 'FAIL';
}

function dbSchemaVersion( $database )
{
  $dbh = $database['dbh'];
  $Version = $database['version'];
  $q = "SELECT logschema FROM $Version";

  try {
    $result = $dbh->query( $q );
    $row = $result->fetch(PDO::FETCH_NUM);
  } catch (PDOException $e) {
    header("HTTP/1.0 500 Internal Server Error");
    die ('Cannot execute query: ' . $e->getMessage());
  }
  if( $row )
    return $row[0];
  $result->closeCursor();

  // this shouldn't happen - no version entry in the table => fix it
  $q = "INSERT INTO $Version( logschema ) VALUES( -1 )";
  try {
    $dbh->exec( $q );
  } catch (PDOException $e) {
    header("HTTP/1.0 500 Internal Server Error");
    die ('Cannot execute query: ' . $e->getMessage());
  }

  return -1;
}

function update2to3( $database, $dbfile )
{
  global $usedDBdriver;

  $dbh = $database['dbh'];

  if( 'sqlite' === $usedDBdriver )
    return "Error: Database already updated!";
  
  $dbfileTmp = $dbfile . '.tmpMigration2to3';
  if( file_exists($dbfileTmp) )
  {
    // migration already going on
    if( time()-filemtime($dbfileTmp) > 600) {
      // file older than 10 minutes
      if( !unlink( $dbfileTmp ) )
        die( "Error: can't clean up potentially broken migration!" );
    } else {
      // file younger than 10 minutes
      die( "Error: already migrating!" );
    }
  }
  $dbhTmp = new PDO('sqlite:' . $dbfileTmp) or die("cannot open the temp database with PDO(sqlite)");
  create( $dbhTmp, $database );
  $result = retrieve( $dbh, '', NULL, NULL, true, 'ASC', false );
  while( $row = $result->fetch(PDO::FETCH_ASSOC) )
    insert( $dbhTmp, $row['content'], $row['title'], explode(',', $row['tags']), $row['mapping'], $row['state'], '"' . $row['t'] . '"' );
  
  // transfer done => close DBs and move file
  $dbh = null;
  $dbhTmp = null;
  rename( $dbfileTmp, $dbfile ) or die("Error: moving transfered database over old file");
  
  // return success
  return true;
}

///////////////////////////////////////////////////////////////////////////////
// Show management information
function showInfo($database)
{
  global $dbfile, $usedDBdriver, $hidden;
  $dbh = $database['dbh'];
?>
<html><head><meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<title>RSSLog Information</title>
<link type="text/css" rel="stylesheet" href="../../cometvisu_management.css"></head><body>
<h1>Information</h1>
<ul>
  <li>
    Database file: <?php echo $dbfile; ?>
  </li>
  <li>
    Active database driver: <?php echo $usedDBdriver; ?>
  </li>
  <li>
    Available database drivers: <?php echo join( ', ', PDO::getAvailableDrivers() ); ?>
  </li>
  <li>
    Selected hidden config: <?php
      echo $_GET['database'] ?? '<i>none</i>';
      if (($_GET['database'] ?? '') !== '') {
        $hiddenFound = array_key_exists($_GET['database'] ?? '', $hidden);
        echo ', hidden config found: ' . ($hiddenFound ? 'true' : 'false');
        if ($hiddenFound) {
          echo '</li><li>Database config: host = ' . ($database['host'] ?? 'localhost');
          echo '</li><li>Database config: port = ' . ($database['port'] ?? '');
          echo '</li><li>Database config: db = ' . ($database['db'] ?? '');
          echo '</li><li>Database config: user = ' . ($database['user'] ?? '');
          echo '</li><li>Database config: pass = ' . str_repeat('*', strlen(($database['pass'] ?? '')));
        }
      }
    ?>
  </li>
  <li>
    Database config: type = <?php echo $database['type']; ?>
  </li>
  <li>
    Database config: Table logs = <?php echo $database['logs'];  ?>
  </li>
  <li>
     Database config: Table version = <?php echo $database['version']; ?>
  </li>
  <li>
    Schema version: <?php echo dbSchemaVersion( $database ); ?>
  </li>
<?php
if( 'sqlite' !== $usedDBdriver && 'mysql' !== $usedDBdriver )
  echo '<li>Please update to latest database version by opening this <a href="?update">update page</a>.</li>';
?>
  <li>
    Current number of entries in the database: <?php echo countentries( $database ); ?>
  </li>
  <li>
    <a href="?dump" id="dump">Show complete database content</a>.
  </li>
  <li>
    <a href="?r=<?php echo strtotime("-1 week"); ?>">Delete entries older than 1 week</a>.
  </li>
  <li>
    <a href="?r=<?php echo strtotime("-1 month"); ?>">Delete entries older than 1 month</a>.
  </li>
  <li>
    <a href="?r=<?php echo strtotime("-1 year"); ?>">Delete entries older than 1 year</a>.
  </li>
</ul>
<script type="application/javascript">
  db = (new URLSearchParams(window.location.search)).get('database');
  if (db) {
    Array.from(document.getElementsByTagName('a')).forEach((a)=>{a.href=a.href+'&database='+db});
  }
  document.getElementById('dump').href = document.getElementById('dump').href + '&tzo=' + (new Date().getTimezoneOffset());
</script>
</body></html>
<?php
}

///////////////////////////////////////////////////////////////////////////////
// Update database to new version
function runUpdate($database)
{
  global $dbfile;
  $dbh = $database['dbh'];
?>
<html><head><meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<title>RSSLog Update</title>
<link type="text/css" rel="stylesheet" href="../../cometvisu_management.css"></head><body>
  <h1>Update</h1>
  Updating database (might take a while): <?php $result = update2to3( $database, $dbfile ); echo $result === true ? 'Success' : $result; ?>
</body></html>
<?php
}
?>
