(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.bom.Iframe": {},
      "qx.lang.Object": {},
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.bom.element.Attribute": {},
      "qx.dom.Element": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  qx.Class.define("qx.test.bom.Iframe", {
    extend: qx.dev.unit.TestCase,
    members: {
      __P_308_0: null,
      tearDown: function tearDown() {
        this.__P_308_0 = null;
      },
      testCreate: function testCreate() {
        this.__P_308_0 = qx.bom.Iframe.create();
        this.__P_308_1(qx.bom.Iframe.DEFAULT_ATTRIBUTES);
      },
      testCreateWithAttributes: function testCreateWithAttributes() {
        var attributes = qx.lang.Object.clone(qx.bom.Iframe.DEFAULT_ATTRIBUTES);
        attributes.allowTransparency = false;
        this.__P_308_0 = qx.bom.Iframe.create(attributes);
        this.__P_308_1(attributes);
      },
      __P_308_1: function __P_308_1(attributes) {
        // do not test 'onload' on IE, this returns always 'undefined'
        // http://tobielangel.com/2007/1/11/attribute-nightmare-in-ie/
        if (qx.core.Environment.get("engine.name") == "mshtml") {
          delete attributes["onload"];
        }
        for (var key in attributes) {
          this.assertEquals(attributes[key], qx.bom.element.Attribute.get(this.__P_308_0, key), "Wrong value on attribute '" + key + "'");
        }
      },
      testGetWindow: function testGetWindow() {
        this.__P_308_0 = qx.bom.Iframe.create();
        qx.dom.Element.insertBegin(this.__P_308_0, document.body);
        this.assertNotNull(qx.bom.Iframe.getWindow(this.__P_308_0));
        qx.dom.Element.remove(this.__P_308_0);
      }
    }
  });
  qx.test.bom.Iframe.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Iframe.js.map?dt=1726089050623