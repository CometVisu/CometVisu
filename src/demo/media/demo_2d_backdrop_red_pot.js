
require.config({
  baseUrl: './',
  waitSeconds: 30, // default: 7 seconds
  paths: {
    'jquery':            '../../dependencies/jquery-2.2.2',
    'cometvisu-client':  '../../lib/cometvisu-client',
    'transform_default': '../../transforms/transform_default',
    'transform_knx':     '../../transforms/transform_knx'
  }
});

require([
  'jquery', 'cometvisu-client'//, 'transform_default', 'transform_knx'
], function( jq, CometVisu ) {
  console.log('innen!', {j:jq, cv:CometVisu});
});

/*
 * 
   <script xlink:href="../../lib/jquery.js" type="text/javascript"></script>
   <script xlink:href="../../dependencies/jquery.js" type="text/javascript"></script>
   <script xlink:href="../../lib/cometvisu-client.js" type="text/javascript"></script>
   <script xlink:href="../../transforms/transform_default.js" type="text/javascript"></script>
   <script xlink:href="../../transforms/transform_knx.js" type="text/javascript"></script>
*/