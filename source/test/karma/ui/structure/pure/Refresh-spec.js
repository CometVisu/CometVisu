/* Refresh-spec.js 
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
 * Unit tests for refresh widget
 *
 */
describe('testing a refresh widget', function() {
  it('should test the refresh creator', function() {
    const [widget, element] = this.createTestWidgetString('refresh', {}, '<label>Test</label>');

    expect(widget.getPath()).toBe('id_0');

    expect(element).toHaveClass('refresh');
    expect(element).toHaveLabel('Test');
  });

  it('should test the refresh actor', function() {
    const res = this.createTestElement('refresh');
    const client = jasmine.createSpyObj('client', ['restart']);
    spyOn(cv.io.BackendConnections, 'getClients').and.callFake(() => ({main: client}));

    spyOn(res, 'defaultUpdate');
    this.initWidget(res);
    qx.event.Registration.fireEvent(res.getActor(), 'tap');

    expect(client.restart).toHaveBeenCalled();
  });
});
