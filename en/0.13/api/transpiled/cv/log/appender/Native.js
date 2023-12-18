(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.log.appender.Util": {
        "require": true,
        "defer": "runtime"
      },
      "qx.bom.client.Html": {
        "require": true,
        "defer": "runtime"
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "cv.Config": {},
      "qx.log.Logger": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Native.js
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

  /* ************************************************************************
  
   qooxdoo - the new era of web development
  
   http://qooxdoo.org
  
   Copyright:
   2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
   License:
   MIT: https://opensource.org/licenses/MIT
   See the LICENSE file in the project's top-level directory for details.
  
   Authors:
   * Sebastian Werner (wpbasti)
  
   ************************************************************************ */

  /**
   * Processes the incoming log entry and displays it by means of the native
   * logging capabilities of the client. Can be disable during runtime
   *
   * @require(qx.log.appender.Util)
   * @require(qx.bom.client.Html)
   */
  qx.Bootstrap.define('cv.log.appender.Native', {
    /*
     *****************************************************************************
     STATICS
     *****************************************************************************
     */

    statics: {
      /**
       * Processes a single log entry
       *
       * @param entry {Map} The entry to process
       */
      process: function process(entry) {
        if (cv.Config.enableLogging) {
          // Firefox 4's Web Console doesn't support "debug"
          // eslint-disable-next-line no-console
          var level = console[entry.level] ? entry.level : 'log';
          // eslint-disable-next-line no-console
          if (console[level]) {
            var args = qx.log.appender.Util.toText(entry);
            // eslint-disable-next-line no-console
            console[level](args);
          }
        }
      }
    },
    /*
     *****************************************************************************
     DEFER
     *****************************************************************************
     */
    defer: function defer(statics) {
      qx.log.Logger.register(statics);
    }
  });
  cv.log.appender.Native.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Native.js.map?dt=1702901339484