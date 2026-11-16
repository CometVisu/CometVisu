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

describe('cv.ui.manager.upload.UploadMgr multipart upload', () => {
  let manager;
  let handler;
  let folder;

  beforeAll(async () => {
    await cv.TemplateEngine.getInstance().loadParts(['manager']);
  });

  beforeEach(() => {
    manager = new cv.ui.manager.upload.UploadMgr();
    manager.setAutoUpload(false);
    folder = new cv.ui.manager.model.FileItem('folder & files');
    manager.setFolder(folder);
    handler = manager.getUploadHandler();
  });

  afterEach(() => {
    if (handler) {
      handler.dispose();
    }
    if (manager) {
      manager.dispose();
    }
    if (folder) {
      folder.dispose();
    }
  });

  it('sends an encoded override filename with an explicit encoding marker', () => {
    manager.setFilename('a+b%20.txt');
    const file = new com.zenesis.qx.upload.File(new File(['hello'], 'original.txt'), 'original.txt', 'test');
    const send = spyOn(XMLHttpRequest.prototype, 'send');
    handler._addFile(file);
    handler.beginUploads();
    const data = send.calls.mostRecent().args[0];

    expect(manager.getUploadUrl()).toContain('path=folder%20%26%20files');
    expect(data instanceof FormData).toBe(true);
    expect(data.get('filename')).toBe('a%2Bb%2520.txt');
    expect(data.get('filenameEncoding')).toBe('uri');
    expect(data.get('file').name).toBe('original.txt');
  });

  it('retains the replacement filename when retrying a conflicting upload', () => {
    const file = new com.zenesis.qx.upload.File(new File(['hello'], 'original.txt'), 'original.txt', 'test');
    file.setParam('filename', 'a+b%20.txt');
    const addFile = spyOn(handler, '_addFile').and.callThrough();
    manager.forceUpload(file);
    const retry = addFile.calls.mostRecent().args[0];

    expect(retry.getParam('filename')).toBe('a+b%20.txt');
    expect(retry.getParam('filenameEncoding')).toBe('uri');
    expect(retry.getParam('force')).toBe('true');
    expect(manager.isForce()).toBe(false);

    const error = spyOn(cv.ui.manager.snackbar.Controller, 'error');
    retry.setStatus(406);
    retry.setState('uploading');
    retry.setState('uploaded');

    expect(error).toHaveBeenCalled();
  });
});
