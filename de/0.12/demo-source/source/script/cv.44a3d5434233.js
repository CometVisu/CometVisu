/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2011-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)
     * Daniel Wagner (danielwagner)

************************************************************************ */

/**
 * Attribute/Property handling for DOM elements.
 * @group (Core)
 */
qx.Bootstrap.define("qx.module.Attribute", {

  members :
  {
    /**
     * Returns the HTML content of the first item in the collection
     * @attach {qxWeb}
     * @return {String|null} HTML content or null if the collection is empty
     */
    getHtml : function() {
      if (this[0] && this[0].nodeType === 1) {
        return qx.bom.element.Attribute.get(this[0], "html");
      }
      return null;
    },


    /**
     * Sets the HTML content of each item in the collection
     *
     * @attach {qxWeb}
     * @param html {String} HTML string
     * @return {qxWeb} The collection for chaining
     */
    setHtml : function(html) {
      html = qx.bom.Html.fixEmptyTags(html);
      this._forEachElement(function(item) {
        qx.bom.element.Attribute.set(item, "html", html);
      });
      return this;
    },


    /**
     * Sets an HTML attribute on each item in the collection
     *
     * @attach {qxWeb}
     * @param name {String} Attribute name
     * @param value {var} Attribute value
     * @return {qxWeb} The collection for chaining
     */
    setAttribute : function(name, value) {
      this._forEachElement(function(item) {
        qx.bom.element.Attribute.set(item, name, value);
      });
      return this;
    },


    /**
     * Returns the value of the given attribute for the first item in the
     * collection.
     *
     * @attach {qxWeb}
     * @param name {String} Attribute name
     * @return {var} Attribute value
     */
    getAttribute : function(name) {
      if (this[0] && this[0].nodeType === 1) {
        return qx.bom.element.Attribute.get(this[0], name);
      }
      return null;
    },


    /**
     * Removes the given attribute from all elements in the collection
     *
     * @attach {qxWeb}
     * @param name {String} Attribute name
     * @return {qxWeb} The collection for chaining
     */
    removeAttribute : function(name) {
      this._forEachElement(function(item) {
        qx.bom.element.Attribute.set(item, name, null);
      });
      return this;
    },


    /**
     * Sets multiple attributes for each item in the collection.
     *
     * @attach {qxWeb}
     * @param attributes {Map} A map of attribute name/value pairs
     * @return {qxWeb} The collection for chaining
     */
    setAttributes : function(attributes) {
      for (var name in attributes) {
        this.setAttribute(name, attributes[name]);
      }
      return this;
    },


    /**
     * Returns the values of multiple attributes for the first item in the collection
     *
     * @attach {qxWeb}
     * @param names {String[]} List of attribute names
     * @return {Map} Map of attribute name/value pairs
     */
    getAttributes : function(names) {
      var attributes = {};
      for (var i=0; i < names.length; i++) {
        attributes[names[i]] = this.getAttribute(names[i]);
      }
      return attributes;
    },


    /**
     * Removes multiple attributes from each item in the collection.
     *
     * @attach {qxWeb}
     * @param attributes {String[]} List of attribute names
     * @return {qxWeb} The collection for chaining
     */
    removeAttributes : function(attributes) {
      for (var i=0, l=attributes.length; i<l; i++) {
        this.removeAttribute(attributes[i]);
      }
      return this;
    },


    /**
     * Sets a property on each item in the collection
     *
     * @attach {qxWeb}
     * @param name {String} Property name
     * @param value {var} Property value
     * @return {qxWeb} The collection for chaining
     */
    setProperty : function(name, value) {
      for (var i=0; i < this.length; i++) {
        this[i][name] = value;
      }
      return this;
    },


    /**
     * Returns the value of the given property for the first item in the
     * collection
     *
     * @attach {qxWeb}
     * @param name {String} Property name
     * @return {var} Property value
     */
    getProperty : function(name) {
      if (this[0]) {
        return this[0][name];
      }
      return null;
    },


    /**
     * Sets multiple properties for each item in the collection.
     *
     * @attach {qxWeb}
     * @param properties {Map} A map of property name/value pairs
     * @return {qxWeb} The collection for chaining
     */
    setProperties : function(properties) {
      for (var name in properties) {
        this.setProperty(name, properties[name]);
      }
      return this;
    },


    /**
     * Removes multiple properties for each item in the collection.
     *
     * @attach {qxWeb}
     * @param properties {String[]} An array of property names
     * @return {qxWeb} The collection for chaining
     */
    removeProperties : function(properties) {
      for (var i=0; i<properties.length; i++) {
        this.removeProperty(properties[i]);
      }
      return this;
    },


    /**
     * Returns the values of multiple properties for the first item in the collection
     *
     * @attach {qxWeb}
     * @param names {String[]} List of property names
     * @return {Map} Map of property name/value pairs
     */
    getProperties : function(names) {
      var properties = {};
      for (var i=0; i < names.length; i++) {
        properties[names[i]] = this.getProperty(names[i]);
      }
      return properties;
    },


    /**
     * Deletes a property from each item in the collection
     *
     * @attach {qxWeb}
     * @param name {String} Property name
     * @return {qxWeb} The collection for chaining
     */
    removeProperty : function(name) {
      if (this[0]) {
        this[0][name] = undefined;
      }
      return this;
    },


    /**
     * Returns the currently configured value for the first item in the collection.
     * Works with simple input fields as well as with select boxes or option
     * elements. Returns an array for select boxes with multi selection. In all
     * other cases, a string is returned.
     *
     * @attach {qxWeb}
     * @return {String|String[]} String value or Array of string values (for multiselect)
     */
    getValue : function() {
      if (this[0] && this[0].nodeType === 1) {
        return qx.bom.Input.getValue(this[0]);
      }
      return null;
    },


    /**
     * Applies the given value to each element in the collection.
     * Normally the value is given as a string/number value and applied to the
     * field content (textfield, textarea) or used to detect whether the field
     * is checked (checkbox, radiobutton).
     * Supports array values for selectboxes (multiple selection) and checkboxes
     * or radiobuttons (for convenience).
     *
     * Please note: To modify the value attribute of a checkbox or radiobutton
     * use {@link #setAttribute} instead and manipulate the <code>checked</code> attribute.
     *
     * @attach {qxWeb}
     * @param value {String|Number|Array} The value to apply
     * @return {qxWeb} The collection for chaining
     */
    setValue : function(value)
    {
      this._forEachElement(function(item) {
        qx.bom.Input.setValue(item, value);
      });

      return this;
    }
  },


  defer : function(statics) {
    qxWeb.$attachAll(this);
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2011-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)
     * Daniel Wagner (danielwagner)

************************************************************************ */

/**
 * DOM traversal module
 *
 * @require(qx.dom.Hierarchy#getSiblings)
 * @require(qx.dom.Hierarchy#getNextSiblings)
 * @require(qx.dom.Hierarchy#getPreviousSiblings)
 * @require(qx.dom.Hierarchy#contains)
 *
 * @group (Core)
 */
qx.Bootstrap.define("qx.module.Traversing", {
  statics :
  {
    /**
     * String attributes used to determine if two DOM nodes are equal
     * as defined in <a href="http://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-isEqualNode">
     * DOM Level 3</a>
     */
    EQUALITY_ATTRIBUTES : [
      "nodeType",
      "nodeName",
      "localName",
      "namespaceURI",
      "prefix",
      "nodeValue"
    ],


    /**
     * Internal helper for getAncestors and getAncestorsUntil
     *
     * @attach {qxWeb}
     * @param selector {String} Selector that indicates where to stop including
     * ancestor elements
     * @param filter {String?null} Optional selector to match
     * @return {qxWeb} Collection containing the ancestor elements
     * @internal
     */
    __getAncestors : function(selector, filter) {
      var ancestors = [];
      for (var i=0; i < this.length; i++) {
        var parent = qx.dom.Element.getParentElement(this[i]);
        while (parent) {
          var found = [parent];
          if (selector && qx.bom.Selector.matches(selector, found).length > 0) {
            break;
          }
          if (filter) {
            found = qx.bom.Selector.matches(filter, found);
          }
          ancestors = ancestors.concat(found);
          parent = qx.dom.Element.getParentElement(parent);
        }
      }
      return qxWeb.$init(ancestors, qxWeb);
    },



    /**
     * Helper which returns the element from the given argument. If it's a collection,
     * it returns it's first child. If it's a string, it tries to use the string
     * as selector and returns the first child of the new collection.
     * @param arg {Node|String|qxWeb} The element.
     * @return {Node|var} If a node can be extracted, the node element will be return.
     *   If not, at given argument will be returned.
     */
    __getElementFromArgument : function(arg) {
      if (arg instanceof qxWeb) {
        return arg[0];
      } else if (qx.Bootstrap.isString(arg)) {
        return qxWeb(arg)[0];
      }
      return arg;
    },



    /**
     * Helper that attempts to convert the given argument into a DOM node
     * @param arg {var} object to convert
     * @return {Node|null} DOM node or null if the conversion failed
     */
    __getNodeFromArgument : function(arg) {
      if (typeof arg == "string") {
        arg = qxWeb(arg);
      }

      if (arg instanceof Array || arg instanceof qxWeb) {
        arg = arg[0];
      }

      return qxWeb.isNode(arg) ? arg : null;
    },


    /**
     * Returns a map containing the given DOM node's attribute names
     * and values
     *
     * @param node {Node} DOM node
     * @return {Map} Map of attribute names/values
     */
    __getAttributes : function(node) {
      var attributes = {};

      for (var attr in node.attributes) {
        if (attr == "length") {
          continue;
        }
        var name = node.attributes[attr].name;
        var value = node.attributes[attr].value;
        attributes[name] = value;
      }

      return attributes;
    },


    /**
     * Helper function that iterates over a set of items and applies the given
     * qx.dom.Hierarchy method to each entry, storing the results in a new Array.
     * Duplicates are removed and the items are filtered if a selector is
     * provided.
     *
     * @attach{qxWeb}
     * @param collection {Array} Collection to iterate over (any Array-like object)
     * @param method {String} Name of the qx.dom.Hierarchy method to apply
     * @param selector {String?} Optional selector that elements to be included
     * must match
     * @return {Array} Result array
     * @internal
     */
    __hierarchyHelper : function(collection, method, selector)
    {
      // Iterate ourself, as we want to directly combine the result
      var all = [];
      var Hierarchy = qx.dom.Hierarchy;
      for (var i=0, l=collection.length; i<l; i++) {
        all.push.apply(all, Hierarchy[method](collection[i]));
      }

      // Remove duplicates
      var ret = qx.lang.Array.unique(all);

      // Post reduce result by selector
      if (selector) {
        ret = qx.bom.Selector.matches(selector, ret);
      }

      return ret;
    },


    /**
     * Checks if the given object is a DOM element
     *
     * @attachStatic{qxWeb}
     * @param selector {Object|String|qxWeb} Object to check
     * @return {Boolean} <code>true</code> if the object is a DOM element
     */
    isElement : function(selector) {
      return qx.dom.Node.isElement(qx.module.Traversing.__getElementFromArgument(selector));
    },


    /**
     * Checks if the given object is a DOM node
     *
     * @attachStatic{qxWeb}
     * @param selector {Node|String|qxWeb} Object to check
     * @return {Boolean} <code>true</code> if the object is a DOM node
     */
    isNode : function(selector) {
      return qx.dom.Node.isNode(qx.module.Traversing.__getElementFromArgument(selector));
    },


    /**
     * Whether the node has the given node name
     *
     * @attachStatic{qxWeb}
     * @param selector {Node|String|qxWeb} the node to check
     * @param  nodeName {String} the node name to check for
     * @return {Boolean} <code>true</code> if the node has the given name
     */
    isNodeName : function(selector, nodeName) {
      return qx.dom.Node.isNodeName(qx.module.Traversing.__getElementFromArgument(selector), nodeName);
    },


    /**
     * Checks if the given object is a DOM document object
     *
     * @attachStatic{qxWeb}
     * @param node {Object|qxWeb} Object to check. If the value is a qxWeb
     * collection, isDocument will check the first item.
     * @return {Boolean} <code>true</code> if the object is a DOM document
     */
    isDocument : function(node) {
      if (node instanceof qxWeb) {
        node = node[0];
      }
      return qx.dom.Node.isDocument(node);
    },


    /**
     * Checks if the given object is a DOM document fragment object
     *
     * @attachStatic{qxWeb}
     * @param node {Object|qxWeb} Object to check. If the value is a qxWeb
     * collection, isDocumentFragment will check the first item.
     * @return {Boolean} <code>true</code> if the object is a DOM document fragment
     */
    isDocumentFragment : function(node) {
      if (node instanceof qxWeb) {
        node = node[0];
      }
      return qx.dom.Node.isDocumentFragment(node);
    },


    /**
     * Returns the DOM2 <code>defaultView</code> (window) for the given node.
     *
     * @attachStatic{qxWeb}
     * @param selector {Node|Document|Window|String|qxWeb} Node to inspect
     * @return {Window} the <code>defaultView</code> for the given node
     */
    getWindow : function(selector) {
      return qx.dom.Node.getWindow(qx.module.Traversing.__getElementFromArgument(selector));
    },

    /**
     * Checks whether the given object is a DOM text node
     *
     * @attachStatic{qxWeb}
     * @param obj {Object} the object to be tested
     * @return {Boolean} <code>true</code> if the object is a textNode
     */
    isTextNode : function(obj) {
      return qx.dom.Node.isText(obj);
    },


    /**
     * Check whether the given object is a browser window object.
     *
     * @attachStatic{qxWeb}
     * @param obj {Object|qxWeb} the object to be tested. If the value
     * is a qxWeb collection, isDocument will check the first item.
     * @return {Boolean} <code>true</code> if the object is a window object
     */
    isWindow : function(obj) {
      if (obj instanceof qxWeb) {
        obj = obj[0];
      }
      return qx.dom.Node.isWindow(obj);
    },


    /**
     * Returns the owner document of the given node
     *
     * @attachStatic{qxWeb}
     * @param selector {Node|String|qxWeb} Node to get the document for
     * @return {Document|null} The document of the given DOM node
     */
    getDocument : function(selector) {
      return qx.dom.Node.getDocument(qx.module.Traversing.__getElementFromArgument(selector));
    },

    /**
     * Get the DOM node's name as a lowercase string
     *
     * @attachStatic{qxWeb}
     * @param selector {Node|String|qxWeb} DOM Node
     * @return {String} node name
     */
    getNodeName : function(selector) {
      return qx.dom.Node.getName(qx.module.Traversing.__getElementFromArgument(selector));
    },

    /**
     * Returns the text content of a node where the node type may be one of
     * NODE_ELEMENT, NODE_ATTRIBUTE, NODE_TEXT, NODE_CDATA
     *
     * @attachStatic{qxWeb}
     * @param selector {Node|String|qxWeb} the node from where the search should start. If the
     * node has subnodes the text contents are recursively retrieved and joined
     * @return {String} the joined text content of the given node or null if not
     * appropriate.
     */
    getNodeText : function(selector) {
      return qx.dom.Node.getText(qx.module.Traversing.__getElementFromArgument(selector));
    },

    /**
     * Checks if the given node is a block node
     *
     * @attachStatic{qxWeb}
     * @param selector {Node|String|qxWeb} the node to check
     * @return {Boolean} <code>true</code> if the node is a block node
     */
    isBlockNode : function(selector) {
      return qx.dom.Node.isBlockNode(qx.module.Traversing.__getElementFromArgument(selector));
    },


    /**
     * Determines if two DOM nodes are equal as defined in the
     * <a href="http://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-isEqualNode">DOM Level 3 isEqualNode spec</a>.
     * Also works in legacy browsers without native <em>isEqualNode</em> support.
     *
     * @attachStatic{qxWeb}
     * @param node1 {String|Element|Element[]|qxWeb} first object to compare
     * @param node2 {String|Element|Element[]|qxWeb} second object to compare
     * @return {Boolean} <code>true</code> if the nodes are equal
     */
    equalNodes : function(node1, node2) {
      node1 = qx.module.Traversing.__getNodeFromArgument(node1);
      node2 = qx.module.Traversing.__getNodeFromArgument(node2);

      if (!node1 || !node2) {
        return false;
      }

      if (qx.core.Environment.get("html.node.isequalnode")) {
        return node1.isEqualNode(node2);
      } else {
        if (node1 === node2) {
          return true;
        }

        // quick attributes length check
        var hasAttributes = node1.attributes && node2.attributes;
        if (hasAttributes &&
            node1.attributes.length !== node2.attributes.length) {
          return false;
        }

        var hasChildNodes = node1.childNodes && node2.childNodes;
        // quick childNodes length check
        if (hasChildNodes &&
            node1.childNodes.length !== node2.childNodes.length) {
          return false;
        }

        // string attribute check
        var domAttributes = qx.module.Traversing.EQUALITY_ATTRIBUTES;
        for (var i=0, l=domAttributes.length; i<l; i++) {
          var domAttrib = domAttributes[i];
          if (node1[domAttrib] !== node2[domAttrib]) {
            return false;
          }
        }

        // attribute values
        if (hasAttributes) {
          var node1Attributes = qx.module.Traversing.__getAttributes(node1);
          var node2Attributes = qx.module.Traversing.__getAttributes(node2);
          for (var attr in node1Attributes) {
            if (node1Attributes[attr] !== node2Attributes[attr]) {
              return false;
            }
          }
        }

        // child nodes
        if (hasChildNodes) {
          for (var j=0, m=node1.childNodes.length; j<m; j++) {
            var child1 = node1.childNodes[j];
            var child2 = node2.childNodes[j];
            if (!qx.module.Traversing.equalNodes(child1, child2)) {
              return false;
            }
          }
        }

        return true;
      }
    }
  },


  members :
  {

    __getAncestors : null,

    /**
     * Adds an element to the collection
     *
     * @attach {qxWeb}
     * @param el {Element|qxWeb} DOM element to add to the collection.
     * If a collection is given, only the first element will be added
     * @return {qxWeb} The collection for chaining
     */
    add : function(el) {
      if (el instanceof qxWeb) {
        el = el[0];
      }
      if (qx.module.Traversing.isElement(el) ||
          qx.module.Traversing.isDocument(el) ||
          qx.module.Traversing.isWindow(el) ||
          qx.module.Traversing.isDocumentFragment(el))
      {
        this.push(el);
      }
      return this;
    },


    /**
     * Gets a set of elements containing all of the unique immediate children of
     * each of the matched set of elements.
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {qxWeb}
     * @param selector {String?null} Optional selector to match
     * @return {qxWeb} Collection containing the child elements
     */
    getChildren : function(selector) {
      var children = [];
      for (var i=0; i < this.length; i++) {
        var found = qx.dom.Hierarchy.getChildElements(this[i]);
        if (selector) {
          found = qx.bom.Selector.matches(selector, found);
        }
        children = children.concat(found);
      };
      return qxWeb.$init(children, qxWeb);
    },


    /**
     * Executes the provided callback function once for each item in the
     * collection.
     *
     * @attach {qxWeb}
     * @param fn {Function} Callback function which is called with two parameters
     * <ul>
     *  <li>current item - DOM node</li>
     *  <li>current index - Number</li>
     * </ul>
     * @param ctx {Object} Context object
     * @return {qxWeb} The collection for chaining
     */
    forEach : function(fn, ctx) {
      for (var i=0; i < this.length; i++) {
        fn.call(ctx, this[i], i, this);
      };
      return this;
    },


    /**
     * Gets a set of elements containing the parent of each element in the
     * collection.
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {qxWeb}
     * @param selector {String?null} Optional selector to match
     * @return {qxWeb} Collection containing the parent elements
     */
    getParents : function(selector) {
      var parents = [];
      for (var i=0; i < this.length; i++) {
        var found = qx.dom.Element.getParentElement(this[i]);
        if (selector) {
          found = qx.bom.Selector.matches(selector, [found]);
        }
        parents = parents.concat(found);
      };
      return qxWeb.$init(parents, qxWeb);
    },


    /**
    * Checks if any element of the current collection is child of any element of a given
    * parent collection.
    *
    * @attach{qxWeb}
    * @param parent {qxWeb | String} Collection or selector of the parent collection to check.
    * @return {Boolean} Returns true if at least one element of the current collection is child of the parent collection
    *
    */
    isChildOf : function(parent){
      if(this.length == 0){
        return false;
      }
      var ancestors = null, parentCollection = qxWeb(parent), isChildOf = false;
      for(var i = 0, l = this.length; i < l && !isChildOf; i++){
        ancestors = qxWeb(this[i]).getAncestors();
        for(var j = 0, len = parentCollection.length; j < len; j++){
          if(ancestors.indexOf(parentCollection[j]) != -1){
            isChildOf = true;
            break;
          }
        };
      }
      return isChildOf;
    },


    /**
     * Gets a set of elements containing all ancestors of each element in the
     * collection.
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {qxWeb}
     * @param filter {String?null} Optional selector to match
     * @return {qxWeb} Collection containing the ancestor elements
     */
    getAncestors : function(filter) {
      return this.__getAncestors(null, filter);
    },


    /**
     * Gets a set of elements containing all ancestors of each element in the
     * collection, up to (but not including) the element matched by the provided
     * selector.
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {qxWeb}
     * @param selector {String} Selector that indicates where to stop including
     * ancestor elements
     * @param filter {String?null} Optional selector to match
     * @return {qxWeb} Collection containing the ancestor elements
     */
    getAncestorsUntil : function(selector, filter) {
      return this.__getAncestors(selector, filter);
    },


    /**
     * Gets a set containing the closest matching ancestor for each item in
     * the collection.
     * If the item itself matches, it is added to the new set. Otherwise, the
     * item's parent chain will be traversed until a match is found.
     *
     * @attach {qxWeb}
     * @param selector {String} Selector expression to match
     * @return {qxWeb} New collection containing the closest matching ancestors
     */
    getClosest : function(selector) {
      var closest = [];

      var findClosest = function(current) {
        var found = qx.bom.Selector.matches(selector, current);
        if (found.length) {
          closest.push(found[0]);
        } else {
          current = current.getParents(); // One up
          if(current[0] && current[0].parentNode) {
            findClosest(current);
          }
        }
      };

      for (var i=0; i < this.length; i++) {
        findClosest(qxWeb(this[i]));
      };

      return qxWeb.$init(closest, qxWeb);
    },


    /**
     * Searches the child elements of each item in the collection and returns
     * a new collection containing the children that match the provided selector
     *
     * @attach {qxWeb}
     * @param selector {String} Selector expression to match the child elements
     * against
     * @return {qxWeb} New collection containing the matching child elements
     */
    find : function(selector) {
      var found = [];
      for (var i=0; i < this.length; i++) {
        found = found.concat(qx.bom.Selector.query(selector, this[i]));
      };
      return qxWeb.$init(found, qxWeb);
    },


    /**
     * Gets a new set of elements containing the child nodes of each item in the
     * current set.
     *
     * @attach {qxWeb}
     * @return {qxWeb} New collection containing the child nodes
     */
    getContents : function() {
      var found = [];
      this._forEachElement(function(item) {
        found = found.concat(qx.lang.Array.fromCollection(item.childNodes));
      });
      return qxWeb.$init(found, qxWeb);
    },


    /**
     * Checks if at least one element in the collection passes the provided
     * filter. This can be either a selector expression or a filter
     * function
     *
     * @attach {qxWeb}
     * @param selector {String|Function} Selector expression or filter function
     * @return {Boolean} <code>true</code> if at least one element matches
     */
    is : function(selector) {
      if (qx.lang.Type.isFunction(selector)) {
        return this.filter(selector).length > 0;
      }
      return !!selector && qx.bom.Selector.matches(selector, this).length > 0;
    },


    /**
     * Reduce the set of matched elements to a single element.
     *
     * @attach {qxWeb}
     * @param index {Number} The position of the element in the collection
     * @return {qxWeb} A new collection containing one element
     */
    eq : function(index) {
      return this.slice(index, +index + 1);
    },


    /**
     * Reduces the collection to the first element.
     *
     * @attach {qxWeb}
     * @return {qxWeb} A new collection containing one element
     */
    getFirst : function() {
      return this.slice(0, 1);
    },


    /**
     * Reduces the collection to the last element.
     *
     * @attach {qxWeb}
     * @return {qxWeb} A new collection containing one element
     */
    getLast : function() {
      return this.slice(this.length - 1);
    },


    /**
     * Gets a collection containing only the elements that have descendants
     * matching the given selector
     *
     * @attach {qxWeb}
     * @param selector {String} Selector expression
     * @return {qxWeb} a new collection containing only elements with matching descendants
     */
    has : function(selector) {
      var found = [];
      this._forEachElement(function(item, index) {
        var descendants = qx.bom.Selector.matches(selector, this.eq(index).getContents());
        if (descendants.length > 0) {
          found.push(item);
        }
      });

      return qxWeb.$init(found, this.constructor);
    },


    /**
     * Returns a new collection containing only those nodes that
     * contain the given element. Also accepts a qxWeb
     * collection or an Array of elements. In those cases, the first element
     * in the list is used.
     *
     * @attach {qxWeb}
     * @param element {Element|Window|Element[]|qxWeb} element to check for.
     * @return {qxWeb} Collection with matching items
     */
    contains : function(element) {
      // qxWeb does not inherit from Array in IE
      if (element instanceof Array || element instanceof qxWeb) {
        element = element[0];
      }

      if (!element) {
        return qxWeb();
      }

      if (qx.dom.Node.isWindow(element)) {
        element = element.document;
      }

      return this.filter(function(el) {
        if (qx.dom.Node.isWindow(el)) {
          el = el.document;
        }
        return qx.dom.Hierarchy.contains(el, element);
      });
    },


    /**
     * Gets a collection containing the next sibling element of each item in
     * the current set.
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {qxWeb}
     * @param selector {String?} Optional selector expression
     * @return {qxWeb} New set containing next siblings
     */
    getNext : function(selector) {
      var found = this.map(qx.dom.Hierarchy.getNextElementSibling, qx.dom.Hierarchy);
      if (selector) {
        found = qxWeb.$init(qx.bom.Selector.matches(selector, found), qxWeb);
      }
      return found;
    },


    /**
     * Gets a collection containing all following sibling elements of each
     * item in the current set.
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {qxWeb}
     * @param selector {String?} Optional selector expression
     * @return {qxWeb} New set containing following siblings
     */
    getNextAll : function(selector) {
      var ret = qx.module.Traversing.__hierarchyHelper(this, "getNextSiblings", selector);
      return qxWeb.$init(ret, qxWeb);
    },


    /**
     * Gets a collection containing the following sibling elements of each
     * item in the current set up to but not including any element that matches
     * the given selector.
     *
     * @attach {qxWeb}
     * @param selector {String?} Optional selector expression
     * @return {qxWeb} New set containing following siblings
     */
    getNextUntil : function(selector) {
      var found = [];
      this.forEach(function(item, index) {
        var nextSiblings = qx.dom.Hierarchy.getNextSiblings(item);
        for (var i=0, l=nextSiblings.length; i<l; i++) {
          if (qx.bom.Selector.matches(selector, [nextSiblings[i]]).length > 0) {
            break;
          }
          found.push(nextSiblings[i]);
        }
      });

      return qxWeb.$init(found, qxWeb);
    },


    /**
     * Gets a collection containing the previous sibling element of each item in
     * the current set.
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {qxWeb}
     * @param selector {String?} Optional selector expression
     * @return {qxWeb} New set containing previous siblings
     */
    getPrev : function(selector) {
      var found = this.map(qx.dom.Hierarchy.getPreviousElementSibling, qx.dom.Hierarchy);
      if (selector) {
        found = qxWeb.$init(qx.bom.Selector.matches(selector, found), qxWeb);
      }
      return found;
    },


    /**
     * Gets a collection containing all preceding sibling elements of each
     * item in the current set.
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {qxWeb}
     * @param selector {String?} Optional selector expression
     * @return {qxWeb} New set containing preceding siblings
     */
    getPrevAll : function(selector) {
      var ret = qx.module.Traversing.__hierarchyHelper(this, "getPreviousSiblings", selector);
      return qxWeb.$init(ret, qxWeb);
    },


    /**
     * Gets a collection containing the preceding sibling elements of each
     * item in the current set up to but not including any element that matches
     * the given selector.
     *
     * @attach {qxWeb}
     * @param selector {String?} Optional selector expression
     * @return {qxWeb} New set containing preceding siblings
     */
    getPrevUntil : function(selector) {
      var found = [];
      this.forEach(function(item, index) {
        var previousSiblings = qx.dom.Hierarchy.getPreviousSiblings(item);
        for (var i=0, l=previousSiblings.length; i<l; i++) {
          if (qx.bom.Selector.matches(selector, [previousSiblings[i]]).length > 0) {
            break;
          }
          found.push(previousSiblings[i]);
        }
      });

      return qxWeb.$init(found, qxWeb);
    },


    /**
     * Gets a collection containing all sibling elements of the items in the
     * current set.
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {qxWeb}
     * @param selector {String?} Optional selector expression
     * @return {qxWeb} New set containing sibling elements
     */
    getSiblings : function(selector) {
      var ret = qx.module.Traversing.__hierarchyHelper(this, "getSiblings", selector);
      return qxWeb.$init(ret, qxWeb);
    },


    /**
     * Remove elements from the collection that do not pass the given filter.
     * This can be either a selector expression or a filter function
     *
     * @attach {qxWeb}
     * @param selector {String|Function} Selector or filter function
     * @return {qxWeb} Reduced collection
     */
    not : function(selector) {
      if (qx.lang.Type.isFunction(selector)) {
        return this.filter(function(item, index, obj) {
          return !selector(item, index, obj);
        });
      }

      var res = qx.bom.Selector.matches(selector, this);
      return this.filter(function(value) {
        return res.indexOf(value) === -1;
      });
    },


    /**
     * Gets a new collection containing the offset parent of each item in the
     * current set.
     *
     * @attach {qxWeb}
     * @return {qxWeb} New collection containing offset parents
     */
    getOffsetParent : function() {
      return this.map(qx.bom.element.Location.getOffsetParent);
    },


    /**
     * Whether the first element in the collection is inserted into
     * the document for which it was created.
     *
     * @attach {qxWeb}
     * @return {Boolean} <code>true</code> when the element is inserted
     *    into the document.
     */
    isRendered : function() {
      if (!this[0]) {
        return false;
      }
      return qx.dom.Hierarchy.isRendered(this[0]);
    }
  },


  defer : function(statics) {
    qxWeb.$attachAll(this);
    // manually attach private method which is ignored by attachAll
    qxWeb.$attach({
      "__getAncestors" : statics.__getAncestors
    });
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2011-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)
     * Daniel Wagner (danielwagner)

************************************************************************ */

/**
 * DOM manipulation module
 *
 * @ignore(qx.bom.element, qx.bom.element.AnimationJs)
 * @group (Core)
 */
qx.Bootstrap.define("qx.module.Manipulating", {
  statics :
  {
    /** Default animation descriptions for animated scrolling **/
    _animationDescription: {
      scrollLeft : {duration: 700, timing: "ease-in", keep: 100, keyFrames : {
        0: {},
        100: {scrollLeft: 1}
      }},

      scrollTop : {duration: 700, timing: "ease-in", keep: 100, keyFrames : {
        0: {},
        100: {scrollTop: 1}
      }}
    },


    /**
     * Performs animated scrolling
     *
     * @param property {String} Element property to animate: <code>scrollLeft</code>
     * or <code>scrollTop</code>
     * @param value {Number} Final scroll position
     * @param duration {Number} The animation's duration in ms
     * @return {q} The collection for chaining.
     */
    __animateScroll : function(property, value, duration)
    {
      var desc = qx.lang.Object.clone(qx.module.Manipulating._animationDescription[property], true);
      desc.keyFrames[100][property] = value;
      return this.animate(desc, duration);
    },


    /**
     * Creates a new collection from the given argument
     * @param arg {var} Selector expression, HTML string, DOM element or list of
     * DOM elements
     * @return {qxWeb} Collection
     * @internal
     */
    __getCollectionFromArgument : function(arg) {
      var coll;
      // Collection/array of DOM elements
      if (qx.lang.Type.isArray(arg)) {
        coll = qxWeb(arg);
      }
      // HTML string
      else {
        var arr = qx.bom.Html.clean([arg]);
        if (arr.length > 0 && qx.dom.Node.isElement(arr[0])) {
          coll = qxWeb(arr);
        }
        // Selector or single element
        else {
          coll = qxWeb(arg);
        }
      }

      return coll;
    },


    /**
     * Returns the innermost element of a DOM tree as determined by a simple
     * depth-first search.
     *
     * @param element {Element} Root element
     * @return {Element} innermost element
     * @internal
     */
    __getInnermostElement : function(element)
    {
      if (element.childNodes.length == 0) {
        return element;
      }
      for (var i=0,l=element.childNodes.length; i<l; i++) {
        if (element.childNodes[i].nodeType === 1) {
          return this.__getInnermostElement(element.childNodes[i]);
        }
      }
      return element;
    },


    /**
     * Returns an array from a selector expression or a single element
     *
     * @attach{qxWeb}
     * @param arg {String|Element} Selector expression or DOM element
     * @return {Element[]} Array of elements
     * @internal
     */
    __getElementArray : function(arg)
    {
      if (!qx.lang.Type.isArray(arg)) {
        var fromSelector = qxWeb(arg);
        arg = fromSelector.length > 0 ? fromSelector : [arg];
      }

      return arg.filter(function(item) {
        return (item && (item.nodeType === 1 || item.nodeType === 11));
      });
    },


    /**
     * Creates a new collection from the given argument. This can either be an
     * HTML string, a single DOM element or an array of elements
     *
     * When no <code>context</code> is given the global document is used to
     * create new DOM elements.
     *
     * <strong>Note:</strong> When a complex HTML string is provided the <code>innerHTML</code>
     * mechanism of the browser is used. Some browsers do filter out elements like <code>&lt;html&gt;</code>,
     * <code>&lt;head&gt;</code> or <code>&lt;body&gt;</code>. The better approach is to create
     * a single element and the appending the child nodes.
     *
     * @attachStatic{qxWeb}
     * @param html {String|Element[]} HTML string or DOM element(s)
     * @param context {Document?document} Context in which the elements should be created
     * @return {qxWeb} Collection of elements
     */
    create : function(html, context) {
      return qxWeb.$init(qx.bom.Html.clean([html], context), qxWeb);
    }
  },


  members :
  {
    /**
     * Clones the items in the current collection and returns them in a new set.
     * Event listeners can also be cloned.
     *
     * @attach{qxWeb}
     * @param events {Boolean} clone event listeners. Default: <code>false</code>
     * @return {qxWeb} New collection with clones
     */
    clone : function(events) {
      var clones = [];
      for (var i=0; i < this.length; i++) {
        if (this[i] && this[i].nodeType === 1) {
          clones[i] = this[i].cloneNode(true);
        }
      }

      if (events === true && this.copyEventsTo) {
        this.copyEventsTo(clones);
      }

      return qxWeb(clones);
    },



    /**
     * Appends content to each element in the current set. Accepts an HTML string,
     * a single DOM element or an array of elements
     *
     * @attach{qxWeb}
     * @param html {String|Element[]|qxWeb} HTML string or DOM element(s) to append
     * @return {qxWeb} The collection for chaining
     */
    append : function(html) {
      var arr = qx.bom.Html.clean([html]);
      var children = qxWeb.$init(arr, qxWeb);

      this._forEachElement(function(item, index) {
        for (var j=0, m=children.length; j < m; j++) {
          if (index == 0) {
            // first parent: move the target node(s)
            qx.dom.Element.insertEnd(children[j], item);
          }
          else {
            qx.dom.Element.insertEnd(children.eq(j).clone(true)[0], item);
          }
        }
      });

      return this;
    },


    /**
     * Appends all items in the collection to the specified parents. If multiple
     * parents are given, the items will be moved to the first parent, while
     * clones of the items will be appended to subsequent parents.
     *
     * @attach{qxWeb}
     * @param parent {String|Element[]|qxWeb} Parent selector expression or list of
     * parent elements
     * @return {qxWeb} The collection for chaining
     */
    appendTo : function(parent) {
      parent = qx.module.Manipulating.__getElementArray(parent);
      for (var i=0, l=parent.length; i < l; i++) {
        this._forEachElement(function(item, j) {
          if (i == 0) {
            // first parent: move the target node(s)
            qx.dom.Element.insertEnd(this[j], parent[i]);
          }
          else {
            // further parents: clone the target node(s)
            qx.dom.Element.insertEnd(this.eq(j).clone(true)[0], parent[i]);
          }
        });
      }

      return this;
    },


    /**
     * Inserts the current collection before each target item. The collection
     * items are moved before the first target. For subsequent targets,
     * clones of the collection items are created and inserted.
     *
     * @attach{qxWeb}
     * @param target {String|Element|Element[]|qxWeb} Selector expression, DOM element,
     * Array of DOM elements or collection
     * @return {qxWeb} The collection for chaining
     */
    insertBefore : function(target)
    {
      target = qx.module.Manipulating.__getElementArray(target);
      for (var i=0, l=target.length; i < l; i++) {
        this._forEachElement(function(item, index) {
          if (i == 0) {
            // first target: move the target node(s)
            qx.dom.Element.insertBefore(item, target[i]);
          }
          else {
            // further targets: clone the target node(s)
            qx.dom.Element.insertBefore(this.eq(index).clone(true)[0], target[i]);
          }
        });
      }

      return this;
    },



    /**
     * Inserts the current collection after each target item. The collection
     * items are moved after the first target. For subsequent targets,
     * clones of the collection items are created and inserted.
     *
     * @attach{qxWeb}
     * @param target {String|Element|Element[]|qxWeb} Selector expression, DOM element,
     * Array of DOM elements or collection
     * @return {qxWeb} The collection for chaining
     */
    insertAfter : function(target)
    {
      target = qx.module.Manipulating.__getElementArray(target);
      for (var i=0, l=target.length; i < l; i++) {
        for (var j=this.length - 1; j >= 0; j--) {
          if (!this[j] || this[j].nodeType !== 1) {
            continue;
          }
          if (i == 0) {
            // first target: move the target node(s)
            qx.dom.Element.insertAfter(this[j], target[i]);
          }
          else {
            // further targets: clone the target node(s)
            qx.dom.Element.insertAfter(this.eq(j).clone(true)[0], target[i]);
          }
        }
      }

      return this;
    },


    /**
     * Wraps each element in the collection in a copy of an HTML structure.
     * Elements will be appended to the deepest nested element in the structure
     * as determined by a depth-first search.
     *
     * @attach{qxWeb}
     * @param wrapper {String|Element|Element[]|qxWeb} Selector expression, HTML string, DOM element or
     * list of DOM elements
     * @return {qxWeb} The collection for chaining
     */
    wrap : function(wrapper) {
      wrapper = qx.module.Manipulating.__getCollectionFromArgument(wrapper);

      if (wrapper.length == 0) {
        return this;
      }

      this._forEachElement(function(item) {
        var clonedwrapper = wrapper.eq(0).clone(true);
        qx.dom.Element.insertAfter(clonedwrapper[0], item);
        var innermost = qx.module.Manipulating.__getInnermostElement(clonedwrapper[0]);
        qx.dom.Element.insertEnd(item, innermost);
      });

      return this;
    },


    /**
     * Removes each element in the current collection from the DOM
     *
     * @attach{qxWeb}
     * @return {qxWeb} The collection for chaining
     */
    remove : function() {
      this._forEachElement(function(item) {
        qx.dom.Element.remove(item);
      });
      return this;
    },


    /**
     * Removes all content from the elements in the collection
     *
     * @attach{qxWeb}
     * @return {qxWeb} The collection for chaining
     */
    empty : function() {
      this._forEachElement(function(item) {
        // don't use innerHTML="" because of [BUG #7323]
        // and don't use textContent="" because of missing IE8 support
        while (item.firstChild) {
          item.removeChild(item.firstChild);
        }
      });
      return this;
    },


    /**
     * Inserts content before each element in the collection. This can either
     * be an HTML string, an array of HTML strings, a single DOM element or an
     * array of elements.
     *
     * @attach{qxWeb}
     * @param content {String|String[]|Element|Element[]|qxWeb} HTML string(s),
     * DOM element(s) or collection to insert
     * @return {qxWeb} The collection for chaining
     */
    before : function(content) {
      if (!qx.lang.Type.isArray(content)) {
        content = [content];
      }
      var fragment = document.createDocumentFragment();
      qx.bom.Html.clean(content, document, fragment);
      this._forEachElement(function(item, index) {
        var kids = qx.lang.Array.cast(fragment.childNodes, Array);
        for (var i=0,l=kids.length; i<l; i++) {
          var child;
          if (index < this.length - 1) {
            child = kids[i].cloneNode(true);
          }
          else {
            child = kids[i];
          }
          item.parentNode.insertBefore(child, item);
        }
      }, this);

      return this;
    },


    /**
     * Inserts content after each element in the collection. This can either
     * be an HTML string, an array of HTML strings, a single DOM element or an
     * array of elements.
     *
     * @attach{qxWeb}
     * @param content {String|String[]|Element|Element[]|qxWeb} HTML string(s),
     * DOM element(s) or collection to insert
     * @return {qxWeb} The collection for chaining
     */
    after : function(content) {
      if (!qx.lang.Type.isArray(content)) {
        content = [content];
      }
      var fragment = document.createDocumentFragment();
      qx.bom.Html.clean(content, document, fragment);
      this._forEachElement(function(item, index) {
        var kids = qx.lang.Array.cast(fragment.childNodes, Array);
        for (var i=kids.length-1; i>=0; i--) {
          var child;
          if (index < this.length - 1) {
            child = kids[i].cloneNode(true);
          }
          else {
            child = kids[i];
          }
          item.parentNode.insertBefore(child, item.nextSibling);
        }
      }, this);

      return this;
    },


    /**
     * Returns the left scroll position of the first element in the collection.
     *
     * @attach{qxWeb}
     * @return {Number} Current left scroll position
     */
    getScrollLeft : function()
    {
      var obj = this[0];
      if (!obj) {
        return null;
      }

      var Node = qx.dom.Node;
      if (Node.isWindow(obj) || Node.isDocument(obj)) {
        return qx.bom.Viewport.getScrollLeft();
      }

      return obj.scrollLeft;
    },


    /**
     * Returns the top scroll position of the first element in the collection.
     *
     * @attach{qxWeb}
     * @return {Number} Current top scroll position
     */
    getScrollTop : function()
    {
      var obj = this[0];
      if (!obj) {
        return null;
      }

      var Node = qx.dom.Node;
      if (Node.isWindow(obj) || Node.isDocument(obj)) {
        return qx.bom.Viewport.getScrollTop();
      }

      return obj.scrollTop;
    },


    /**
     * Scrolls the elements of the collection to the given coordinate.
     *
     * @attach{qxWeb}
     * @param value {Number} Left scroll position
     * @param duration {Number?} Optional: Duration in ms for animated scrolling
     * @return {qxWeb} The collection for chaining
     */
    setScrollLeft : function(value, duration)
    {
      var Node = qx.dom.Node;

      if (duration && qx.bom.element && qx.bom.element.AnimationJs) {
        qx.module.Manipulating.__animateScroll.bind(this, "scrollLeft",
          value, duration)();
      }

      for (var i=0, l=this.length, obj; i<l; i++)
      {
        obj = this[i];

        if (Node.isElement(obj)) {
          if (!(duration && qx.bom.element && qx.bom.element.AnimationJs)) {
            obj.scrollLeft = value;
          }
        } else if (Node.isWindow(obj)) {
          obj.scrollTo(value, this.getScrollTop(obj));
        } else if (Node.isDocument(obj)) {
          Node.getWindow(obj).scrollTo(value, this.getScrollTop(obj));
        }
      }

      return this;
    },


    /**
     * Scrolls the elements of the collection to the given coordinate.
     *
     * @attach{qxWeb}
     * @param value {Number} Top scroll position
     * @param duration {Number?} Optional: Duration in ms for animated scrolling
     * @return {qxWeb} The collection for chaining
     */
    setScrollTop : function(value, duration)
    {
      var Node = qx.dom.Node;

      if (duration && qx.bom.element && qx.bom.element.AnimationJs) {
        qx.module.Manipulating.__animateScroll.bind(this, "scrollTop",
           value, duration)();
      }

      for (var i=0, l=this.length, obj; i<l; i++)
      {
        obj = this[i];

        if (Node.isElement(obj)) {
          if (!(duration && qx.bom.element && qx.bom.element.AnimationJs)) {
            obj.scrollTop = value;
          }
        } else if (Node.isWindow(obj)) {
          obj.scrollTo(this.getScrollLeft(obj), value);
        } else if (Node.isDocument(obj)) {
          Node.getWindow(obj).scrollTo(this.getScrollLeft(obj), value);
        }
      }

      return this;
    },


    /**
     * Focuses the first element in the collection
     *
     * @attach{qxWeb}
     * @return {qxWeb} The collection for chaining
     */
    focus : function()
    {
      try {
        this[0].focus();
      }
      catch(ex) {}

      return this;
    },


    /**
     * Blurs each element in the collection
     *
     * @attach{qxWeb}
     * @return {qxWeb} The collection for chaining
     */
    blur : function()
    {
      this.forEach(function(item, index) {
        try {
          item.blur();
        }
        catch(ex) {}
      });

      return this;
    }
  },


  defer : function(statics) {
    qxWeb.$attachAll(this);
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Daniel Wagner (danielwagner)

************************************************************************ */

/**
 * Normalization for native keyboard events.
 *
 * NOTE: Some browsers won't fire the <code>keypress</code> event for all keys.
 * It's generally better to listen for <code>keyup</code> or <code>keydown</code>
 * instead.
 *
 * @require(qx.module.Event)
 * @require(qx.module.Environment)
 *
 * @group (Event_Normalization)
 */
qx.Bootstrap.define("qx.module.event.Keyboard", {
  statics :
  {
    /**
     * List of event types to be normalized
     */
    TYPES : ["keydown", "keypress", "keyup"],


    /**
     * List qx.module.event.Keyboard methods to be attached to native mouse event
     * objects
     * @internal
     */
    BIND_METHODS : ["getKeyIdentifier"],


    /**
     * Identifier of the pressed key. This property is modeled after the <em>KeyboardEvent.keyIdentifier</em> property
     * of the W3C DOM 3 event specification
     * (http://www.w3.org/TR/2003/NOTE-DOM-Level-3-Events-20031107/events.html#Events-KeyboardEvent-keyIdentifier).
     *
     * Printable keys are represented by an unicode string, non-printable keys
     * have one of the following values:
     *
     * <table>
     * <tr><th>Backspace</th><td>The Backspace (Back) key.</td></tr>
     * <tr><th>Tab</th><td>The Horizontal Tabulation (Tab) key.</td></tr>
     * <tr><th>Space</th><td>The Space (Spacebar) key.</td></tr>
     * <tr><th>Enter</th><td>The Enter key. Note: This key identifier is also used for the Return (Macintosh numpad) key.</td></tr>
     * <tr><th>Shift</th><td>The Shift key.</td></tr>
     * <tr><th>Control</th><td>The Control (Ctrl) key.</td></tr>
     * <tr><th>Alt</th><td>The Alt (Menu) key.</td></tr>
     * <tr><th>CapsLock</th><td>The CapsLock key</td></tr>
     * <tr><th>Meta</th><td>The Meta key. (Apple Meta and Windows key)</td></tr>
     * <tr><th>Escape</th><td>The Escape (Esc) key.</td></tr>
     * <tr><th>Left</th><td>The Left Arrow key.</td></tr>
     * <tr><th>Up</th><td>The Up Arrow key.</td></tr>
     * <tr><th>Right</th><td>The Right Arrow key.</td></tr>
     * <tr><th>Down</th><td>The Down Arrow key.</td></tr>
     * <tr><th>PageUp</th><td>The Page Up key.</td></tr>
     * <tr><th>PageDown</th><td>The Page Down (Next) key.</td></tr>
     * <tr><th>End</th><td>The End key.</td></tr>
     * <tr><th>Home</th><td>The Home key.</td></tr>
     * <tr><th>Insert</th><td>The Insert (Ins) key. (Does not fire in Opera/Win)</td></tr>
     * <tr><th>Delete</th><td>The Delete (Del) Key.</td></tr>
     * <tr><th>F1</th><td>The F1 key.</td></tr>
     * <tr><th>F2</th><td>The F2 key.</td></tr>
     * <tr><th>F3</th><td>The F3 key.</td></tr>
     * <tr><th>F4</th><td>The F4 key.</td></tr>
     * <tr><th>F5</th><td>The F5 key.</td></tr>
     * <tr><th>F6</th><td>The F6 key.</td></tr>
     * <tr><th>F7</th><td>The F7 key.</td></tr>
     * <tr><th>F8</th><td>The F8 key.</td></tr>
     * <tr><th>F9</th><td>The F9 key.</td></tr>
     * <tr><th>F10</th><td>The F10 key.</td></tr>
     * <tr><th>F11</th><td>The F11 key.</td></tr>
     * <tr><th>F12</th><td>The F12 key.</td></tr>
     * <tr><th>NumLock</th><td>The Num Lock key.</td></tr>
     * <tr><th>PrintScreen</th><td>The Print Screen (PrintScrn, SnapShot) key.</td></tr>
     * <tr><th>Scroll</th><td>The scroll lock key</td></tr>
     * <tr><th>Pause</th><td>The pause/break key</td></tr>
     * <tr><th>Win</th><td>The Windows Logo key</td></tr>
     * <tr><th>Apps</th><td>The Application key (Windows Context Menu)</td></tr>
     * </table>
     *
     * @return {String} The key identifier
     */
    getKeyIdentifier : function()
    {
      if (this.type == "keypress" &&
      (qxWeb.env.get("engine.name") != "gecko" || this.charCode !== 0))
      {
        return qx.event.util.Keyboard.charCodeToIdentifier(this.charCode || this.keyCode);
      }
      return qx.event.util.Keyboard.keyCodeToIdentifier(this.keyCode);
    },


    /**
     * Manipulates the native event object, adding methods if they're not
     * already present
     *
     * @param event {Event} Native event object
     * @param element {Element} DOM element the listener was attached to
     * @return {Event} Normalized event object
     * @internal
     */
    normalize : function(event, element) {
      if (!event) {
        return event;
      }
      var bindMethods = qx.module.event.Keyboard.BIND_METHODS;
      for (var i=0, l=bindMethods.length; i<l; i++) {
        if (typeof event[bindMethods[i]] != "function") {
          event[bindMethods[i]] = qx.module.event.Keyboard[bindMethods[i]].bind(event);
        }
      }

      return event;
    },


    /**
     * IE9 will not fire an "input" event on text input elements if the user changes
     * the field's value by pressing the Backspace key. We fix this by listening
     * for the "keyup" event and emitting the missing event if necessary
     *
     * @param element {Element} Target element
     * @internal
     */
    registerInputFix : function(element) {
      if (element.type === "text" || element.type === "password" || element.type === "textarea")
      {
        if (!element.__inputFix) {
          element.__inputFix = qxWeb(element).on("keyup", qx.module.event.Keyboard._inputFix);
        }
      }
    },


    /**
     * Removes the IE9 input event fix
     *
     * @param element {Element} target element
     * @internal
     */
    unregisterInputFix : function(element) {
      if (element.__inputFix && !qxWeb(element).hasListener("input")) {
        qxWeb(element).off("keyup", qx.module.event.Keyboard._inputFix);
        element.__inputFix = null;
      }
    },


    /**
     * IE9 fix: Emits an "input" event if a text input element's value was changed
     * using the Backspace key
     * @param ev {Event} Keyup event
     */
    _inputFix : function(ev) {
      if (ev.getKeyIdentifier() !== "Backspace") {
        return;
      }
      var target = ev.getTarget();
      var newValue = qxWeb(target).getValue();

      if (!target.__oldInputValue || target.__oldInputValue !== newValue) {
        target.__oldInputValue = newValue;
        ev.type = ev._type = "input";
        target.$$emitter.emit("input", ev);
      }
    }
  },

  defer : function(statics) {
    qxWeb.$registerEventNormalization(qx.module.event.Keyboard.TYPES, statics.normalize);

    if (qxWeb.env.get("engine.name") === "mshtml" && qxWeb.env.get("browser.documentmode") === 9)
    {
      qxWeb.$registerEventHook("input", statics.registerInputFix, statics.unregisterInputFix);
    }
  }
});
