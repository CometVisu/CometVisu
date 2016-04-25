require.config({
  baseUrl: './',
  waitSeconds: 30, // default: 7 seconds
  paths: {
    'jquery':            '../../dependencies/jquery',
    'CometvisuClient':  '../../lib/CometVisuClient',
    'TransformDefault': '../../transforms/TransformDefault',
    'TransformKnx':     '../../transforms/TransformKnx'
  }
});

require([
  'jquery', 'cometvisu-client', 'TransformDefault', 'TransformKnx'
], function( jq, CometVisu ) {
  "use strict";
  
  var 
    thisGA = '12/7/52',
    thisTransform = 'DPT:5.001',
    visu = new CometVisu('cgi-bin');

  visu.update = function( json ) // overload the handler
  {
    var h = Transform[thisTransform].decode( json[thisGA] );
    var filling = $('#rect3855')[0];
    filling.y.baseVal.value=200.57388 + (100-h)*2;
    filling.height.baseVal.value = h*2;
    $('#path3029-4')[0].setAttribute('d', 'm 524.85653,'+(200.57388+ (100-h)*2)+' a 100,37.795274 0 0 1 -200,0 100,37.795274 0 1 1 200,0 z')
  }
  
  $(window).unload(function() {
    visu.stop();
  });
  
  visu.user = 'demo_user'; // example for setting a user
  visu.subscribe( [thisGA] );
});
