/**
 * The ConfigLoader loads CometVisu config files from the backend. If the loaded config file contains
 * <include> elements those config parts are loaded and add to the XML-Document.
 *
 * @author Tobias Bräutigam <tbraeutigam@gmail.com>
 * @since 2018
 */

qx.Class.define('cv.util.ConfigLoader', {
  extend: qx.core.Object,

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function () {
    this.base(arguments);
    this.__loadQueue = new qx.data.Array();
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __loadQueue: null,
    __doneCallback: null,
    __doneCallbackContext: null,
    __xml: null,

    /**
     * Load a config file
     */
    load: function (callback, context) {
      this.__doneCallback = callback;
      this.__doneCallbackContext = context;
      // get the data once the page was loaded
      var uri = qx.util.ResourceManager.getInstance().toUri('config/visu_config' + (cv.Config.configSuffix ? '_' + cv.Config.configSuffix : '') + '.xml');
      if (cv.Config.testMode) {
        // workaround for e2e-tests
        uri = 'resource/config/visu_config' + (cv.Config.configSuffix ? '_' + cv.Config.configSuffix : '') + '.xml';
      } else if (uri.indexOf("resource/") === -1) {
        // unknown config, try to add the resource part manually
        uri = uri.replace("config/", "resource/config/");
      }
      this.debug("Requesting "+uri);
      var ajaxRequest = new qx.io.request.Xhr(uri);
      this.__loadQueue.push(uri);
      ajaxRequest.set({
        accept: "application/xml",
        cache: !cv.Config.forceReload
      });
      ajaxRequest.setUserData("noDemo", true);
      ajaxRequest.addListenerOnce("success", function (e) {
        qx.core.Init.getApplication().block(false);
        var req = e.getTarget();
        cv.Config.configServer = req.getResponseHeader("Server");
        // Response parsed according to the server's response content type
        var xml = req.getResponse();
        if (xml && qx.lang.Type.isString(xml)) {
          xml = qx.xml.Document.fromString(xml);
        }
        this.__xml = xml;
        qx.bom.Selector.query('include', xml).forEach(this.loadInclude, this);
        this.__loadQueue.remove(ajaxRequest.getUrl());

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
            this._checkQueue();
          }
        }
      }, this);

      ajaxRequest.addListener("statusError", function (e) {
        var status = e.getTarget().getTransport().status;
        if (!qx.util.Request.isSuccessful(status) && ajaxRequest.getUserData("noDemo")) {
          ajaxRequest.setUserData("noDemo", false);
          ajaxRequest.setUserData("origUrl", ajaxRequest.getUrl());
          this.__loadQueue.remove(ajaxRequest.getUrl());
          var demoUrl = ajaxRequest.getUrl().replace('config/', 'demo/');
          ajaxRequest.setUrl(demoUrl);
          this.__loadQueue.push(demoUrl);
          ajaxRequest.send();
        } else if (!qx.util.Request.isSuccessful(status)) {
          this.configError("filenotfound", [ajaxRequest.getUserData("origUrl"), ajaxRequest.getUrl()]);
        }
        else {
          this.configError(status, null);
        }
      }, this);

      ajaxRequest.send();
    },

    /**
     * Load an include source and replace it with the loaded content
     * @param includeElem {Element}
     */
    loadInclude: function (includeElem) {
      var url = qx.bom.element.Attribute.get(includeElem, 'src');
      if (!url.startsWith('/')) {
        url = qx.util.LibraryManager.getInstance().get('cv', 'resourceUri') + '/' + url;
      }
      this.__loadQueue.push(url);
      var xhr = new qx.io.request.Xhr(url);
      xhr.set({
        accept: "text/plain",
        async: false
      });
      xhr.addListenerOnce("success", function(e) {
        var req = e.getTarget();
        var xml = qx.xml.Document.fromString('<root>' + req.getResponseText() + '</root>');
        var parent = includeElem.parentElement;
        parent.removeChild(includeElem);
        qx.dom.Hierarchy.getChildElements(xml.firstChild).forEach(function (child) {
          parent.appendChild(child);
        });
        this.__loadQueue.remove(url);
        this._checkQueue();
      }, this);
      xhr.addListener("statusError", function (e) {
        var status = e.getTarget().getTransport().status;
        if (!qx.util.Request.isSuccessful(status)) {
          this.configError("filenotfound", [xhr.getUrl(), '']);
        } else {
          this.configError(status, null);
        }
      }, this);
      xhr.send();
    },

    /**
     * Check if everything is loaded and call the callback in this case
     * @private
     */
    _checkQueue: function () {
      if (this.__loadQueue.length === 0) {
        this.__doneCallback.call(this.__doneCallbackContext, this.__xml);
        this.dispose();
      }
    },

    /**
     * Handle errors that occur during loading ot the config file
     * @param textStatus {String} error status
     * @param additionalErrorInfo {String} error message
     */
    configError: function( textStatus, additionalErrorInfo ) {
      var configSuffix = (cv.Config.configSuffix ? cv.Config.configSuffix : '');
      var title = qx.locale.Manager.tr('Config-File Error!');
      var message = '';
      switch (textStatus) {
        case 'parsererror':
          message = qx.locale.Manager.tr("Invalid config file!")+'<br/><a href="check_config.php?config=' + configSuffix + '">'+qx.locale.Manager.tr("Please check!")+'</a>';
          break;
        case 'libraryerror':
          var link = window.location.href;
          if (link.indexOf('?') <= 0) {
            link = link + '?';
          }
          link = link + '&libraryCheck=false';
          message = qx.locale.Manager.tr('Config file has wrong library version!')+'<br/>' +
            qx.locale.Manager.tr('This can cause problems with your configuration')+'</br>' +
            '<p>'+qx.locale.Manager.tr("You can run the %1Configuration Upgrader%2.", '<a href="./upgrade/index.php?config=' + configSuffix + '">', '</a>') +'</br>' +
            qx.locale.Manager.tr('Or you can start without upgrading %1with possible configuration problems%2', '<a href="' + link + '">', '</a>')+'</p>';
          break;
        case 'filenotfound':
          message = qx.locale.Manager.tr('404: Config file not found. Neither as normal config (%1) nor as demo config (%2).', additionalErrorInfo[0], additionalErrorInfo[1]);
          break;
        default:
          message = qx.locale.Manager.tr('Unhandled error of type "%1"', textStatus);
          if( additionalErrorInfo ) {
            message += ': ' + additionalErrorInfo;
          }
          else {
            message += '.';
          }
      }
      var notification = {
        topic: "cv.config.error",
        title: title,
        message: message,
        severity: "urgent",
        unique: true,
        deletable: false
      };
      cv.core.notifications.Router.dispatchMessage(notification.topic, notification);
      this.error(this, message.toString());
      qx.core.Init.getApplication().block(false);
    }
  },

  /*
  ******************************************************
    DESTRUCTOR
  ******************************************************
  */
  destruct: function () {
    // remove references
    this.__xml = null;
    this.__doneCallback = null;
    this.__doneCallbackContext = null;
  }
});