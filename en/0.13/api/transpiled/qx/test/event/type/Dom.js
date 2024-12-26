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
      "qx.event.type.Dom": {},
      "qx.lang.Object": {}
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  qx.Class.define("qx.test.event.type.Dom", {
    extend: qx.dev.unit.TestCase,
    members: {
      testClone: function testClone() {
        var domEvent = {
          shiftKey: true,
          ctrlKey: true,
          altKey: true,
          metaKey: true
        };
        var event = new qx.event.type.Dom().init(domEvent, document.body, document.body, true, true);
        var reference = {
          shift: event.isShiftPressed(),
          ctrl: event.isCtrlPressed(),
          alt: event.isAltPressed(),
          meta: event.isMetaPressed()
        };
        var clone = event.clone();

        // simulate native event disposal
        qx.lang.Object.empty(domEvent);
        this.assertEquals(reference.shift, clone.isShiftPressed());
        this.assertEquals(reference.ctrl, clone.isCtrlPressed());
        this.assertEquals(reference.alt, clone.isAltPressed());
        this.assertEquals(reference.meta, clone.isMetaPressed());
        event.dispose();
        clone.dispose();
      }
    }
  });
  qx.test.event.type.Dom.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Dom.js.map?dt=1735222428155