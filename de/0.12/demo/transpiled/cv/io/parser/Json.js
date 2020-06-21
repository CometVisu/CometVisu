(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.log.Logger": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * Sometimes the openHAB1 backend returns invalid JSON (e.g. multiple JSON object in one string)
   * This parser can handle those strings
   * @ignore($)
   */
  qx.Class.define('cv.io.parser.Json', {
    type: "static",

    /*
    ******************************************************
      STATICS
    ******************************************************
    */
    statics: {
      parse: function parse(data) {
        var result = {};

        try {
          result = JSON.parse(data);
        } catch (e) {
          data.split("}{").forEach(function (subData, i) {
            try {
              var jsonString = i === 0 ? subData + "}" : "{" + subData;
              result = Object.assign(result, JSON.parse(jsonString));
            } catch (se) {
              qx.log.Logger.error(se);
            }
          }, this);
        }

        return result;
      }
    }
  });
  cv.io.parser.Json.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Json.js.map?dt=1592778973713