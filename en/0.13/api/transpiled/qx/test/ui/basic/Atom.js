(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.ui.LayoutTestCase": {
        "require": true
      },
      "qx.dev.unit.MMock": {
        "require": true
      },
      "qx.ui.basic.Atom": {
        "construct": true
      },
      "qx.ui.layout.Grid": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2016- Oetiker+Partner AG, Switzerland, http://www.oetiker.ch
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
     * Fritz Zaucker (fritz.zaucker@oetiker.ch)
  
  ************************************************************************ */

  qx.Class.define("qx.test.ui.basic.Atom", {
    extend: qx.test.ui.LayoutTestCase,
    include: [qx.dev.unit.MMock],
    members: {
      tearDown: function tearDown() {
        this.getSandbox().restore();
      },
      testSelectableSetOnCreation: function testSelectableSetOnCreation() {
        var a = new qx.ui.basic.Atom("test").set({
          selectable: true
        });
        this.getRoot().add(a);
        this.flush();
        var l = a.getChildControl("label");
        this.assertEquals("on", l.getContentElement().getDomElement().getAttribute("qxselectable"));
        a.destroy();
      },
      testSelectableUnSetOnCreation: function testSelectableUnSetOnCreation() {
        var a = new qx.ui.basic.Atom("test").set({
          selectable: false
        });
        this.getRoot().add(a);
        this.flush();
        var l = a.getChildControl("label");
        this.assertEquals("off", l.getContentElement().getDomElement().getAttribute("qxselectable"));
        a.destroy();
      },
      testSelectableSet: function testSelectableSet() {
        var a = new qx.ui.basic.Atom("test");
        a.setSelectable(true);
        this.getRoot().add(a);
        this.flush();
        var l = a.getChildControl("label");
        this.assertEquals("on", l.getContentElement().getDomElement().getAttribute("qxselectable"));
        a.destroy();
      },
      testSelectableUnset: function testSelectableUnset() {
        var a = new qx.ui.basic.Atom("test");
        a.setSelectable(false);
        this.getRoot().add(a);
        this.flush();
        var l = a.getChildControl("label");
        this.assertEquals("off", l.getContentElement().getDomElement().getAttribute("qxselectable"));
        a.destroy();
      },
      testLayoutOptionalProperties: function testLayoutOptionalProperties() {
        var atomLayout;
        var hasAtomLayout = new (qx.Class.define(null, {
          extend: qx.ui.basic.Atom,
          construct: function construct() {
            qx.ui.basic.Atom.constructor.call(this, "test");
            atomLayout = this._getLayout();
          }
        }))();
        hasAtomLayout.setGap(10);
        hasAtomLayout.setIconPosition("right");
        hasAtomLayout.setCenter(true);
        this.assertEquals(10, atomLayout.getGap());
        this.assertEquals("right", atomLayout.getIconPosition());
        this.assertEquals(true, atomLayout.getCenter());
        var hasGridLayout = new (qx.Class.define(null, {
          extend: qx.ui.basic.Atom,
          construct: function construct() {
            qx.ui.basic.Atom.constructor.call(this, "test");
            this._getLayout().dispose();
            this._setLayout(new qx.ui.layout.Grid());
          }
        }))();

        // expect these to not throw an error (should log in debug env)
        hasGridLayout.setGap(10);
        hasGridLayout.setIconPosition("right");
        hasGridLayout.setCenter(true);
        // the values will be set to the Atom, they will not be set (or attempt to be set) on the layout of the Atom
        this.assertEquals(10, hasGridLayout.getGap());
        this.assertEquals("right", hasGridLayout.getIconPosition());
        this.assertEquals(true, hasGridLayout.getCenter());
      }
    }
  });
  qx.test.ui.basic.Atom.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Atom.js.map?dt=1726089057432