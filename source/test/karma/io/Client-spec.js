/*
 * Copyright (c) 2026, Christian Mayer and the CometVisu contributors.
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
 * Unit tests for the knxd (CometVisu protocol) client
 *
 * Tests the knxd availability handling: the cometvisu-knxd-fcgi backend
 * reports a lost connection to knxd with a "knxd" field in its /r and /w
 * responses. That must be shown in the notification center with the outage
 * duration and removed again when knxd is back.
 */
describe('testing cv.io.Client', () => {
  describe('getKnxdStatus', () => {
    var knxdStatus = { ok: false, since: 1763000000, lastOk: 1762990000 };

    it('should return the knxd status of a parsed response', () => {
      expect(cv.io.Client.getKnxdStatus({ knxd: knxdStatus })).toBe(knxdStatus);
    });

    it('should parse a raw response body', () => {
      expect(cv.io.Client.getKnxdStatus('{"knxd":{"ok":false,"since":1}}')).toEqual({ ok: false, since: 1 });
    });

    it('should return null when no outage is reported', () => {
      expect(cv.io.Client.getKnxdStatus({ knxd: { ok: true } })).toBeNull();
      expect(cv.io.Client.getKnxdStatus({ d: {}, i: 1 })).toBeNull();
      expect(cv.io.Client.getKnxdStatus(null)).toBeNull();
      expect(cv.io.Client.getKnxdStatus('not a json body')).toBeNull();
    });
  });

  describe('knxd availability', () => {
    var client;

    beforeEach(() => {
      client = new cv.io.Client('knxd');
      client.setName('main');
      spyOn(cv.core.notifications.Router, 'dispatchMessage');
    });

    afterEach(() => {
      if (client && !client.isDisposed()) {
        client.dispose();
      }
      client = null;
    });

    it('should show a message when the backend reports a knxd outage', () => {
      const since = Math.floor(Date.now() / 1000) - 70;

      expect(client.reportKnxdStatus({ knxd: { ok: false, since: since, lastOk: since - 10 } })).toBe('outage');

      const args = cv.core.notifications.Router.dispatchMessage.calls.mostRecent().args;

      expect(args[0]).toBe('cv.client.knxd.main');
      expect(args[1].unique).toBe(true);
      expect(args[1].condition).toBe(true);
      expect(args[1].severity).toBe('high');
      // the chosen time format is locale dependent, the duration is not
      expect(args[1].message).toContain('1 min');
      // the message is kept up to date while the outage lasts
      expect(client._knxdTimer).toBeDefined();
    });

    it('should report a persisting outage only once', () => {
      const response = { knxd: { ok: false, since: 1763000000, lastOk: 1762990000 } };

      expect(client.reportKnxdStatus(response)).toBe('outage');
      expect(client.reportKnxdStatus(response)).toBeNull();
      expect(cv.core.notifications.Router.dispatchMessage.calls.count()).toBe(1);
    });

    it('should remove the message when knxd is available again', () => {
      client.reportKnxdStatus({ knxd: { ok: false, since: 1763000000 } });

      expect(client.reportKnxdStatus({ d: {}, i: 1 })).toBe('recovery');

      const args = cv.core.notifications.Router.dispatchMessage.calls.mostRecent().args;

      expect(args[0]).toBe('cv.client.knxd.main');
      expect(args[1].condition).toBe(false);
      // the update timer is stopped and removed
      expect(client._knxdTimer).toBeNull();
    });

    it('should not report anything while knxd is available', () => {
      expect(client.reportKnxdStatus({ d: {}, i: 1 })).toBeNull();

      expect(cv.core.notifications.Router.dispatchMessage).not.toHaveBeenCalled();
    });

    it('should report an outage reported by a write request', () => {
      const req = {
        getResponse() {
          return { error: 'write failed', knxd: { ok: false, since: 1763000000 } };
        },
        serverErrorHandled: false
      };

      client._onWriteError({ getTarget: () => req });

      // the failed write is not a lost connection to the backend
      expect(req.serverErrorHandled).toBe(true);
      expect(cv.core.notifications.Router.dispatchMessage).toHaveBeenCalled();
    });

    it('should ignore write errors without knxd information', () => {
      const req = {
        getResponse() {
          return { error: 'write failed' };
        },
        serverErrorHandled: false
      };

      client._onWriteError({ getTarget: () => req });

      expect(req.serverErrorHandled).toBe(false);
      expect(cv.core.notifications.Router.dispatchMessage).not.toHaveBeenCalled();
    });

    it('should format the outage duration', () => {
      expect(client._formatDuration(5)).toBe('5 s');
      expect(client._formatDuration(65)).toBe('1 min 5 s');
      expect(client._formatDuration(3 * 3600 + 4 * 60 + 7)).toBe('3 h 4 min 7 s');
    });
  });
});
