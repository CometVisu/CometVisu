/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * Renders a special radio button inside a menu. The button behaves like
 * a normal {@link qx.ui.form.RadioButton} and shows a radio icon when
 * checked; normally shows no icon when not checked (depends on the theme).
 */
qx.Class.define("qx.ui.menu.RadioButton",
{
  extend : qx.ui.menu.AbstractButton,
  include : [qx.ui.form.MModelProperty],
  implement : [qx.ui.form.IRadioItem, qx.ui.form.IBooleanForm, qx.ui.form.IModel],



  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param label {String} Initial label
   * @param menu {qx.ui.menu.Menu} Initial sub menu
   */
  construct : function(label, menu)
  {
    this.base(arguments);

    // Initialize with incoming arguments
    if (label != null) {
      this.setLabel(label);
    }

    if (menu != null) {
      this.setMenu(menu);
    }

    this.addListener("execute", this._onExecute, this);
  },



  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    // overridden
    appearance :
    {
      refine : true,
      init : "menu-radiobutton"
    },

    /** The value of the widget. True, if the widget is checked. */
    value :
    {
      check : "Boolean",
      nullable : true,
      event : "changeValue",
      apply : "_applyValue",
      init : false
    },

    /** The assigned qx.ui.form.RadioGroup which handles the switching between registered buttons */
    group :
    {
      check  : "qx.ui.form.RadioGroup",
      nullable : true,
      apply : "_applyGroup"
    }
  },





  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    // overridden (from MExecutable to keep the icon out of the binding)
    /**
     * @lint ignoreReferenceField(_bindableProperties)
     */
    _bindableProperties :
    [
      "enabled",
      "label",
      "toolTipText",
      "value",
      "menu"
    ],


    // property apply
    _applyValue : function(value, old) {
      value ? this.addState("checked") : this.removeState("checked");
    },


    // property apply
    _applyGroup : function(value, old)
    {
      if (old) {
        old.remove(this);
      }

      if (value) {
        value.add(this);
      }
    },


    /**
     * Handler for the execute event.
     *
     * @param e {qx.event.type.Event} The execute event.
     */
    _onExecute : function(e) {
      var grp = this.getGroup();
      if (grp && grp.getAllowEmptySelection()) {
        this.toggleValue();
      } else {
        this.setValue(true);
      }
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Fabian Jakobs (fjakobs)
     * Martin Wittemann (martinwittemann)

************************************************************************ */

/**
 * Renders a special checkbox button inside a menu. The button behaves like
 * a normal {@link qx.ui.form.CheckBox} and shows a check icon when
 * checked; normally shows no icon when not checked (depends on the theme).
 */
qx.Class.define("qx.ui.menu.CheckBox",
{
  extend : qx.ui.menu.AbstractButton,
  implement : [qx.ui.form.IBooleanForm],



  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param label {String} Initial label
   * @param menu {qx.ui.menu.Menu} Initial sub menu
   */
  construct : function(label, menu)
  {
    this.base(arguments);

    // Initialize with incoming arguments
    if (label != null) {
      // try to translate every time you create a checkbox [BUG #2699]
      if (label.translate) {
        this.setLabel(label.translate());
      } else {
        this.setLabel(label);
      }
    }

    if (menu != null) {
      this.setMenu(menu);
    }

    this.addListener("execute", this._onExecute, this);
  },



  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    // overridden
    appearance :
    {
      refine : true,
      init : "menu-checkbox"
    },

    /** Whether the button is checked */
    value :
    {
      check : "Boolean",
      init : false,
      apply : "_applyValue",
      event : "changeValue",
      nullable : true
    }
  },





  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    // overridden (from MExecutable to keep the icon out of the binding)
    /**
     * @lint ignoreReferenceField(_bindableProperties)
     */
    _bindableProperties :
    [
      "enabled",
      "label",
      "toolTipText",
      "value",
      "menu"
    ],

    // property apply
    _applyValue : function(value, old)
    {
      value ?
        this.addState("checked") :
        this.removeState("checked");
    },


    /**
     * Handler for the execute event.
     *
     * @param e {qx.event.type.Event} The execute event.
     */
    _onExecute : function(e) {
      this.toggleValue();
    }
  }
});
/* ***********************************************************************

   UploadMgr - provides an API for uploading one or multiple files
   with progress feedback (on modern browsers), does not block the user 
   interface during uploads, supports cancelling uploads.

   http://qooxdoo.org

   Copyright:
     2011 Zenesis Limited, http://www.zenesis.com

   License:
     MIT: https://opensource.org/licenses/MIT
     
     This software is provided under the same licensing terms as Qooxdoo,
     please see the LICENSE file in the Qooxdoo project's top-level directory 
     for details.

   Authors:
 * John Spackman (john.spackman@zenesis.com)

 ************************************************************************/

/**
 * This mixin adds get/setParam methods used by UploadManager, AbstractHandler,
 * and UploadButton
 */
qx.Mixin.define("com.zenesis.qx.upload.MParameters", {
  members: {
    __params: null,

    /**
     * Sets a parameter value to be sent with the file
     * 
     * @param name
     *          {String} name of the parameter
     * @param value
     *          {String} the value of the parameter, or null to delete a
     *          previous parameter
     */
    setParam: function(name, value) {
      if (value !== null && typeof value != "string")
        value = "" + value;
      if (!this.__params)
        this.__params = {};
      this.__params[name] = value;
    },

    /**
     * Returns a parameter value to be sent with the file
     * 
     * @param name {String} Name of the parameter
     * @returns {Boolean}
     */
    getParam: function(name) {
      return this.__params && this.__params[name];
    },

    /**
     * Returns a list of parameter names
     * 
     * @returns {Array}
     */
    getParamNames: function() {
      var result = [];
      if (this.__params)
        for ( var name in this.__params)
          result.push(name);
      return result;
    }
  }
});
/* ***********************************************************************

   UploadMgr - provides an API for uploading one or multiple files
   with progress feedback (on modern browsers), does not block the user 
   interface during uploads, supports cancelling uploads.

   http://qooxdoo.org

   Copyright:
     2011 Zenesis Limited, http://www.zenesis.com

   License:
     MIT: https://opensource.org/licenses/MIT
     
     This software is provided under the same licensing terms as Qooxdoo,
     please see the LICENSE file in the Qooxdoo project's top-level directory 
     for details.

   Authors:
 * John Spackman (john.spackman@zenesis.com)

 ************************************************************************/

