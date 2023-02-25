(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
       2018 Zenesis Limited, http://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (johnspackman)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * This class wraps the access to documentation nodes.
   */
  qx.Class.define("qxl.apiviewer.dao.Node", {
    extend: qx.core.Object,
    construct: function construct(meta) {
      qx.core.Object.constructor.call(this);
      this._meta = {};
      this._jsdoc = {};
      if (meta !== undefined) {
        this._initMeta(meta);
      }
    },
    members: {
      _meta: null,
      _jsdoc: null,
      _errors: null,
      _initMeta: function _initMeta(meta) {
        this._meta = meta;
        this._jsdoc = meta.jsdoc || {};
        this._errors = [];
      },
      /**
       * Get description
       *
       * @return {String} description
       */
      getDescription: function getDescription() {
        var arr = this._jsdoc["@description"];
        if (arr && arr.length) {
          return arr[arr.length - 1].body;
        }
        return "";
      },
      /**
       * Get a list of errors of this item.
       *
       * @return {Map[]} errors of this item.
       */
      getErrors: function getErrors() {
        return this._errors;
      },
      /**
       * Get the line number of this item in the source file
       *
       * @return {Integer|null} line number or <code>null</code> if unknown
       */
      getLineNumber: function getLineNumber() {
        return this._meta.location ? this._meta.location.start.line : null;
      },
      /**
       * Get whether the node is deprecated.
       *
       * @return {Boolean} whether the node is deprecated.
       */
      isDeprecated: function isDeprecated() {
        return this._jsdoc["@deprecated"] !== undefined;
      },
      /**
       * Get the text of the deprecation message.
       *
       * @return {String} the deprecation message.
       */
      getDeprecationText: function getDeprecationText() {
        return this.isDeprecated() && this._jsdoc["@deprecated"].body || "";
      },
      /**
       * Get whether the node is internal.
       *
       * @return {Boolean} whether the node is internal.
       */
      isInternal: function isInternal() {
        return this._jsdoc["@internal"] !== undefined;
      },
      /**
       * Get whether the node is private.
       *
       * @return {Boolean} whether the node is private.
       */
      isPrivate: function isPrivate() {
        return this._meta.access == "private";
      },
      /**
       * Get whether the node is protected.
       *
       * @return {Boolean} whether the node is protected.
       */
      isProtected: function isProtected() {
        return this._meta.access == "protected";
      },
      /**
       * Get whether the node is property generated.
       *
       * @return {Boolean} whether the node is property generated.
       */
      isPropertyGenerated: function isPropertyGenerated() {
        return Boolean(this._meta.property);
      },
      /**
       * Get whether the node is public.
       *
       * @return {Boolean} Whether the node is public.
       */
      isPublic: function isPublic() {
        return !this.isPrivate() && !this.isProtected() && !this.isInternal();
      },
      /**
       * Get whether the node has a warning.
       *
       * @return {Boolean} whether the node has a warning.
       */
      hasWarning: function hasWarning() {
        return this._meta.hasWarning || false;
      },
      /**
       * Initialize all internal fields. This method will be called by the
       * constructor before the child nodes are parsed.
       */
      _initializeFields: function _initializeFields() {
        this._errors = [];
      }
    }
  });
  qxl.apiviewer.dao.Node.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Node.js.map?dt=1677362781359