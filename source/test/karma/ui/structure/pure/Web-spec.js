/* Web-spec.js 
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
 * Unit tests for web widget
 */
describe('testing a web widget', function() {
  it('should test the web creator', function() {
    spyOn(cv.io.BackendConnections, 'getClient').and.callFake(function() {
      return {
        getType: () => 'knxd'
      };
    });
    const [widget, element] = this.createTestWidgetString('web', {ga: 'Test'}, '<label>Test</label>');

    expect(widget.getPath()).toBe('id_0');
    expect(widget.getAddress()['_Test'].transform).toBe('DPT:1.001');
    expect(widget.getAddress()['_Test'].mode).toBe(0);

    expect(element).toHaveClass('web');
    expect(element).toHaveLabel('Test');
  });

  it('should test the ga with openhab backend', function() {
    spyOn(cv.io.BackendConnections, 'getClient').and.callFake(function() {
      return {
        getType: () => 'openhab'
      };
    });
    const [widget, element] = this.createTestWidgetString('web', {ga: 'Test'}, '<label>Test</label>');

    expect(widget.getAddress()['_Test'].transform).toBe('OH:switch');
    expect(widget.getAddress()['_Test'].mode).toBe('OFF');
  });

  it('should test web update', function() {
    const client = jasmine.createSpyObj('client', ['write']);
    spyOn(cv.io.BackendConnections, 'getClient').and.callFake(() => client);
    var res = this.createTestElement('web', {
      width: '60%',
      height: '90%',
      background: '#CCC',
      frameborder: 'true',
      scrolling: 'yes'
    }, '', 'Test');

    expect(res.getWidth()).toBe('60%');
    expect(res.getHeight()).toBe('90%');
    expect(res.getBackground()).toBe('#CCC');
    expect(res.getFrameborder()).toBeTruthy();
    expect(res.getScrolling()).toBe('yes');

    spyOn(res, 'refreshAction');
    res.update('Test', 0);

    expect(res.refreshAction).not.toHaveBeenCalled();
    res.update('Test', 1);

    expect(res.refreshAction).toHaveBeenCalled();
    expect(client.write).toHaveBeenCalledWith('Test', '80');
  });
});
