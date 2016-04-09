/**
 * Karma configuration
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
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
    'css':                      'dependencies/css',
    'jquery':                   'dependencies/jquery',
    'compatibility':            'lib/compatibility',
    'jquery-ui':                'dependencies/jquery-ui',
    'strftime':                 'dependencies/strftime',
    'scrollable':               'dependencies/scrollable',
    'jquery.ui.touch-punch':    'dependencies/jquery.ui.touch-punch',
    'jquery.svg.min':           'dependencies/jquery.svg.min',
    'cometvisu-client':         'lib/cometvisu-client',
    'cometvisu-mockup':         'lib/mockup/Client',
    'iconhandler':              'lib/iconhandler',
    'pagepartshandler':         'lib/pagepartshandler',
    'trick-o-matic':            'lib/trick-o-matic',
    'templateengine':           'lib/templateengine',
    '_common':                  'structure/pure/_common',
    'structure_custom':         'config/structure_custom',
    'widget_break':             'structure/pure/break',
    'widget_designtoggle':      'structure/pure/designtoggle',
    'widget_group':             'structure/pure/group',
    'widget_rgb':               'structure/pure/rgb',
    'widget_web':               'structure/pure/web',
    'widget_image':             'structure/pure/image',
    'widget_imagetrigger':      'structure/pure/imagetrigger',
    'widget_include':           'structure/pure/include',
    'widget_info':              'structure/pure/info',
    'widget_infotrigger':       'structure/pure/infotrigger',
    'widget_infoaction':        'structure/pure/infoaction',
    'widget_line':              'structure/pure/line',
    'widget_multitrigger':      'structure/pure/multitrigger',
    'widget_navbar':            'structure/pure/navbar',
    'widget_page':              'structure/pure/page',
    'widget_pagejump':          'structure/pure/pagejump',
    'widget_refresh':           'structure/pure/refresh',
    'widget_reload':            'structure/pure/reload',
    'widget_slide':             'structure/pure/slide',
    'widget_switch':            'structure/pure/switch',
    'widget_text':              'structure/pure/text',
    'widget_toggle':            'structure/pure/toggle',
    'widget_trigger':           'structure/pure/trigger',
    'widget_pushbutton':        'structure/pure/pushbutton',
    'widget_urltrigger':        'structure/pure/urltrigger',
    'widget_unknown':           'structure/pure/unknown',
    'widget_audio':             'structure/pure/audio',
    'widget_video':             'structure/pure/video',
    'widget_wgplugin_info':     'structure/pure/wgplugin_info',
    'transform_default':        'transforms/transform_default',
    'transform_knx':            'transforms/transform_knx',
    'transform_mockup':         'lib/mockup/transform_knx',
    'transform_oh':             'transforms/transform_oh'
  },
  'shim': {
    'scrollable': ['jquery'],
    'jquery-ui': ['jquery'],
    'jquery.ui.touch-punch': ['jquery', 'jquery-ui'],
    'jquery.svg.min': ['jquery']
  },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});

var templateEngine;
require([
  'jquery', 'templateengine'
], function( $, TemplateEngine ) {
  "use strict";
  templateEngine = TemplateEngine.getInstance();
}); // end require
