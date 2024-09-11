(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.log.Logger": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "cv.xhr": {
          "load": true
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /**
   * Sometimes the openHAB1 backend returns invalid JSON (e.g. multiple JSON object in one string)
   * This parser can handle those strings
   * @ignore($)
   */
  qx.Class.define('cv.io.parser.Json', {
    type: 'static',
    /*
    ******************************************************
      STATICS
    ******************************************************
    */
    statics: {
      parse: qx.core.Environment.select('cv.xhr', {
        jquery: function jquery(data) {
          var result = {};
          try {
            result = JSON.parse(data);
          } catch (e) {
            data.split('}{').forEach(function (subData, i) {
              try {
                var jsonString = i === 0 ? subData + '}' : '{' + subData;
                result = $.extend(result, JSON.parse(jsonString));
              } catch (se) {
                qx.log.Logger.error(se, data);
                result = data; // return the bad input
              }
            }, this);
          }
          return result;
        },
        qx: function (_qx) {
          function qx(_x) {
            return _qx.apply(this, arguments);
          }
          qx.toString = function () {
            return _qx.toString();
          };
          return qx;
        }(function (data) {
          var result = {};
          try {
            result = JSON.parse(data);
          } catch (e) {
            data.split('}{').forEach(function (subData, i) {
              try {
                var jsonString = i === 0 ? subData + '}' : '{' + subData;
                result = Object.assign(result, JSON.parse(jsonString));
              } catch (se) {
                qx.log.Logger.error(se, data);
                result = data; // return the bad input
              }
            }, this);
          }
          return result;
        })
      })
    }
  });
  cv.io.parser.Json.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Json.js.map?dt=1726089089760