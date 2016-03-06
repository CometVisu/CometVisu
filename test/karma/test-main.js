var allTestFiles = [];
var TEST_REGEXP = /(spec|rest)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    //var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
    allTestFiles.push(file);
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base/src',

  paths: {
    'css':                      '../../src/dependencies/css',
    'jquery':                   '../../src/dependencies/jquery',
    'compatibility':            '../../src/lib/compatibility',
    'jquery-ui':                '../../src/dependencies/jquery-ui',
    'strftime':                 '../../src/dependencies/strftime',
    'scrollable':               '../../src/dependencies/scrollable',
    'jquery.ui.touch-punch':    '../../src/dependencies/jquery.ui.touch-punch.js',
    'jquery.svg.min':           '../../src/dependencies/jquery.svg.min.js',
    'cometvisu-client':         '../../src/lib/cometvisu-client',
    'cometvisu-mockup':         '../../src/lib/mockup/Client',
    'cometvisu-client-openhab': '../../src/lib/cometvisu-client-openhab',
    'iconhandler':              '../../src/lib/iconhandler',
    'pagepartshandler':         '../../src/lib/pagepartshandler',
    'trick-o-matic':            '../../src/lib/trick-o-matic',
    'templateengine':           '../../src/lib/templateengine',
    '_common':                  '../../src/structure/pure/_common',
    'structure_custom':         '../../src/config/structure_custom',
    'widget_break':             '../../src/structure/pure/break',
    'widget_designtoggle':      '../../src/structure/pure/designtoggle',
    'widget_group':             '../../src/structure/pure/group',
    'widget_rgb':               '../../src/structure/pure/rgb',
    'widget_web':               '../../src/structure/pure/web',
    'widget_image':             '../../src/structure/pure/image',
    'widget_imagetrigger':      '../../src/structure/pure/imagetrigger',
    'widget_include':           '../../src/structure/pure/include',
    'widget_info':              '../../src/structure/pure/info',
    'widget_infotrigger':       '../../src/structure/pure/infotrigger',
    'widget_line':              '../../src/structure/pure/line',
    'widget_multitrigger':      '../../src/structure/pure/multitrigger',
    'widget_navbar':            '../../src/structure/pure/navbar',
    'widget_page':              '../../src/structure/pure/page',
    'widget_pagejump':          '../../src/structure/pure/pagejump',
    'widget_refresh':           '../../src/structure/pure/refresh',
    'widget_reload':            '../../src/structure/pure/reload',
    'widget_slide':             '../../src/structure/pure/slide',
    'widget_switch':            '../../src/structure/pure/switch',
    'widget_text':              '../../src/structure/pure/text',
    'widget_toggle':            '../../src/structure/pure/toggle',
    'widget_trigger':           '../../src/structure/pure/trigger',
    'widget_pushbutton':        '../../src/structure/pure/pushbutton',
    'widget_urltrigger':        '../../src/structure/pure/urltrigger',
    'widget_unknown':           '../../src/structure/pure/unknown',
    'widget_audio':             '../../src/structure/pure/audio',
    'widget_video':             '../../src/structure/pure/video',
    'widget_wgplugin_info':     '../../src/structure/pure/wgplugin_info',
    'transform_default':        '../../src/transforms/transform_default',
    'transform_knx':            '../../src/transforms/transform_knx',
    'transform_mockup':         '../../src/lib/mockup/transform_knx',
    'transform_oh':             '../../src/transforms/transform_oh'
  },
  'shim': {
    'scrollable': ['jquery'],
    'jquery-ui': ['jquery'],
    'jquery.ui.touch-punch': ['jquery', 'jquery-ui'],
    'jquery.svg.min': ['jquery'],
    'cometvisu-client-openhab': {
      deps: ['cometvisu-client'],
      exports: 'CometVisuOh'
    }
  },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
