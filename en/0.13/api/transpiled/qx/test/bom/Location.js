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
      "qx.dom.Element": {},
      "qx.bom.element.Location": {},
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.bom.client.Browser": {
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
        "browser.quirksmode": {
          "className": "qx.bom.client.Browser"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */
  qx.Class.define("qx.test.bom.Location", {
    extend: qx.dev.unit.TestCase,
    members: {
      __P_310_0: null,
      __P_310_1: null,
      __P_310_2: null,
      __P_310_3: null,
      __P_310_4: null,
      __P_310_5: null,
      __P_310_6: null,
      __P_310_7: null,
      __P_310_8: null,
      setUp: function setUp() {
        this.__P_310_0 = qx.dom.Element.create("div", {
          id: "testRoot"
        });
        document.body.appendChild(this.__P_310_0);
        this.__P_310_1 = document.body.style;
        this.__P_310_2 = this.__P_310_1.marginTop;
        this.__P_310_3 = this.__P_310_1.marginLeft;
        this.__P_310_4 = this.__P_310_1.left;
        this.__P_310_5 = this.__P_310_1.top;
        this.__P_310_6 = this.__P_310_1.position;
        this.__P_310_7 = this.__P_310_1.border;
        this.__P_310_8 = this.__P_310_1.padding;

        // set up the defaults
        this.__P_310_1.marginLeft = "0px";
        this.__P_310_1.marginTop = "0px";
        this.__P_310_1.left = "0px";
        this.__P_310_1.top = "0px";
        this.__P_310_1.position = "static";
        this.__P_310_1.padding = "0px";
      },
      tearDown: function tearDown() {
        this.__P_310_1.marginTop = this.__P_310_2;
        this.__P_310_1.marginLeft = this.__P_310_3;
        this.__P_310_1.top = this.__P_310_5;
        this.__P_310_1.left = this.__P_310_4;
        this.__P_310_1.position = this.__P_310_6;
        this.__P_310_1.border = this.__P_310_7;
        this.__P_310_1.padding = this.__P_310_8;
        document.body.removeChild(this.__P_310_0);
        this.__P_310_0 = null;
      },
      testBodyLocationDefault: function testBodyLocationDefault() {
        // check the defaults
        var pos = qx.bom.element.Location.get(document.body);
        this.assertEquals(0, pos.left);
        this.assertEquals(0, pos.top);
      },
      testBodyLocationMargins: function testBodyLocationMargins() {
        // set the defaults
        this.__P_310_1.marginLeft = "10px";
        this.__P_310_1.marginTop = "20px";
        var pos = qx.bom.element.Location.get(document.body);
        this.assertEquals(10, pos.left);
        this.assertEquals(20, pos.top);
      },
      testBodyLocationBorder: function testBodyLocationBorder() {
        this.__P_310_1.border = "5px solid black";
        var pos = qx.bom.element.Location.get(document.body);
        this.assertEquals(0, pos.left);
        this.assertEquals(0, pos.top);
      },
      testBodyLocationPadding: function testBodyLocationPadding() {
        this.__P_310_1.padding = "5px";
        var pos = qx.bom.element.Location.get(document.body);
        this.assertEquals(0, pos.left);
        this.assertEquals(0, pos.top);
      },
      testBodyLocationMode: function testBodyLocationMode() {
        this.__P_310_1.marginLeft = "10px";
        this.__P_310_1.marginTop = "20px";
        this.__P_310_1.border = "5px solid black";
        this.__P_310_1.padding = "30px";
        var pos = qx.bom.element.Location.get(document.body, "margin");
        this.assertEquals(0, pos.left);
        this.assertEquals(0, pos.top);
        var pos = qx.bom.element.Location.get(document.body, "box");
        this.assertEquals(10, pos.left);
        this.assertEquals(20, pos.top);
        var pos = qx.bom.element.Location.get(document.body, "border");
        this.assertEquals(15, pos.left);
        this.assertEquals(25, pos.top);
        var pos = qx.bom.element.Location.get(document.body, "scroll");
        this.assertEquals(15, pos.left);
        this.assertEquals(25, pos.top);
        var pos = qx.bom.element.Location.get(document.body, "padding");
        this.assertEquals(45, pos.left);
        this.assertEquals(55, pos.top);
      },
      testDivStatic: function testDivStatic() {
        this.__P_310_0.innerHTML = "<div id=\"div1\" style=\" position: static; margin: 5px; border: 2px solid #000; padding: 3px; width: 200px; height: 200px;\"><div id=\"div2\" style=\"position: static; margin: 5px; border: 2px solid #000; padding: 3px; width: 150px; height: 150px;\"><div id=\"div3\" style=\"position: static; margin: 5px; border: 2px solid #000; padding: 3px; width: 100px; height: 100px;\"></div></div></div>";
        var div1 = document.getElementById("div1");
        var pos = qx.bom.element.Location.get(div1);
        this.assertEquals(5, pos.left, "left1");
        this.assertEquals(5, pos.top, "top1");
        var div2 = document.getElementById("div2");
        var pos = qx.bom.element.Location.get(div2);
        this.assertEquals(15, pos.left, "left2");
        this.assertEquals(15, pos.top, "top2");
        var div3 = document.getElementById("div3");
        var pos = qx.bom.element.Location.get(div3);
        this.assertEquals(25, pos.left, "left3");
        this.assertEquals(25, pos.top, "top3");
      },
      testDivRelative: function testDivRelative() {
        this.__P_310_0.innerHTML = "<div id=\"div1\" style=\"position: relative; top: 5px; left: 5px; margin: 5px; border: 2px solid #000; padding: 3px; width: 200px; height: 200px;\"><div id=\"div2\" style=\"position: relative; top: 5px; left: 5px; margin: 5px; border: 2px solid #000; padding: 3px; width: 150px; height: 150px;\"><div id=\"div3\" style=\"position: relative; top: -5px; left: -5px; margin: 5px; border: 2px solid #000; padding: 3px; width: 100px; height: 100px;\"></div></div></div>";
        var div1 = document.getElementById("div1");
        var pos = qx.bom.element.Location.get(div1);
        this.assertEquals(10, pos.left);
        this.assertEquals(10, pos.top);
        var div2 = document.getElementById("div2");
        var pos = qx.bom.element.Location.get(div2);
        this.assertEquals(25, pos.left, "left2");
        this.assertEquals(25, pos.top, "top2");
        var div3 = document.getElementById("div3");
        var pos = qx.bom.element.Location.get(div3);
        this.assertEquals(30, pos.left, "left3");
        this.assertEquals(30, pos.top, "top3");
      },
      testDivAbsolute: function testDivAbsolute() {
        this.__P_310_0.innerHTML = "<div id=\"div1\" style=\"position: absolute; top: 200px; left: 10px; margin: 5px; border: 2px solid #000; padding: 3px; width: 200px; height: 200px;\"><div id=\"div2\" style=\"position: absolute; top: -100px; left: -10px; margin: 5px; border: 2px solid #000; padding: 3px; width: 150px; height: 150px;\"><div id=\"div3\" style=\"position: absolute; top: 100px; left: 10px; margin: 5px; border: 2px solid #000; padding: 3px; width: 100px; height: 100px;\"></div></div></div>";
        var div1 = document.getElementById("div1");
        var pos = qx.bom.element.Location.get(div1);
        this.assertEquals(15, pos.left);
        this.assertEquals(205, pos.top);
        var div2 = document.getElementById("div2");
        var pos = qx.bom.element.Location.get(div2);
        this.assertEquals(12, pos.left);
        this.assertEquals(112, pos.top);
        var div3 = document.getElementById("div3");
        var pos = qx.bom.element.Location.get(div3);
        this.assertEquals(29, pos.left);
        this.assertEquals(219, pos.top);
      },
      testDivMixedPositions: function testDivMixedPositions() {
        this.__P_310_0.innerHTML = "<div id=\"absolute1\" style=\"position: absolute; top: 300px; left: 400px; margin: 5px; border: 2px solid #000; padding: 3px; width: 100px; height: 100px;\"> <div id=\"relative1\" style=\"position: relative; top: 50px; left: 50px; margin: 5px; border: 2px solid #000; padding: 3px; width: 300px; height: 300px;\">   <div id=\"static1\" style=\"overflow: hidden; position: static; margin: 5px; border: 2px solid #000; padding: 3px; width: 250px; height: 250px;\">     <div id=\"relative2\" style=\"overflow: auto; position: relative; top: 10px; left: 10px; margin: 5px; border: 2px solid #000; padding: 3px; width: 200px; height: 200px;\">       <div id=\"absolute2\" style=\"position: absolute; top: 30px; left: -90px; margin: 5px; border: 2px solid #000; padding: 3px; width: 200px; height: 200px;\">         <div id=\"static2\" style=\"position: static; margin: 10px; border: 2px solid #000; padding: 3px; width: 250px; height: 250px;\">         </div>       </div>     </div>   </div>  </div></div>";
        var absolute1 = document.getElementById("absolute1");
        var pos = qx.bom.element.Location.get(absolute1);
        this.assertEquals(405, pos.left);
        this.assertEquals(305, pos.top);
        var relative1 = document.getElementById("relative1");
        var pos = qx.bom.element.Location.get(relative1);
        this.assertEquals(465, pos.left);
        this.assertEquals(365, pos.top, "top2");
        var static1 = document.getElementById("static1");
        var pos = qx.bom.element.Location.get(static1);
        this.assertEquals(475, pos.left);
        this.assertEquals(375, pos.top, "top3");
        var relative2 = document.getElementById("relative2");
        var pos = qx.bom.element.Location.get(relative2);
        this.assertEquals(495, pos.left);
        this.assertEquals(395, pos.top, "top4");
        var absolute2 = document.getElementById("absolute2");
        var pos = qx.bom.element.Location.get(absolute2);
        this.assertEquals(412, pos.left);
        this.assertEquals(432, pos.top, "top4");
        var static2 = document.getElementById("static2");
        var pos = qx.bom.element.Location.get(static2);
        this.assertEquals(427, pos.left);
        this.assertEquals(447, pos.top, "top5");
      },
      testDivWithBodyMargin: function testDivWithBodyMargin() {
        this.__P_310_1.marginLeft = "10px";
        this.__P_310_1.marginTop = "20px";
        this.__P_310_0.innerHTML = '<div id="div">affe</div>';
        var div = document.getElementById("div");
        var pos = qx.bom.element.Location.get(div);
        this.assertEquals(10, pos.left);
        this.assertEquals(20, pos.top);
      },
      testDivWithBodyPadding: function testDivWithBodyPadding() {
        this.__P_310_1.padding = "10px";
        this.__P_310_0.innerHTML = '<div id="div"></div>';
        var div = document.getElementById("div");
        var pos = qx.bom.element.Location.get(div);
        this.assertEquals(10, pos.left);
        this.assertEquals(10, pos.top);
      },
      testDivWithBodyBorder: function testDivWithBodyBorder() {
        this.__P_310_1.border = "10px solid black";
        this.__P_310_0.innerHTML = '<div id="div">juhu</div>';
        var div = document.getElementById("div");
        var pos = qx.bom.element.Location.get(div);

        // IE quirks mode puts the border outside of the body
        if (qx.core.Environment.get("engine.name") == "mshtml" && qx.core.Environment.get("browser.quirksmode")) {
          this.assertEquals(0, pos.left);
          this.assertEquals(0, pos.top);
        } else {
          this.assertEquals(10, pos.left);
          this.assertEquals(10, pos.top);
        }
      },
      testDivLocationMode: function testDivLocationMode() {
        this.__P_310_0.innerHTML = '<div id="div" style="margin: 5px; padding: 10px; border: 3px solid green;"></div>';
        var div = document.getElementById("div");
        var pos = qx.bom.element.Location.get(div, "margin");
        this.assertEquals(0, pos.left);
        this.assertEquals(0, pos.top);
        var pos = qx.bom.element.Location.get(div, "box");
        this.assertEquals(5, pos.left);
        this.assertEquals(5, pos.top);
        var pos = qx.bom.element.Location.get(div, "border");
        this.assertEquals(8, pos.left);
        this.assertEquals(8, pos.top);
        var pos = qx.bom.element.Location.get(div, "scroll");
        this.assertEquals(8, pos.left);
        this.assertEquals(8, pos.top);
        var pos = qx.bom.element.Location.get(div, "padding");
        this.assertEquals(18, pos.left);
        this.assertEquals(18, pos.top);
      },
      testDivInline: function testDivInline() {
        this.__P_310_0.innerHTML = "<div style=\"width:100px\"><span id=\"span1\" style=\"margin-left: 10px\"><img src=\"about:blank\" width=\"10px\" height=\"10px\" style=\"border: 0px\"></img></span><span id=\"span2\" style=\"margin-left: 10px\">a</span></div>";
        var span1 = document.getElementById("span1");
        var pos = qx.bom.element.Location.get(span1);
        this.assertEquals(10, pos.left);
        var span2 = document.getElementById("span2");
        var pos = qx.bom.element.Location.get(span2);
        this.assertEquals(30, pos.left);
      },
      testDivFixed: function testDivFixed() {
        this.__P_310_0.innerHTML = "<div style=\"position: absolute; left: 0px; top: 0px; width: 20px; height: 2000px;\"></div><div id=\"test\" style=\"position: fixed; width: 300px; height: 600px; top: 50px;\"></div>";
        window.scrollTo(0, 100);
        var pos = qx.bom.element.Location.get(document.getElementById("test"));
        this.assertEquals(150, pos.top);
      }
    }
  });
  qx.test.bom.Location.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Location.js.map?dt=1729101237085