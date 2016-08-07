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
    'Compatibility':            'lib/Compatibility',
    'jquery-ui':                'dependencies/jquery-ui',
    'strftime':                 'dependencies/strftime',
    'scrollable':               'dependencies/scrollable',
    'jquery.ui.touch-punch':    'dependencies/jquery.ui.touch-punch',
    'jquery.svg.min':           'dependencies/jquery.svg.min',
    'CometVisuClient':          'lib/CometVisuClient',
    'CometVisuMockup':          'lib/mockup/Client',
    'IconHandler':              'lib/IconHandler',
    'PageHandler':              'lib/PageHandler',
    'PagePartsHandler':         'lib/PagePartsHandler',
    'TrickOMatic':              'lib/TrickOMatic',
    'TemplateEngine':           'lib/TemplateEngine',
    'EventHandler':             'lib/EventHandler',
    '_common':                  'structure/pure/_common',
    'structure_custom':         'config/structure_custom',
    'widget_break':             'structure/pure/Break',
    'widget_designtoggle':      'structure/pure/DesignToggle',
    'widget_group':             'structure/pure/Group',
    'widget_rgb':               'structure/pure/Rgb',
    'widget_web':               'structure/pure/Web',
    'widget_image':             'structure/pure/Image',
    'widget_imagetrigger':      'structure/pure/ImageTrigger',
    'widget_include':           'structure/pure/Include',
    'widget_info':              'structure/pure/Info',
    'widget_infotrigger':       'structure/pure/InfoTrigger',
    'widget_infoaction':        'structure/pure/InfoAction',
    'widget_line':              'structure/pure/Line',
    'widget_multitrigger':      'structure/pure/MultiTrigger',
    'widget_navbar':            'structure/pure/NavBar',
    'widget_page':              'structure/pure/Page',
    'widget_pagejump':          'structure/pure/PageJump',
    'widget_refresh':           'structure/pure/Refresh',
    'widget_reload':            'structure/pure/Reload',
    'widget_slide':             'structure/pure/Slide',
    'widget_switch':            'structure/pure/Switch',
    'widget_text':              'structure/pure/Text',
    'widget_toggle':            'structure/pure/Toggle',
    'widget_trigger':           'structure/pure/Trigger',
    'widget_pushbutton':        'structure/pure/PushButton',
    'widget_urltrigger':        'structure/pure/UrlTrigger',
    'widget_unknown':           'structure/pure/Unknown',
    'widget_audio':             'structure/pure/Audio',
    'widget_video':             'structure/pure/Video',
    'widget_wgplugin_info':     'structure/pure/WgPluginInfo',
    'TransformDefault':         'transforms/TransformDefault',
    'TransformKnx':             'transforms/TransformKnx',
    'TransformMockup':          'lib/mockup/TransformKnx',
    'TransformOpenHab':         'transforms/TransformOpenHab',
    'plugin_ColorChooser':      'plugins/colorchooser/structure_plugin'
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
  'jquery', 'TemplateEngine'
], function( $, TemplateEngine ) {
  "use strict";
  templateEngine = TemplateEngine.getInstance();
}); // end require
