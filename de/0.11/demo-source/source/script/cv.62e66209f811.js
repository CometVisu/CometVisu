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
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * Cross browser XML Element API
 *
 * API to select, query and serialize XML elements.
 *
 * Further information:
 *
 * * <a href="https://developer.mozilla.org/en-US/docs/Parsing_and_serializing_XML">MDN Parsing and Serializing XML</a>
 *
 * Please note that nodes selected using the <code>selectSingleNode()</code> and
 * <code>selectNodes()</code> methods remain in their document context so
 * <code>qx.xml.Element.selectNodes(foo, "//bar");</code>
 * will search the entire document for any nodes named "bar", not just the
 * <code>foo</code> node.
 */
qx.Class.define("qx.xml.Element",
{
  statics :
  {
    __xpe : null,

    /**
     * @type {Boolean} <code>true</code> if the native XMLSerializer should be used,
     * <code>false</code> otherwise.
     */
    XML_SERIALIZER : false,

    /**
     * The subtree rooted by the specified element or document is serialized to a string.
     *
     * @param element {Element | Document} The root of the subtree to be serialized. This could be any node, including a Document.
     * @return {String} Serialized subtree
     */
    serialize : function(element)
    {
      if (qx.dom.Node.isDocument(element)) {
        element = element.documentElement;
      }

      if (this.XML_SERIALIZER) {
        return (new XMLSerializer()).serializeToString(element);
      } else {
        return element.xml || element.outerHTML;
      }
    },


    /**
     * Selects the first XmlNode that matches the XPath expression.
     *
     * @param element {Element | Document} root element for the search
     * @param query {String} XPath query
     * @param namespaces {Map} optional map of prefixes and their namespace URIs
     * @return {Element} first matching element
     */
    selectSingleNode : function(element, query, namespaces)
    {
      if (qx.core.Environment.get("html.xpath")) {
        if(!this.__xpe) {
          this.__xpe = new XPathEvaluator();
        }

        var xpe = this.__xpe;

        var resolver;

        if(namespaces) {
          resolver = function(prefix){
            return namespaces[prefix] || null;
          };
        }
        else {
          resolver = xpe.createNSResolver(element);
        }

        try {
          return xpe.evaluate(query, element, resolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        } catch(err) {
          throw new Error("selectSingleNode: query: " + query + ", element: " + element + ", error: " + err);
        }
      }

      if (qx.core.Environment.get("xml.selectsinglenode")) {
        if (namespaces) {
          var namespaceString = "";
          for (var prefix in namespaces) {
            namespaceString += "xmlns:" + prefix + "='" + namespaces[prefix] + "' ";
          }

          // If the element is a node, set the selection namespace on its parent document.
          if (element.ownerDocument) {
            element.ownerDocument.setProperty("SelectionNamespaces", namespaceString);
          }
          // element is a document
          else {
            element.setProperty("SelectionNamespaces", namespaceString);
          }

        }

        return element.selectSingleNode(query);
      }

      throw new Error("No XPath implementation available!");
    },


    /**
     * Selects a list of nodes matching the XPath expression.
     *
     * @param element {Element | Document} root element for the search
     * @param query {String} XPath query
     * @param namespaces {Map} optional map of prefixes and their namespace URIs
     * @return {Element[]} List of matching elements
     */
    selectNodes : function(element, query, namespaces)
    {
      if (qx.core.Environment.get("html.xpath")) {
        var xpe = this.__xpe;

        if(!xpe) {
          this.__xpe = xpe = new XPathEvaluator();
        }

        var resolver;

        if(namespaces) {
          resolver = function(prefix){
            return namespaces[prefix] || null;
          };
        }
        else {
          resolver = xpe.createNSResolver(element);
        }

        try {
          var result = xpe.evaluate(query, element, resolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        } catch(err) {
          throw new Error("selectNodes: query: " + query + ", element: " + element + ", error: " + err);
        }

        var nodes = [];
        for (var i=0; i<result.snapshotLength; i++) {
          nodes[i] = result.snapshotItem(i);
        }

        return nodes;
      }

      if (qx.core.Environment.get("xml.selectnodes")) {
        if (namespaces) {
          var namespaceString = "";
          for (var prefix in namespaces) {
            namespaceString += "xmlns:" + prefix + "='" + namespaces[prefix] + "' ";
          }

          // If the element is a node, set the selection namespace on its parent document.
          if (element.ownerDocument) {
            element.ownerDocument.setProperty("SelectionNamespaces", namespaceString);
          }
          // element is a document
          else {
            element.setProperty("SelectionNamespaces", namespaceString);
          }

        }

        return element.selectNodes(query);
      }

      throw new Error("No XPath implementation available!");
    },


    /**
     * Returns a list of elements with the given tag name belonging to the given namespace
     *
     * (See
     * <a href="https://developer.mozilla.org/en-US/docs/DOM/element.getElementsByTagNameNS">MDN
     * Reference</a>).
     *
     * @param element {Element | Document} the element from where the search should start.
     *       Note that only the descendants of this element are included in the search, not the node itself.
     * @param namespaceURI {var} is the namespace URI of elements to look for . For example, if you need to look
     *       for XHTML elements, use the XHTML namespace URI, <tt>http://www.w3.org/1999/xhtml/</tt>.
     * @param tagname {String} the tagname to look for
     * @return {Element[]} a list of found elements in the order they appear in the tree.
     */
    getElementsByTagNameNS : function(element, namespaceURI, tagname)
    {
      if (qx.core.Environment.get("xml.getelementsbytagnamens")) {
        return element.getElementsByTagNameNS(namespaceURI, tagname);
      }

      if (qx.core.Environment.get("xml.domproperties")) {
        var doc = element.ownerDocument || element;

        doc.setProperty("SelectionLanguage", "XPath");
        doc.setProperty("SelectionNamespaces", "xmlns:ns='" + namespaceURI + "'");

        return qx.xml.Element.selectNodes(element, 'descendant-or-self::ns:' + tagname);
      }

      throw new Error("The client does not support this operation!");
    },


    /**
     * Selects the first XmlNode that matches the XPath expression and returns the text content of the element
     *
     * @param element {Element|Document} root element for the search
     * @param query {String}  XPath query
     * @return {String} the joined text content of the found element or null if not appropriate.
     */
    getSingleNodeText : function(element, query)
    {
      var node = this.selectSingleNode(element, query);
      return qx.dom.Node.getText(node);
    },


    /**
     * Adds or sets an attribute with the given namespace on a node
     *
     * @param document {Document} The node's parent document, created e.g. by
     * {@link qx.xml.Document#create}
     * @param element {Element} XML/DOM element to modify
     * @param namespaceUri {String} Namespace URI
     * @param name {String} Attribute name
     * @param value {String} Attribute value
     */
    setAttributeNS : function(document, element, namespaceUri, name, value)
    {
      if (qx.core.Environment.get("xml.attributens")) {
        element.setAttributeNS(namespaceUri, name, value);
      }

      else if (qx.core.Environment.get("xml.createnode")) {
        var attr = document.createNode(2, name, namespaceUri);
        attr.nodeValue = value;
        element.setAttributeNode(attr);
      }

      else {
        throw new Error("The client does not support this operation!");
      }
    },

    /**
     * Get the value of the attribute with the given namespace and name
     *
     * @param element {Element} XML/DOM element to modify
     * @param namespaceUri {String} Namespace URI
     * @param name {String} Attribute name
     * @return {String} the value of the attribute, empty string if not found
     */
    getAttributeNS : function(element, namespaceUri, name)
    {
      if (qx.core.Environment.get("xml.attributens")) {
        var value = element.getAttributeNS(namespaceUri, name);
        return value === null ? '' : value;
      }

      if (qx.core.Environment.get("xml.getqualifieditem")) {
        var attributes = element.attributes;
        var value = null;
        if(attributes)
        {
          var attribute = attributes.getQualifiedItem(name,namespaceUri);
          if(attribute)
          {
            value = attribute.nodeValue;
          }
        }
        return value === null ? '' : value;
      }

      throw new Error("The client does not support this operation!");
    },


    /**
     * Creates an element with the given namespace and appends it to an existing
     * element
     *
     * @param document {Document} The node's parent document, created e.g. by
     * {@link qx.xml.Document#create}
     * @param parent {Element} The parent element for the new sub-element
     * @param name {String} The new element's name
     * @param namespaceUri {String} Namespace URI for the new element
     *
     * @return {Element} The newly created sub-element
     */
    createSubElementNS : function(document, parent, name, namespaceUri) {
      if (qx.core.Environment.get("xml.createelementns")) {
        // the "x" prefix has no importance. when there's a conflict,
        // mozilla engine assigns an alternative prefix automatically.
        // not putting a prefix means to assign default namespace prefix
        // to the given namespace uri.
        var node = document.createElementNS(namespaceUri, "x:" + name);
        parent.appendChild(node);
        return node;
      }

      if (qx.core.Environment.get("xml.createnode")) {
        var node = document.createNode(1, name, namespaceUri);
        parent.appendChild(node);
        return node;
      }

      throw new Error("The client does not support this operation!");
    }
  },

  /*
  *****************************************************************************
     DEFER
  *****************************************************************************
  */

  defer : function(statics)
  {
    statics.XML_SERIALIZER = (window.XMLSerializer &&
     !( qx.core.Environment.get("engine.name") == "mshtml" &&
     qx.core.Environment.get("engine.version") >= 9 &&
     qx.core.Environment.get("browser.documentmode") >= 9));
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
     * Fabian Jakobs (fjakobs)

   ======================================================================

   This class contains code based on the following work:

   * Yahoo! UI Library
     http://developer.yahoo.com/yui
     Version 2.2.0

     Copyright:
       (c) 2007, Yahoo! Inc.

     License:
       BSD: http://developer.yahoo.com/yui/license.txt

   ----------------------------------------------------------------------

     http://developer.yahoo.com/yui/license.html

     Copyright (c) 2009, Yahoo! Inc.
     All rights reserved.

     Redistribution and use of this software in source and binary forms,
     with or without modification, are permitted provided that the
     following conditions are met:

     * Redistributions of source code must retain the above copyright
       notice, this list of conditions and the following disclaimer.
     * Redistributions in binary form must reproduce the above copyright
       notice, this list of conditions and the following disclaimer in
       the documentation and/or other materials provided with the
       distribution.
     * Neither the name of Yahoo! Inc. nor the names of its contributors
       may be used to endorse or promote products derived from this
       software without specific prior written permission of Yahoo! Inc.

     THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
     "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
     LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
     FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
     COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
     INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
     (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
     SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
     HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
     STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
     ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
     OF THE POSSIBILITY OF SUCH DAMAGE.

************************************************************************ */

/* ************************************************************************


************************************************************************ */

/**
 * A helper for using the browser history in JavaScript Applications without
 * reloading the main page.
 *
 * Adds entries to the browser history and fires a "request" event when one of
 * the entries was requested by the user (e.g. by clicking on the back button).
 *
 * This class is an abstract template class. Concrete implementations have to
 * provide implementations for the {@link #_readState} and {@link #_writeState}
 * methods.
 *
 * Browser history support is currently available for Internet Explorer 6/7,
 * Firefox, Opera 9 and WebKit. Safari 2 and older are not yet supported.
 *
 * This module is based on the ideas behind the YUI Browser History Manager
 * by Julien Lecomte (Yahoo), which is described at
 * http://yuiblog.com/blog/2007/02/21/browser-history-manager/. The Yahoo
 * implementation can be found at http://developer.yahoo.com/yui/history/.
 * The original code is licensed under a BSD license
 * (http://developer.yahoo.com/yui/license.txt).
 *
 * @asset(qx/static/blank.html)
 */
qx.Class.define("qx.bom.History",
{
  extend : qx.core.Object,
  type : "abstract",




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);

    this._baseUrl = window.location.href.split('#')[0] + '#';

    this._titles = {};
    this._setInitialState();
  },


  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */

  events: {
    /**
     * Fired when the user moved in the history. The data property of the event
     * holds the state, which was passed to {@link #addToHistory}.
     */
    "request" : "qx.event.type.Data"
  },


  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */


  statics :
  {
    /**
     * @type {Boolean} Whether the browser supports the 'hashchange' event natively.
     */
    SUPPORTS_HASH_CHANGE_EVENT : qx.core.Environment.get("event.hashchange"),


    /**
     * Get the singleton instance of the history manager.
     *
     * @return {History}
     */
    getInstance : function()
    {
      var runsInIframe = !(window == window.top);

      if (!this.$$instance)
      {
        // in iframe + IE9
        if (runsInIframe
          && qx.core.Environment.get("browser.documentmode") == 9
        ) {
          this.$$instance = new qx.bom.HashHistory();
        }

        // in iframe + IE<9
        else if (runsInIframe
          && qx.core.Environment.get("engine.name") == "mshtml"
          && qx.core.Environment.get("browser.documentmode") < 9
        ) {
          this.$$instance = new qx.bom.IframeHistory();
        }

        // browser with hashChange event
        else if (this.SUPPORTS_HASH_CHANGE_EVENT) {
          this.$$instance = new qx.bom.NativeHistory();
        }

        // IE without hashChange event
        else if ((qx.core.Environment.get("engine.name") == "mshtml")) {
          this.$$instance = new qx.bom.IframeHistory();
        }

        // fallback
        else {
          this.$$instance = new qx.bom.NativeHistory();
        }
      }
      return this.$$instance;
    }
  },


  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /**
     * Property holding the current title
     */
    title :
    {
      check : "String",
      event : "changeTitle",
      nullable : true,
      apply    : "_applyTitle"
    },

    /**
     * Property holding the current state of the history.
     */
    state :
    {
      check : "String",
      event : "changeState",
      nullable : true,
      apply: "_applyState"
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    _titles : null,


    // property apply
    _applyState : function(value, old)
    {
      this._writeState(value);
    },


    /**
     * Populates the 'state' property with the initial state value
     */
    _setInitialState : function() {
      this.setState(this._readState());
    },


    /**
     * Encodes the state value into a format suitable as fragment identifier.
     *
     * @param value {String} The string to encode
     * @return {String} The encoded string
     */
    _encode : function (value)
    {
      if (qx.lang.Type.isString(value)) {
        return encodeURIComponent(value);
      }

      return "";
    },


    /**
     * Decodes a fragment identifier into a string
     *
     * @param value {String} The fragment identifier
     * @return {String} The decoded fragment identifier
     */
    _decode : function (value)
    {
      if (qx.lang.Type.isString(value)) {
        return decodeURIComponent(value);
      }

      return "";
    },


    // property apply
    _applyTitle : function (title)
    {
      if (title != null) {
        document.title = title || "";
      }
    },


    /**
     * Adds an entry to the browser history.
     *
     * @param state {String} a string representing the state of the
     *          application. This command will be delivered in the data property of
     *          the "request" event.
     * @param newTitle {String ? null} the page title to set after the history entry
     *          is done. This title should represent the new state of the application.
     */
    addToHistory : function(state, newTitle)
    {
      if (!qx.lang.Type.isString(state)) {
        state = state + "";
      }

      if (qx.lang.Type.isString(newTitle))
      {
        this.setTitle(newTitle);
        this._titles[state] = newTitle;
      }

      if (this.getState() !== state) {
        this._writeState(state);
      }
    },


    /**
     * Navigates back in the browser history.
     * Simulates a back button click.
     */
     navigateBack : function() {
       qx.event.Timer.once(function() {history.back();}, this, 100);
     },


    /**
     * Navigates forward in the browser history.
     * Simulates a forward button click.
     */
     navigateForward : function() {
       qx.event.Timer.once(function() {history.forward();}, this, 100);
     },


    /**
     * Called on changes to the history using the browser buttons.
     *
     * @param state {String} new state of the history
     */
    _onHistoryLoad : function(state)
    {
      this.setState(state);
      this.fireDataEvent("request", state);
      if (this._titles[state] != null) {
        this.setTitle(this._titles[state]);
      }
    },


    /**
     * Browser dependent function to read the current state of the history
     *
     * @return {String} current state of the browser history
     */
    _readState : function() {
      throw new Error("Abstract method call");
    },


    /**
     * Save a state into the browser history.
     *
     * @param state {String} state to save
     */
    _writeState : function(state) {
      throw new Error("Abstract method call");
    },


    /**
     * Sets the fragment identifier of the window URL
     *
     * @param value {String} the fragment identifier
     */
    _setHash : function (value)
    {
      var url = this._baseUrl + (value || "");
      var loc = window.location;

      if (url != loc.href) {
        loc.href = url;
      }
    },


    /**
     * Returns the fragment identifier of the top window URL. For gecko browsers we
     * have to use a regular expression to avoid encoding problems.
     *
     * @return {String} the fragment identifier
     */
    _getHash : function()
    {
      var hash = /#(.*)$/.exec(window.location.href);
      return hash && hash[1] ? hash[1] : "";
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Fabian Jakobs (fjakobs)
     * Mustafa Sak (msak)

************************************************************************ */

/**
 * History manager implementation for IE greater 7. IE reloads iframe
 * content on history actions even just hash value changed. This
 * implementation forwards history states (hashes) to a helper iframe.
 *
 * This class must be disposed of after use
 *
 * @internal
 */
qx.Class.define("qx.bom.HashHistory",
{
  extend : qx.bom.History,
  implement: [ qx.core.IDisposable ],

  construct : function()
  {
    this.base(arguments);
    this._baseUrl = null;
    this.__initIframe();
  },


  members :
  {
    __checkOnHashChange : null,
    __iframe : null,
    __iframeReady : false,


    //overridden
    addToHistory : function(state, newTitle)
    {
      if (!qx.lang.Type.isString(state)) {
        state = state + "";
      }

      if (qx.lang.Type.isString(newTitle))
      {
        this.setTitle(newTitle);
        this._titles[state] = newTitle;
      }

      if (this.getState() !== state) {
        this._writeState(state);
      }
    },


    /**
     * Initializes the iframe
     *
     */
    __initIframe : function()
    {
      this.__iframe = this.__createIframe();
      document.body.appendChild(this.__iframe);

      this.__waitForIFrame(function()
      {
        this._baseUrl = this.__iframe.contentWindow.document.location.href;
        this.__attachListeners();
      }, this);
    },


    /**
     * IMPORTANT NOTE FOR IE:
     * Setting the source before adding the iframe to the document.
     * Otherwise IE will bring up a "Unsecure items ..." warning in SSL mode
     *
     * @return {Element}
     */
    __createIframe : function ()
    {
      var iframe = qx.bom.Iframe.create({
        src : qx.util.ResourceManager.getInstance().toUri(qx.core.Environment.get("qx.blankpage")) + "#"
      });

      iframe.style.visibility = "hidden";
      iframe.style.position = "absolute";
      iframe.style.left = "-1000px";
      iframe.style.top = "-1000px";

      return iframe;
    },


    /**
     * Waits for the IFrame being loaded. Once the IFrame is loaded
     * the callback is called with the provided context.
     *
     * @param callback {Function} This function will be called once the iframe is loaded
     * @param context {Object?window} The context for the callback.
     * @param retry {Integer} number of tries to initialize the iframe
     */
    __waitForIFrame : function(callback, context, retry)
    {
      if (typeof retry === "undefined") {
        retry = 0;
      }

      if ( !this.__iframe.contentWindow || !this.__iframe.contentWindow.document )
      {
        if (retry > 20) {
          throw new Error("can't initialize iframe");
        }

        qx.event.Timer.once(function() {
          this.__waitForIFrame(callback, context, ++retry);
        }, this, 10);

        return;
      }

      this.__iframeReady = true;
      callback.call(context || window);
    },


    /**
     * Attach hash change listeners
     */
    __attachListeners : function()
    {
      qx.event.Idle.getInstance().addListener("interval", this.__onHashChange, this);
    },


    /**
     * Remove hash change listeners
     */
    __detatchListeners : function()
    {
      qx.event.Idle.getInstance().removeListener("interval", this.__onHashChange, this);
    },


    /**
     * hash change event handler
     */
    __onHashChange : function()
    {
      var currentState = this._readState();

      if (qx.lang.Type.isString(currentState) && currentState != this.getState()) {
        this._onHistoryLoad(currentState);
      }
    },


    /**
     * Browser dependent function to read the current state of the history
     *
     * @return {String} current state of the browser history
     */
    _readState : function() {
      var hash = !this._getHash() ? "" : this._getHash().substr(1);
      return this._decode(hash);
    },


    /**
     * Returns the fragment identifier of the top window URL. For gecko browsers we
     * have to use a regular expression to avoid encoding problems.
     *
     * @return {String|null} the fragment identifier or <code>null</code> if the
     * iframe isn't ready yet
     */
    _getHash : function()
    {
      if (!this.__iframeReady){
        return null;
      }
      return this.__iframe.contentWindow.document.location.hash;
    },


    /**
     * Save a state into the browser history.
     *
     * @param state {String} state to save
     */
    _writeState : function(state)
    {
      this._setHash(this._encode(state));
    },


    /**
     * Sets the fragment identifier of the window URL
     *
     * @param value {String} the fragment identifier
     */
    _setHash : function (value)
    {
      if (!this.__iframe || !this._baseUrl){
        return;
      }
      var hash = !this.__iframe.contentWindow.document.location.hash ? "" : this.__iframe.contentWindow.document.location.hash.substr(1);
      if (value != hash) {
        this.__iframe.contentWindow.document.location.hash = value;
      }
    }
  },


  destruct : function() {
    this.__detatchListeners();
    this.__iframe = null;
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
     * Fabian Jakobs (fjakobs)
     * Mustafa Sak (msak)

************************************************************************ */

/**
 * Implements an iFrame based history manager for IE 6/7/8.
 *
 * Creates a hidden iFrame and uses document.write to store entries in the
 * history browser's stack.
 *
 * This class must be disposed of after use
 *
 * @internal
 */
qx.Class.define("qx.bom.IframeHistory",
{
  extend : qx.bom.History,
  implement: [ qx.core.IDisposable ],


  construct : function()
  {
    this.base(arguments);
    this.__initTimer();
  },


  members :
  {
    __iframe : null,
    __iframeReady : false,
    __writeStateTimner : null,
    __dontApplyState : null,
    __locationState : null,


    // overridden
    _setInitialState : function()
    {
      this.base(arguments);
      this.__locationState = this._getHash();
    },


    //overridden
    _setHash : function(value)
    {
      this.base(arguments, value);
      this.__locationState = this._encode(value);
    },


    //overridden
    addToHistory : function(state, newTitle)
    {
      if (!qx.lang.Type.isString(state)) {
        state = state + "";
      }

      if (qx.lang.Type.isString(newTitle))
      {
        this.setTitle(newTitle);
        this._titles[state] = newTitle;
      }

      if (this.getState() !== state) {
        this.setState(state);
      }
      this.fireDataEvent("request", state);
    },


    //overridden
    _onHistoryLoad : function(state)
    {
      this._setState(state);
      this.fireDataEvent("request", state);
      if (this._titles[state] != null) {
        this.setTitle(this._titles[state]);
      }
    },


    /**
     * Helper function to set state property. This will only be called
     * by _onHistoryLoad. It determines, that no apply of state will be called.
     * @param state {String} State loaded from history
     */
    _setState : function(state)
    {
      this.__dontApplyState = true;
      this.setState(state);
      this.__dontApplyState = false;
    },


    //overridden
    _applyState : function(value, old)
    {
      if (this.__dontApplyState){
        return;
      }
      this._writeState(value);
    },


    /**
     * Get state from the iframe
     *
     * @return {String} current state of the browser history
     */
    _readState : function()
    {
      if (!this.__iframeReady) {
        return this._decode(this._getHash());
      }

      var doc = this.__iframe.contentWindow.document;
      var elem = doc.getElementById("state");
      return elem ? this._decode(elem.innerText) : "";
    },


    /**
     * Store state to the iframe
     *
     * @param state {String} state to save
     */
    _writeState : function(state)
    {
      if (!this.__iframeReady) {
        this.__clearWriteSateTimer();
        this.__writeStateTimner = qx.event.Timer.once(function(){this._writeState(state);}, this, 50);
        return;
      }
      this.__clearWriteSateTimer();

      var state = this._encode(state);

      // IE8 is sometimes recognizing a hash change as history entry. Cause of sporadic surface of this behavior, we have to prevent setting hash.
      if (qx.core.Environment.get("engine.name") == "mshtml" && qx.core.Environment.get("browser.version") != 8){
        this._setHash(state);
      }

      var doc = this.__iframe.contentWindow.document;
      doc.open();
      doc.write('<html><body><div id="state">' + state + '</div></body></html>');
      doc.close();
    },


    /**
     * Helper function to clear the write state timer.
     */
    __clearWriteSateTimer : function()
    {
      if (this.__writeStateTimner){
        this.__writeStateTimner.stop();
        this.__writeStateTimner.dispose();
      }
    },


    /**
     * Initialize the polling timer
     */
    __initTimer : function()
    {
      this.__initIframe(function () {
        qx.event.Idle.getInstance().addListener("interval", this.__onHashChange, this);
      });
    },


    /**
     * Hash change listener.
     *
     * @param e {qx.event.type.Event} event instance
     */
    __onHashChange : function(e)
    {
      // the location only changes if the user manually changes the fragment
      // identifier.
      var currentState = null;
      var locationState = this._getHash();

      if (!this.__isCurrentLocationState(locationState)) {
        currentState = this.__storeLocationState(locationState);
      } else {
        currentState = this._readState();
      }
      if (qx.lang.Type.isString(currentState) && currentState != this.getState()) {
        this._onHistoryLoad(currentState);
      }
    },


    /**
     * Stores the given location state.
     *
     * @param locationState {String} location state
     * @return {String}
     */
    __storeLocationState : function (locationState)
    {
      locationState = this._decode(locationState);
      this._writeState(locationState);

      return locationState;
    },


    /**
     * Checks whether the given location state is the current one.
     *
     * @param locationState {String} location state to check
     * @return {Boolean}
     */
    __isCurrentLocationState : function (locationState) {
      return qx.lang.Type.isString(locationState) && locationState == this.__locationState;
    },


    /**
     * Initializes the iframe
     *
     * @param handler {Function?null} if given this callback is executed after iframe is ready to use
     */
    __initIframe : function(handler)
    {
      this.__iframe = this.__createIframe();
      document.body.appendChild(this.__iframe);

      this.__waitForIFrame(function()
      {
        this._writeState(this.getState());

        if (handler) {
          handler.call(this);
        }
      }, this);
    },


    /**
     * IMPORTANT NOTE FOR IE:
     * Setting the source before adding the iframe to the document.
     * Otherwise IE will bring up a "Unsecure items ..." warning in SSL mode
     *
     * @return {qx.bom.Iframe}
     */
    __createIframe : function ()
    {
      var iframe = qx.bom.Iframe.create({
        src : qx.util.ResourceManager.getInstance().toUri(qx.core.Environment.get("qx.blankpage"))
      });

      iframe.style.visibility = "hidden";
      iframe.style.position = "absolute";
      iframe.style.left = "-1000px";
      iframe.style.top = "-1000px";

      return iframe;
    },


    /**
     * Waits for the IFrame being loaded. Once the IFrame is loaded
     * the callback is called with the provided context.
     *
     * @param callback {Function} This function will be called once the iframe is loaded
     * @param context {Object?window} The context for the callback.
     * @param retry {Integer} number of tries to initialize the iframe
     */
    __waitForIFrame : function(callback, context, retry)
    {
      if (typeof retry === "undefined") {
        retry = 0;
      }

      if ( !this.__iframe.contentWindow || !this.__iframe.contentWindow.document )
      {
        if (retry > 20) {
          throw new Error("can't initialize iframe");
        }

        qx.event.Timer.once(function() {
          this.__waitForIFrame(callback, context, ++retry);
        }, this, 10);

        return;
      }

      this.__iframeReady = true;
      callback.call(context || window);
    }
  },


  destruct : function()
  {
    this.__iframe = null;
    if (this.__writeStateTimner){
      this.__writeStateTimner.dispose();
      this.__writeStateTimner = null;
    }
    qx.event.Idle.getInstance().removeListener("interval", this.__onHashChange, this);
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
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * Default history manager implementation. Either polls for URL fragment
 * identifier (hash) changes or uses the native "hashchange" event.
 *
 * NOTE: Instances of this class must be disposed of after use
 *
 * @internal
 */
qx.Class.define("qx.bom.NativeHistory",
{
  extend : qx.bom.History,
  implement: [ qx.core.IDisposable ],

  construct : function()
  {
    this.base(arguments);
    this.__attachListeners();
  },


  members :
  {
    __checkOnHashChange : null,


    /**
     * Attach hash change listeners
     */
    __attachListeners : function()
    {
      if (qx.bom.History.SUPPORTS_HASH_CHANGE_EVENT)
      {
        var boundFunc = qx.lang.Function.bind(this.__onHashChange, this);
        this.__checkOnHashChange = qx.event.GlobalError.observeMethod(boundFunc);
        qx.bom.Event.addNativeListener(window, "hashchange", this.__checkOnHashChange);
      }
      else
      {
        qx.event.Idle.getInstance().addListener("interval", this.__onHashChange, this);
      }
    },


    /**
     * Remove hash change listeners
     */
    __detatchListeners : function()
    {
      if (qx.bom.History.SUPPORTS_HASH_CHANGE_EVENT) {
        qx.bom.Event.removeNativeListener(window, "hashchange", this.__checkOnHashChange);
      } else {
        qx.event.Idle.getInstance().removeListener("interval", this.__onHashChange, this);
      }
    },


    /**
     * hash change event handler
     */
    __onHashChange : function()
    {
      var currentState = this._readState();

      if (qx.lang.Type.isString(currentState) && currentState != this.getState()) {
        this._onHistoryLoad(currentState);
      }
    },


    /**
     * Browser dependent function to read the current state of the history
     *
     * @return {String} current state of the browser history
     */
    _readState : function() {
      return this._decode(this._getHash());
    },


    /**
     * Save a state into the browser history.
     *
     * @param state {String} state to save
     */
    _writeState : qx.core.Environment.select("engine.name",
    {
      "opera" : function(state)
      {
        qx.event.Timer.once(function()
        {
          this._setHash(this._encode(state));
        }, this, 0);
      },

      "default" : function (state) {
        this._setHash(this._encode(state));
      }
    })
  },


  destruct : function() {
    this.__detatchListeners();
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * qooxdoo profiler.
 *
 * All functions of qooxdoo classes (constructors, members, statics) can be profiled
 * using this class.
 *
 * To enable profiling this class must be loaded <b>before</b> <code>qx.Class</code> is
 * loaded. This can be achieved by making <code>qx.core.Aspect</code> and
 * <code>qx.dev.Profile</code> a load time dependency of <code>qx.Class</code>.
 * Further more the variant <code>qx.aspects</code> must be set to <code>on</code>.
 */
qx.Bootstrap.define("qx.dev.Profile",
{
  statics :
  {
    /**
     * Storage for profiling data
     *
     * @internal
     */
    __profileData : {},

    /**
     * Array for call stack-like data types.
     *
     * @internal
     */
    __callStack : [],

    /**
     * Flag marking profiler run.
     *
     * @internal
     */
    __doProfile : true,

    /**
     * Profiler execution time. Subtracted for more accurate calculations.
     *
     * @internal
     */
    __callOverhead : undefined,

    /**
     * Amount of times to run calculation of profiler overhead.
     *
     * @internal
     */
    __calibrateCount : 4000,


    /**
     * Clear profiling data and start profiling.
     */
    start : function()
    {
      this.__doProfile = true;
      this.__profileData = {};
      this.__callStack.splice(0, this.__callStack.length-2);
    },


    /**
     * Stop profiling.
     */
    stop : function() {
      this.__doProfile = false;
    },


    /**
     * Return the profiling data as JSON data structure.
     *
     * Example:
     * <pre class="javascript">
     * {
     *   "qx.core.ObjectRegistry.toHashCode (static)":{
     *     *     "totalTime":3,
     *     "ownTime":3,
     *     "callCount":218,
     *     "subRoutineCalls":0,
     *     "name":"qx.core.ObjectRegistry.toHashCode",
     *     "type":"static"
     *   },
     *   "qx.core.Object.addListener (member)":{
     *     "totalTime":19,
     *     "ownTime":12,
     *     "callCount":59,
     *     "subRoutineCalls":251,
     *     "name":"qx.core.Object.addListener",
     *     "type":"member"
     *   },
     *   "qx.ui.table.cellrenderer.Default (constructor)":{
     *     "totalTime":2,
     *     "ownTime":1,
     *     "callCount":1,
     *     "subRoutineCalls":4,
     *     "name":"qx.ui.table.cellrenderer.Default",
     *     "type":"constructor"
     *   }
     * }
     * </pre>
     *
     * @return {Map} The current profiling data.
     */
    getProfileData : function() {
      return this.__profileData;
    },


    /**
     * Show profiling results in a popup window. The results are sorted by the
     * function's own time.
     *
     * @param maxLength {Integer?100} maximum number of entries to display.
     */
    showResults : function(maxLength)
    {
      this.stop();
      this.normalizeProfileData();

      var data = Object.values(this.__profileData);
      data = data.sort(function(a,b) {
        return a.calibratedOwnTime<b.calibratedOwnTime ? 1: -1;
      });

      data = data.slice(0, maxLength || 100);

      var str = ["<table><tr><th>Name</th><th>Type</th><th>Own time</th><th>Avg time</th><th>calls</th></tr>"];
      for (var i=0; i<data.length; i++)
      {
        var profData = data[i];
        if (profData.name == "qx.core.Aspect.__calibrateHelper") {
          continue;
        }
        str.push("<tr><td>");
        str.push(profData.name, "()");
        str.push("</td><td>");
        str.push(profData.type);
        str.push("</td><td>");
        str.push(profData.calibratedOwnTime.toPrecision(3));
        str.push("ms</td><td>");
        str.push((profData.calibratedOwnTime/profData.callCount).toPrecision(3));
        str.push("ms</td><td>");
        str.push(profData.callCount);
        str.push("</td></tr>");
      }

      str.push("</table>");

      var win = window.open("about:blank", "profileLog");
      var doc = win.document;

      doc.open();
      doc.write("<html><head><style type='text/css'>body{font-family:monospace;font-size:11px;background:white;color:black;}</style></head><body>");
      doc.write(str.join(""));
      doc.write("</body></html>");
      doc.close();
    },


    /**
     * Measure the overhead of calling a wrapped function vs. calling an
     * unwrapped function.
     *
     * @lint ignoreDeprecated(eval)
     *
     * @param count {Integer} Number of iterations to measure.
     * @return {Number} Overhead of a wrapped function call in milliseconds.
     */
    __calibrate : function(count)
    {
      // we use eval to unroll the loop because we don't want to measure the loop overhead.

      // Measure wrapped function
      var fcn;
      var code = ["var fcn = function(){ var fcn=qx.dev.Profile.__calibrateHelper;"];
      for (var i=0; i<count; i++) {
        code.push("fcn();");
      }
      code.push("};");
      eval(code.join(""));
      var start = new Date();
      fcn();
      var end = new Date();
      var profTime = end - start;

      // Measure unwrapped function
      var code = [
        "var plainFunc = function() {};",
        "var fcn = function(){ var fcn=plainFunc;"
      ];
      for (var i=0; i<count; i++) {
        code.push("fcn();");
      }
      code.push("};");
      eval(code.join(""));

      var start = new Date();
      fcn();
      var end = new Date();
      var plainTime = end - start;

      // Compute per call overhead
      return ((profTime - plainTime) / count);
    },


    /**
     * Helper to measure overhead.
     */
    __calibrateHelper : function() {},


    /**
     * Normalize profiling data by subtracting the overhead of wrapping from the
     * function's own time.
     */
    normalizeProfileData : function()
    {
      if (this.__callOverhead == undefined) {
        this.__callOverhead = this.__calibrate(this.__calibrateCount);
      }

      for (var key in this.__profileData)
      {
        var profileData = this.__profileData[key];

        profileData.calibratedOwnTime = Math.max(profileData.ownTime - (profileData.subRoutineCalls * this.__callOverhead), 0);
        profileData.calibratedAvgTime = profileData.calibratedOwnTime / profileData.callCount;
      }
    },


    /**
     * This function will be called before each function call. (Start timing)
     *
     * @param fullName {String} Full name of the function including the class name.
     * @param fcn {Function} Function to time.
     * @param type {String} Function type as in parameter with same name to
     *                      {@link qx.core.Aspect#addAdvice}
     * @param args {arguments} The arguments passed to the wrapped function
     */
    profileBefore : function(fullName, fcn, type, args)
    {
      var me = qx.dev.Profile;

      if (!me.__doProfile) {
        return;
      }

      var callData = {
        subRoutineTime : 0,
        subRoutineCalls : 0
      };

      me.__callStack.push(callData);
      callData.startTime = new Date();
    },


    /**
     * This function will be called after each function call. (Stop timing)
     *
     * @param fullName {String} Full name of the function including the class name.
     * @param fcn {Function} Function to time.
     * @param type {String} Function type as in parameter with same name to
     *                      {@link qx.core.Aspect#addAdvice}
     * @param args {arguments} The arguments passed to the wrapped function
     * @param returnValue {var} return value of the wrapped function.
     */
    profileAfter : function(fullName, fcn, type, args, returnValue)
    {
      var me = qx.dev.Profile;
      if (!me.__doProfile) {
        return;
      }

      var endTime = new Date();
      var callData = me.__callStack.pop();
      var totalTime = endTime - callData.startTime;
      var ownTime = totalTime - callData.subRoutineTime;

      if (me.__callStack.length > 0)
      {
        var lastCall = me.__callStack[me.__callStack.length-1];
        lastCall.subRoutineTime += totalTime;
        lastCall.subRoutineCalls += 1;
      }

      var fcnKey = fullName + " (" + type + ")";

      if (me.__profileData[fcnKey] === undefined)
      {
        me.__profileData[fcnKey] = {
          totalTime: 0,
          ownTime: 0,
          callCount: 0,
          subRoutineCalls: 0,
          name: fullName,
          type : type
        };
      }

      var functionData = me.__profileData[fcnKey];
      functionData.totalTime += totalTime;
      functionData.ownTime += ownTime;
      functionData.callCount += 1;
      functionData.subRoutineCalls += callData.subRoutineCalls;
    }
  },


  defer : function(statics)
  {
    if (qx.core.Environment.get("qx.aspects"))
    {
      // Inform user
      qx.Bootstrap.debug("Enable global profiling...");

      // Add advices for profiling
      qx.core.Aspect.addAdvice(statics.profileBefore, "before");
      qx.core.Aspect.addAdvice(statics.profileAfter, "after");

      statics.__calibrateHelper = qx.core.Aspect.wrap("qx.dev.Profile.__calibrateHelper", statics.__calibrateHelper, "static");
    }
  }
});
