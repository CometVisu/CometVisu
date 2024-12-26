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
      "qx.bom.element.Class": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2010 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  qx.Class.define("qx.test.bom.element.Class", {
    extend: qx.dev.unit.TestCase,
    members: {
      setUp: function setUp() {
        var div = document.createElement("div");
        div.id = "el";
        this._el = div;
        document.body.appendChild(div);
      },
      tearDown: function tearDown() {
        document.body.removeChild(this._el);
        this._el = null;
      },
      "test: get should return the className for svg element": function test_get_should_return_the_className_for_svg_element() {
        if (document.createElementNS) {
          var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          svg.setAttribute("id", "svgEl");
          svg.setAttribute("class", "svgclassname");
          document.body.appendChild(svg);
          var Class = qx.bom.element.Class;
          this.assertEquals("svgclassname", Class.get(svg));
          document.body.removeChild(svg);
        }
      },
      "test: get on new element should return empty string": function test_get_on_new_element_should_return_empty_string() {
        var Class = qx.bom.element.Class;
        this.assertEquals("", Class.get(this._el));
      },
      "test: get should return the className": function test_get_should_return_the_className() {
        var Class = qx.bom.element.Class;
        this._el.className = "juhu kinners";
        this.assertEquals("juhu kinners", Class.get(this._el));
      },
      "test: add() on new element should set the class name": function test_add_on_new_element_should_set_the_class_name() {
        var Class = qx.bom.element.Class;
        this.assertEquals("juhu", Class.add(this._el, "juhu"));
        this.assertEquals("juhu", Class.get(this._el));
      },
      "test: add() on element with class should not set it again": function test_add_on_element_with_class_should_not_set_it_again() {
        var Class = qx.bom.element.Class;
        Class.add(this._el, "juhu");
        Class.add(this._el, "juhu");
        this.assertEquals("juhu", Class.get(this._el));
      },
      "test: addClasses() on new element should set multiple classes": function test_addClasses_on_new_element_should_set_multiple_classes() {
        var Class = qx.bom.element.Class;
        this.assertEquals("juhu kinners", Class.addClasses(this._el, ["juhu", "kinners"]));
        this.assertEquals("juhu kinners", Class.get(this._el));
      },
      "test: addClasses() should ignore class names, which are already set": function test_addClasses_should_ignore_class_names_which_are_already_set() {
        var Class = qx.bom.element.Class;
        Class.addClasses(this._el, ["juhu", "kinners"]);
        Class.addClasses(this._el, ["juhu"]);
        Class.addClasses(this._el, ["kinners"]);
        this.assertEquals("juhu kinners", Class.get(this._el));
      },
      "test: has()": function test_has() {
        var Class = qx.bom.element.Class;
        this.assertFalse(Class.has(this._el, "juhu"));
        Class.addClasses(this._el, ["juhu", "kinners"]);
        this.assertTrue(Class.has(this._el, "juhu"));
        this.assertTrue(Class.has(this._el, "kinners"));
        this.assertFalse(Class.has(this._el, "foo"));
      },
      "test: remove() non existing class should be ignored": function test_remove_non_existing_class_should_be_ignored() {
        var Class = qx.bom.element.Class;
        this.assertEquals("", Class.get(this._el));
        this.assertEquals("juhu", Class.remove(this._el, "juhu"));
        this.assertEquals("", Class.get(this._el));
      },
      "test: remove() existing classes": function test_remove_existing_classes() {
        var Class = qx.bom.element.Class;
        Class.addClasses(this._el, ["juhu", "kinners"]);
        this.assertEquals("juhu", Class.remove(this._el, "juhu"));
        this.assertMatch(Class.get(this._el), /\s*kinners\s*/);
        this.assertEquals("kinners", Class.remove(this._el, "kinners"));
        this.assertEquals("", Class.get(this._el));
      },
      "test: removeClasses() to remove several classes at once": function test_removeClasses_to_remove_several_classes_at_once() {
        var Class = qx.bom.element.Class;
        Class.addClasses(this._el, ["a", "juhu", "b", "kinners", "c"]);
        this.assertEquals("a b c", Class.removeClasses(this._el, ["kinners", "juhu"]));
        this.assertEquals("a b c", Class.get(this._el));
      },
      "test: replace()": function test_replace() {
        var Class = qx.bom.element.Class;
        Class.addClasses(this._el, ["juhu", "kinners"]);
        this.assertEquals("foo", Class.replace(this._el, "juhu", "foo"));
        this.assertFalse(Class.has(this._el, "juhu"));
        this.assertTrue(Class.has(this._el, "foo"));
        this.assertTrue(Class.has(this._el, "kinners"));
        this.assertEquals("bar", Class.replace(this._el, "kinners", "bar"));
        this.assertFalse(Class.has(this._el, "juhu"));
        this.assertFalse(Class.has(this._el, "kinners"));
        this.assertTrue(Class.has(this._el, "foo"));
        this.assertTrue(Class.has(this._el, "bar"));
        this.assertEquals("", Class.replace(this._el, "i-dont-exist", "baz"));
        this.assertFalse(Class.has(this._el, "juhu"));
        this.assertFalse(Class.has(this._el, "kinners"));
        this.assertTrue(Class.has(this._el, "foo"));
        this.assertTrue(Class.has(this._el, "bar"));
        this.assertFalse(Class.has(this._el, "baz"));
      },
      "test: toggle() non existing class should add it": function test_toggle_non_existing_class_should_add_it() {
        var Class = qx.bom.element.Class;
        this.assertEquals("juhu", Class.toggle(this._el, "juhu"));
        this.assertEquals("juhu", Class.get(this._el));
      },
      "test: toggle() existing class name should remove it": function test_toggle_existing_class_name_should_remove_it() {
        var Class = qx.bom.element.Class;
        Class.addClasses(this._el, ["juhu", "kinners"]);
        this.assertEquals("juhu", Class.toggle(this._el, "juhu"));
        this.assertMatch(Class.get(this._el), /\s*kinners\s*/);
      }
    }
  });
  qx.test.bom.element.Class.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Class.js.map?dt=1735222425778