/* MXhrReplayHook.js
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

/**
 * This mixin patches {qx.io.request.Xhr} during replaying mode of reporting to add the delays to the responses
 * and unqueue aborted responses
 */
qx.Mixin.define('cv.report.utils.MXhrReplayHook', {
  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct() {
    this.addListener('changePhase', this._onPhaseChange, this);
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __responseTimout: null,

    _onPhaseChange(ev) {
      const request = this.getTransport().getRequest();
      let url = request.url;
      const response = cv.report.utils.FakeServer.getResponse(url);
      if (!response) {
        // no logged response found might be an 404
        return;
      }
      switch (ev.getData()) {
        case 'opened':
          this.info('delaying response for ' + url + ' by ' + response.delay);
          const server = qx.dev.FakeServer.getInstance().getFakeServer();
          this.__responseTimout = setTimeout(() => {
            this.info('responding ' + url);
            for (const queuedRequest of server.requests) {
               if (queuedRequest === request) {
                 request.respond(response.status, response.headers, response.body);
                 break;
               }
            }
          }, response.delay || 10);
          break;

        case 'abort':
          if (response.phase === 'abort') {
            cv.report.utils.FakeServer.unqueueResponse(url);
          }
          if (this.__responseTimout) {
            clearTimeout(this.__responseTimout);
            this.__responseTimout = null;
          }
          break;
      }
    }
  }
});
