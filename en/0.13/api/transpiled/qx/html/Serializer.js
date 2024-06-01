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
       2019-22 Zenesis Ltd, https://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       John Spackman (john.spackman@zenesis.com, @johnspackman)
  
  ************************************************************************ */

  /**
   * Controls serializing the VDOM in `qx.html.*` into an HTML string.
   *
   * The principal task here is to write the HTML with QxObjectIds, in a form which allows
   * the DOM that the browser parsed to be connected to the instances of `qx.html.Node`
   * that are created by the Javascript on the client.
   *
   * In other words, the DOM which is created by this HTML will be passed to `qx.html.Element.useNode`
   * on the client.
   */
  qx.Class.define("qx.html.Serializer", {
    extend: qx.core.Object,
    /**
     * Constructor
     */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__P_252_0 = "";
      this.__P_252_1 = [];
      this.__P_252_2 = [];
    },
    properties: {
      /** Whether to pretty print (default is whatever qx.cdebug is set to) */
      prettyPrint: {
        init: false,
        check: "Boolean",
        nullable: false
      }
    },
    members: {
      /** @type{String} the HTML being built up */
      __P_252_0: null,
      /** @type{qx.html.Node[]} the stack of objects being written */
      __P_252_1: null,
      /**
       * For each tag on the stack being emitted, we track the data in an object, nominally called TagData
       *
       * @typedef {Object} TagData
       * @property {Integer} indent how far this node is indented
       * @property {String} tagName the name of the tag
       * @property {Dictionary} attributes the attributes to set on the tag
       * @property {Boolean?} openTagWritten whether the open tag has been written
       * @property {Boolean?} closeTagWritten whether the close tag has been written
       */

      /** @type{TagData[]} the stack of elements being written */
      __P_252_2: null,
      /** @type{String?} the current tag name */
      __P_252_3: null,
      /**
       * Writes to the output
       * @param  {var[]} args array of values to convert to strings and output
       */
      write: function write() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        this.__P_252_0 += args.join("");
      },
      /**
       * Called when an open tag needs to be emitted
       *
       * @param {String} tagName
       */
      openTag: function openTag(tagName) {
        this.__P_252_4();
        this.__P_252_2.push({
          indent: this.__P_252_2.length,
          tagName: tagName.toLowerCase(),
          attributes: {}
        });
      },
      /**
       * Called to add plain text into the output
       * @param {String?} text
       */
      rawTextInBody: function rawTextInBody(text) {
        if (text !== null && text !== undefined) {
          this.__P_252_4();
          this.write(text);
        }
      },
      /**
       * Called to close the current tag
       */
      closeTag: function closeTag() {
        this.__P_252_4(true);
        this.__P_252_2.pop();
      },
      /**
       * Adds an attribute to the current tag; cannot be done if body or children have been output
       *
       * @param {String} key the attribute name
       * @param {String?} value teh attribite value, if null the attribute will be deleted
       */
      setAttribute: function setAttribute(key, value) {
        var tagData = this.__P_252_5();
        if (tagData.openTagWritten) {
          throw new Error("Cannot modify attributes after the opening tag has been written");
        }
        tagData.attributes[key] = value;
      },
      /**
       * Looks for the current tag
       *
       * @returns {TagData}
       */
      __P_252_5: function __P_252_5() {
        return this.__P_252_2[this.__P_252_2.length - 1];
      },
      /**
       * Flushes the tag into the output.  This will prevent further attributes etc from being emitted
       * and if `closeTag` is true then the tag is closed.  Handles self closing tags and indentation
       *
       * @param {Boolean} closeTag if we are flushing because the tag is being closed
       */
      __P_252_4: function __P_252_4(closeTag) {
        var _this = this;
        var tagData = this.__P_252_5();
        if (!tagData) {
          return;
        }
        var indent = function indent() {
          if (_this.isPrettyPrint()) {
            for (var i = 0; i < tagData.indent; i++) {
              _this.write("  ");
            }
          }
        };
        if (!tagData.openTagWritten) {
          indent();
          var tmp = ["<" + tagData.tagName];
          for (var key in tagData.attributes) {
            var value = tagData.attributes[key];
            if (value !== null && value !== undefined) {
              tmp.push("".concat(key, "=").concat(value));
            }
          }
          this.write(tmp.join(" "));
          if (closeTag) {
            if (qx.html.Serializer.__P_252_6[tagData.tagName]) {
              this.write("/>");
            } else {
              this.write("></" + tagData.tagName + ">");
            }
            tagData.openTagWritten = true;
            tagData.closeTagWritten = true;
            if (this.isPrettyPrint()) {
              this.write("\n");
            }
          } else {
            this.write(">");
            if (this.isPrettyPrint()) {
              this.write("\n");
            }
            tagData.openTagWritten = true;
          }
        } else if (closeTag && !tagData.closeTagWritten) {
          indent();
          this.write("</".concat(tagData.tagName, ">"));
          if (this.isPrettyPrint()) {
            this.write("\n");
          }
          tagData.closeTagWritten = true;
        }
      },
      /**
       * Erases all output
       */
      clear: function clear() {
        this.__P_252_0 = "";
      },
      /**
       * Provides the accumulated output
       *
       * @returns {String}
       */
      getOutput: function getOutput() {
        return this.__P_252_0;
      },
      /**
       * Pushes the QxObject onto the stack
       *
       * @param {qx.core.Object} obj
       */
      pushQxObject: function pushQxObject(obj) {
        this.__P_252_1.push(obj);
      },
      /**
       * Pops the topmost QxObject from the stack
       */
      popQxObject: function popQxObject() {
        this.__P_252_1.pop();
      },
      /**
       * Peeks the QxObject stack
       *
       * @returns {qx.core.Object}
       */
      peekQxObject: function peekQxObject() {
        return this.__P_252_1[this.__P_252_1.length - 1] || null;
      },
      /**
       * Calculates a Qx Object ID which is either relative to the root most element,
       * or is relative to it's owner.  This tries to be as concise as possible so that
       * the output HTML is as readable as possible
       *
       * The return is null if the object does not have an ID
       *
       * @param {qx.html.Element} target
       * @returns {String?}
       */
      getQxObjectIdFor: function getQxObjectIdFor(target) {
        if (!target.getQxObjectId()) {
          return null;
        }

        // If we can make the ID relative to it's parent, then just use the shorter version.  This is
        //  not strictly necessary because we could use absolute paths everywhere, but it's a lot
        //  easier to read and understand, and consumes less bytes in the output
        var stackTop = this.peekQxObject();
        if (stackTop === target) {
          var secondTop = this.__P_252_1.slice(-2)[0] || null;
          if (secondTop === target.getQxOwner()) {
            return target.getQxObjectId();
          }
        }

        // Calculate the relative path between the stack top and the target object
        var ids = [target.getQxObjectId()];
        var stackFirst = this.__P_252_1[0];
        var tmp = target;
        do {
          var owner = tmp.getQxOwner();
          if (this.__P_252_1.indexOf(owner) < 0) {
            break;
          } else if (owner === stackFirst) {
            ids.unshift("..");
          } else {
            ids.unshift(tmp.getQxObjectId());
          }
        } while (tmp = tmp.getQxOwner());
        return ids.join("/");
      }
    },
    statics: {
      /** @type{Dictionary<String,Boolean>} list of self closing tags, in lowercase */
      __P_252_6: null
    },
    /**
     * Populates statics
     */
    defer: function defer(statics) {
      statics.__P_252_6 = {};
      ["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"].forEach(function (tagName) {
        statics.__P_252_6[tagName] = true;
      });
    }
  });
  qx.html.Serializer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Serializer.js.map?dt=1717235381957