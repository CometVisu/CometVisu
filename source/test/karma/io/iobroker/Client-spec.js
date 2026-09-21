/* Client-spec.js
 *
 * copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
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
 * Unit tests for cv.io.iobroker.Client. The socket client library that the backend would publish
 * is replaced by a fake, so the test can drive the connection and capture what the client sends.
 */
describe('testing cv.io.iobroker.Client', function () {
  let sockets;
  let savedTestMode;

  /**
   * @param url {String} url the client connects to
   * @param options {Map} options the client passes to the library
   */
  function FakeSocket(url, options) {
    this.url = url;
    this.options = options;
    this.connected = false;
    this.destroyed = false;
    this.handlers = {};
    this.emitted = [];
    sockets.push(this);
  }
  FakeSocket.prototype.on = function (name, cb) {
    this.handlers[name] = this.handlers[name] || [];
    this.handlers[name].push(cb);
  };
  FakeSocket.prototype.off = function (name, cb) {
    if (this.handlers[name]) {
      this.handlers[name] = this.handlers[name].filter(entry => entry !== cb);
    }
  };
  FakeSocket.prototype.emit = function (name, ...args) {
    const cb = typeof args[args.length - 1] === 'function' ? args.pop() : null;
    this.emitted.push({ name: name, args: args, cb: cb });
  };
  FakeSocket.prototype.close = function () {
    this.connected = false;
  };
  FakeSocket.prototype.destroy = function () {
    this.destroyed = true;
    this.connected = false;
  };

  // test helpers
  FakeSocket.prototype.fire = function (name, ...args) {
    (this.handlers[name] || []).forEach(cb => cb(...args));
  };
  FakeSocket.prototype.ready = function () {
    this.connected = true;
    this.fire('connect');
  };
  FakeSocket.prototype.lastCall = function (name) {
    for (let i = this.emitted.length - 1; i >= 0; i--) {
      if (this.emitted[i].name === name) {
        return this.emitted[i];
      }
    }
    return null;
  };
  FakeSocket.prototype.answer = function (name, ...response) {
    const call = this.lastCall(name);
    if (call && call.cb) {
      call.cb(...response);
    }
  };

  /**
   * @return {FakeSocket} the socket opened last
   */
  function lastSocket() {
    return sockets[sockets.length - 1];
  }

  /**
   * @param url {String?} backend url, defaults to a local one
   * @return {cv.io.iobroker.Client}
   */
  function newClient(url) {
    return new cv.io.iobroker.Client('iobroker', url || 'ws://localhost:8083/');
  }

  /**
   * Start a client and let its connection become ready.
   *
   * @param credentials {Map?} credentials to log in with
   * @return {Promise} resolves with the client and its socket
   */
  async function connectedClient(credentials) {
    const client = newClient();
    await client.login(false, credentials || {});
    const sock = lastSocket();
    sock.ready();
    return { client: client, sock: sock };
  }

  beforeEach(function () {
    sockets = [];
    spyOn(cv.io.iobroker.SocketLibrary, 'load').and.resolveTo({
      connect: (url, options) => new FakeSocket(url, options)
    });

    savedTestMode = cv.Config.testMode;
    cv.Config.testMode = true;
  });

  afterEach(function () {
    cv.Config.testMode = savedTestMode;
  });

  it('is an iobroker client', function () {
    expect(newClient().getType()).toEqual('iobroker');
  });

  it('derives the origin of the library from the backend url', function () {
    const lib = cv.io.iobroker.SocketLibrary;

    expect(lib.getOrigin('ws://host:8082/')).toEqual('http://host:8082');
    expect(lib.getOrigin('wss://host/')).toEqual('https://host');
    expect(lib.getOrigin(new URL('ws://host:8084/'))).toEqual('http://host:8084');
  });

  it('loads the library of the backend it connects to', async function () {
    const client = newClient('ws://other:8084/');
    await client.login(false, {});

    expect(cv.io.iobroker.SocketLibrary.load).toHaveBeenCalled();
    expect('' + cv.io.iobroker.SocketLibrary.load.calls.mostRecent().args[0]).toContain('other:8084');
    client.terminate();
  });

  it('connects with an http url and without the query of the backend url', async function () {
    // socket.io-client expects http(s), the @iobroker/ws client turns it into ws itself
    const client = newClient('ws://localhost:8083/?token=abc');
    await client.login(false, {});

    expect(lastSocket().url).toEqual('http://localhost:8083/');
    client.terminate();
  });

  it('puts the url-encoded credentials into the connection url', async function () {
    const client = newClient();
    await client.login(false, { username: 'a b', password: 'p&q' });
    const url = lastSocket().url;

    expect(url).toContain(`user=${encodeURIComponent('a b')}`); // a%20b
    expect(url).toContain(`pass=${encodeURIComponent('p&q')}`); // p%26q
    client.terminate();
  });

  it('reports connected only after the connect event and calls the callback', async function () {
    const client = newClient();
    const ready = jasmine.createSpy('ready');
    await client.login(false, {}, ready);
    const sock = lastSocket();

    expect(client.isConnected()).toBe(false);
    sock.ready();

    expect(client.isConnected()).toBe(true);
    expect(ready).toHaveBeenCalled();
    client.terminate();
  });

  it('routes a stateChange to update()', async function () {
    const { client, sock } = await connectedClient();
    client.update = jasmine.createSpy('update');
    sock.fire('stateChange', 'ebus.0.foo', { val: 21.5, ts: 100, lc: 100 });

    expect(client.update).toHaveBeenCalledWith({ 'ebus.0.foo': 21.5 });
    client.terminate();
  });

  it('ignores a stateChange that did not change the value', async function () {
    const { client, sock } = await connectedClient();
    client.update = jasmine.createSpy('update');
    // ts differs from lc, so only the timestamp was refreshed
    sock.fire('stateChange', 'ebus.0.foo', { val: 21.5, ts: 200, lc: 100 });

    expect(client.update).not.toHaveBeenCalled();
    client.terminate();
  });

  it('subscribes again after a reconnect', async function () {
    const { client, sock } = await connectedClient();
    client.subscribe(['ebus.0.foo']);
    sock.emitted.length = 0;
    sock.fire('reconnect');

    expect(sock.lastCall('subscribeStates')).not.toBeNull();
    expect(sock.lastCall('subscribeStates').args[0]).toEqual(['ebus.0.foo']);
    client.terminate();
  });

  it('getHistory rejects when there is no connection', async function () {
    const client = newClient();
    await client.login(false, {}); // no connect event, so not connected
    let error;
    try {
      await client.getHistory('ebus.0.foo', new Date(1000), new Date(2000), {});
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
    expect('' + error).toContain('not connected');
    client.terminate();
  });

  it('sends a getHistory request and resolves with the response', async function () {
    const { client, sock } = await connectedClient();
    const promise = client.getHistory('ebus.0.foo', new Date(1000), new Date(2000), { aggregate: 'minmax' });
    const call = sock.lastCall('getHistory');

    expect(call.args[0]).toEqual('ebus.0.foo');
    expect(call.args[1].aggregate).toEqual('minmax');

    const history = [{ ts: 1000, val: 1 }];
    sock.answer('getHistory', null, history);

    expect(await promise).toEqual(history);
    client.terminate();
  });

  it('rejects a pending request when the connection goes away', async function () {
    const { client, sock } = await connectedClient();
    const promise = client.getHistory('ebus.0.foo', new Date(1000), new Date(2000), {});
    sock.connected = false;
    sock.fire('disconnect');

    let error;
    try {
      await promise;
    } catch (e) {
      error = e;
    }

    expect('' + error).toContain('closed');
    client.terminate();
  });

  it('gives up after the server asks to reauthenticate', async function () {
    const { client, sock } = await connectedClient({ username: 'x', password: 'wrong' });
    sock.fire('reauthenticate');

    expect(sock.destroyed).toBe(true);
    // no second connection is opened
    expect(sockets.length).toBe(1);
    client.terminate();
  });
});