/**
 * This mixin provides a trivial way to make any widget suitable as a widget for
 * Uploader - the only trick is that the capture and releaseCapture methods in
 * qx.ui.core.Widget must not be fired.
 */
qx.Mixin.define("com.zenesis.qx.upload.MUploadButton", {
  include: [ com.zenesis.qx.upload.MParameters ],
  
  properties: {
  	/**
  	 * File types which are acceptable for upload; note that this is not guaranteed
  	 * because not all (older) browsers support it, but where available it will
  	 * restrict the file open dialog to only allow these file types.
  	 * 
  	 * This value is passed directly through to the input tag's accept attribute, so
  	 * the format can be seen here: {@link http://www.w3schools.com/tags/att_input_accept.asp};
  	 * in summary, it is a comma separated list of file extensions (with the dot) and/or
  	 * MIME types; EG:
  	 * 
  	 * 	.jpg,.png,.gif			-- Images
  	 * 	image/*,.mp4				-- Images and *.mp4
  	 */
  	acceptUpload: {
  		init: null,
  		nullable: true,
  		check: "String"
  	}
  },

  members: {
    // overridden
    capture: function() {
      // Nothing
    },

    // overridden
    releaseCapture: function() {
      // Nothing
    }
  }
});
/* ***********************************************************************

   UploadMgr - provides an API for uploading one or multiple files
   with progress feedback (on modern browsers), does not block the user 
   interface during uploads, supports cancelling uploads.

   http://qooxdoo.org

   Copyright:
     2011 Zenesis Limited, http://www.zenesis.com

   License:
     MIT: https://opensource.org/licenses/MIT
     
     This software is provided under the same licensing terms as Qooxdoo,
     please see the LICENSE file in the Qooxdoo project's top-level directory 
     for details.

   Authors:
 * John Spackman (john.spackman@zenesis.com)

 ************************************************************************/

/**
 * Implementation of an UploadButton
 */
