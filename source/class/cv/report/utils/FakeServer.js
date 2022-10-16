/* FakeServer.js
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

qx.Class.define('cv.report.utils.FakeServer', {
  type: 'static',

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    _xhr: {},
    _responseDelays: [],
    _index: 0,

    init(log, build) {
      qx.log.Logger.info(
        this,
        build + ' log replaying in ' + qx.core.Environment.get('cv.build')
      );

      const urlMapping = {
        '/resource/': cv.Application.getRelativeResourcePath(true),
        '/rest/manager/index.php': cv.io.rest.Client.getBaseUrl()
      };

      // split by URI
      log.response.forEach(function (entry) {
        let url = entry.url;
        Object.keys(urlMapping).some(pattern => {
          const index = url.indexOf(pattern);
          if (index >= 0) {
            url = urlMapping[pattern] + url.substr(index + pattern.length);
            return true;
          }
          return false;
        });
        if (!this._xhr[url]) {
          this._xhr[url] = [];
        }
        this._xhr[url].push(entry);
        this._responseDelays.push(entry.delay);
      }, this);

      // configure server
      const server = qx.dev.FakeServer.getInstance().getFakeServer();
      server.respondWith(this.__respond.bind(this));
      this._responseDelays.unshift(10);
    },

    __respond(request) {
      const xhrData = cv.report.utils.FakeServer._xhr;
      let url = cv.report.Record.normalizeUrl(request.url);
      if (url.indexOf('nocache=') >= 0) {
        url = url.replace(/[\?|&]nocache=[0-9]+/, '');
      }
      if (!xhrData[url]) {
        if (
          !url.startsWith('/') &&
          qx.core.Environment.get('cv.build') === 'source'
        ) {
          url = '../source/' + url;
        }
      }
      if (!xhrData[url] || xhrData[url].length === 0) {
        qx.log.Logger.error(
          this,
          '404: no logged responses for URI ' + url + ' found'
        );
      } else {
        qx.log.Logger.debug(this, 'faking response for ' + url);
        let response = '';
        if (xhrData[url].length === 1) {
          response = xhrData[url][0];
        } else {
          // multiple responses recorded use them as LIFO stack
          response = xhrData[url].shift();
        }

        if (request.readyState === 4 && request.status === 404) {
          // This is a hack, sometimes the request has a 404 status and send readystate
          // the respond would fail if we do not override it here
          request.readyState = 1;
        }
        request.respond(response.status, response.headers, response.body);
        cv.report.utils.FakeServer._index++;
      }
    },

    getResponse(url) {
      url = cv.report.Record.normalizeUrl(url);

      if (cv.report.utils.FakeServer._xhr[url]) {
        return cv.report.utils.FakeServer._xhr[url][0];
      }
      return null;
    },

    unqueueResponse(url) {
      url = cv.report.Record.normalizeUrl(url);
      if (cv.report.utils.FakeServer._xhr[url]) {
        return cv.report.utils.FakeServer._xhr[url].shift();
      }
      return null;
    }
  }
});
