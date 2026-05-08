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
  /* Json.js
   *
   * Copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
   *
   * This program is free software; you can redistribute it and/or modify it
   * under the terms of the GNU General Public License as published by the Free
   * Software Foundation; either version 3 of the License, or (at your option)
   * any later version.
   *
   * This program is distributed in the hope that it will be useful, but WITHOUT
   * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
   * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
   * more details.
   *
   * You should have received a copy of the GNU General Public License along
   * with this program; if not, write to the Free Software Foundation, Inc.,
   * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
   */

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

//# sourceMappingURL=Json.js.map?dt=1778272858714