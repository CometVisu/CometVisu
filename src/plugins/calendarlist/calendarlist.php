 <?php
// Hier die GoogleKalender eintragen
// ReadCalendar(Userid, MagicCookie, Tage die abgerufen werden, ShortCut für farbige Sortierung)

// Private Kalender
//ReadCalendar('mclb1982@googlemail.com', 'f3820c21c9ca9360e0a56dc487f7c527', 30); 		# Kalender Marcus
//ReadCalendar('moenhmnlfimcirsl2132okvfg4@group.calendar.google.com', '55b158fde1b0879958eefd9ff0c288f0', 30); 		# Kalender Marcus Arbeit
//ReadCalendar('a1q9tek28g02qi3d34t40onsd0%40group.calendar.google.com', '06aaba455b1e150258d8963312cd8575', 30); 		# Kalender Lichtenbergers
// Öffentliche Kalender
//ReadCalendar('de.austrian%23holiday@group.v.calendar.google.com', '', 30); 					# Österreichische Feiertage

if (isset($_POST['maxquantity'])) {
    $maxQuantity = $_POST['maxquantity'];
} else {
    $maxQuantity = 10;
}

// Kalender lesen
$types = '';
for ($x = 0; $x <= 100; $x++) {
    if (isset($_POST['type' . $x])) {
        if ($_POST['type' . $x] == 'google') {
            ReadCalendar($_POST['calendarname' . $x], $_POST['userid' . $x], $_POST['magiccokie' . $x], 30);
        }
    }
}

function DateCompare($a, $b)
{
    if ($a['Datum'] == $b['Datum'])
        return 0;
    if ($a['Datum'] < $b['Datum'])
        return -1;
    return 1;
}

function ReadCalendar($calendarName, $userid, $magicCookie, $maxDays)
{
    global $calcData;
    
    if ($magicCookie != '') {
        $feedURL = "http://www.google.com/calendar/feeds/$userid/private-$magicCookie/full";
        //echo $feedURL . "<br>";
    } else {
        $feedURL = "http://www.google.com/calendar/feeds/$userid/public/full";
        //echo $feedURL;
    }
    
    $feedParams = "?singleevents=true&max-results=20&orderby=starttime&start-min=" . urlencode(date("c", strtotime("today"))) . "&start-max=" . urlencode(date("c", strtotime("+" . $maxDays . " day"))) . "&sortorder=a";
    //echo $feedURL.$feedParams."<br>";
    $sxml       = simplexml_load_file($feedURL . $feedParams);
    
    $date = "";
    foreach ($sxml->entry as $entry) {
        $gd = $entry->children('http://schemas.google.com/g/2005');
        
        $startTime = '';
        $endTime   = '';
        if ($gd->when) {
            $startTime = $gd->when->attributes()->startTime;
            $endTime   = $gd->when->attributes()->endTime;
        } elseif ($gd->recurrence) {
            $startTime = $gd->recurrence->when->attributes()->startTime;
            $endTime   = $gd->recurrence->when->attributes()->endTime;
        }
        $startTime         = strtotime($startTime);
        $endTime           = strtotime($endTime);
        $thisData['Datum'] = $startTime;
        
        $thisData['DatumTxt']    = date("d.m.Y", $startTime);
        $thisData['EndDatumTxt'] = date("d.m.Y", $endTime);
        $thisData['ZeitTxt']     = date("H:i", $startTime);
        $thisData['EndZeitTxt']  = date("H:i", $endTime);
        $thisData['Bezeichnung'] = stripslashes(utf8_decode($entry->title));
        $thisData['Ort']         = utf8_decode($gd->where->attributes()->valueString);
        if ($thisData['ZeitTxt'] == "00:00" && $thisData['EndZeitTxt'] == "00:00")
            $thisData['EndDatumTxt'] = date("d.m.Y", strtotime($thisData['EndDatumTxt'] . "-1 day"));
        $thisData['calendarName'] = $calendarName;
        
        
        $calcData[count($calcData) + 1] = $thisData;
    }
}

usort($calcData, 'DateCompare');
$xml = '{"calendarList": { "calendarListEntries": [';
$row = 0;
foreach ($calcData as $thisData) {
    $row = $row + 1;
    if ($row <= $maxQuantity) {
        $xml .= '{';
        $xml .= '"StartDate": "' . $thisData['DatumTxt'] . '",';
        $xml .= '"EndDate": "' . $thisData['EndDatumTxt'] . '",';
        $xml .= '"StartTime": "' . $thisData['ZeitTxt'] . '",';
        $xml .= '"EndTime": "' . $thisData['EndZeitTxt'] . '",';
        $xml .= '"description": "' . htmlentities($thisData['Bezeichnung']) . '",';
        $xml .= '"where": "' . htmlentities($thisData['Ort']) . '",';
        $xml .= '"calendarName": "' . htmlentities($thisData['calendarName']) . '"';
        $xml .= '},';
    }
}
$xml = substr($xml, 0, -1);
$xml .= ']}}';
echo $xml;
?> 