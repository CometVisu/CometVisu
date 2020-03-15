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
     * Andreas Ecker (ecker)
     * Til Schneider (til132)
     * Jonathan Weiß (jonathan_rass)
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * Abstract base class for iframe widgets.
 */
qx.Class.define("qx.ui.embed.AbstractIframe",
{
  extend : qx.ui.core.Widget,

  /**
   * @param source {String} URL which should initially set.
   */
  construct : function(source)
  {
    this.base(arguments);

    if (source) {
      this.setSource(source);
    }

    this._getIframeElement().addListener("navigate", this.__onNavigate, this);
  },


  events:
  {
    /**
     * The "load" event is fired after the iframe content has successfully been loaded.
     */
    "load" : "qx.event.type.Event",

    /**
    * The "navigate" event is fired whenever the location of the iframe
    * changes.
    *
    * Useful to track user navigation and internally used to keep the source
    * property in sync. Only works when the destination source is of same
    * origin than the page embedding the iframe.
    */
    "navigate" : "qx.event.type.Data"
  },


  properties :
  {
    /**
     * Source URL of the iframe.
     */
    source :
    {
      check : "String",
      apply : "_applySource",
      init : "about:blank"
    },

    /**
     * Name of the iframe.
     */
    frameName :
    {
      check : "String",
      init : "",
      apply : "_applyFrameName"
    }
  },


  members :
  {
    /**
     * Get the Element wrapper for the iframe
     *
     * @abstract
     * @return {qx.html.Iframe} the iframe element wrapper
     */
    _getIframeElement : function() {
      throw new Error("Abstract method call");
    },


    // property apply
    _applySource : function(value, old) {
      this._getIframeElement().setSource(value);
    },


    // property apply
    _applyFrameName : function(value, old) {
      this._getIframeElement().setAttribute("name", value);
    },



    /**
     * Get the DOM window object of an iframe.
     *
     * @return {Window} The DOM window object of the iframe.
     */
    getWindow : function() {
      return this._getIframeElement().getWindow();
    },


    /**
     * Get the DOM document object of an iframe.
     *
     * @return {Document} The DOM document object of the iframe.
     */
    getDocument : function() {
      return this._getIframeElement().getDocument();
    },


    /**
     * Get the HTML body element of the iframe.
     *
     * @return {Element} The DOM node of the <code>body</code> element of the iframe.
     */
    getBody : function() {
      return this._getIframeElement().getBody();
    },


    /**
     * Get the current name.
     *
     * @return {String} The iframe's name.
     */
    getName : function() {
      return this._getIframeElement().getName();
    },


    /**
     * Reload the contents of the iframe.
     *
     */
    reload : function() {
      this._getIframeElement().reload();
    },

    /**
    * Handle user navigation. Sync actual URL of iframe with source property.
    *
    * @param e {qx.event.type.Data} navigate event
    */
    __onNavigate: function(e) {
      var actualUrl = e.getData();

      if (actualUrl) {
        this.setSource(actualUrl);
      }

      this.fireDataEvent("navigate", actualUrl);
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
     * Andreas Ecker (ecker)
     * Til Schneider (til132)
     * Jonathan Weiß (jonathan_rass)

************************************************************************ */

/**
 * Container widget for internal frames (iframes).
 * An iframe can display any HTML page inside the widget.
 *
 * *Example*
 *
 * Here is a little example of how to use the widget.
 *
 * <pre class='javascript'>
 * var document = this.getRoot();
 * var iframe = new qx.ui.embed.Iframe("http://www.qooxdoo.org");
 * document.add(iframe);
 * </pre>
 *
 *
 * *External Documentation*
 *
 * <a href='http://manual.qooxdoo.org/${qxversion}/pages/widget/iframe.html' target='_blank'>
 * Documentation of this widget in the qooxdoo manual.</a>
 * 
 * 
 * *Notes*
 * When modifying this file, note that the test qx.test.ui.embed.Iframe.testSyncSourceAfterDOMMove
 * has been disabled under Chrome because of problems with Travis and Github.  Changes to this file
 * should be tested manually against that test.
 */
qx.Class.define("qx.ui.embed.Iframe",
{
  extend : qx.ui.embed.AbstractIframe,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @ignore(MutationObserver)
   * @param source {String} URL which should initially set.
   */
  construct : function(source)
  {
    if (source != null) {
      this.__source = source;
    }

    this.base(arguments, source);

    qx.event.Registration.addListener(document.body, "pointerdown", this.block, this, true);
    qx.event.Registration.addListener(document.body, "pointerup", this.release, this, true);
    qx.event.Registration.addListener(document.body, "losecapture", this.release, this, true);

    this.__blockerElement = this._createBlockerElement();

    if ( qx.core.Environment.get("ecmascript.mutationobserver") )
    {
      this.addListenerOnce("appear", function ()
      {
        var element = this.getContentElement().getDomElement();

        // Mutation record check callback
        var isDOMNodeInserted = function (mutationRecord)
        {
          var i;
          // 'our' iframe was either added...
          if (mutationRecord.addedNodes)
          {
            for (i = mutationRecord.addedNodes.length; i>=0; --i) {
              if (mutationRecord.addedNodes[i] == element) {
                return true;
              }
            }
          }
          // ...or removed
          if (mutationRecord.removedNodes)
          {
            for (i = mutationRecord.removedNodes.length; i>=0; --i) {
              if (mutationRecord.removedNodes[i] == element) {
                return true;
              }
            }
          }
          return false;
        };

        var observer = new MutationObserver(function (mutationRecords)
        {
          if (mutationRecords.some(isDOMNodeInserted)) {
            this._syncSourceAfterDOMMove();
          }
        }.bind(this));

        // Observe parent element
        var parent = this.getLayoutParent().getContentElement().getDomElement();
        observer.observe(parent, { childList: true });

      }, this);
    }
    else // !qx.core.Environment.get("ecmascript.mutationobserver")
    {
      this.addListenerOnce("appear", function ()
      {
        var element = this.getContentElement().getDomElement();
        qx.bom.Event.addNativeListener(element, "DOMNodeInserted", this._onDOMNodeInserted);
      }, this);
      this._onDOMNodeInserted = qx.lang.Function.listener(this._syncSourceAfterDOMMove, this);
    }
  },


  properties :
  {
    // overridden
    appearance :
    {
      refine : true,
      init : "iframe"
    },


    /**
     * Whether to show the frame's native context menu.
     *
     * Note: This only works if the iframe source is served from the same domain
     * as the main application.
     */
    nativeContextMenu :
    {
      refine: true,
      init : false
    },


    /**
     * If the user presses F1 in IE by default the onhelp event is fired and
     * IE’s help window is opened. Setting this property to <code>false</code>
     * prevents this behavior.
     *
     * Note: This only works if the iframe source is served from the same domain
     * as the main application.
     */
    nativeHelp :
    {
      check : "Boolean",
      init : false,
      apply : "_applyNativeHelp"
    },

    /**
     * Whether the widget should have scrollbars.
     */
    scrollbar :
    {
      check : ["auto", "no", "yes"],
      nullable : true,
      themeable : true,
      apply : "_applyScrollbar"
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    __source : null,
    __blockerElement : null,


    // overridden
    renderLayout : function(left, top, width, height)
    {
      this.base(arguments, left, top, width, height);

      var pixel = "px";
      var insets = this.getInsets();

      this.__blockerElement.setStyles({
        "left": (left + insets.left) + pixel,
        "top": (top + insets.top) + pixel,
        "width": (width - insets.left - insets.right) + pixel,
        "height": (height - insets.top - insets.bottom) + pixel
      });
    },


    // overridden
    _createContentElement : function()
    {
      var iframe = new qx.html.Iframe(this.__source);
      iframe.addListener("load", this._onIframeLoad, this);
      return iframe;
    },


    // overridden
    _getIframeElement : function() {
      return this.getContentElement();
    },


    /**
     * Creates <div> element which is aligned over iframe node to avoid losing pointer events.
     *
     * @return {Object} Blocker element node
     */
    _createBlockerElement : function()
    {
      var el = new qx.html.Blocker();
      el.setStyles({
        "zIndex": 20,
        "display": "none"
      });

      return el;
    },


    /**
     * Reacts on native load event and redirects it to the widget.
     *
     * @param e {qx.event.type.Event} Native load event
     */
    _onIframeLoad : function(e)
    {
      this._applyNativeContextMenu(this.getNativeContextMenu(), null);
      this._applyNativeHelp(this.getNativeHelp(), null);

      this.fireNonBubblingEvent("load");
    },




    /*
    ---------------------------------------------------------------------------
      METHODS
    ---------------------------------------------------------------------------
    */

    /**
     * Cover the iframe with a transparent blocker div element. This prevents
     * pointer or key events to be handled by the iframe. To release the blocker
     * use {@link #release}.
     *
     */
    block : function() {
      this.__blockerElement.setStyle("display", "block");
    },


    /**
     * Release the blocker set by {@link #block}.
     *
     */
    release : function() {
      this.__blockerElement.setStyle("display", "none");
    },


    /*
    ---------------------------------------------------------------------------
      EVENT HANDLER
    ---------------------------------------------------------------------------
    */

    // property apply
    _applyNativeContextMenu : function(value, old)
    {
      if (value !== false && old !== false) {
        return;
      }

      var doc = this.getDocument();
      if (!doc) {
        return;
      }

      try {
        var documentElement = doc.documentElement;
      } catch(e) {
        // this may fail due to security restrictions
        return;
      }

      if (old === false)
      {
        qx.event.Registration.removeListener(
          documentElement, "contextmenu",
          this._onNativeContextMenu, this, true
        );
      }

      if (value === false)
      {
        qx.event.Registration.addListener(
          documentElement, "contextmenu",
          this._onNativeContextMenu, this, true
        );
      }
    },


    /**
     * Stops the <code>contextmenu</code> event from showing the native context menu
     *
     * @param e {qx.event.type.Mouse} The event object
     */
    _onNativeContextMenu : function(e) {
      e.preventDefault();
    },


    // property apply
    _applyNativeHelp : function(value, old)
    {
      if (qx.core.Environment.get("event.help")) {
        var document = this.getDocument();
        if (!document) {
          return;
        }

        try
        {
          if (old === false) {
            qx.bom.Event.removeNativeListener(document, "help", (function() {return false;}));
          }

          if (value === false) {
            qx.bom.Event.addNativeListener(document, "help", (function() {return false;}));
          }
        } catch (e) {
          if (qx.core.Environment.get("qx.debug")) {
            this.warn(
              "Unable to set 'nativeHelp' property, possibly due to security restrictions"
            );
          }
        }
      }
    },


    /**
     * Checks if the iframe element is out of sync. This can happen in Firefox
     * if the iframe is moved around and the source is changed right after.
     * The root cause is that Firefox is reloading the iframe when its position
     * in DOM has changed.
     */
    _syncSourceAfterDOMMove : function()
    {
      var iframeDomElement = this.getContentElement() && this.getContentElement().getDomElement();
      if (!iframeDomElement) {
        return;
      }
      var iframeSource = iframeDomElement.src;

      // remove trailing "/"
      if (iframeSource.charAt(iframeSource.length-1) == "/") {
        iframeSource = iframeSource.substring(0, iframeSource.length-1);
      }

      if (iframeSource != this.getSource())
      {
        if ( qx.core.Environment.get("browser.name") != "edge" &&
             qx.core.Environment.get("browser.name") != "ie" )
        {
          qx.bom.Iframe.getWindow(iframeDomElement).stop();
        }
        iframeDomElement.src = this.getSource();
      }
    },


    // property apply
    _applyScrollbar : function(value) {
      this.getContentElement().setAttribute("scrolling", value);
    },


    // overridden
    setLayoutParent : function(parent)
    {
      this.base(arguments, parent);
      if (parent) {
        this.getLayoutParent().getContentElement().add(this.__blockerElement);
      }
    }
  },


  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    if (this.getLayoutParent() && this.__blockerElement.getParent()) {
      this.getLayoutParent().getContentElement().remove(this.__blockerElement);
    }
    this._disposeObjects("__blockerElement");

    qx.event.Registration.removeListener(document.body, "pointerdown", this.block, this, true);
    qx.event.Registration.removeListener(document.body, "pointerup", this.release, this, true);
    qx.event.Registration.removeListener(document.body, "losecapture", this.release, this, true);
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
     * Jonathan Weiß (jonathan_rass)

************************************************************************ */

/**
 * A cross browser iframe instance.
 */
qx.Class.define("qx.html.Iframe",
{
  extend : qx.html.Element,



  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * Wrapper for the HTML Iframe element.
   * @param url {String} Location which should be loaded inside the Iframe.
   * @param styles {Map?null} optional map of CSS styles, where the key is the name
   *    of the style and the value is the value to use.
   * @param attributes {Map?null} optional map of element attributes, where the
   *    key is the name of the attribute and the value is the value to use.
   */
  construct : function(url, styles, attributes)
  {
    this.base(arguments, "iframe", styles, attributes);

    this.setSource(url);
    this.addListener("navigate", this.__onNavigate, this);

    // add yourself to the element queue to enforce the creation of DOM element
    qx.html.Element._modified[this.toHashCode()] = this;
    qx.html.Element._scheduleFlush("element");
  },




  /*
   *****************************************************************************
      EVENTS
   *****************************************************************************
   */

  events:
  {
    /**
     * The "load" event is fired after the iframe content has successfully been loaded.
     */
    "load" : "qx.event.type.Event",

    /**
    * The "navigate" event is fired whenever the location of the iframe
    * changes.
    *
    * Useful to track user navigation and internally used to keep the source
    * property in sync. Only works when the destination source is of same
    * origin than the page embedding the iframe.
    */
    "navigate" : "qx.event.type.Data"
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {

    /*
    ---------------------------------------------------------------------------
      ELEMENT API
    ---------------------------------------------------------------------------
    */

    // overridden
    _applyProperty : function(name, value)
    {
      this.base(arguments, name, value);

      if (name == "source") {
        var element = this.getDomElement();
        var currentUrl = qx.bom.Iframe.queryCurrentUrl(element);

        // Skip if frame is already on URL.
        //
        // When URL of Iframe and source property get out of sync, the source
        // property needs to be updated [BUG #4481]. This is to make sure the
        // same source is not set twice on the BOM level.
        if (value === currentUrl) {
          return;
        }

        qx.bom.Iframe.setSource(element, value);
      }
    },

    // overridden
    _createDomElement : function() {
      return qx.bom.Iframe.create(this._content);
    },




    /*
    ---------------------------------------------------------------------------
      IFRAME API
    ---------------------------------------------------------------------------
    */

    /**
     * Get the DOM window object of an iframe.
     *
     * @return {Window} The DOM window object of the iframe.
     */
    getWindow : function()
    {
      var element = this.getDomElement();

      if (element)
      {
        return qx.bom.Iframe.getWindow(element);
      } else {
        return null;
      }
    },


    /**
     * Get the DOM document object of an iframe.
     *
     * @return {Document} The DOM document object of the iframe.
     */
    getDocument : function()
    {
      var element = this.getDomElement();

      if (element) {
        return qx.bom.Iframe.getDocument(element);
      } else {
        return null;
      }
    },


    /**
     * Get the HTML body element of the iframe.
     *
     * @return {Element} The DOM node of the <code>body</code> element of the iframe.
     */
    getBody : function()
    {
      var element = this.getDomElement();

      if (element) {
        return qx.bom.Iframe.getBody(element);
      } else {
        return null;
      }
    },


    /**
     * Sets iframe's source attribute to given value
     *
     * @param source {String} URL to be set.
     * @return {qx.html.Iframe} The current instance for chaining
     */
    setSource : function(source)
    {
      // the source needs to be applied directly in case the iFrame is hidden
      this._setProperty("source", source, true);
      return this;
    },


    /**
     * Get the current source.
     *
     * @return {String} The iframe's source
     */
    getSource : function() {
      return this._getProperty("source");
    },


    /**
     * Sets iframe's name attribute to given value
     *
     * @param name {String} Name to be set.
     * @return {qx.html.Iframe} The current instance for chaining
     */
    setName : function(name)
    {
      this.setAttribute("name", name);
      return this;
    },


    /**
     * Get the current name.
     *
     * @return {String} The iframe's name.
     */
    getName : function() {
      return this.getAttribute("name");
    },


    /**
     * Reloads iframe
     */
    reload : function()
    {
      var element = this.getDomElement();

      if (element)
      {
        var url = this.getSource();
        this.setSource(null);
        this.setSource(url);
      }
    },




    /*
    ---------------------------------------------------------------------------
      LISTENER
    ---------------------------------------------------------------------------
    */

    /**
    * Handle user navigation. Sync actual URL of iframe with source property.
    *
    * @param e {qx.event.type.Data} navigate event
    */
    __onNavigate: function(e) {
      var actualUrl = e.getData();
      if (actualUrl) {
        this.setSource(actualUrl);
      }
    }
  }
});
