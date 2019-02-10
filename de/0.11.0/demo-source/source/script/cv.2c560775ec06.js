/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2014 1&1 Internet AG, Germany, http://www.1und1.de

   Authors:
     * Cajus Pollmeier (cajus)

************************************************************************ */

/**
 * This class offers a constant API over the Notification Spec:
 * http://www.w3.org/TR/notifications/
 *
 * It forwards all the browsers support if supported.
 *
 * *Example*
 *
 * <pre class="javascript">
 * var notifications = qx.bom.Notification.getInstance();
 *
 * var button = new qx.ui.form.Button("Notify me!");
 * button.addListener("execute", function() {
 *   notifications.show("Information", "Hey there!", "icon/64/status/dialog-information.png", 5000);
 * });
 *
 * // Enable button if supported
 * button.setEnabled(qx.core.Environment.get("html.notification"));
 *
 * </pre>
 *
 * **Note**
 *
 * A notification can only be sent if the user allows these notifications to
 * be shown. <code>qx.bom.Notification</code> automatically tries to
 * trigger a browser dialog which asks the user for permission.
 *
 * But there is a restriction: the dialog will only show up if it is triggered
 * by code that is running inside a request handler for an interactive browser
 * event like a mouse click or a keyboard interaction.
 *
 * For real life applications this means that you may add a <code>request()</code>
 * call i.e. to your applications login button to let the browser ask for
 * permission initially. After that happened and the user decided to
 * accept these notifications, they can be sent any time without the
 * need to be inside of event handlers.
 *
 * @ignore(Notification.requestPermission,Notification,Notification.permission)
 */
