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
      "qx.test.io.MRemoteTest": {
        "require": true
      },
      "qx.dev.unit.MRequirements": {
        "require": true
      },
      "qx.io.remote.transport.Iframe": {},
      "qx.lang.Json": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
  qooxdoo - the new era of web development
  
  http://qooxdoo.org
  
  Copyright:
    2010 1&1 Internet AG, Germany, http://www.1und1.de
  
  License:
       MIT: https://opensource.org/licenses/MIT
    See the LICENSE file in the project's top-level directory for details.
  
  Authors:
    * Tristan Koch (tristankoch)
  
  ************************************************************************ */

  /*
   */
  /**
   *
   * @asset(qx/test/xmlhttp/echo_get_request.php)
   */

  qx.Class.define("qx.test.io.remote.transport.Iframe", {
    extend: qx.dev.unit.TestCase,
    include: [qx.test.io.MRemoteTest, qx.dev.unit.MRequirements],
    members: {
      setUp: function setUp() {
        this.request = new qx.io.remote.transport.Iframe();
      },
      testGetIframeHtmlContent: function testGetIframeHtmlContent() {
        if (this.isLocal()) {
          this.needsPHPWarning();
          return;
        }
        this.require(["php"]);
        this.request.addListener("completed", function () {
          this.resume(function () {
            var response = this.request.getIframeHtmlContent();
            this.assertNotNull(response, "Response is 'null'!");
            this.assertNotEquals("", response, "Response is empty!");
            response = qx.lang.Json.parse(response);
            this.assertEquals("my_param=expected", response["_data_"], "Response is wrong!");
          }, this);
        }, this);

        // Send request
        this.request.setUrl(this.getUrl("qx/test/xmlhttp/echo_get_request.php"));
        this.request.setParameters({
          my_param: "expected"
        });
        this.request.send();
        this.wait();
      }
    }
  });
  qx.test.io.remote.transport.Iframe.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Iframe.js.map?dt=1717235390249