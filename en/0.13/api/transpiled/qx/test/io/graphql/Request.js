(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.io.transport.Xhr": {
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.test.io.MAssert": {
        "require": true
      },
      "qx.io.graphql.protocol.Request": {},
      "qx.data.marshal.Json": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /**
   * @require(qx.io.transport.Xhr)
   */
  qx.Class.define("qx.test.io.graphql.Request", {
    extend: qx.dev.unit.TestCase,
    include: [qx.test.io.MAssert],
    members: {
      "test: request can be converted to json": function test_request_can_be_converted_to_json() {
        var query = "query { SomeRandomStuff }";
        var variables = {
          testKey: "testValue"
        };
        var request = new qx.io.graphql.protocol.Request({
          query: query
        });
        request.setVariables(variables);
        var expected = '{"query":"query { SomeRandomStuff }","variables":{"testKey":"testValue"}}';
        this.assertEquals(expected, request.toString());
      },
      "test: no variables in the final string": function test_no_variables_in_the_final_string() {
        var query = "query { SomeRandomStuff }";
        var request = new qx.io.graphql.protocol.Request({
          query: query
        });
        var expected = '{"query":"query { SomeRandomStuff }"}';
        this.assertEquals(expected, request.toString());
      },
      "test: variables can be bound": function test_variables_can_be_bound() {
        var query = "query { SomeRandomStuff }";
        var variables = {
          testKey: "testValue"
        };
        var request = new qx.io.graphql.protocol.Request({
          query: query
        });
        request.setVariables(variables);
        var model = qx.data.marshal.Json.createModel({
          source: "test"
        });
        model.bind("source", request, "variables.testKey");
        model.setSource("newTestValue");
        this.assertMatch(request.toString(), /newTestValue/);
      }
    }
  });
  qx.test.io.graphql.Request.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Request.js.map?dt=1735222428535