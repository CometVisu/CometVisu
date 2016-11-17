/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * This is the main application class of your custom application "cv"
 *
 * If you have added resources to your app, remove the first '@' in the
 * following line to make use of them.
 * @@asset(cv/*)
 */
qx.Class.define("cv.Application",
{
  extend : qx.application.Native,

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * This method contains the initial application code and gets called
     * during startup of the application
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
      -------------------------------------------------------------------------
      */
      profileCV( 'templateEngine start' );

      var templateEngine = cv.TemplateEngine.getInstance();

      $(window).bind('resize', cv.layout.ResizeHandler.invalidateScreensize);
      $(window).unload(function() {
        if( templateEngine.visu ) {
          templateEngine.visu.stop();
        }
      });
      $(document).ready(function() {
        function configError( textStatus, additionalErrorInfo ) {
          var configSuffix = (cv.Config.configSuffix ? cv.Config.configSuffix : '');
          var message = 'cv.Config.File Error!<br/>';
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
              message += 'cv.Config.file has wrong library version!<br/>' +
                'This can cause problems with your configuration</br>' +
                '<p>You can run the <a href="./upgrade/index.php?config=' + configSuffix + '">cv.Config.ration Upgrader</a>.</br>' +
                'Or you can start without upgrading <a href="' + link + '">with possible configuration problems</a>.</p>';
              break;
            case 'filenotfound':
              message += '404: cv.Config.file not found. Neither as normal config (' +
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
          url : 'config/visu_config'+ (cv.Config.configSuffix ? '_' + cv.Config.configSuffix : '') + '.xml',
          cache : !cv.Config.forceReload,
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
              if (cv.Config.libraryCheck && xmlLibVersion < cv.Config.libraryVersion) {
                configError("libraryerror");
              }
              else {
                var $loading = $('#loading');
                $loading.html( $loading.text().trim() + '.' );
                if (request.getResponseHeader("X-CometVisu-Backend-LoginUrl")) {
                  cv.Config.backendUrl = request.getResponseHeader("X-CometVisu-Backend-LoginUrl");
                }
                if (request.getResponseHeader("X-CometVisu-Backend-Name")) {
                  cv.Config.backend = request.getResponseHeader("X-CometVisu-Backend-Name");
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
    }
  }
});
