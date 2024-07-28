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
      "qx.dom.Element": {},
      "qx.log.appender.RingBuffer": {},
      "qx.log.Logger": {},
      "qx.event.Registration": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Gabriel Munteanu (gabios)
  
  ************************************************************************ */

  qx.Class.define("qx.test.event.dispatch.MouseEventOnDocument", {
    extend: qx.dev.unit.TestCase,
    members: {
      setUp: function setUp() {
        this.root = qx.dom.Element.create("div", {
          id: "root"
        });
        document.body.appendChild(this.root);
        this.ringAppender = new qx.log.appender.RingBuffer();
        qx.log.Logger.register(this.ringAppender);
      },
      tearDown: function tearDown() {
        qx.log.Logger.unregister(this.ringAppender);
        qx.log.Logger.clear();
        this.ringAppender = null;
        var Reg = qx.event.Registration;
        Reg.removeAllListeners(document);
        Reg.removeAllListeners(window);
        Reg.removeAllListeners(this.root);
        document.body.removeChild(document.getElementById("root"));
      },
      testMouseEventsOnDocument: function testMouseEventsOnDocument() {
        this.doWork(document);
      },
      testMouseEventsOnWindow: function testMouseEventsOnWindow() {
        this.doWork(window);
      },
      testMouseEventsOnDomNode: function testMouseEventsOnDomNode() {
        this.doWork(this.root);
      },
      doWork: function doWork(el) {}
    }
  });
  qx.test.event.dispatch.MouseEventOnDocument.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MouseEventOnDocument.js.map?dt=1722151832333