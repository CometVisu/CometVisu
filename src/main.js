/**
 * Main.js is responsible for starting the CometVisu, which includes
 * the requirejs configuration, create the TemplateEngine and load the
 * config file
 */

// ////////////////////////////////////////////////////////////////////
//
//  Configuration of RequireJS:
//

require.config({
  baseUrl: './',
  waitSeconds: 30, // default: 7 seconds
  paths: {
    'css':                      'dependencies/css',
    'jquery':                   'dependencies/jquery',
    'compatibility':            'lib/compatibility',
    'jquery-ui':                'dependencies/jquery-ui',
    'strftime':                 'dependencies/strftime',
    'jquery.ui.touch-punch':    'dependencies/jquery.ui.touch-punch',
    'jquery.svg.min':           'dependencies/jquery.svg.min',
    'cometvisu-client':         'lib/cometvisu-client',
    'cometvisu-mockup':         'lib/mockup/Client',
    'iconhandler':              'lib/iconhandler',
    'pagehandler':              'lib/pagehandler',
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
    'scrollable':            ['jquery'],
    'jquery-ui':             ['jquery'],
    'jquery.ui.touch-punch': ['jquery', 'jquery-ui/widget', 'jquery-ui/mouse'],
    'jquery.svg.min':        ['jquery']
  }
});


var templateEngine;
require([
  'jquery', 'templateengine'
], function( $, TemplateEngine ) {
  "use strict";
  profileCV( 'templateEngine start' );

  templateEngine = TemplateEngine.getInstance();

  $(window).bind('resize', templateEngine.handleResize);
  $(window).unload(function() {
    if( templateEngine.visu ) {
      templateEngine.visu.stop();
    }
  });
  $(document).ready(function() {
    function configError( textStatus, additionalErrorInfo ) {
      var configSuffix = (templateEngine.configSuffix ? templateEngine.configSuffix : '');
      var message = 'Config-File Error!<br/>';
      switch (textStatus) {
        case 'parsererror':
          message += 'Invalid config file!<br/><a href="check_config.php?config=' + configSuffix + '">Please check!</a>';
          break;
        case 'libraryerror':
          var link = window.location.href;
          if (link.indexOf('?') <= 0) {
            link = link + '?';
          }
          link = link + '&libraryCheck=false';
          message += 'Config file has wrong library version!<br/>' +
            'This can cause problems with your configuration</br>' +
            '<p>You can run the <a href="./upgrade/index.php?config=' + configSuffix + '">Configuration Upgrader</a>.</br>' +
            'Or you can start without upgrading <a href="' + link + '">with possible configuration problems</a>.</p>';
          break;
        case 'filenotfound':
          message += '404: Config file not found. Neither as normal config (' +
            additionalErrorInfo[0] + ') nor as demo config (' +
            additionalErrorInfo[1] + ').';
          break;
        default:
          message += 'Unhandled error of type "' + textStatus + '"';
          if( additionalErrorInfo ) {
            message += ': ' + additionalErrorInfo;
          }
          else {
            message += '.';
          }
      }
      $('#loading').html(message);
    }
    // get the data once the page was loaded
    var ajaxRequest = {
      noDemo: true,
      url : 'config/visu_config'+ (templateEngine.configSuffix ? '_' + templateEngine.configSuffix : '') + '.xml',
      cache : !templateEngine.forceReload,
      success : function(xml) {
        if (!xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length) {
          configError("parsererror");
        }
        else {
          // check the library version
          var xmlLibVersion = $('pages', xml).attr("lib_version");
          if (xmlLibVersion === undefined) {
            xmlLibVersion = -1;
          }
          if (templateEngine.libraryCheck && xmlLibVersion < templateEngine.libraryVersion) {
            configError("libraryerror");
          }
          else {
            var $loading = $('#loading');
            $loading.html( $loading.text().trim() + '.' );
            templateEngine.parseXML(xml);
          }
        }
      },
      error : function(jqXHR, textStatus, errorThrown) {
        if( 404 === jqXHR.status && ajaxRequest.noDemo )
        {
          var $loading = $('#loading');
          $loading.html( $loading.text().trim() + '!' );
          ajaxRequest.noDemo = false;
          ajaxRequest.origUrl = ajaxRequest.url;
          ajaxRequest.url = ajaxRequest.url.replace('config/','demo/');
          $.ajax( ajaxRequest );
        }
        else if( 404 === jqXHR.status ) {
          configError("filenotfound", [ajaxRequest.origUrl, ajaxRequest.url]);
        }
        else {
          configError(textStatus, errorThrown);
        }
      },
      dataType : 'xml'
    };
    $.ajax( ajaxRequest );
  });
}); // end require