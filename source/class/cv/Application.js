/* Application.js 
 * 
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
 * 
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */


/**
 * This is the main application class of the CometVisu
 *
 *
 * @asset(config/*)
 * @asset(demo/*)
 * @asset(designs/*)
 * @asset(icon/*)
 * @asset(plugins/*)
 *
 * @require(qx.bom.Html)
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
    _blocker: null,

    /**
     * Toggle the {qx.bom.Blocker} visibility
     * @param val {Boolean}
     */
    block: function(val) {
      if (val) {
        if (!this._blocker) {
          this._blocker = new qx.bom.Blocker();
          this._blocker.setBlockerColor("#000000");
          this._blocker.setBlockerOpacity("0.2");
        }
        this._blocker.block();
      } else if (this._blocker){
        this._blocker.unblock();
      }
    },

    /**
     * This method contains the initial application code and gets called
     * during startup of the application
     */
    main : function() {
      // Call super class
      this.base(arguments);
      this.block(true);

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
      qx.bom.Stylesheet.includeFile(qx.util.ResourceManager.getInstance().toUri('designs/designglobals.css'));

      this.__init();
    },

    /**
     * Internal initialization method
     * @private
     */
    __init: function() {
      var templateEngine = cv.TemplateEngine.getInstance();

      qx.event.Registration.addListener(window, 'resize', cv.layout.ResizeHandler.invalidateScreensize, cv.layout.ResizeHandler);
      qx.event.Registration.addListener(window, 'unload', function () {
        if (templateEngine.visu) {
          templateEngine.visu.stop();
        }
      }, this);
      qx.bom.Lifecycle.onReady(function () {
        var cache = false;
        if (cv.Config.enableCache && cv.ConfigCache.isCached()) {
          // load settings
          this.debug("using cache");
          cv.Config = cv.ConfigCache.getData("configSettings");
          cache = cv.ConfigCache.getData();
          cv.data.Model.getInstance().setWidgetDataModel(cache.data);
          cv.data.Model.getInstance().setAddressList(cache.addresses);
          var body = qx.bom.Selector.query("body")[0];
          qx.dom.Element.empty(body);
          qx.bom.Html.clean([cv.ConfigCache.getBody()], null, body);

          thisTemplateEngine.create_objects();
        }

        // get the data once the page was loaded
        var uri = 'resource/config/visu_config' + (cv.Config.configSuffix ? '_' + cv.Config.configSuffix : '') + '.xml';
        this.debug("Requesting "+uri);
        var ajaxRequest = new qx.io.request.Xhr(uri);
        ajaxRequest.set({
          accept: "application/xml",
          cache: !cv.Config.forceReload
        });
        ajaxRequest.setUserData("noDemo", true);
        ajaxRequest.addListenerOnce("success", function (e) {
          this.block(false);
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

    /**
     * Handle errors that occur during loading ot the config file
     * @param textStatus {String} error status
     * @param additionalErrorInfo {String} error message
     */
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
      this.block(false);
    }
  }
});
