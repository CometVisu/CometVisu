(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.io.listmodel.RssLog": {
        "require": true
      },
      "cv.io.BackendConnections": {},
      "cv.io.listmodel.Registry": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /*
   * Copyright (c) 2023, Christian Mayer and the CometVisu contributors.
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
   *
   */

  /**
   * Data retrieval for openHAB persistence service.
   */
  qx.Class.define('cv.io.listmodel.OpenHAB', {
    extend: cv.io.listmodel.RssLog,
    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      REQUIRES: ['openhab']
    },
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      item: {
        check: 'String',
        init: ''
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      getRequestData: function getRequestData() {
        return {};
      },
      _getUrl: function _getUrl() {
        var client = cv.io.BackendConnections.getClientByType('openhab');
        var item = this.getItem();
        if (client && item) {
          return client.getResourcePath('rsslog', {
            item: item
          });
        }
        return null;
      },
      _convertResponse: function _convertResponse(data) {
        var tags = [data.name];
        return data.data.map(function (entry) {
          return {
            content: entry.state,
            tags: tags,
            publishedDate: entry.time
          };
        });
      },
      handleEvent: function handleEvent(ev, data, model) {
        return false;
      }
    },
    defer: function defer(clazz) {
      cv.io.listmodel.Registry.register(clazz);
    }
  });
  cv.io.listmodel.OpenHAB.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=OpenHAB.js.map?dt=1709410133357