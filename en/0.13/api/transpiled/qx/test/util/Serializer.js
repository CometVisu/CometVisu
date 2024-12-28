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
      "qx.util.Serializer": {
        "construct": true
      },
      "qx.core.Object": {},
      "qx.ui.form.ListItem": {},
      "qx.data.Array": {},
      "qx.ui.core.Widget": {},
      "qx.data.IListData": {},
      "qx.data.MBinding": {},
      "qx.data.marshal.Json": {},
      "qx.lang.Json": {},
      "qx.util.format.DateFormat": {},
      "qx.locale.Manager": {}
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
  
  ************************************************************************ */

  /**
   * @ignore(qx.test.SerializerModel)
   * @ignore(qx.test.SerializerModelEnc)
   */

  qx.Class.define("qx.test.util.Serializer", {
    extend: qx.dev.unit.TestCase,
    construct: function construct() {
      this.__P_454_0 = qx.util.Serializer;
      qx.Class.define("qx.test.SerializerModel", {
        extend: qx.core.Object,
        properties: {
          data1: {
            nullable: true
          },
          data2: {
            nullable: true
          },
          data3: {
            nullable: true
          }
        }
      });
    },
    members: {
      __P_454_1: null,
      __P_454_0: null,
      setUp: function setUp() {
        this.__P_454_1 = new qx.test.SerializerModel();
      },
      tearDown: function tearDown() {
        this.__P_454_1.dispose();
      },
      testUrlString: function testUrlString() {
        this.__P_454_1.setData1("a");
        this.__P_454_1.setData2("b");
        this.__P_454_1.setData3("c");
        this.assertEquals("data1=a&data2=b&data3=c", this.__P_454_0.toUriParameter(this.__P_454_1));
        this.__P_454_1.setData1("A");
        this.__P_454_1.setData2("B");
        this.__P_454_1.setData3("C");
        this.assertEquals("data1=A&data2=B&data3=C", this.__P_454_0.toUriParameter(this.__P_454_1));
        this.__P_454_1.setData1("1");
        this.__P_454_1.setData2("11");
        this.__P_454_1.setData3("111");
        this.assertEquals("data1=1&data2=11&data3=111", this.__P_454_0.toUriParameter(this.__P_454_1));
      },
      testUrlStringEncoded: function testUrlStringEncoded() {
        this.__P_454_1.setData1("ä");
        this.__P_454_1.setData2("ö");
        this.__P_454_1.setData3("ü");
        this.assertEquals("data1=%C3%A4&data2=%C3%B6&data3=%C3%BC", this.__P_454_0.toUriParameter(this.__P_454_1));
        this.__P_454_1.setData1("–");
        this.__P_454_1.setData2(" ");
        this.__P_454_1.setData3("ß");
        this.assertEquals("data1=%E2%80%93&data2=%20&data3=%C3%9F", this.__P_454_0.toUriParameter(this.__P_454_1));
      },
      testUrlBoolean: function testUrlBoolean() {
        this.__P_454_1.setData1(true);
        this.__P_454_1.setData2(false);
        this.__P_454_1.setData3(null);
        this.assertEquals("data1=true&data2=false&data3=null", this.__P_454_0.toUriParameter(this.__P_454_1));
      },
      testUrlNumber: function testUrlNumber() {
        this.__P_454_1.setData1(10);
        this.__P_454_1.setData2(-15.3443);
        this.__P_454_1.setData3(Number.NaN);
        this.assertEquals("data1=10&data2=-15.3443&data3=NaN", this.__P_454_0.toUriParameter(this.__P_454_1));
      },
      testUrlKeyEncoded: function testUrlKeyEncoded() {
        qx.Class.define("qx.test.SerializerModelEnc", {
          extend: qx.core.Object,
          properties: {
            äüö: {
              init: "ÄÜÖ"
            }
          }
        });
        var model = new qx.test.SerializerModelEnc();
        this.assertEquals("%C3%A4%C3%BC%C3%B6=%C3%84%C3%9C%C3%96", this.__P_454_0.toUriParameter(model));
        model.dispose();
      },
      testUrlQxSerializer: function testUrlQxSerializer() {
        var qxSerializer = function qxSerializer(object) {
          return object.getLabel();
        };
        var item = new qx.ui.form.ListItem("a");
        this.__P_454_1.setData1(item);
        this.__P_454_1.setData2("b");
        this.__P_454_1.setData3("c");
        this.assertEquals("data1=a&data2=b&data3=c", this.__P_454_0.toUriParameter(this.__P_454_1, qxSerializer));
        item.dispose();
      },
      testUrlDataArray: function testUrlDataArray() {
        var a1 = new qx.data.Array(["a"]);
        var a2 = new qx.data.Array(["a", "b"]);
        var a3 = new qx.data.Array(["a", "b", "c"]);
        this.__P_454_1.setData1(a1);
        this.__P_454_1.setData2(a2);
        this.__P_454_1.setData3(a3);
        this.assertEquals("data1=a&data2=a&data2=b&data3=a&data3=b&data3=c", this.__P_454_0.toUriParameter(this.__P_454_1));

        // get rid of the objects
        a1.dispose();
        a2.dispose();
        a3.dispose();
      },
      testUrlDataArrayNative: function testUrlDataArrayNative() {
        var a1 = ["a"];
        var a2 = ["a", "b"];
        var a3 = ["a", "b", "c"];
        this.__P_454_1.setData1(a1);
        this.__P_454_1.setData2(a2);
        this.__P_454_1.setData3(a3);
        this.assertEquals("data1=a&data2=a&data2=b&data3=a&data3=b&data3=c", this.__P_454_0.toUriParameter(this.__P_454_1));
      },
      testUrlInherited: function testUrlInherited() {
        var model = new qx.ui.core.Widget();
        var data = this.__P_454_0.toUriParameter(model);
        // property included in widget
        this.assertTrue(data.indexOf("appearance") != -1);
        // property included in LayoutItem (Superclass)
        this.assertTrue(data.indexOf("alignY") != -1);
        model.dispose();
      },
      testUrlQxClass: function testUrlQxClass() {
        this.__P_454_1.setData1(qx.core.Object);
        this.__P_454_1.setData2(qx.data.IListData);
        this.__P_454_1.setData3(qx.data.MBinding);
        this.assertEquals("data1=qx.core.Object&data2=qx.data.IListData&data3=qx.data.MBinding", this.__P_454_0.toUriParameter(this.__P_454_1));
      },
      testJsonFlat: function testJsonFlat() {
        this.__P_454_1.setData1("a");
        this.__P_454_1.setData2(10.456);
        this.__P_454_1.setData3(true);
        this.assertEquals('{"data1":"a","data2":10.456,"data3":true}', this.__P_454_0.toJson(this.__P_454_1));
      },
      testJsonExp: function testJsonExp() {
        var date = new Date(1000);
        this.__P_454_1.setData1(date);
        this.__P_454_1.setData2(/[0]/);
        this.__P_454_1.setData3(45e12);
        this.assertEquals('{"data1":"' + date + '","data2":"/[0]/","data3":45000000000000}', this.__P_454_0.toJson(this.__P_454_1));
      },
      testJsonDeep2: function testJsonDeep2() {
        var model = new qx.test.SerializerModel();
        model.setData1("a");
        model.setData2(11);
        model.setData3(false);
        this.__P_454_1.setData1(model);
        this.__P_454_1.setData3(null);
        this.assertEquals('{"data1":{"data1":"a","data2":11,"data3":false},"data2":null,"data3":null}', this.__P_454_0.toJson(this.__P_454_1));
        model.dispose();
      },
      testJsonArray: function testJsonArray() {
        this.__P_454_1.setData1([12, 1]);
        this.__P_454_1.setData2(["a", "b"]);
        this.__P_454_1.setData3([true, false]);
        this.assertEquals('{"data1":[12,1],"data2":["a","b"],"data3":[true,false]}', this.__P_454_0.toJson(this.__P_454_1));
      },
      testJsonDataArray: function testJsonDataArray() {
        this.__P_454_1.setData1(new qx.data.Array([12, 1]));
        this.__P_454_1.setData2(new qx.data.Array(["a", "b"]));
        this.__P_454_1.setData3(new qx.data.Array([true, false]));
        this.assertEquals('{"data1":[12,1],"data2":["a","b"],"data3":[true,false]}', this.__P_454_0.toJson(this.__P_454_1));
        this.__P_454_1.getData1().dispose();
        this.__P_454_1.getData2().dispose();
        this.__P_454_1.getData3().dispose();
      },
      testJsonBig: function testJsonBig() {
        var model = new qx.ui.core.Widget();
        this.__P_454_0.toJson(model);
        model.dispose();
      },
      testJsonInherited: function testJsonInherited() {
        var model = new qx.ui.core.Widget();
        var data = this.__P_454_0.toJson(model);
        // property included in widget
        this.assertTrue(data.indexOf("appearance") != -1);
        // property included in LayoutItem (Superclass)
        this.assertTrue(data.indexOf("alignY") != -1);
        model.dispose();
      },
      testJsonEmpty: function testJsonEmpty() {
        this.__P_454_1.setData1(new qx.data.Array());
        this.__P_454_1.setData2([]);
        this.__P_454_1.setData3({});
        this.assertEquals('{"data1":[],"data2":[],"data3":{}}', this.__P_454_0.toJson(this.__P_454_1));
        this.__P_454_1.getData1().dispose();
      },
      testJsonEscape: function testJsonEscape() {
        this.__P_454_1.setData1("''");
        this.__P_454_1.setData2('""');
        this.__P_454_1.setData3("\b\t\n\f\r\\");
        this.assertEquals('{"data1":"\'\'","data2":"\\"\\"","data3":"\\b\\t\\n\\f\\r\\\\"}', this.__P_454_0.toJson(this.__P_454_1));
      },
      testJsonQxSerializer: function testJsonQxSerializer() {
        var qxSerializer = function qxSerializer(object) {
          if (object instanceof qx.ui.form.ListItem) {
            return object.getLabel();
          }
        };
        var item = new qx.ui.form.ListItem("a");
        this.__P_454_1.setData1(item);
        this.__P_454_1.setData2(10.456);
        this.__P_454_1.setData3(true);
        this.assertEquals('{"data1":"a","data2":10.456,"data3":true}', this.__P_454_0.toJson(this.__P_454_1, qxSerializer));
        item.dispose();
      },
      testJsonWithMarshaler: function testJsonWithMarshaler() {
        this.__P_454_1.setData1("a");
        this.__P_454_1.setData2(["b"]);
        this.__P_454_1.setData3("c");
        var json = this.__P_454_0.toJson(this.__P_454_1);
        var model = qx.data.marshal.Json.createModel(qx.lang.Json.parse(json));
        this.assertEquals(this.__P_454_1.getData1(), model.getData1());
        this.assertEquals(this.__P_454_1.getData2()[0], model.getData2().getItem(0));
        this.assertEquals(this.__P_454_1.getData3(), model.getData3());
        model.dispose();
      },
      testJsonLateObjectSet: function testJsonLateObjectSet() {
        var data = {
          foo: "foo",
          bar: "bar",
          goo: {}
        };
        var model = qx.data.marshal.Json.createModel(data);
        model.setGoo({
          mi: "moo",
          la: "lili"
        });
        this.assertEquals('{"foo":"foo","bar":"bar","goo":{"mi":"moo","la":"lili"}}', qx.util.Serializer.toJson(model));
        model.dispose();
      },
      testJsonQxClass: function testJsonQxClass() {
        this.__P_454_1.setData1(qx.core.Object);
        this.__P_454_1.setData2(qx.data.IListData);
        this.__P_454_1.setData3(qx.data.MBinding);
        this.assertEquals('{"data1":"qx.core.Object","data2":"qx.data.IListData","data3":"qx.data.MBinding"}', this.__P_454_0.toJson(this.__P_454_1));
      },
      //
      // toNativeObject tests
      //
      testNativeObjectFlat: function testNativeObjectFlat() {
        this.__P_454_1.setData1("a");
        this.__P_454_1.setData2(10.456);
        this.__P_454_1.setData3(true);
        this.assertJsonEquals({
          data1: "a",
          data2: 10.456,
          data3: true
        }, this.__P_454_0.toNativeObject(this.__P_454_1));
      },
      testNativeObjectExp: function testNativeObjectExp() {
        var date = new Date();
        this.__P_454_1.setData1(date);
        this.__P_454_1.setData2(/[0]/);
        this.__P_454_1.setData3(45e12);
        this.assertJsonEquals({
          data1: date,
          data2: /[0]/,
          data3: 45e12
        }, this.__P_454_0.toNativeObject(this.__P_454_1));
      },
      testNativeObjectDeep2: function testNativeObjectDeep2() {
        var model = new qx.test.SerializerModel();
        model.setData1("a");
        model.setData2(11);
        model.setData3(false);
        this.__P_454_1.setData1(model);
        this.__P_454_1.setData3(null);
        this.assertJsonEquals({
          data1: {
            data1: "a",
            data2: 11,
            data3: false
          },
          data2: null,
          data3: null
        }, this.__P_454_0.toNativeObject(this.__P_454_1));
        model.dispose();
      },
      testNativeObjectArray: function testNativeObjectArray() {
        this.__P_454_1.setData1([12, 1]);
        this.__P_454_1.setData2(["a", "b"]);
        this.__P_454_1.setData3([true, false]);
        this.assertJsonEquals({
          data1: [12, 1],
          data2: ["a", "b"],
          data3: [true, false]
        }, this.__P_454_0.toNativeObject(this.__P_454_1));
      },
      testNativeObjectDataArray: function testNativeObjectDataArray() {
        this.__P_454_1.setData1(new qx.data.Array([12, 1]));
        this.__P_454_1.setData2(new qx.data.Array(["a", "b"]));
        this.__P_454_1.setData3(new qx.data.Array([true, false]));
        this.assertJsonEquals({
          data1: [12, 1],
          data2: ["a", "b"],
          data3: [true, false]
        }, this.__P_454_0.toNativeObject(this.__P_454_1));
        this.__P_454_1.getData1().dispose();
        this.__P_454_1.getData2().dispose();
        this.__P_454_1.getData3().dispose();
      },
      testNativeObjectBig: function testNativeObjectBig() {
        var model = new qx.ui.core.Widget();
        this.__P_454_0.toNativeObject(model);
        model.dispose();
      },
      testNativeObjectEmpty: function testNativeObjectEmpty() {
        this.__P_454_1.setData1(new qx.data.Array());
        this.__P_454_1.setData2([]);
        this.__P_454_1.setData3(new qx.core.Object());
        this.assertJsonEquals({
          data1: [],
          data2: [],
          data3: {}
        }, this.__P_454_0.toNativeObject(this.__P_454_1));
        this.__P_454_1.getData1().dispose();
        this.__P_454_1.getData3().dispose();
      },
      testNativeObjectEscape: function testNativeObjectEscape() {
        this.__P_454_1.setData1("''");
        this.__P_454_1.setData2('""');
        this.__P_454_1.setData3("\b\t\n\f\r\\");
        this.assertJsonEquals({
          data1: "''",
          data2: '""',
          data3: "\b\t\n\f\r\\"
        }, this.__P_454_0.toNativeObject(this.__P_454_1));
      },
      testNativeObjectQxSerializer: function testNativeObjectQxSerializer() {
        var qxSerializer = function qxSerializer(object) {
          if (object instanceof qx.ui.form.ListItem) {
            return object.getLabel();
          }
        };
        var item = new qx.ui.form.ListItem("a");
        this.__P_454_1.setData1(item);
        this.__P_454_1.setData2(10.456);
        this.__P_454_1.setData3(true);
        this.assertJsonEquals({
          data1: "a",
          data2: 10.456,
          data3: true
        }, this.__P_454_0.toNativeObject(this.__P_454_1, qxSerializer));
        item.dispose();
      },
      testNativeObjectQxClass: function testNativeObjectQxClass() {
        this.__P_454_1.setData1(qx.core.Object);
        this.__P_454_1.setData2(qx.data.IListData);
        this.__P_454_1.setData3(qx.data.MBinding);
        this.assertJsonEquals({
          data1: "qx.core.Object",
          data2: "qx.data.IListData",
          data3: "qx.data.MBinding"
        }, this.__P_454_0.toNativeObject(this.__P_454_1));
      },
      /* ******************************
       * DATE FORMATER
       * **************************** */
      __P_454_2: function __P_454_2() {
        var formater = new qx.util.format.DateFormat("isoUtcDateTime", "en");
        var date1 = new Date(0);
        var date2 = new Date(100000);
        var date3 = new Date(25168418651);
        this.__P_454_1.setData1(date1);
        this.__P_454_1.setData2(date2);
        this.__P_454_1.setData3(date3);
        return formater;
      },
      testDateFormaterNative: function testDateFormaterNative() {
        var formater = this.__P_454_2();
        this.assertJsonEquals({
          data1: "1970-01-01T00:00:00Z",
          data2: "1970-01-01T00:01:40Z",
          data3: "1970-10-19T07:13:38Z"
        }, this.__P_454_0.toNativeObject(this.__P_454_1, null, formater));
        formater.dispose();
      },
      testDateFormaterJson: function testDateFormaterJson() {
        var formater = this.__P_454_2();
        this.assertEquals('{"data1":"1970-01-01T00:00:00Z","data2":"1970-01-01T00:01:40Z","data3":"1970-10-19T07:13:38Z"}', this.__P_454_0.toJson(this.__P_454_1, null, formater));
        formater.dispose();
      },
      testDateFormaterUrl: function testDateFormaterUrl() {
        var formater = this.__P_454_2();
        this.assertEquals("data1=1970-01-01T00%3A00%3A00Z&data2=1970-01-01T00%3A01%3A40Z&data3=1970-10-19T07%3A13%3A38Z", this.__P_454_0.toUriParameter(this.__P_454_1, null, formater));
        formater.dispose();
      },
      /* ******************************
       * Localized strings
       * **************************** */
      testJsonLocalizedStrings: function testJsonLocalizedStrings() {
        this.assertEquals('"test affe"', qx.util.Serializer.toJson(qx.locale.Manager.tr("test affe")));
      },
      testNativeLocalizedStrings: function testNativeLocalizedStrings() {
        var ser = qx.util.Serializer.toNativeObject(qx.locale.Manager.tr("test affe"));
        this.assertEquals("test affe", ser);
        // regular strings should not have a translate method
        this.assertUndefined(ser.translate);
      },
      testUrlLocalizedStrings: function testUrlLocalizedStrings() {
        this.__P_454_1.setData1(qx.locale.Manager.tr("test affe"));
        this.assertEquals("data1=test%20affe&data2=null&data3=null", qx.util.Serializer.toUriParameter(this.__P_454_1));
      }
    }
  });
  qx.test.util.Serializer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Serializer.js.map?dt=1735383866917