qx.Class.define("com.zenesis.qx.upload.UploadMenuButton", {
  extend: qx.ui.menu.Button,
  include: [ com.zenesis.qx.upload.MUploadButton ],

  members: {
    _onTap: function(evt) {
      var self = this;
      setTimeout(function() {
        self._onTap(evt);
      }, 100);
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

************************************************************************ */

/**
 * The button to fill the menubar
 *
 * @childControl arrow {qx.ui.basic.Image} arrow widget to show a submenu is available
 */
qx.Class.define("qx.ui.toolbar.MenuButton",
{
  extend : qx.ui.menubar.Button,




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /** Appearance of the widget */
    appearance :
    {
      refine : true,
      init : "toolbar-menubutton"
    },

    /** Whether the button should show an arrow to indicate the menu behind it */
    showArrow :
    {
      check : "Boolean",
      init : false,
      themeable : true,
      apply : "_applyShowArrow"
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    // overridden
    _applyVisibility : function(value, old) {
      this.base(arguments, value, old);

      // hide the menu too
      var menu = this.getMenu();
      if (value != "visible" && menu) {
        menu.hide();
      }

      // trigger a appearance recalculation of the parent
      var parent = this.getLayoutParent();
      if (parent && parent instanceof qx.ui.toolbar.PartContainer) {
        qx.ui.core.queue.Appearance.add(parent);
      }
    },


    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch(id)
      {
        case "arrow":
          control = new qx.ui.basic.Image();
          control.setAnonymous(true);
          this._addAt(control, 10);
          break;
      }

      return control || this.base(arguments, id);
    },


    // property apply routine
    _applyShowArrow : function(value, old)
    {
      if (value) {
        this._showChildControl("arrow");
      } else {
        this._excludeChildControl("arrow");
      }
    }
  }
});
/* ***********************************************************************

   UploadMgr - provides an API for uploading one or multiple files
   with progress feedback (on modern browsers), does not block the user 
   interface during uploads, supports cancelling uploads.

   http://qooxdoo.org

   Copyright:
     2011 Zenesis Limited, http://www.zenesis.com

   License:
     MIT: https://opensource.org/licenses/MIT
     
     This software is provided under the same licensing terms as Qooxdoo,
     please see the LICENSE file in the Qooxdoo project's top-level directory 
     for details.

   Authors:
 * John Spackman (john.spackman@zenesis.com)

 ************************************************************************/

/**
 * Manages uploading of files to the server; this class can use any suitable
 * widget to attach the input[type=file] to, provided the widget includes
 * com.zenesis.qx.upload.MUploadButton.
 * 
 * Uploader will use XhrHandler to upload via XMLHttpRequest if supported or
 * will fall back to FormHandler.
 * 
 * @require(qx.event.handler.Input)
 */
qx.Class.define("com.zenesis.qx.upload.UploadMgr", {
  extend: qx.core.Object,
  include: [ com.zenesis.qx.upload.MParameters ],

  construct: function(widget, uploadUrl) {
    this.base(arguments);
    this.__widgetsData = {};
    if (widget)
      this.addWidget(widget);
    if (uploadUrl)
      this.setUploadUrl(uploadUrl);
  },

  events: {
    /**
     * Fired when a file is added to the queue; data is the
     * com.zenesis.qx.upload.File
     */
    "addFile": "qx.event.type.Data",

    /**
     * Fired when a file starts to be uploaded; data is the
     * com.zenesis.qx.upload.File
     */
    "beginUpload": "qx.event.type.Data",

    /**
     * Fired when a file has been uploaded; data is the
     * com.zenesis.qx.upload.File
     */
    "completeUpload": "qx.event.type.Data",

    /**
     * Fired when a file upload has been cancelled; data is the
     * com.zenesis.qx.upload.File
     */
    "cancelUpload": "qx.event.type.Data"
  },

  properties: {
    /**
     * The URL to upload to
     */
    uploadUrl: {
      check: "String",
      nullable: false,
      init: "",
      event: "changeUploadUrl"
    },

    /**
     * Whether to automatically start uploading when a file is added
     * (default=true)
     */
    autoUpload: {
      check: "Boolean",
      init: true,
      nullable: false,
      event: "changeAutoUpload",
      apply: "_applyAutoUpload"
    },

    /**
     * Whether to support multiple files (default=true); this is not supported
     * on older browsers
     */
    multiple: {
      check: "Boolean",
      init: true,
      nullable: false,
      event: "changeMultiple",
      apply: "_applyMultiple"
    },

    /**
     * Prefix to apply to the name of input fields
     */
    inputNamePrefix: {
      check: "String",
      init: "uploadMgrInput",
      nullable: false,
      event: "changeInputNamePrefix"
    },

    /**
     * Whether the server can only handle multipart/form-data content type
     */
    requireMultipartFormData: {
      check: "Boolean",
      init: true,
      nullable: false,
      event: "changeRequireMultipartFormData",
      apply: "_applyRequireMultipartFormData"
    }
  },

  members: {
    __widgetsData: null,
    __inputSerial: 0,
    __uploadHandler: null,
    __uploadId: 0,

    /**
     * Adds a widget which is to have an input[type=file] attached; this would
     * typically be an instance of com.zenesis.qx.upload.UploadButton (see
     * com.zenesis.qx.upload.MUploadButton for implementing for other widgets)
     */
    addWidget: function(widget) {
      var appearId = widget.addListenerOnce("appear", function(evt) {
        var data = this.__widgetsData[widget.toHashCode()];
        if (data) {
          data.appearId = null;
          var container = widget.getContentElement();
          container.setStyle("overflow", "hidden");
          if (widget.getEnabled() && !data.inputElement)
            container.addAt(this._createInputElement(widget), 0);
          this.__fixupSize(widget);
        }
      }, this);
      var keydownId = null;
      if (qx.core.Environment.get("engine.name") != "gecko") {
        keydownId = widget.addListener("keydown", function(evt) {
          var data = this.__widgetsData[widget.toHashCode()];
          if (data && data.inputElement) {
            var dom = data.inputElement.getDomElement();
            if (dom && typeof dom.click == "function") {
              // dom.focus();
              dom.click();
            }
          }
        }, this);
      }
      this.__widgetsData[widget.toHashCode()] = {
        appearId: appearId,
        keydownId: keydownId,
        widget: widget,
        inputElement: null
      };
      widget.addListener("resize", function(evt) {
        this.__fixupSize(widget);
      }, this);
      widget.addListener("changeEnabled", function(evt) {
        if (evt.getData()) {
          var container = widget.getContentElement();
          container.addAt(this._createInputElement(widget), 0);
        } else {
          this._removeInputElement(widget);
        }
      }, this);
    },

    /**
     * Removes a widget
     * 
     * @param widget {qx.ui.core.Widget} Widget to remvove
     */
    removeWidget: function(widget) {
      var data = this.__widgetsData[widget.toHashCode()];
      if (data) {
        if (data.appearId)
          widget.removeListener(data.appearId);
        if (data.keydownId)
          widget.removeListener(data.keydownId);
        delete this.__widgetsData[widget.toHashCode()];
      }
    },
    
    /**
     * Adds a blob to the upload list 
     * 
     * @param blob    {Blob}    the blob to upload
     * @param params  {Object}  List of params added to the upload params
     */
    addBlob: function (filename, blob, params){
      this.getUploadHandler().addBlob(filename, blob, params);
      if (this.getAutoUpload())
        this.getUploadHandler().beginUploads();
    },
    
    /**
     * Helper method that corrects the size of the input element to match the
     * size of the widget
     * 
     * @param widget {qx.ui.core.Widget} Widget to fixup size
     */
    __fixupSize: function(widget) {
      var data = this.__widgetsData[widget.toHashCode()];
      if (data && data.inputElement) {
        var bounds = widget.getBounds();
        // It may be that if the widgets icon is styled
        // through a theme, neither label nor icon are set yet.
        // In this situation bounds calculation would fail.
        if(bounds) { 
          data.inputElement.setStyles({
            width: bounds.width + "px",
            height: bounds.height + "px"
          });
        }
      }
    },

    // property apply
    _applyAutoUpload: function(value, oldValue) {
      this.getUploadHandler().beginUploads();
    },

    // property apply
    _applyMultiple: function(value, oldValue) {
      for ( var hash in this.__widgetsData) {
        var data = this.__widgetsData[hash];
        if (data.inputElement)
          data.inputElement.setMultiple(value);
      }
    },

    // property apply
    _applyRequireMultipartFormData: function(value, oldValue) {
      if (this.__uploadHandler)
        throw new Error("Changing the requireMultipartFormData property of " + this + " has no effect once uploads have started");
    },

    /**
     * Cancels a file being uploaded
     * 
     * @param file {String} Upload to cancel
     */
    cancel: function(file) {
      this.getUploadHandler().cancel(file);
    },

    /**
     * Cancels all files being uploaded
     */
    cancelAll: function() {
      this.getUploadHandler().cancelAll();
    },

    /**
     * Creates the input[type=file] element
     * 
     * @returns
     */
    _createInputElement: function(widget) {
      var data = this.__widgetsData[widget.toHashCode()];
      var name = this.getInputNamePrefix() + '-' + (++this.__inputSerial);
      qx.core.Assert.assertNull(data.inputElement);
      var elem = data.inputElement = new com.zenesis.qx.upload.InputElement(widget, this.getMultiple(), name);
      elem.addListenerOnce("change", qx.lang.Function.bind(this._onInputChange, this, elem));

      return elem;
    },

    /**
     * Removes the input element - ie discards the current one (which presumably
     * has already been queued for uploading)
     */
    _removeInputElement: function(widget) {
      var data = this.__widgetsData[widget.toHashCode()];
      var elem = data.inputElement;
      var container = widget.getContentElement();
      data.inputElement = null;
      if (elem)
        container.remove(elem);
    },

    /**
     * Resets the input element - ie discards the current one (which presumably
     * has already been queued for uploading) and creates a new one
     */
    _resetInputElement: function(widget) {
      this._removeInputElement(widget);
      var container = widget.getContentElement();
      container.addAt(this._createInputElement(widget), 0);
    },

    /**
     * Callback for changes to the input[ty=file]'s value, ie this is called
     * when the user has selected a file to upload
     * 
     * @param elem {Element} Element which is affected
     * @param evt {Event} Event data
     */
    _onInputChange: function(elem, evt) {
      var widget = elem.getWidget();

      this.getUploadHandler().addFile(elem.getDomElement(), widget);
      if (this.getAutoUpload())
        this.getUploadHandler().beginUploads();
      this._resetInputElement(widget);
    },

    /**
     * Returns the upload handler
     * 
     * @returns
     */
    getUploadHandler: function() {
      if (!this.__uploadHandler) {
        if (com.zenesis.qx.upload.XhrHandler.isSupported(this.isRequireMultipartFormData()))
          this.__uploadHandler = new com.zenesis.qx.upload.XhrHandler(this);
        else
          this.__uploadHandler = new com.zenesis.qx.upload.FormHandler(this);
      }
      return this.__uploadHandler;
    },

    /**
     * Allocates a new upload ID; this is just a unique number that widgets or
     * application code can use to uniquely identify themselves to the server
     */
    allocateUploadId: function() {
      return "uploadId:" + (++this.__uploadId);
    }

  }
});
qx.Class.define("com.zenesis.qx.upload.InputElement", {
  extend: qx.html.Element,

  construct: function(widget, multiple, name) {
    // styling the input[type=file]
    // element is a bit tricky. Some browsers just ignore the normal
    // css style input. Firefox is especially tricky in this regard.
    // since we are providing our one look via the underlying qooxdoo
    // button anyway, all we have todo is position the ff upload
    // button over the button element. This is tricky in itself
    // as the ff upload button consists of a text and a button element
    // which are not css accessible themselfes. So the best we can do,
    // is align to the top right corner of the upload widget and set its
    // font so large that it will cover even realy large underlying buttons.
    var css = {
      position: "absolute",
      cursor: "pointer",
      hideFocus: "true",
      zIndex: widget.getZIndex() + 11,
      opacity: 0,
      // align to the top right hand corner
      top: '0px',
      right: '0px',
      // ff ignores the width setting pick a realy large font size to get
      // a huge button that covers the area of the upload button
      fontFamily: 'Arial',
      // from valums.com/ajax-upload: 4 persons reported this, the max values
      // that worked for them were 243, 236, 236, 118
      fontSize: '118px'
    };
    if ((qx.core.Environment && qx.core.Environment.get('browser.name') == 'ie' && qx.core.Environment.get('browser.version') < 9)
        || (!qx.core.Environment && qx.bom.client.Engine.MSHTML && qx.bom.client.Engine.VERSION < 9.0)) {
      css.filter = 'alpha(opacity=0)';
      css.width = '200%';
      css.height = '100%';
    }

    var attrs = {
        type: 'file',
        name: name,
        title: ' '
      };
    if (qx.Class.hasMixin(widget.constructor, com.zenesis.qx.upload.MUploadButton)) {
	    var accept = widget.getAcceptUpload();
	    if (accept)
	    	attrs.accept = accept;
    }
    this.base(arguments, 'input', css, attrs);
    this.__relatedWidget = widget;
    this.setMultiple(!!multiple);
  },

  properties: {
    multiple: {
      init: false,
      check: "Boolean",
      apply: "_applyMultiple"
    }
  },

  members: {
    __relatedWidget: null,

    getWidget: function() {
      return this.__relatedWidget;
    },

    _applyMultiple: function(value, oldValue) {
      if (value)
        this.setAttribute("multiple", "multiple");
      else
        this.removeAttribute("multiple");
    }
  }
});
/* ***********************************************************************

   UploadMgr - provides an API for uploading one or multiple files
   with progress feedback (on modern browsers), does not block the user 
   interface during uploads, supports cancelling uploads.

   http://qooxdoo.org

   Copyright:
     2011 Zenesis Limited, http://www.zenesis.com

   License:
     MIT: https://opensource.org/licenses/MIT
     
     This software is provided under the same licensing terms as Qooxdoo,
     please see the LICENSE file in the Qooxdoo project's top-level directory 
     for details.

   Authors:
 * John Spackman (john.spackman@zenesis.com)

 ************************************************************************/

/**
 * Base class for upload implementations; operates a queue of pending and
 * current uploads, and restricts the number of simultaneous uploads.
 */
qx.Class.define("com.zenesis.qx.upload.AbstractHandler", {
  type : "abstract", 
  extend: qx.core.Object,

  /**
   * Constructor
   * 
   * @param uploader
   *          {com.zenesis.qx.upload.UploadMgr} controller for uploading
   */
  construct: function(uploader) {
    this.base(arguments);
    qx.core.Assert.assertNotNull(uploader);
    this.__queue = [];
    this.__current = [];
    this.__params = {};
    this.__uploader = uploader;
  },

  properties: {
    /**
     * Maximum number of simultaneous uploads
     */
    maxConnections: {
      check: "Integer",
      init: 5,
      nullable: false,
      event: "changeMaxConnections"
    }
  },

  members: {
    // Last unique ID used
    __lastId: 0,

    // Uploader instance
    __uploader: null,

    // Queue of com.zenesis.qx.upload.File's to send
    __queue: null,

    // List of com.zenesis.qx.upload.File's currently being sent
    __current: null,

    // Parameters to post with the file
    __params: null,

    /**
     * Adds a file to the upload queue; this does not start uploading until
     * beginUploads is called.
     * 
     * @param input
     *          {DOM} either one input[type=file] or an array of
     *          input[type=file]
     * @param widget
     *          {Widget} the widget that trigger the upload
     */
    addFile: function(input, widget) {
      var files = this._createFile(input);
      if (!qx.lang.Type.isArray(files)) {
        files.setUploadWidget(widget);
        this._addFile(files);
      } else
        for (var i = 0; i < files.length; i++) {
          files[i].setUploadWidget(widget);
          this._addFile(files[i]);
        }
    },

    /**
     * Adds a blob to the upload list 
     * 
     * @param filename    {String}  name of object
     * @param blob        {Blob}    the blob to upload
     * @param params      {Object}  List of params added to the upload params
     */
    addBlob: function (filename, blob, params){
      /* abstract */
    },

    /**
     * Adds a file to the outbound queue
     * 
     * @param file
     *          {com.zenesis.qx.upload.File} the file to add
     */
    _addFile: function(file) {
      if (this.__uploader.fireDataEvent("addFile", file, null, true))
        this.__queue.push(file);
    },

    /**
     * Begins spooling uploads to the server, up to the maxConnections
     */
    beginUploads: function() {
      while (this.__queue.length > 0 && this.__current.length < this.getMaxConnections()) {
        var file = this.__queue.shift();
        this.__current.push(file);
        this.__uploader.fireDataEvent("beginUpload", file);
        file.setState("uploading");
        this._doUpload(file);
      }
    },

    /**
     * Cancels a file
     * 
     * @param file
     *          {com.zenesis.qx.upload.File} the file to cancel
     */
    cancel: function(file) {
      var wasUploading = this.__current.length > 0;
      // this.debug("cancelled: id=" + file.getId() + ", fileName=" +
      // file.getFilename());
      this._cancel(file);
      if (wasUploading && this.__uploader.getAutoUpload())
        this.beginUploads();
    },

    /**
     * Cancels all uploads
     */
    cancelAll: function() {
      for (var current = this.__current, i = 0; i < current.length; i++)
        this._cancel(current[i]);
      this.__current.splice(0, this.__current.length);
      this.__queue.splice(0, this.__queue.length);
    },

    /**
     * Cancels a file
     * 
     * @param file
     *          {com.zenesis.qx.upload.File} the file to cancel
     */
    _cancel: function(file) {
      var inCurrent = false;
      for (var current = this.__current, i = 0; i < current.length; i++)
        if (current[i] == file) {
          current.splice(i, 1);
          inCurrent = true;
          break;
        }
      for (var queue = this.__queue, i = 0; i < queue.length; i++)
        if (queue[i] == file) {
          queue.splice(i, 1);
          break;
        }
      file.setState("cancelled");
      if (inCurrent)
        this._doCancel(file);
      this.__uploader.fireDataEvent("cancelUpload", file);
    },

    /**
     * Called by derived classes when a file has completed
     * 
     * @param file
     *          {com.zenesis.qx.upload.File} the file which has finsihed
     *          uploading
     * @param response
     *          {String} text received
     */
    _onCompleted: function(file, response) {
      // this.debug("completed: id=" + file.getId() + ", fileName=" +
      // file.getFilename() + ", response=" + response);
      var current = this.__current;
      for (var i = 0; i < current.length; i++)
        if (current[i] == file) {
          current.splice(i, 1);
          break;
        }

      file.setResponse(response);

      // File state should be uploading or cancelled
      if (file.getState() == "uploading") {
        file.setState("uploaded");
        this.__uploader.fireDataEvent("completeUpload", file);
      }

      // Start the next one
      this.beginUploads();
    },

    /**
     * Returns the uploader
     * 
     * @returns {com.zenesis.qx.upload.UploadMgr}
     */
    _getUploader: function() {
      return this.__uploader;
    },

    /**
     * Allocates a unique ID
     * 
     * @returns {Number}
     */
    _getUniqueFileId: function() {
      return ++this.__lastId;
    },

    /**
     * Adds a parameter to send to the client
     * 
     * @param key
     *          {String} the name of the parameter
     * @param value
     *          {String} the value of the parameter
     * @deprecated {1.0} see com.zenesis.qx.upload.UploadMgr.setParam or
     *             com.zenesis.qx.upload.File.setParam
     */
    addParam: function(key, value) {
      qx.log.Logger.deprecatedMethodWarning(arguments.callee,
          "see com.zenesis.qx.upload.UploadMgr.setParam or com.zenesis.qx.upload.File.setParam");
      this.__params[key] = value;
    },

    /**
     * Returns the paramaters map
     * 
     * @returns {Map}
     * @deprecated {1.0} see com.zenesis.qx.upload.File.getParam
     */
    getParams: function() {
      qx.log.Logger.deprecatedMethodWarning(arguments.callee,
          "see com.zenesis.qx.upload.UploadMgr.getParam or com.zenesis.qx.upload.File.getParam");
      return this.__params;
    },

    /**
     * Helper method that produces a final list of parameter values, by merging
     * those set in this with those in the file.
     * 
     * @param file
     *          {File} the file object
     * @returns {Map} map of parameters to sent to the server
     */
    _getMergedParams: function(file) {
      var result = {};
      for ( var name in this.__params) {
        var value = this.__params[name];
        if (value !== null)
          result[name] = value;
      }
      function merge(obj) {
        var names = obj.getParamNames();
        for (var i = 0; i < names.length; i++) {
          var name = names[i], value = obj.getParam(name);
          if (value !== null)
            result[name] = value;
          else
            delete result[name];
        }
      }
      merge(this.__uploader);
      var widget = file.getUploadWidget();
      if (widget && (typeof widget.getParamNames == "function"))
        merge(widget);
      if (typeof file.getParamNames == "function")
        merge(file);
      return result;
    },

    /**
     * Implementation must create a com.zenesis.qx.upload.File or array of
     * com.zenesis.qx.upload.File
     * 
     * @param input
     *          {DOM} the DOM input[type=file]
     * @return {com.zenesis.qx.upload.File|com.zenesis.qx.upload.File[]}
     */
    _createFile: function(input) {
      /* abstract */
    },

    /**
     * Called to do the real work of uploading the file
     * 
     * @param file
     *          {com.zenesis.qx.upload.File}
     */
    _doUpload: function(file) {
      /* abstract */
    },

    /**
     * Called to cancel the upload
     * 
     * @param file
     *          {com.zenesis.qx.upload.File} file to cancel uploading
     */
    _doCancel: function(file) {
      /* abstract */
    }

  }
});
/* ***********************************************************************

   UploadMgr - provides an API for uploading one or multiple files
   with progress feedback (on modern browsers), does not block the user 
   interface during uploads, supports cancelling uploads.

   http://qooxdoo.org

   Copyright:
     2011 Zenesis Limited, http://www.zenesis.com

   License:
     MIT: https://opensource.org/licenses/MIT
     
     This software is provided under the same licensing terms as Qooxdoo,
     please see the LICENSE file in the Qooxdoo project's top-level directory 
     for details.

     Parts of this code is based on the work by Andrew Valums (andrew@valums.com)
     and is covered by the GNU GPL and GNU LGPL2 licenses; please see
     http://valums.com/ajax-upload/.

   Authors:
 * John Spackman (john.spackman@zenesis.com)

 ************************************************************************/
/**
 * @ignore(File)
 * @ignore(FileReader)
 * @ignore(FormData)
 */
/**
 * Implementation of AbstractHandler that uses XMLHttpRequest; this is based on
 * work at http://valums.com/ajax-upload/.
 * 
 * Call com.zenesis.qx.upload.XhrHandler.isSupported() to check whether this
 * class can be used (otherwise use FormHandler)
 */
qx.Class.define("com.zenesis.qx.upload.XhrHandler", {
  extend: com.zenesis.qx.upload.AbstractHandler,

  members: {
      
    /*
     * @Override
     */
    addBlob: function (filename, blob, params){
     var id = "upload-" + this._getUniqueFileId();
     var file = new com.zenesis.qx.upload.File(blob, filename, id);
     if (params) {
      for (var name in params) {
         var value = params[name];
         if (value !== null)
           file.setParam(name, value);
      }
     }
     this._addFile(file);
    },
      
    /*
     * @Override
     */
    _createFile: function(input) {
      var bomFiles = input.files;
      if (!bomFiles || !bomFiles.length)
        this.debug("No files found to upload via XhrHandler");

      var files = [];
      for (var i = 0; i < bomFiles.length; i++) {
        var bomFile = bomFiles[i];
        var id = "upload-" + this._getUniqueFileId();
        var filename = typeof bomFile.name != "undefined" ? bomFile.name : bomFile.fileName;
        var file = new com.zenesis.qx.upload.File(bomFile, filename, id);
        var fileSize = typeof bomFile.size != "undefined" ? bomFile.size : bomFile.fileSize;
        file.setSize(fileSize);
        files.push(file);
      }

      return files;
    },

    /*
     * @Override
     */
    _doUpload: function(file) {
      function sendAsMime(binaryData) {
        body += binaryData + "\r\n";
        body += "--" + boundary + "--";

        xhr.open("POST", action, true);
        setRequestHeader("X-Requested-With", "XMLHttpRequest");
        setRequestHeader("X-File-Name", encodeURIComponent(file.getFilename()));
        setRequestHeader("Content-Type", "multipart/form-data; boundary=" + boundary);
        xhr.send(body);
      }
      
      function setRequestHeader(name, value) {
      	xhr.setRequestHeader(name, value);
      	headerLength += name.length + 2 + value.length + 1;
      }
      
      /*
       * The upload progress includes the size of the headers, but we cannot ask XMLHttpRequest what the
       * headers were so we count the headers we set and also add these below.  This is never going to be
       * completely accurate, but it gets us a lot closer.
       */
      var headerLength = 0;
      var DEFAULT_HEADERS = {
      		"Accept": "*/*",
      		"Accept-Encoding": "gzip, deflate",
      		"Accept-Language": "en,en-US;q=0.8",
      		"Cache-Control": "no-cache",
      		"Connection": "keep-alive",
      		"Content-Length": "" + file.getSize(),
      		"Content-Type": "multipart/form-data; boundary=----WebKitFormBoundaryTfptZDRmE8C3dZmW",
      		"Host": document.location.host,
      		"Pragma": "no-cache",
      		"Referer": document.location.href,
      		"User-Agent": navigator.userAgent
      };
      if (document.location.origin)
        DEFAULT_HEADERS.Origin = document.location.origin;
      for (var key in DEFAULT_HEADERS)
      	headerLength += DEFAULT_HEADERS[key].length + 1; 

      var xhr = new XMLHttpRequest();
      if (com.zenesis.qx.upload.XhrHandler.isWithCredentials())
        xhr.withCredentials = true;

      var self = this;

      file.setUserData("com.zenesis.qx.upload.XhrHandler", xhr);

      xhr.upload.onprogress = function(e) {
        self.debug("onprogress: lengthComputable=" + e.lengthComputable + ", total=" + e.total + ", loaded=" + e.loaded + ", headerLength=" + headerLength);
        if (e.lengthComputable) {
          file.setSize(e.total - headerLength);
          file.setProgress(e.loaded - headerLength);
        }
      };

      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          var response = xhr.responseText;
          // self.debug("xhr server status=" + xhr.status + ", responseText=" +
          // response);
          file.setUserData("com.zenesis.qx.upload.XhrHandler", null);
          file.setStatus(xhr.status);
          self._onCompleted(file, response);
        }
      };

      if (typeof FormData == "function" || typeof FormData == "object") {
        var fd = new FormData();

        // build query string
        var action = this._getUploader().getUploadUrl();
        var params = this._getMergedParams(file);
        for (var name in params)
          fd.append(name, encodeURIComponent(params[name]));
        fd.append("file", file.getBrowserObject());

        xhr.open("POST", action, true);
        setRequestHeader("X-Requested-With", "XMLHttpRequest");
        setRequestHeader("X-File-Name", encodeURIComponent(file.getFilename()));
        xhr.send(fd);

      } else {
        var browserFile = file.getBrowserObject();
        var boundary = "--------FormData" + Math.random(), body = "", action = this._getUploader().getUploadUrl(), params = this
            ._getMergedParams(file);
        for ( var name in params) {
          body += "--" + boundary + "\r\n";
          body += "Content-Disposition: form-data; name=\"" + name + "\";\r\n\r\n";
          body += params[name] + "\r\n";
        }
        body += "--" + boundary + "\r\n";
        body += "Content-Disposition: form-data; name=\"file\"; filename=\"" + file.getFilename() + "\"\r\n";
        body += "Content-Type: " + (browserFile.type || "application/octet-stream") + "\r\n\r\n";

        if (typeof browserFile.getAsBinary == "function") {
          sendAsMime(browserFile.getAsBinary());
        } else {
          var reader = new FileReader();
          reader.onload = function(evt) {
            sendAsMime(evt.target.result);
          };
          reader.readAsBinaryString(browserFile);
        }
      }
    },

    /*
     * @Override
     */
    _doCancel: function(file) {
      var xhr = file.getUserData("com.zenesis.qx.upload.XhrHandler");
      if (xhr) {
        xhr.abort();
        file.setUserData("com.zenesis.qx.upload.XhrHandler", null);
      }
    }
  },

  statics: {
    __withCredentials: false,

    /**
     * Detects whether this handler is support on the current browser
     * 
     * @returns {Boolean}
     */
    isSupported: function(requireMultipartFormData) {
      var input = document.createElement('input');
      input.type = 'file';

      var isSupported = 'multiple' in input && typeof File != "undefined" && typeof (new XMLHttpRequest()).upload != "undefined";

      return isSupported;
    },

    /**
     * Whether to set XMLHttpRequest.withCredentials (used for CORS uploads wth
     * cookies)
     */
    setWithCredentials: function(value) {
      this.__withCredentials = true;
    },

    /**
     * Whether to set XMLHttpRequest.withCredentials (used for CORS uploads wth
     * cookies)
     */
    isWithCredentials: function() {
      return this.__withCredentials;
    }
  }
});
/* ***********************************************************************

   UploadMgr - provides an API for uploading one or multiple files
   with progress feedback (on modern browsers), does not block the user 
   interface during uploads, supports cancelling uploads.

   http://qooxdoo.org

   Copyright:
     2011 Zenesis Limited, http://www.zenesis.com

   License:
     MIT: https://opensource.org/licenses/MIT
     
     This software is provided under the same licensing terms as Qooxdoo,
     please see the LICENSE file in the Qooxdoo project's top-level directory 
     for details.

   Authors:
 * John Spackman (john.spackman@zenesis.com)

 ************************************************************************/

/**
 * Represents a file that is to be or has been uploaded; this should be
 * instantiated by the _createFile method of AbstractHandler implementations and
 * is not expected to be used separately
 */
qx.Class.define("com.zenesis.qx.upload.File", {
  extend: qx.core.Object,

  /**
   * Constructor
   * 
   * @param browserObject
   *          {DOM} Anythign the AbstractHandler wants to store, typically an
   *          input[type=file] or a File
   * @param filename
   *          {String} the name of the file
   * @param id
   *          {String} the unique id of the file
   */
  construct: function(browserObject, filename, id) {
    this.base(arguments);
    qx.core.Assert.assertNotNull(browserObject);
    qx.core.Assert.assertNotNull(filename);
    qx.core.Assert.assertNotNull(id);
    this.__browserObject = browserObject;
    this.setFilename(filename);
    this.setId(id);
  },

  properties: {
    /**
     * The filename
     */
    filename: {
      check: "String",
      nullable: false,
      event: "changeFilename"
    },

    /**
     * A unique ID for the upload
     */
    id: {
      check: "String",
      nullable: false,
      event: "changeId"
    },

    /**
     * Size of the file, if known (not available on older browsers)
     */
    size: {
      check: "Integer",
      nullable: false,
      init: -1,
      event: "changeSize"
    },

    /**
     * Progress of the upload, if known (not available on older browsers)
     */
    progress: {
      check: "Integer",
      nullable: false,
      init: 0,
      event: "changeProgress"
    },

    /**
     * State of the file, re: uploading
     */
    state: {
      check: [ "not-started", "uploading", "cancelled", "uploaded" ],
      nullable: false,
      init: "not-started",
      event: "changeState",
      apply: "_applyState"
    },

    /**
     * The response string received from the server
     */
    response: {
      init: null,
      nullable: true,
      check: "String",
      event: "changeResponse"
    },

    /**
     * The widget that triggered the upload
     */
    uploadWidget: {
      init: null,
      nullable: true,
      event: "changeUploadWidget"
    },

    /**
     * The status of an XHR request. This can be used to determine if the
     * upload was successful.
     */
    status: {
      init: null,
      nullable: true,
      event: "changeStatus"
    }
  },

  members: {
    __browserObject: null,
    __params: null,

    /**
     * Sets a parameter value to be sent with the file
     * 
     * @param name
     *          {String} name of the parameter
     * @param value
     *          {String} the value of the parameter, or null to delete a
     *          previous parameter
     */
    setParam: function(name, value) {
      if (value !== null && typeof value != "string")
        value = "" + value;
      if (!this.__params)
        this.__params = {};
      this.__params[name] = value;
    },

    /**
     * Returns a parameter value to be sent with the file
     * 
     * @param name {String} Name of the parameter
     * @returns {Boolean}
     */
    getParam: function(name) {
      return this.__params && this.__params[name];
    },

    /**
     * Returns a list of parameter names
     * 
     * @returns {Array}
     */
    getParamNames: function() {
      var result = [];
      if (this.__params)
        for ( var name in this.__params)
          result.push(name);
      return result;
    },

    /**
     * Returns the browser object
     * 
     * @returns {DOM}
     */
    getBrowserObject: function() {
      return this.__browserObject;
    },

    // property apply
    _applyState: function(value, oldValue) {
      qx.core.Assert.assertTrue((!oldValue && value == "not-started")
          || (oldValue == "not-started" && (value == "cancelled" || value == "uploading"))
          || (oldValue == "uploading" && (value == "cancelled" || value == "uploaded")));
    }
  }
});
/* ***********************************************************************

   UploadMgr - provides an API for uploading one or multiple files
   with progress feedback (on modern browsers), does not block the user 
   interface during uploads, supports cancelling uploads.

   http://qooxdoo.org

   Copyright:
     2011 Zenesis Limited, http://www.zenesis.com

   License:
     MIT: https://opensource.org/licenses/MIT
     
     This software is provided under the same licensing terms as Qooxdoo,
     please see the LICENSE file in the Qooxdoo project's top-level directory 
     for details.
     
     Parts of this code is based on the work by Andrew Valums (andrew@valums.com)
     and is covered by the GNU GPL and GNU LGPL2 licenses; please see
     http://valums.com/ajax-upload/.

   Authors:
 * John Spackman (john.spackman@zenesis.com)

 ************************************************************************/

/**
 * Implementation of AbstractHandler that uses iframe and form DOM elements to
 * send the file.
 */

qx.Class.define("com.zenesis.qx.upload.FormHandler", {
  extend: com.zenesis.qx.upload.AbstractHandler,

  members: {
    /*
     * @Override
     */
    addBlob: function (filename, blob, params) {
	   throw new Error("addBlob is not supported in the FormHandler.");	
    },

    /*
     * @Override
     */
    _createFile: function(input) {
      var id = "upload-" + this._getUniqueFileId(), filename = input.value.replace(/.*(\/|\\)/, ""), file = new com.zenesis.qx.upload.File(
          input, filename, id);
      return file;
    },

    /*
     * @Override
     */
    _doUpload: function(file) {
      var iframe = this._createIframe(file.getId()), form = this._createForm(iframe, file);

      form.appendChild(file.getBrowserObject());

      var self = this;

      qx.bom.Event.addNativeListener(iframe, "load", function(evt) {
        // when we remove iframe from dom the request stops, but in IE
        // load event fires
        if (!iframe.parentNode)
          return;

        // fixing Opera 10.53
        try {
          if (iframe.contentDocument && iframe.contentDocument.body && iframe.contentDocument.body.innerHTML == "false") {
            // In Opera event is fired second time when body.innerHTML
            // changed from false
            // to server response approx. after 1 sec when we upload
            // file with iframe
            return;
          }
        } catch (e) {
          // IE fix
        }

        // self.debug('iframe loaded');

        var response = self._getIframeContent(iframe);

        self._onCompleted(file, response);

        // timeout added to fix busy state in FF3.6
        setTimeout(function() {
          iframe.parentNode.removeChild(iframe);
          form.parentNode.removeChild(form);
        }, 1);
      });
      form.submit();
    },

    /*
     * @Override
     */
    _doCancel: function(file) {
      var data = file.getUserData("com.zenesis.qx.upload.FormHandler");
      if (!data)
        return;
      var iframe = document.getElementById("upload-iframe-" + file.getId()), form = document.getElementById("upload-form-"
          + file.getId());

      if (iframe != null) {
        // to cancel request set src to something else
        // we use src="javascript:false;" because it doesn't
        // trigger ie6 prompt on https
        iframe.setAttribute('src', 'javascript:false;');
        iframe.parentNode.removeChild(iframe);
      }
      if (form != null)
        form.parentNode.removeChild(form);
    },

    /**
     * Returns text received by iframe from server.
     * 
     * @return {String}
     */
    _getIframeContent: function(iframe) {
      try {
        // iframe.contentWindow.document - for IE<7
        var doc = iframe.contentDocument ? iframe.contentDocument : iframe.contentWindow.document, response = doc.body.innerHTML;
        // this.debug("response=" + response);
        return response;
      } catch (e) {
        // IE will throw an exception if the upload is cross domain and
        // we try to access the iframe's content
        return null;
      }
    },

    /**
     * Creates iframe with unique name
     * 
     * @return {DOMElement} the iframe
     */
    _createIframe: function(id) {
      // We can't use following code as the name attribute
      // won't be properly registered in IE6, and new window
      // on form submit will open
      // var iframe = document.createElement('iframe');
      // iframe.setAttribute('name', id);

      var iframe = qx.dom.Element.create("iframe", {
        src: "javascript:false;", // src="javascript:false;" removes ie6
                                  // prompt on https
        name: id,
        id: "upload-iframe-" + id
      });

      qx.bom.element.Style.setStyles(iframe, {
        display: 'none'
      });
      document.body.appendChild(iframe);

      return iframe;
    },

    /**
     * Creates form, that will be submitted to iframe
     * 
     * @return {DOMElement} the form
     */
    _createForm: function(iframe, file) {
      // We can't use the following code in IE6
      // var form = document.createElement('form');
      // form.setAttribute('method', 'post');
      // form.setAttribute('enctype', 'multipart/form-data');
      // Because in this case file won't be attached to request
      var form = qx.dom.Element.create("form", {
        enctype: "multipart/form-data",
        encoding: "multipart/form-data",
        action: this._getUploader().getUploadUrl(),
        method: "POST",
        target: iframe.name,
        id: "upload-form-" + file.getId()
      });

      qx.bom.element.Style.setStyles(form, {
        display: 'none'
      });
      var params = this._getMergedParams(file);
      for ( var name in params) {
        var el = qx.dom.Element.create('input', {
          type: "hidden",
          name: name,
          value: params[name]
        });
        form.appendChild(el);
      }
      document.body.appendChild(form);

      return form;
    }

  }
});