qx.Class.define("qx.bom.Notification", {

  extend: qx.core.Object,
  type: "singleton",

  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics : {

    /**
     * Whether the client supports the desktop notification API.
     *
     * @internal
     * @return {Boolean} <code>true</code> if notification API is supported
     */
    getNotification : function() {
      return window.Notification !== undefined;
    }

  },


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * This is a singleton. Use <code>getInstance()</code> to get an instance.
   */
  construct : function() {
    this.base(arguments);
     this.__notifications = {};
  },


  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */

  events : {

    /**
     * Event fired when a notification with data <code>tag</code> appeared.
     */
    "appear" : "Data",

    /**
     * Event fired when a notification with data <code>tag</code> has been
     * clicked by the user.
     */
    "click" : "Data",

    /**
     * Event fired when a notification with data <code>tag</code> has been
     * closed. This may happen either interactively or due to a timeout
     * defined by the instance displaying the notification.
     */
    "close" : "Data"
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members: {
    __notifications : null,
    __lastId : 0,


    /**
     * Display a desktop notification using a _title_, _message_ and _icon_.
     *
     * @param title {String} The notification title
     * @param message {String} The message body
     * @param icon {String} Resource string or icon URL
     * @param expire {Number} Number of milliseconds after the message is
     *                     automatically destroyed. Leave empty for no
     *                     timeout. Note that some notification systems
     *                     tend to remove timeout-less messages after some
     *                     time.
     * @param tag {String} Multiple messages with the same tag replace each
     *                     other. Leave blank for automatic tag handling.
     * @return {String} Notification tag
     */
    show : function(title, message, icon, expire, tag) {
      if (qx.bom.Notification.getNotification()) {

        // Generate unique tag to be able to identify the
        // notification later on.
        if (tag !== undefined) {
          tag = "id" + (this.__lastId++);
        }

        // If we've the permission already, just send it
        if (Notification.permission == "granted") {
          this._show(tag, title, message, icon, expire);

        // We've not asked for permission yet. Lets do it.
        } else if (Notification.permission != "denied") {

          var that = this;
          Notification.requestPermission(function (permission) {
            if (Notification.permission === undefined) {
              Notification.permission = permission;
            }

            if (permission == "granted") {
              that._show(tag, title, message, icon, expire);
            }
          });
        }

      }

      return tag === undefined ? null : tag;
    },


    /**
     * Display a desktop notification using a _title_, _message_ and _icon_.
     *
     * @internal
     * @param tag {String} Notification tag
     * @param title {String} The notification title
     * @param message {String} The message body
     * @param icon {String} Resource string or icon URL
     * @param expire {Unsigned} Number of milliseconds after the message is
     *                     automatically destroyed. Leave empty for no
     *                     timeout. Note that some notification systems
     *                     tend to remove timeout-less messages after some
     *                     time.
     */
    _show : function(tag, title, message, icon, expire) {
      var lang = qx.locale.Manager.getInstance().getLocale().replace(/_.*$/, "");

      // Resolve icon path if needed and possible
      if (icon) {
        var rm = qx.util.ResourceManager.getInstance();
        var source = qx.util.AliasManager.getInstance().resolve(icon);
        if (rm.has(source)) {
          icon = rm.toUri(source);
        }

        // old versions of firefox did not display the notification if
        // an icon was specified, so we disable the icon for firefox
        // < version 46
        if (qx.core.Environment.get("engine.name") == "gecko" &&
            qx.core.Environment.get("browser.version") < 46) {
          icon = undefined;
        }
      }

      var notification = new Notification(title, {
        body: message,
        tag: tag,
        icon: icon,
        lang: lang
      });
      var that = this;
      notification.onshow = function() {
        that.__notifications[tag] = notification;
        that.fireDataEvent("appear", tag);
      };
      notification.onclose = function() {
        that.fireDataEvent("close", tag);
        if (that.__notifications[tag]) {
          that.__notifications[tag] = null;
          delete that.__notifications[tag];
        }
      };
      notification.onclick = function() {
        that.fireDataEvent("click", tag);
        if (that.__notifications[tag]) {
          that.__notifications[tag] = null;
          delete that.__notifications[tag];
        }
      };
      notification.onerror = function() {
        that.fireDataEvent("error", tag);
        if (that.__notifications[tag]) {
          that.__notifications[tag] = null;
          delete that.__notifications[tag];
        }
      };

      // Install expire timer if exists
      if (expire) {
        qx.event.Timer.once(function() {
          notification.close();
        }, this, expire);
      }
    },


    /**
     * Actively close an active notification.
     *
     * @param tag {String} Notification tag
     */
    close : function(tag) {
      if (this.__notifications[tag]) {
        this.__notifications[tag].close();
      }
    },


    /**
     * Tell the browser to request permission to display notifications.
     *
     * **Note:**
     *
     * This needs to be called from within an interactive event handler.
     */
    request : function() {
      if (qx.bom.Notification.getNotification()) {
        Notification.requestPermission(function (permission) {
          if (Notification.permission === undefined) {
            Notification.permission = permission;
          }
        });
      }
    },


    /**
     * Check if we've the permission to send notifications.
     *
     * @return {String} Returns either "default", "denied" or "granted". "default"
     *                  indicates that we need to call <code>request()</code>  before
     *                  a notification can be sent.
     */
    getPermission : function() {
       return qx.bom.Notification.getNotification() ? Notification.permission : "denied";
    }

  },


  defer : function (statics) {
    qx.core.Environment.add("html.notification", statics.getNotification);
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)
     * Tristan Koch (tristankoch)

************************************************************************ */

/**
 * The JSON data store is responsible for fetching data from an url. The type
 * of the data has to be json.
 *
 * The loaded data will be parsed and saved in qooxdoo objects. Every value
 * of the loaded data will be stored in a qooxdoo property. The model classes
 * for the data will be created automatically.
 *
 * For the fetching itself it uses the {@link qx.io.request.Xhr} class and
 * for parsing the loaded javascript objects into qooxdoo objects, the
 * {@link qx.data.marshal.Json} class will be used.
 *
 * Please note that if you
 *
 * * upgrade from qooxdoo 1.4 or lower
 * * choose not to force the old transport
 * * use a delegate with qx.data.store.IStoreDelegate#configureRequest
 *
 * you probably need to change the implementation of your delegate to configure
 * the {@link qx.io.request.Xhr} request.
 * 
 * This class only needs to be disposed if you want to abort any current I/O
 * request
 *
 */
qx.Class.define("qx.data.store.Json",
{
  extend : qx.core.Object,


  /**
   * @param url {String|null} The url where to find the data. The store starts
   *   loading as soon as the URL is give. If you want to change some details
   *   concerning the request, add null here and set the URL as soon as
   *   everything is set up.
   * @param delegate {Object?null} The delegate containing one of the methods
   *   specified in {@link qx.data.store.IStoreDelegate}.
   */
  construct : function(url, delegate)
  {
    this.base(arguments);


    // store the marshaler and the delegate
    this._marshaler = new qx.data.marshal.Json(delegate);
    this._delegate = delegate;

    if (url != null) {
      this.setUrl(url);
    }
  },


  events :
  {
    /**
     * Data event fired after the model has been created. The data will be the
     * created model.
     */
    "loaded" : "qx.event.type.Data",

    /**
     * Fired when a parse error (i.e. broken JSON) occurred
     * during the load. The data contains a hash of the original
     * response and the parser error (exception object).
     */
    "parseError" : "qx.event.type.Data",

    /**
     * Fired when an error (aborted, timeout or failed) occurred
     * during the load. The data contains the response of the request.
     * If you want more details, use the {@link #changeState} event.
     */
    "error" : "qx.event.type.Data"
  },


  properties :
  {
    /**
     * Property for holding the loaded model instance.
     */
    model : {
      nullable: true,
      event: "changeModel"
    },


    /**
     * The state of the request as an url. If you want to check if the request
     * did it’s job, use, the {@link #changeState} event and check for one of the
     * listed values.
     */
    state : {
      check : [
        "configured", "queued", "sending", "receiving",
        "completed", "aborted", "timeout", "failed"
      ],
      init : "configured",
      event : "changeState"
    },


    /**
     * The url where the request should go to.
     */
    url : {
      check: "String",
      apply: "_applyUrl",
      event: "changeUrl",
      nullable: true
    }
  },


  members :
  {
    _marshaler : null,
    _delegate : null,

    __request : null,

    // apply function
    _applyUrl: function(value, old) {
      if (value != null) {
        // take care of the resource management
        value = qx.util.AliasManager.getInstance().resolve(value);
        value = qx.util.ResourceManager.getInstance().toUri(value);

        this._createRequest(value);
      }
    },

    /**
     * Get request
     *
     * @return {Object} The request.
     */
    _getRequest: function() {
      return this.__request;
    },


    /**
     * Set request.
     *
     * @param request {Object} The request.
     */
    _setRequest: function(request) {
      this.__request = request;
    },


    /**
     * Creates and sends a GET request with the given url.
     *
     * Listeners will be added to respond to the request’s "success",
     * "changePhase" and "fail" event.
     *
     * @param url {String} The url for the request.
     */
    _createRequest: function(url) {
      // dispose old request
      if (this.__request) {
        this.__request.dispose();
        this.__request = null;
      }

      var req = new qx.io.request.Xhr(url);
      this._setRequest(req);

      // request json representation
      req.setAccept("application/json");

      // parse as json no matter what content type is returned
      req.setParser("json");

      // register the internal event before the user has the change to
      // register its own event in the delegate
      req.addListener("success", this._onSuccess, this);
      req.addListener("parseError", this._onParseError, this);

      // check for the request configuration hook
      var del = this._delegate;
      if (del && qx.lang.Type.isFunction(del.configureRequest)) {
        this._delegate.configureRequest(req);
      }

      // map request phase to it’s own phase
      req.addListener("changePhase", this._onChangePhase, this);

      // add failed, aborted and timeout listeners
      req.addListener("fail", this._onFail, this);

      req.send();
    },


    /**
     * Handler called when request phase changes.
     *
     * Sets the store’s state.
     *
     * @param ev {qx.event.type.Data} The request’s changePhase event.
     */
    _onChangePhase : function(ev) {
      var requestPhase = ev.getData(),
          requestPhaseToStorePhase = {},
          state;

      requestPhaseToStorePhase = {
        "opened": "configured",
        "sent": "sending",
        "loading": "receiving",
        "success": "completed",
        "abort": "aborted",
        "timeout": "timeout",
        "statusError": "failed"
      };

      state = requestPhaseToStorePhase[requestPhase];
      if (state) {
        this.setState(state);
      }
    },


    /**
     * Handler called when not completing the request successfully.
     *
     * @param ev {qx.event.type.Event} The request’s fail event.
     */
    _onFail : function(ev) {
      var req = ev.getTarget();
      this.fireDataEvent("error", req);
    },


    /**
     * Handler called when not completing the request successfully because
     * of parse errors.
     *
     * @param ev {qx.event.type.Data} Hash map containing the original 'request'
     *                                and the original parser 'error' exception object.
     */
    _onParseError : function(ev) {
      this.fireDataEvent("parseError", ev.getData());
    },


    /**
     * Handler for the completion of the requests. It invokes the creation of
     * the needed classes and instances for the fetched data using
     * {@link qx.data.marshal.Json}.
     *
     * @param ev {qx.event.type.Event} The request’s success event.
     */
    _onSuccess : function(ev)
    {
      if (this.isDisposed()) {
        return;
      }

       var req = ev.getTarget(),
           data = req.getResponse();

       // check for the data manipulation hook
       var del = this._delegate;
       if (del && qx.lang.Type.isFunction(del.manipulateData)) {
         data = this._delegate.manipulateData(data);
       }

       // create the class
       this._marshaler.toClass(data, true);

       var oldModel = this.getModel();

       // set the initial data
       this.setModel(this._marshaler.toModel(data));

       // get rid of the old model
       if (oldModel && oldModel.dispose) {
         oldModel.dispose();
       }

       // fire complete event
       this.fireDataEvent("loaded", this.getModel());

       // get rid of the request object
       if (this.__request) {
         this.__request.dispose();
         this.__request = null;
       }
    },


    /**
     * Reloads the data with the url set in the {@link #url} property.
     */
    reload: function() {
      var url = this.getUrl();
      if (url != null) {
        this._createRequest(url);
      }
    }
  },

  /*
   *****************************************************************************
      DESTRUCT
   *****************************************************************************
   */

  destruct : function()
  {
    if (this.__request != null) {
      this._disposeObjects("__request");
    }

    // The marshaler internally uses the singleton pattern
    // (constructor.$$instance.
    this._disposeSingletonObjects("_marshaler");
    this._delegate = null;
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */
/**
 * Defines the methods needed by every marshaler which should work with the
 * qooxdoo data stores.
 */
qx.Interface.define("qx.data.marshal.IMarshaler",
{
  members :
  {
    /**
     * Creates for the given data the needed classes. The classes contain for
     * every key in the data a property. The classname is always the prefix
     * <code>qx.data.model</code>. Two objects containing the same keys will not
     * create two different classes.
     *
     * @param data {Object} The object for which classes should be created.
     * @param includeBubbleEvents {Boolean} Whether the model should support
     *   the bubbling of change events or not.
     */
    toClass : function(data, includeBubbleEvents) {},


    /**
     * Creates for the given data the needed models. Be sure to have the classes
     * created with {@link #toClass} before calling this method.
     *
     * @param data {Object} The object for which models should be created.
     *
     * @return {qx.core.Object} The created model object.
     */
    toModel : function(data) {}
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */

/**
 * This class is responsible for converting json data to class instances
 * including the creation of the classes.
 * To retrieve the native data of created models use the methods
 *   described in {@link qx.util.Serializer}.
 */
qx.Class.define("qx.data.marshal.Json",
{
  extend : qx.core.Object,
  implement : [qx.data.marshal.IMarshaler],

  /**
   * @param delegate {Object} An object containing one of the methods described
   *   in {@link qx.data.marshal.IMarshalerDelegate}.
   */
  construct : function(delegate)
  {
    this.base(arguments);

    this.__delegate = delegate;
  },

  statics :
  {
    $$instance : null,

    /**
     * Creates a qooxdoo object based on the given json data. This function
     * is just a static wrapper. If you want to configure the creation
     * process of the class, use {@link qx.data.marshal.Json} directly.
     *
     * @param data {Object} The object for which classes should be created.
     * @param includeBubbleEvents {Boolean} Whether the model should support
     *   the bubbling of change events or not.
     *
     * @return {qx.core.Object} An instance of the corresponding class.
     */
    createModel : function(data, includeBubbleEvents) {
      // singleton for the json marshaler
      if (this.$$instance === null) {
        this.$$instance = new qx.data.marshal.Json();
      }
      // be sure to create the classes first
      this.$$instance.toClass(data, includeBubbleEvents);
      // return the model
      return this.$$instance.toModel(data);
    },
    
    /**
     * Legacy json hash method used as default in Qooxdoo < v6.0.
     * You can go back to the old behaviour like this:
     * 
     * <code>
     *  var marshaller = new qx.data.marshal.Json({
     *   getJsonHash: qx.data.marshal.Json.legacyJsonHash
     *  });
     * </code>
     */
    legacyJsonHash: function (data, includeBubbleEvents) {
      return Object.keys(data).sort().join('"')
        + (includeBubbleEvents===true ? "♥" : "");
    }
  },


  members :
  {
    __delegate : null,


    /**
     * Converts a given object into a hash which will be used to identify the
     * classes under the namespace <code>qx.data.model</code>.
     *
     * @param data {Object} The JavaScript object from which the hash is
     *   required.
     * @param includeBubbleEvents {Boolean?false} Whether the model should
     *   support the bubbling of change events or not.
     * @return {String} The hash representation of the given JavaScript object.
     */
    __jsonToHash : function (data, includeBubbleEvents)
    {
      if (this.__delegate && this.__delegate.getJsonHash) {
        return this.__delegate.getJsonHash(data, includeBubbleEvents);
      }
      return Object.keys(data).sort().join('|')
           + (includeBubbleEvents===true ? "♥" : "");
    },


    /**
     * Get the "most enhanced" hash for a given object.  That is the hash for
     * the class that is most feature rich in respect of the bubble event
     * feature. If there are two equal classes available (defined), one with
     * and one without the bubble event feature, this method will return the
     * hash of the class that includes the bubble event.
     *
     * @param data {Object} The JavaScript object from which the hash is
     *   required.
     * @param includeBubbleEvents {Boolean} Whether the preferred model should
     *   support the bubbling of change events or not.
     *   If <code>null</code>, an automatic selection will take place which
     *   selects the "best" model currently available.
     * @return {String} The hash representation of the given JavaScript object.
     */
    __jsonToBestHash : function (data, includeBubbleEvents)
    {
      // forced mode?
      //
      if (includeBubbleEvents === true) {
        return this.__jsonToHash(data, true);
      }
      if (includeBubbleEvents === false) {
        return this.__jsonToHash(data, false);
      }

      // automatic mode!
      //
      var hash = this.__jsonToHash(data); // without bubble event feature
      var bubbleClassHash = hash + "♥";   // with bubble event feature
      var bubbleClassName = "qx.data.model." + bubbleClassHash;

      // In case there's a class with bubbling, we *always* prefer that one!
      return qx.Class.isDefined(bubbleClassName) ? bubbleClassHash : hash;
    },


    /**
     * Creates for the given data the needed classes. The classes contain for
     * every key in the data a property. The classname is always the prefix
     * <code>qx.data.model</code> and the hash of the data created by
     * {@link #__jsonToHash}. Two objects containing the same keys will not
     * create two different classes. The class creation process also supports
     * the functions provided by its delegate.
     *
     * Important, please keep in mind that only valid JavaScript identifiers
     * can be used as keys in the data map. For convenience '-' in keys will
     * be removed (a-b will be ab in the end).
     *
     * @see qx.data.store.IStoreDelegate
     *
     * @param data {Object} The object for which classes should be created.
     * @param includeBubbleEvents {Boolean} Whether the model should support
     *   the bubbling of change events or not.
     */
    toClass: function(data, includeBubbleEvents) {
      this.__toClass(data, includeBubbleEvents, null, 0);
    },


    /**
     * Implementation of {@link #toClass} used for recursion.
     *
     * @param data {Object} The object for which classes should be created.
     * @param includeBubbleEvents {Boolean} Whether the model should support
     *   the bubbling of change events or not.
     * @param parentProperty {String|null} The name of the property the
     *   data will be stored in.
     * @param depth {Number} The depth of the data relative to the data's root.
     */
    __toClass : function(data, includeBubbleEvents, parentProperty, depth) {
      // break on all primitive json types and qooxdoo objects
      if (
        !qx.lang.Type.isObject(data)
        || !!data.$$isString // check for localized strings
        || data instanceof qx.core.Object
      ) {
        // check for arrays
        if (data instanceof Array || qx.Bootstrap.getClass(data) == "Array") {
          for (var i = 0; i < data.length; i++) {
            this.__toClass(data[i], includeBubbleEvents, parentProperty + "[" + i + "]", depth+1);
          }
        }

        // ignore arrays and primitive types
        return;
      }

      var hash = this.__jsonToHash(data, includeBubbleEvents);

      // ignore rules
      if (this.__ignore(hash, parentProperty, depth)) {
        return;
      }

      // check for the possible child classes
      for (var key in data) {
        this.__toClass(data[key], includeBubbleEvents, key, depth+1);
      }

      // class already exists
      if (qx.Class.isDefined("qx.data.model." + hash)) {
        return;
      }

      // class is defined by the delegate
      if (
        this.__delegate
        && this.__delegate.getModelClass
        && this.__delegate.getModelClass(hash, data, parentProperty, depth) != null
      ) {
        return;
      }

      // create the properties map
      var properties = {};
      // include the disposeItem for the dispose process.
      var members = {__disposeItem : this.__disposeItem};
      for (var key in data) {
        // apply the property names mapping
        if (this.__delegate && this.__delegate.getPropertyMapping) {
          key = this.__delegate.getPropertyMapping(key, hash);
        }

        // strip the unwanted characters
        key = key.replace(/-|\.|\s+/g, "");
        // check for valid JavaScript identifier (leading numbers are ok)
        if (qx.core.Environment.get("qx.debug")) {
          this.assertTrue((/^[$0-9A-Za-z_]*$/).test(key),
          "The key '" + key + "' is not a valid JavaScript identifier.");
        }

        properties[key] = {};
        properties[key].nullable = true;
        properties[key].event = "change" + qx.lang.String.firstUp(key);
        // bubble events
        if (includeBubbleEvents) {
          properties[key].apply = "_applyEventPropagation";
        }
        // validation rules
        if (this.__delegate && this.__delegate.getValidationRule) {
          var rule = this.__delegate.getValidationRule(hash, key);
          if (rule) {
            properties[key].validate = "_validate" + key;
            members["_validate" + key] = rule;
          }
        }
      }

      // try to get the superclass, qx.core.Object as default
      if (this.__delegate && this.__delegate.getModelSuperClass) {
        var superClass =
          this.__delegate.getModelSuperClass(hash, parentProperty, depth) || qx.core.Object;
      } else {
        var superClass = qx.core.Object;
      }

      // try to get the mixins
      var mixins = [];
      if (this.__delegate && this.__delegate.getModelMixins) {
        var delegateMixins = this.__delegate.getModelMixins(hash, parentProperty, depth);
        // check if its an array
        if (!qx.lang.Type.isArray(delegateMixins)) {
          if (delegateMixins != null) {
            mixins = [delegateMixins];
          }
        } else {
          mixins = delegateMixins;
        }
      }

      // include the mixin for the event bubbling
      if (includeBubbleEvents) {
        mixins.push(qx.data.marshal.MEventBubbling);
      }

      // create the map for the class
      var newClass = {
        extend : superClass,
        include : mixins,
        properties : properties,
        members : members
      };

      qx.Class.define("qx.data.model." + hash, newClass);
    },


    /**
     * Helper for disposing items of the created class.
     *
     * @param item {var} The item to dispose.
     */
    __disposeItem : function(item) {
      if (!(item instanceof qx.core.Object)) {
        // ignore all non objects
        return;
      }
      // ignore already disposed items (could happen during shutdown)
      if (item.isDisposed()) {
        return;
      }
      item.dispose();
    },


    /**
     * Creates an instance for the given data hash.
     *
     * @param hash {String} The hash of the data for which an instance should
     *   be created.
     * @param parentProperty {String|null} The name of the property the data
     *   will be stored in.
     * @param depth {Number} The depth of the object relative to the data root.
     * @param data {Map} The data for which an instance should be created.
     * @return {qx.core.Object} An instance of the corresponding class.
     */
    __createInstance : function (hash, data, parentProperty, depth)
    {
      var delegateClass;
      // get the class from the delegate
      if (this.__delegate && this.__delegate.getModelClass) {
        delegateClass = this.__delegate.getModelClass(hash, data, parentProperty, depth);
      }
      if (delegateClass != null) {
        return (new delegateClass());
      } else {
        var className = "qx.data.model." + hash;
        var clazz = qx.Class.getByName(className);
        if (!clazz)
        {
          // Extra check for possible bubble-event feature inconsistency
          var noBubbleClassName = className.replace("♥", "");
          if (qx.Class.getByName(noBubbleClassName))
          {
            throw new Error( "Class '" + noBubbleClassName + "' found, " +
                             "but it does not support changeBubble event." );
          }
          throw new Error("Class '" + className + "' could not be found.");
        }
        return (new clazz());
      }
    },


    /**
     * Helper to decide if the delegate decides to ignore a data set.
     * @param hash {String} The property names.
     * @param parentProperty {String|null} The name of the property the data
     *   will be stored in.
     * @param depth {Number} The depth of the object relative to the data root.
     * @return {Boolean} <code>true</code> if the set should be ignored
     */
    __ignore : function(hash, parentProperty, depth) {
      var del = this.__delegate;
      return del && del.ignore && del.ignore(hash, parentProperty, depth);
    },


    /**
     * Creates for the given data the needed models. Be sure to have the classes
     * created with {@link #toClass} before calling this method. The creation
     * of the class itself is delegated to the {@link #__createInstance} method,
     * which could use the {@link qx.data.store.IStoreDelegate} methods, if
     * given.
     *
     * @param data {Object} The object for which models should be created.
     * @param includeBubbleEvents {Boolean?null} Whether the model should
     *   support the bubbling of change events or not.
     *   If omitted or <code>null</code>, an automatic selection will take place
     *   which selects the "best" model currently available.
     * @return {qx.core.Object} The created model object.
     */
    toModel : function (data, includeBubbleEvents) {
      return this.__toModel(data, includeBubbleEvents, null, 0);
    },


    /**
     * Implementation of {@link #toModel} used for recursion.
     *
     * @param data {Object} The object for which models should be created.
     * @param includeBubbleEvents {Boolean|null} Whether the model should
     *   support the bubbling of change events or not.
     *   If <code>null</code>, an automatic selection will take place which
     *   selects the "best" model currently available.
     * @param parentProperty {String|null} The name of the property the
     *   data will be stored in.
     * @param depth {Number} The depth of the data relative to the data's root.
     * @return {qx.core.Object} The created model object.
     */
    __toModel : function (data, includeBubbleEvents, parentProperty, depth)
    {
      var isObject = qx.lang.Type.isObject(data);
      var isArray = data instanceof Array || qx.Bootstrap.getClass(data) == "Array";

      if (
        (!isObject && !isArray)
        || !!data.$$isString // check for localized strings
        || data instanceof qx.core.Object
      ) {
        return data;

      // ignore rules
      } else if (this.__ignore(this.__jsonToBestHash(data, includeBubbleEvents), parentProperty, depth)) {
        return data;

      } else if (isArray) {
        var arrayClass = qx.data.Array;
        if (this.__delegate && this.__delegate.getArrayClass) {
          var customArrayClass = this.__delegate.getArrayClass(parentProperty, depth);
          arrayClass = customArrayClass || arrayClass;
        }

        var array = new arrayClass();
        // set the auto dispose for the array
        array.setAutoDisposeItems(true);

        for (var i = 0; i < data.length; i++) {
          array.push(this.__toModel(data[i], includeBubbleEvents, parentProperty + "[" + i + "]", depth+1));
        }
        return array;

      } else if (isObject) {
        // create an instance for the object
        var hash = this.__jsonToBestHash(data, includeBubbleEvents);
        var model = this.__createInstance(hash, data, parentProperty, depth);

        // go threw all element in the data
        for (var key in data) {
          // apply the property names mapping
          var propertyName = key;
          if (this.__delegate && this.__delegate.getPropertyMapping) {
            propertyName = this.__delegate.getPropertyMapping(key, hash);
          }
          var propertyNameReplaced = propertyName.replace(/-|\.|\s+/g, "");
          // warn if there has been a replacement
          if (
            (qx.core.Environment.get("qx.debug")) &&
            qx.core.Environment.get("qx.debug.databinding")
          ) {
            if (propertyNameReplaced != propertyName) {
              this.warn(
                "The model contained an illegal name: '" + key +
                "'. Replaced it with '" + propertyName + "'."
              );
            }
          }
          propertyName = propertyNameReplaced;
          // only set the properties if they are available [BUG #5909]
          var setterName = "set" + qx.lang.String.firstUp(propertyName);
          if (model[setterName]) {
            model[setterName](this.__toModel(data[key], includeBubbleEvents, key, depth+1));
          }
        }
        return model;
      }

      throw new Error("Unsupported type!");
    }
  }
});
