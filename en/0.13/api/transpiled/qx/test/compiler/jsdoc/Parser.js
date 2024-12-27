(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.tool.compiler.jsdoc.Parser": {},
      "qx.lang.Object": {},
      "qx.tool.compiler.jsdoc.ParamParser": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
     * Henner Kollmann 
  
  ************************************************************************ */
  /**
   * test the parser
   */
  qx.Class.define("qx.test.compiler.jsdoc.Parser", {
    extend: qx.dev.unit.TestCase,
    members: {
      testCheckConstructor: function testCheckConstructor() {
        var text = "\n         /*\n         *************\n         constructor\n         *************\n         */\n      ";
        var test = qx.tool.compiler.jsdoc.Parser.parseComment(text);
        this.assert(qx.lang.Object.equals(test, {}));
      },
      testCheckParams: function testCheckParams() {
        var text = "*\n         @param {String} json jsdoc style\n         @param json {String}   qooxdoo style\n    ";
        var test = qx.tool.compiler.jsdoc.Parser.parseComment(text);
        qx.tool.compiler.jsdoc.Parser.parseJsDoc(test, {
          resolveType: function resolveType(type) {
            return type;
          }
        });
        console.log(test["@description"][0].body);
        this.assert(test["@description"][0].body === "");
        this.assert(test["@param"].length === 2);
      },
      testCheckIssue633: function testCheckIssue633() {
        {
          var text = "*\n        // [Constructor]\n        ";
          var test = qx.tool.compiler.jsdoc.Parser.parseComment(text);
          console.log(test["@description"][0].body);
          this.assert(test["@description"][0].body === "");
        }
        {
          var _text = "\n         *\n         * Create an editor instance\n         * \n         * [Constructor]\n         * \n         * @return {Object}\n         *\n        ";
          test = qx.tool.compiler.jsdoc.Parser.parseComment(_text);
          console.log(test["@description"][0].body);
          this.assert(test["@description"][0].body !== "");
        }
      },
      testCheckRpc: function testCheckRpc() {
        var text = "\n       * <p>This namespace provides an API implementing the\n       * <a href=\"https://www.jsonrpc.org/specification\">JSON Remote Procedure Call (JSON-RPC) version 2 specification</a>\n       * </p>\n       * <p>JSON-RPC v2 is transport-agnostic. We provide a high-level\n       * API interface (qx.io.jsonrpc.Client), a transport interface\n       * (qx.io.jsonrpc.transport.ITransport) and an HTTP transport implementation.\n       * Other transports based on websockets or other mechanisms can be added later.\n       * </p>\n       * Here is an example:\n       *\n       * <pre class=\"javascript\">\n       * (async()=>{\n       *   const client = new qx.io.jsonrpc.Client(\"https://domain.com/endpoint\");\n       *   let result;\n       *   try {\n       *     client.sendNotification(\"other_method\", [1,2,3]); // notifications are \"fire & forget\"\n       *     result = await client.sendRequest(\"other_method\", [1,2,3]);\n       *   } catch(e) {\n       *     // handle exceptions\n       *   }\n       * })();\n       * </pre>\n       *\n       * or using a batch:\n       *\n       * <pre class=\"javascript\">\n       * (async()=>{\n       *   const client = new qx.io.jsonrpc.Client(\"https://domain.com/endpoint\");\n       *   const batch = new qx.io.jsonrpc.protocol.Batch()\n       *     .add(new qx.io.jsonrpc.protocol.Request(\"method3\", [1,2,3]))\n       *     .addNotification(\"method4\") // or shorthand method\n       *    .addRequest(\"method5\",[\"foo\", \"bar\"]) // positional parameters\n       *     .addRequest(\"method6\", {foo:\"bar\"}); // named parameters\n       *   let results;\n       *   try {\n       *     results = await client.sendBatch(batch);\n       *     // results will be an array with three items, the result of the requests\n       *   } catch(e) {\n       *     // handle exceptions\n       *   }\n       * })();\n       * </pre>\n       *\n       * The high-level Client API does not handle transport-specific issues like\n       * authentication - this needs to be done in the transport layer. For example,\n       * to use HTTP Bearer authentication, do this:\n       * <pre class=\"javascript\">\n       * const client = new qx.io.jsonrpc.Client(\"https://domain.com/endpoint\");\n       * const auth = new qx.io.request.authentication.Bearer(\"TOKEN\");\n       * client.getTransportImpl().setAuthentication(auth);\n       * client.sendRequest(\"method-needing-authentication\", [1,2,3]);\n       * </pre>\n       *\n       * If you need a client with a customized transport often, we recommend\n       * to create a class that inherits from the client class, override\n       * the methods which are needed to produce that custom behavior (such\n       * as {@link qx.io.jsonrpc.transport.Http#_createTransportImpl},\n       * and provide a <pre class=\"javascript\">defer</pre> section which registers\n       * the behavior for your particular class of URIs:\n       *\n       * <pre class=\"javascript\">\n       * defer() {\n       *   qx.io.jsonrpc.Client.registerTransport(/^http/, my.custom.Transport);\n       * }\n       * </pre>\n       *\n       * The client will always use the transport that was last registered for\n       * a certain endpoint pattern, i.e. from then on, all clients created\n       * with urls that start with \"http\" will use that custom behavior.\n       *\n       */\n      ";
        var test = qx.tool.compiler.jsdoc.Parser.parseComment(text);
        console.log(test["@description"][0].body);
        this.assert(test["@description"][0].body !== "");
      },
      testCheckInlineMarkdown: function testCheckInlineMarkdown() {
        var text = "\n    * *strong*\n    * __emphasis__\n    * {@link Resource}     -> link?\n    * @ignore(qx.*)\n    ";
        var test = qx.tool.compiler.jsdoc.Parser.parseComment(text);
        console.log(test["@description"][0].body);
        this.assert(test["@description"][0].body !== "");
        this.assert(test["@description"][0].body.includes("<strong>"));
        this.assert(test["@description"][0].body.includes("<em>"));
        this.assert(test["@ignore"].length === 1);
      },
      testHiResSyntax: function testHiResSyntax() {
        var data = qx.tool.compiler.jsdoc.Parser.parseComment(" *\n * @asset(qx/test/webfonts/fontawesome-webfont.*)\n * @asset(qx/icon/Tango/48/places/folder.png)\n * @asset(qx/icon/Tango/32/places/folder.png)\n * @asset(qx/static/blank.gif)\n * @asset(qx/static/drawer.png)\n * @asset(qx/static/drawer@2x.png)");
        this.assert(Boolean(data["@asset"] && data["@asset"].length == 6));
      },
      testIgnore: function testIgnore() {
        var text = "*\n     @ignore(process.*)\n     @ignore(global.*)\n     @ignore(Symbol.*)\n     @ignore(chrome.*)\n     \n    */ \n    ";
        var test = qx.tool.compiler.jsdoc.Parser.parseComment(text);
        console.log(test["@description"][0].body);
        this.assert(test["@description"][0].body === "");
        this.assert(test["@ignore"].length === 4);
      },
      testCheckMarkdown: function testCheckMarkdown() {
        var text = "\n    *\n    * The `qx.bom.rest` package consists of only one class: {@link Resource}.\n    *\n    * {@link Resource} allows to encapsulate the specifics of a REST interface.\n    * Rather than requesting URLs with a specific HTTP method manually, a resource\n    * representing the remote resource is instantiated and actions are invoked on this resource.\n    * A resource with its actions can be configured declaratively or programmatically.\n    *\n    * There is also {@link qx.io.rest.Resource} which uses {@link Resource} under the hood.\n    * The main differences between them are:\n    *\n    * * The event object available in the listeners (e.g. `success()`, `getSuccess()` and `getError()`) is\n    *   a native JavaScript object instead of a qooxdoo object ({@link qx.event.type.Rest}):\n    * ** See {@link qx.io.rest.Resource} vs. {@link Resource}\n    * ** `event.getId()` => `event.id`\n    * ** `event.getRequest()` => `event.request`\n    * ** `event.getAction()` => `event.action`\n    * ** `event.getData()` => `event.response`\n    * ** `event.getPhase()` => @---@ (see below)\n    * * Methods which allow request manipulation (e.g. `configureRequest()`) will operate on an\n    *   instance of {@link qx.bom.request.SimpleXhr} instead of {@link qx.io.request.Xhr}\n    *   (their API is similar but not identical)\n    * * The method `poll()` returns no {@link qx.event.Timer} object. There are two new methods\n    *   (`stopPollByAction()` and `restartPollByAction()`) available at {@link Resource}\n    *   which replace the functionality provided by the Timer object.\n    * * The phase support, which is a more elaborate version of readyState, is not available.\n    *   So use readyState instead.\n    * ** Phases (available only in {@link qx.io.rest.Resource}):\n    * *** `unsent`, `opened`, `sent`, `loading`, `load`, `success`\n    * *** `abort`, `timeout`, `statusError`\n    * ** readyState (available in {@link Resource} and {@link qx.io.rest.Resource}):\n    * *** `UNSENT`\n    * *** `OPENED`\n    * *** `HEADERS_RECEIVED`\n    * *** `LOADING`\n    * *** `DONE`  \n        ";
        var test = qx.tool.compiler.jsdoc.Parser.parseComment(text);
        console.log(test["@description"][0].body);
        this.assert(test["@description"][0].body !== "");
        this.assert(test["@description"][0].body.includes("<code>"));
        this.assert(test["@description"][0].body.includes("<ul>"));
        this.assert(test["@description"][0].body.includes("<li>"));
      },
      testCheckInlineCode: function testCheckInlineCode() {
        var text = "\n      * // Start a 5-second recurrent timer.\n      * @require(qx.event.type.Pointer) TEST // load-time dependency for early native events\n      ";
        var test = qx.tool.compiler.jsdoc.Parser.parseComment(text);
        console.log(test["@description"][0].body);
        this.assert(test["@description"][0].body === "");
        console.log(test["@require"][0].body);
        this.assert(test["@require"][0].body !== "");
        console.log(test["@require"][0].docComment);
        this.assert(test["@require"][0].docComment !== "");
      },
      testChecksJsdocParamParser: function testChecksJsdocParamParser() {
        var parser = new qx.tool.compiler.jsdoc.ParamParser();
        var pdoc = {
          name: "@param",
          body: "value {Boolean}, the new value of the widget"
        };
        parser.parseCommand(pdoc, {
          resolveType: function resolveType(type) {
            return type;
          }
        });
        delete pdoc.name;
        delete pdoc.body;
        this.assert(qx.lang.Object.equals(pdoc, {
          paramName: "value",
          type: "Boolean",
          description: ", the new value of the widget"
        }));
        pdoc = {
          name: "@param",
          body: "cellInfo {Map}\nInformation about the cell being renderered, including:\n<ul>\n<li>state</li>\n<li>rowDiv</li>\n<li>stylesheet</li>\n<li>element</li>\n<li>dataIndex</li>\n<li>cellData</li>\n<li>height</li>\n</ul>"
        };
        parser.parseCommand(pdoc, {
          resolveType: function resolveType(type) {
            return type;
          }
        });
        delete pdoc.name;
        delete pdoc.body;
        this.assert(qx.lang.Object.equals(pdoc, {
          paramName: "cellInfo",
          type: "Map",
          description: "\nInformation about the cell being renderered, including:\n<ul>\n<li>state</li>\n<li>rowDiv</li>\n<li>stylesheet</li>\n<li>element</li>\n<li>dataIndex</li>\n<li>cellData</li>\n<li>height</li>\n</ul>"
        }));
      },
      testChecksJsdocInlineCommentsAndUrls: function testChecksJsdocInlineCommentsAndUrls() {
        var result;
        result = qx.tool.compiler.jsdoc.Parser.parseComment("\n         * @ignore(abc,\n         *    def,\n         *    ghi)\n        ");
        this.assert(qx.lang.Object.equals(result, {
          "@description": [{
            name: "@description",
            body: ""
          }],
          "@ignore": [{
            name: "@ignore",
            body: "abc,\n    def,\n    ghi"
          }]
        }));
        result = qx.tool.compiler.jsdoc.Parser.parseComment("\n         * @ignore(abc, // abc comment\n         *    def, // def comment\n         *    ghi)\n        ");
        this.assert(qx.lang.Object.equals(result, {
          "@description": [{
            name: "@description",
            body: ""
          }],
          "@ignore": [{
            name: "@ignore",
            body: "abc,\n    def,\n    ghi"
          }]
        }));
        result = qx.tool.compiler.jsdoc.Parser.parseComment("\n         * @ignore(stuff) // comment about ignore stuff\n         * http://abc.com // comment about url\n         * http://dev.com \n         * \n         ");
        this.assert(qx.lang.Object.equals(result, {
          "@description": [{
            name: "@description",
            body: ""
          }],
          "@ignore": [{
            name: "@ignore",
            body: "stuff"
          }]
        }));
      }
    }
  });
  qx.test.compiler.jsdoc.Parser.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Parser.js.map?dt=1735341775997