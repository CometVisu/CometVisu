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
    'TransformOpenHab':         'transforms/TransformOpenHab'
  },
  'shim': {
    'scrollable':            ['jquery'],
    'jquery-ui':             ['jquery'],
    'jquery.ui.touch-punch': ['jquery', 'jquery-ui'],
    'jquery.svg.min':        ['jquery']
  }
});


var templateEngine;
require([
  'jquery', 'TemplateEngine'
], function( $, TemplateEngine ) {
  "use strict";
  profileCV( 'templateEngine start' );

  templateEngine = TemplateEngine.getInstance();

  $(window).bind('resize', templateEngine.resizeHandling.invalidateScreensize);
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
      $('#message').addClass('error').html(message);
    }
    // get the data once the page was loaded
    var ajaxRequest = {
      noDemo: true,
      url : 'config/visu_config'+ (templateEngine.configSuffix ? '_' + templateEngine.configSuffix : '') + '.xml',
      cache : !templateEngine.forceReload,
      success : function(xml, textStatus, request) {
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
            if (request.getResponseHeader("X-CometVisu-Backend-LoginUrl")) {
              templateEngine.backendUrl = request.getResponseHeader("X-CometVisu-Backend-LoginUrl");
            }
            if (request.getResponseHeader("X-CometVisu-Backend-Name")) {
              templateEngine.backend = request.getResponseHeader("X-CometVisu-Backend-Name");
            }
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
    
    // message discarding - but not for errors:
    $('#message').click( function(){ 
      if( this.className.indexOf('error') === -1 )
        this.textContent = ''; 
    });
  });
}); // end require