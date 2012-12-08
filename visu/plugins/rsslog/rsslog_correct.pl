#!/usr/bin/perl
#
# (c) 2011 by Jan N. Klug
# Licenced under the GPLv3      
#
# add state-column to rsslog-database
# use ONLY if your databse is created with rsslog.php before Rev. 703!
#
# usage: ./rsslog_correct.pl
# change path to database !

# config
my $logdb = '/etc/wiregate/rss/rsslog.db';

# ab hier nichts aendern

#allgemeine Deklarationen
use strict;
use DBI;

# Datenbank öfnnen
if (! -e $logdb) {
 die "$logdb existiert nicht! Bitte mit rsslog.php anlegen"; # FIXME: create sqlite-db
}

my $dbargs = {AutoCommit => 0, PrintError => 1};
my $dbh = DBI->connect("dbi:SQLite2:dbname=$logdb", "", "", $dbargs)
  or die "Couldn't open database: " . DBI->errstr;

# temp db erzeugen
my $sqlquery = 'CREATE TEMPORARY TABLE LTemp(title TEXT, content TEXT NOT NULL, tags TEXT, t TIMESTAMP);';
$dbh->do($sqlquery)
  or die "Couldn't execute command: " . $dbh->errstr;

# copy to temp database
$sqlquery = 'INSERT INTO LTemp SELECT title, content, tags, t FROM Logs;';
$dbh->do($sqlquery)
  or die "Couldn't execute command: " . $dbh->errstr;

# alte db loeschen 
$sqlquery = 'DROP TABLE Logs;';
$dbh->do($sqlquery)
  or die "Couldn't execute command: " . $dbh->errstr;

# neue db erzeugen
my $sqlquery = 'CREATE TABLE Logs(id INTEGER PRIMARY KEY, title TEXT, content TEXT NOT NULL, tags TEXT, t TIMESTAMP, state INTEGER DEFAULT 0);';
$dbh->do($sqlquery)
  or die "Couldn't execute command: " . $dbh->errstr;

# zurueckkopieren
$sqlquery = 'INSERT INTO Logs (title, content, tags, t) SELECT title, content, tags, t FROM LTemp;';
$dbh->do($sqlquery)
  or die "Couldn't execute command: " . $dbh->errstr;

# temp database loeschen
$sqlquery = 'DROP TABLE LTemp;';
$dbh->do($sqlquery)
  or die "Couldn't execute command: " . $dbh->errstr;
  
# erst schreiben, wenn alles funktioniert hat
$dbh->commit()
  or die "Couldn't execute command: " . $dbh->errstr;

$dbh->disconnect();
