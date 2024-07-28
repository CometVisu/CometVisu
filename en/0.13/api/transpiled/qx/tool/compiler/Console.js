(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "qx.lang.String": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
   *
   *    qooxdoo-compiler - node.js based replacement for the Qooxdoo python
   *    toolchain
   *
   *    https://github.com/qooxdoo/qooxdoo
   *
   *    Copyright:
   *      2011-2017 Zenesis Limited, http://www.zenesis.com
   *
   *    License:
   *      MIT: https://opensource.org/licenses/MIT
   *
   *      This software is provided under the same licensing terms as Qooxdoo,
   *      please see the LICENSE file in the Qooxdoo project's top-level directory
   *      for details.
   *
   *    Authors:
   *      * John Spackman (john.spackman@zenesis.com, @johnspackman)
   *
   * *********************************************************************** */

  /**
   * The Console handles output of compiler messages for the end user (i.e. not debugging output).
   * The output is based around message IDs, which relate to translatable strings, plus arguments.
   */
  qx.Class.define("qx.tool.compiler.Console", {
    extend: qx.core.Object,
    properties: {
      /** Whether verbose logging is enabled */
      verbose: {
        init: false,
        check: "Boolean"
      },
      /** Whether to output all messages as machine readable data structures */
      machineReadable: {
        init: false,
        check: "Boolean"
      },
      /**
       * Function that is used to output console messages; called with:
       *   str {String} complete message to output
       *   msgId {String} original message ID
       *   ...args {Object...} original arguments to message
       */
      writer: {
        init: null,
        nullable: true,
        check: "Function"
      },
      /** Colour prefix for console output */
      colorOn: {
        init: "",
        nullable: false,
        check: "String"
      }
    },
    members: {
      /**
       * Prints the message
       *
       * @param msgId {String} translatable message ID
       * @param args {Object...} arguments
       */
      print: function print(msgId) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        for (var i = 0; i < args.length; i++) {
          var arg = args[i];
          if (typeof arg !== "string" && typeof arg !== "number" && arg !== null) {
            args[i] = String(arg);
          }
        }
        if (this.isMachineReadable()) {
          var str = "##" + msgId + ":" + JSON.stringify(args);
          console.log(str);
        } else {
          var writer = this.getWriter();
          var _str = this.decode.apply(this, [msgId].concat(args));
          if (writer) {
            writer.apply(void 0, [_str, msgId].concat(args));
          } else {
            this.log(_str);
          }
        }
      },
      /**
       * Decodes the message ID and arguments into a string to be presented in the output
       *
       * @param msgId {String} translatable message ID
       * @param args {Object...} arguments
       * @return {String} complete message
       */
      decode: function decode(msgId) {
        var msg = qx.tool.compiler.Console.MESSAGE_IDS[msgId];
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }
        if (msg) {
          var _str2 = qx.lang.String.format(msg.message, args || []);
          return _str2;
        }
        var str = msgId + JSON.stringify(args);
        return str;
      },
      /**
       * Returns the type of the message, eg error, warning, etc
       *
       * @param msgId {String} the message ID to lookup
       * @return {String} the type of message, can be one of "message" (default) or "error", "warning"
       */
      getMessageType: function getMessageType(msgId) {
        var msg = qx.tool.compiler.Console.MESSAGE_IDS[msgId];
        return msg ? msg.type : null;
      },
      /**
       * console.log equivalent, with colorization
       */
      log: function log() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }
        console.log(this.getColorOn() + args.join(" "));
      },
      /**
       * console.debug equivalent, with colorization
       */
      debug: function debug() {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }
        console.debug(this.getColorOn() + args.join(" "));
      },
      /**
       * console.info equivalent, with colorization
       */
      info: function info() {
        for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }
        console.info(this.getColorOn() + args.join(" "));
      },
      /**
       * console.warn equivalent, with colorization, only operates if `verbose` is true
       */
      trace: function trace() {
        if (this.isVerbose()) {
          for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            args[_key6] = arguments[_key6];
          }
          console.warn(this.getColorOn() + args.join(" "));
        }
      },
      /**
       * console.warn equivalent, with colorization
       */
      warn: function warn() {
        for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
          args[_key7] = arguments[_key7];
        }
        console.warn(this.getColorOn() + args.join(" "));
      },
      /**
       * console.error equivalent, with colorization
       */
      error: function error() {
        for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
          args[_key8] = arguments[_key8];
        }
        console.error(this.getColorOn() + args.join(" "));
      }
    },
    defer: function defer(statics) {
      /*
       * Errors
       */
      statics.addMessageIds({
        // Compiler errors (@see {ClassFile})
        "qx.tool.compiler.class.invalidProperties": "Invalid 'properties' key in class definition",
        "qx.tool.compiler.compiler.missingClassDef": "FATAL Missing class definition - no call to qx.Class.define (or qx.Mixin.define etc)",
        "qx.tool.compiler.compiler.syntaxError": "FATAL Syntax error: %1",
        "qx.tool.compiler.compiler.invalidExtendClause": "FATAL Invalid `extend` clause - expected to find a class name (without quotes or `new`)",
        "qx.tool.compiler.compiler.invalidClassDefinitionEntry": "Unexpected property %2 in %1 definition",
        "qx.tool.compiler.compiler.wrongClassName": "Wrong class name or filename - expected to find at least %1 but only found [%2]",
        "qx.tool.compiler.compiler.membersNotAnObject": "The members property of class %1 is not an object",
        // Application errors (@see {Application})
        "qx.tool.compiler.application.partRecursive": "Part %1 has recursive dependencies on other parts",
        "qx.tool.compiler.application.duplicatePartNames": "Duplicate parts named '%1'",
        "qx.tool.compiler.application.noBootPart": "Cannot find a boot part",
        "qx.tool.compiler.application.conflictingExactPart": "Conflicting exact match for %1, could be %2 or %3",
        "qx.tool.compiler.application.conflictingBestPart": "Conflicting best match for %1, could be %2 or %3",
        "qx.tool.compiler.application.missingRequiredLibrary": "Cannot find required library %1",
        "qx.tool.compiler.application.missingScriptResource": "Cannot find script resource: %1",
        "qx.tool.compiler.application.missingCssResource": "Cannot find CSS resource: %1",
        // Target errors (@see {Target})
        "qx.tool.compiler.target.missingAppLibrary": "Cannot find library required to create application for %1",
        // Library errors (@see {Library})
        "qx.tool.compiler.library.emptyManifest": "Empty Manifest.json in library at %1",
        "qx.tool.compiler.library.cannotCorrectCase": "Unable to correct case for library in %1 because it uses source/resource directories which are outside the library",
        "qx.tool.compiler.library.cannotFindPath": "Cannot find path %2 required by library %1",
        // Targets
        "qx.tool.compiler.build.uglifyParseError": "Parse error in output file %4, line %1 column %2: %3",
        // Fonts
        "qx.tool.compiler.webfonts.error": "Error compiling webfont %1, error=%2",
        // Progress
        "qx.tool.compiler.maker.appFatalError": "Cannot write application '%1' because it has fatal errors"
      }, "error");

      /*
       * Warnings
       */
      statics.addMessageIds({
        "qx.tool.compiler.class.blockedMangle": "The mangling of private variable '%1' has been blocked because it is referenced as a string before it is declared",
        "qx.tool.compiler.translate.invalidMessageId": "Cannot interpret message ID %1",
        "qx.tool.compiler.translate.invalidMessageIds": "Cannot interpret message ID %1, %2",
        "qx.tool.compiler.translate.invalidMessageIds3": "Cannot interpret message ID %1, %2, %3",
        "qx.tool.compiler.testForUnresolved": "Unexpected termination when testing for unresolved symbols, node type %1",
        "qx.tool.compiler.testForFunctionParameterType": "Unexpected type of function parameter, node type %1",
        "qx.tool.compiler.defer.unsafe": "Unsafe use of 'defer' method to access external class: %1",
        "qx.tool.compiler.symbol.unresolved": "Unresolved use of symbol %1",
        "qx.tool.compiler.environment.unreachable": "Environment check '%1' may be indeterminable, add to Manifest/provides/environment or use class name prefix",
        "qx.tool.compiler.compiler.requireLiteralArguments": "Wrong class name or filename - expected to find at least %1 but only found [%2]",
        "qx.tool.compiler.target.missingAppLibrary": "Cannot find the application library for %1",
        "qx.tool.compiler.webfonts.noResources": "Assets required for webfont %1 are not available in application %2, consider using @asset to include %3",
        "qx.tool.compiler.target.missingBootJs": "There is no reference to index.js script in the index.html copied from %1 (see https://git.io/fh7NI)",
        /* eslint-disable no-template-curly-in-string */
        "qx.tool.compiler.target.missingPreBootJs": "There is no reference to ${preBootJs} in the index.html copied from %1 (see https://git.io/fh7NI)",
        /* eslint-enable no-template-curly-in-string */
        "qx.tool.compiler.compiler.mixinQxObjectImpl": "%1: Mixins should not use `_createQxObjectImpl`, consider using top-level objects instead",
        "qx.tool.compiler.maker.appNotHeadless": "Compiling application '%1' but the target supports non-headless output, you may find unwanted dependencies are loaded during startup",
        // Fonts
        "qx.tool.compiler.webfonts.deprecated": "Manifest uses deprecated provides.webfonts, consider switching to provides.font",
        "qx.tool.compiler.fonts.unresolved": "Cannot find font with name %1"
      }, "warning");
    },
    statics: {
      __P_479_0: null,
      /**
       * Returns the singleton instance
       */
      getInstance: function getInstance() {
        if (!this.__P_479_0) {
          this.__P_479_0 = new qx.tool.compiler.Console();
        }
        return this.__P_479_0;
      },
      /**
       * Prints the message
       *
       * @param args {Object...} arguments
       */
      print: function print() {
        var _this$getInstance;
        return (_this$getInstance = this.getInstance()).print.apply(_this$getInstance, arguments);
      },
      /**
       * Decodes the message ID and arguments into a string to be presented in the output
       *
       * @param args {Object...} arguments
       * @return {String} complete message
       */
      decode: function decode() {
        var _this$getInstance2;
        return (_this$getInstance2 = this.getInstance()).decode.apply(_this$getInstance2, arguments);
      },
      /**
       * console.log equivalent, with colorization
       */
      log: function log() {
        var _this$getInstance3;
        return (_this$getInstance3 = this.getInstance()).log.apply(_this$getInstance3, arguments);
      },
      /**
       * console.debug equivalent, with colorization
       */
      debug: function debug() {
        var _this$getInstance4;
        return (_this$getInstance4 = this.getInstance()).debug.apply(_this$getInstance4, arguments);
      },
      /**
       * console.info equivalent, with colorization
       */
      info: function info() {
        var _this$getInstance5;
        return (_this$getInstance5 = this.getInstance()).info.apply(_this$getInstance5, arguments);
      },
      /**
       * console.warn equivalent, with colorization
       */
      warn: function warn() {
        var _this$getInstance6;
        return (_this$getInstance6 = this.getInstance()).warn.apply(_this$getInstance6, arguments);
      },
      /**
       * console.warn equivalent, with colorization, only operates if `verbose` is true
       */
      trace: function trace() {
        var _this$getInstance7;
        return (_this$getInstance7 = this.getInstance()).trace.apply(_this$getInstance7, arguments);
      },
      /**
       * console.error equivalent, with colorization
       */
      error: function error() {
        var _this$getInstance8;
        return (_this$getInstance8 = this.getInstance()).error.apply(_this$getInstance8, arguments);
      },
      /**
       * Message strings for markers, ie errors and warnings.  The strings are stored as statics
       * here, but that's because the CLI is currently assembled by hand and therefore does not
       * support translations.  When the CLI is itself compiled by `qx compile`, these strings
       * will move into translation files.
       */
      MESSAGE_IDS: {},
      /**
       * Adds message IDs; this is a method because it allows other components (eg qxoodoo-cli) to
       * use it
       *
       * @param obj {Object} map of id strings to message text
       * @param type {String?} the type of message, can be one of "message" (default) or "error", "warning"
       */
      addMessageIds: function addMessageIds(obj, type) {
        for (var id in obj) {
          this.MESSAGE_IDS[id] = {
            id: id,
            message: obj[id],
            type: type || "message"
          };
        }
      },
      /**
       * Decodes a marker into a String description
       * @param marker {Map} containing:
       *    msgId {String}
       *    start {Map} containing:
       *        line {Integer}
       *        column? {Integer}
       *    end? {Map} containing:
       *        line {Integer}
       *        column? {Integer}
       *    args? {Object[]}
       * @param showPosition {Boolean?} whether to include line/column info (default is true)
       * @return {String}
       */
      decodeMarker: function decodeMarker(marker, showPosition) {
        var msg = qx.tool.compiler.Console.MESSAGE_IDS[marker.msgId] || marker.msgId;
        var type = msg.type ? msg.type + ": " : "";
        var str = "";
        var pos = marker.pos;
        if (showPosition !== false && pos && pos.start && pos.start.line) {
          str += "[" + pos.start.line;
          if (pos.start.column) {
            str += "," + pos.start.column;
          }
          if (pos.end && pos.end.line && pos.end.line !== pos.start.line && pos.end.column !== pos.start.column) {
            str += " to " + pos.end.line;
            if (pos.end.column) {
              str += "," + pos.end.column;
            }
          }
          str += "] ";
        }
        try {
          str += type + qx.lang.String.format(msg.message, marker.args || []);
        } catch (e) {
          throw new Error("Unknown message id ".concat(marker.msgId, "."));
        }
        return str;
      }
    }
  });
  qx.tool.compiler.Console.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Console.js.map?dt=1722153840670