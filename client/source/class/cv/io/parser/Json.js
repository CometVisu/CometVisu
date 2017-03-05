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
    parse: qx.core.Environment.select("cv.xhr", {
      "jquery": function(data) {
        var result = {};
        try {
          result = JSON.parse(data);
        } catch (e) {
          data.split("}{").forEach(function(subData, i) {
            try {
              var jsonString = i === 0 ? subData + "}" : "{" + subData;
              result = $.extend(result, JSON.parse(jsonString));
            } catch (se) {
              qx.log.Logger.error(se);
            }
          }, this);
        }
        return result;
      },
      "qx": function(data) {
        var result = {};
        try {
          result = qx.lang.Json.parse(data);
        } catch (e) {
          data.split("}{").forEach(function(subData, i) {
            try {
              var jsonString = i === 0 ? subData + "}" : "{" + subData;
              result = qx.lang.Object.mergeWith(result, qx.lang.Json.parse(jsonString));
            } catch (se) {
              qx.log.Logger.error(se);
            }
          }, this);
        }
        return result;
      }
    })
  }
});