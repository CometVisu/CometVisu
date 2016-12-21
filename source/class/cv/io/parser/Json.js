/**
 * Sometimes the openHAB1 backend returns invalid JSON (e.g. multiple JSON object in one string)
 * This parser can handle those strings
 */
qx.Class.define('cv.io.parser.Json', {
  type: "static",

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    parse: function(data) {
      var result = {};
      try {
        result = qx.lang.Json.parse(data);
      } catch (e) {
        data.split("}{").forEach(function(subData) {
          try {
            result = qx.lang.Object.mergeWith(result, qx.lang.Json.parse(subData + "}"));
          } catch (se) {
            qx.log.Logger.error(se);
          }
        }, this);
      }
      return result;
    }
  }
});