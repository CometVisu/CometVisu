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
 * @asset(cv/*)
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
    main : function() {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug")) {
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
      // in debug mode load the uncompressed unobfuscated scripts
      var src = '';
      var min = '.min';
      if (qx.core.Environment.get("qx.debug")) {
        min = '';
      }
      qx.bom.Stylesheet.includeFile(qx.util.ResourceManager.getInstance().toUri('cv/designs/designglobals.css'));

      // TODO: replace jquery calls with Qooxdoo equivalents and get rid of the dependency
      var dynLoader = new qx.util.DynamicScriptLoader([
        "cv/libs/jquery.js",
        "cv/libs/jquery-ui.js"
      ]);
      dynLoader.addListenerOnce('ready', this.__init, this);
      dynLoader.addListener('failed',function(e){
        this.error("failed to load "+ e.getData().script);
      }, this);
      dynLoader.start();
    },

    __init: function() {
      var templateEngine = cv.TemplateEngine.getInstance();

      qx.event.Registration.addListener(window, 'resize', cv.layout.ResizeHandler.invalidateScreensize, cv.layout.ResizeHandler);
      qx.event.Registration.addListener(window, 'unload', function () {
        if (templateEngine.visu) {
          templateEngine.visu.stop();
        }
      }, this);
      qx.bom.Lifecycle.onReady(function () {
        var loading = qx.bom.Selector.query('#loading')[0];

        // get the data once the page was loaded
        var uri = 'resource/cv/config/visu_config' + (cv.Config.configSuffix ? '_' + cv.Config.configSuffix : '') + '.xml';
        this.debug("Requesting "+uri);
        var ajaxRequest = new qx.io.request.Xhr(uri);
        ajaxRequest.set({
          accept: "application/xml",
          cache: !cv.Config.forceReload
        });
        ajaxRequest.setUserData("noDemo", true);
        ajaxRequest.addListenerOnce("success", function (e) {
          var req = e.getTarget();
          // Response parsed according to the server's response content type
          var xml = req.getResponse();

          if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
            this.configError("parsererror");
          }
          else {
            // check the library version
            var xmlLibVersion = qx.bom.element.Attribute.get(qx.bom.Selector.query('pages', xml)[0], "lib_version");
            if (xmlLibVersion === undefined) {
              xmlLibVersion = -1;
            }
            if (cv.Config.libraryCheck && xmlLibVersion < cv.Config.libraryVersion) {
              this.configError("libraryerror");
            }
            else {

              loading.innerHTML = loading.innerHTML.trim() + '.';
              if (req.getResponseHeader("X-CometVisu-Backend-LoginUrl")) {
                cv.Config.backendUrl = req.getResponseHeader("X-CometVisu-Backend-LoginUrl");
              }
              if (req.getResponseHeader("X-CometVisu-Backend-Name")) {
                cv.Config.backend = req.getResponseHeader("X-CometVisu-Backend-Name");
              }
              templateEngine.parseXML(xml);
            }
          }
        }, this);

        ajaxRequest.addListenerOnce("statusError", function (e) {

          var status = e.getTarget().getTransport().status;

          if (!qx.util.Request.isSuccessful(status) && ajaxRequest.getUserData("noDemo")) {
            loading.innerHTML = loading.innerHTML.trim() + '!';
            ajaxRequest.setUserData("noDemo", false);
            ajaxRequest.setUserData("origUrl", ajaxRequest.getUrl());
            ajaxRequest.setUrl(ajaxRequest.getUrl().replace('config/', 'demo/'));
            ajaxRequest.send();
          } else if (!qx.util.Request.isSuccessful(status)) {
            this.configError("filenotfound", [ajaxRequest.getUserData("origUrl"), ajaxRequest.getUrl()]);
          }
          else {
            this.configError(status, null);
          }
        }, this);

        ajaxRequest.send();

        // message discarding - but not for errors:
        var messageElement = qx.bom.Selector.query('#message')[0];
        qx.event.Registration.addListener(messageElement, 'tap', function () {
          if (!qx.bom.element.Class.has(messageElement, 'error'))
            this.innerHTML = '';
        }, messageElement);
      }, this);
    },

    configError: function( textStatus, additionalErrorInfo ) {
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
      var messageElement = qx.bom.Selector.query('#message')[0];
      qx.bom.element.Class.add(messageElement, 'error');
      messageElement.innerHTML = message;
    }
  }
});
