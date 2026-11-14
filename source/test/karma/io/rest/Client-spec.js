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
 */

describe('cv.io.rest.Client filesystem creation', () => {
  let client;
  let send;

  beforeEach(() => {
    client = cv.io.rest.Client.getFsClient();
    send = spyOn(qx.io.request.Xhr.prototype, 'send');
  });

  it('sends file content as multipart with the directory and type in the URL', async () => {
    client.create({ path: 'my & folder/a+b%.xml', type: 'file', hash: 'ignore' }, 'hello');

    const request = send.calls.mostRecent().object;

    expect(request.getUrl()).toContain('/fs?path=my%20%26%20folder&type=file&hash=ignore');
    expect(request.getRequestHeader('Content-Type')).toBeFalsy();
    const data = request.getRequestData();

    expect(data instanceof FormData).toBe(true);
    expect(data.get('file').name).toBe('a+b%.xml');
    expect(await data.get('file').text()).toBe('hello');
  });

  it('sends an empty file for creation without content', async () => {
    client.create({ path: 'empty.txt', type: 'file' });
    const request = send.calls.mostRecent().object;

    expect(request.getUrl()).toContain('/fs?path=.&type=file');
    expect(await request.getRequestData().get('file').text()).toBe('');
  });

  it('creates directories with an empty multipart body', () => {
    client.create({ path: 'new & folder', type: 'dir' });
    const request = send.calls.mostRecent().object;

    expect(request.getUrl()).toContain('/fs?path=new%20%26%20folder&type=dir');
    expect(request.getRequestData() instanceof FormData).toBe(true);
    expect(request.getRequestData().get('file')).toBeNull();
  });

  it('rejects a missing type', () => {
    expect(() => client.create({ path: 'test.txt' }, 'test')).toThrowError();
  });
});
