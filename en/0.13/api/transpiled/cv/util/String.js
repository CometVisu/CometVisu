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

  /* String.js 
   * 
   * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
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
  qx.Class.define('cv.util.String', {
    type: 'static',

    /*
    ******************************************************
      STATICS
    ******************************************************
    */
    statics: {
      __P_525_0: null,

      /**
       * Decode HTML entities like &amp; to &
       * @param str {String} string to decode
       * @return {String}
       */
      decodeHtmlEntities: function decodeHtmlEntities(str) {
        if (!this.__P_525_0) {
          this.__P_525_0 = document.createElement('span');
        }

        this.__P_525_0.innerHTML = str;
        return this.__P_525_0.innerText;
      },

      /**
       * Clean the string that contains HTML code and convert it to a DOM element
       * @param str {String} string to decode
       * @return {Element}
       */
      htmlStringToDomElement: function htmlStringToDomElement(str) {
        //var widget = qx.bom.Html.clean([res[1]])[0];
        //var widget = (function(){var div=document.createElement('div');div.innerHTML=res[1];return div.childNodes[0];})();
        var div = document.createElement('div');
        div.innerHTML = str;
        return div.children[0];
      },

      /**
       * Insert in string values as the well known sprint() function of other
       * programming languages does.
       * When a malformation happens a generic string is returned and a warning
       * is shown on the console.
       * @return {String}
       */
      sprintf: function (_sprintf) {
        function sprintf() {
          return _sprintf.apply(this, arguments);
        }

        sprintf.toString = function () {
          return _sprintf.toString();
        };

        return sprintf;
      }(function () {
        var args = Array.prototype.slice.call(arguments);
        var string = '-';

        try {
          string = sprintf.apply(this, args);
        } catch (err) {
          qx.log.Logger.warn(this, err + ', ' + JSON.stringify(args));
        }

        return string;
      })
    }
  });
  cv.util.String.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=String.js.map?dt=1664557371149