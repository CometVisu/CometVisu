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
      },
      "qx.Promise": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /**
   * This is used to add an test case for qx test
   */
  qx.Class.define("qx.tool.cli.api.Test", {
    extend: qx.core.Object,
    construct: function construct(name, testFunction) {
      qx.core.Object.constructor.call(this);
      this.setName(name);
      if (testFunction) {
        this.setTestFunction(testFunction);
      }
    },
    properties: {
      /**
       * Name of the process
       */
      name: {
        check: "String"
      },
      /**
       * A description of the test.
       * For documentation purpose
       */
      description: {
        check: "String",
        event: "changeDescription"
      },
      /**
       * The exit code of the test.
       *
       */
      exitCode: {
        check: "Number",
        event: "changeExitCode",
        nullable: true,
        init: null
      },
      /**
       * Is the webserver instance needed for this test?
       */
      needsServer: {
        check: "Boolean",
        nullable: false,
        init: true
      },
      /**
       * The test function called by qx test
       *
       */
      testFunction: {
        check: "Function",
        nullable: false,
        init: function init() {}
      }
    },
    members: {
      /**
       * Execute the test
       *
       * @returns: Promise
       *
       * Can be overriden
       */
      execute: function execute() {
        var f = this.getTestFunction();
        return qx.Promise.resolve(f.call(this, this));
      }
    }
  });
  qx.tool.cli.api.Test.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Test.js.map?dt=1722151841767