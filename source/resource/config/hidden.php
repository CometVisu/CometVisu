<?php
// File for configuraions that shouldn't be shared with the user
$hidden = array(
  'fritzbox' => array( 'uri' => 'https://192.168.0.1:49443/', 'user' => 'CometVisuTestUser', 'pass' => 'cvtu4here' ),
  //'fritzbox' => array( 'uri' => 'http://192.168.0.1:49000/', 'user' => 'CometVisuTestUser', 'pass' => 'cvtu4here' ),
  //'fritzbox' => array( 'uri' => 'https://fritz.box:49443/', 'user' => 'CometVisuTestUser', 'pass' => 'cvtu4here' , 'selfsigned' => 'true'),
  'influx' => array('uri' => 'https://172.17.0.1/proxy/ts/query', 'user' => 'docker', 'pass' => 'cwkvJPQeFlGlRKc402CA', 'selfsigned' => 'true')
);
?>